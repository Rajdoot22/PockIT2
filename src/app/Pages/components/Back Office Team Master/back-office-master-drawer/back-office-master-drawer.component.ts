import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BackOfficeMasterData } from 'src/app/Pages/Models/BackOfficeMasterData';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-back-office-master-drawer',
  templateUrl: './back-office-master-drawer.component.html',
  styleUrls: ['./back-office-master-drawer.component.css']
})
export class BackOfficeMasterDrawerComponent {

  isSpinning = false;
  isOk = true;
  passwordVisible = false;
  roleNames: any = []

  ngOnInit(): void {
    // this.getRolesData();

  }

  public commonFunction = new CommonFunctionService();
  @Input() data: any = BackOfficeMasterData;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService
  ) { }

  roleData: any = [
    { ID: 5, NAME: "Territory Manager", PARENT_ID: 0, TYPE: "Manager" },
    { ID: 4, NAME: "Dispatcher", PARENT_ID: 0, TYPE: "Dispatcher" },
    { ID: 3, NAME: "Qualifier", PARENT_ID: 0, TYPE: "Qualifier" },
    { ID: 2, NAME: "Initiator", PARENT_ID: 0, TYPE: "Initiator" }
  ];


  // getRolesData() {
  //   this.api.getRolesData(0, 0, '', '', '').subscribe(
  //     (data) => {
  //       if (data['code'] == 200) {
  //         console.log('ROleNames',this.roleNames);

  //         this.roleData = data['data'];
  //       } else {
  //         this.roleData = [];
  //         this.message.error('Failed To Get Roles Data', '');
  //       }
  //     },
  //     () => {
  //       this.message.error('Something Went Wrong', '');
  //     }
  //   );
  // }


  resetDrawer(BackOfficeForm: NgForm) {
    this.data = new BackOfficeMasterData();
    BackOfficeForm.form.markAsPristine();
    BackOfficeForm.form.markAsUntouched();
  }



  save(addNew: boolean, BackOfficeForm: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
      (this.data.ROLE_ID == '' ||
        this.data.ROLE_ID == null ||
        this.data.ROLE_ID == undefined) &&
      (this.data.NAME == '' ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.EMAIL_ID == '' ||
        this.data.EMAIL_ID == null ||
        this.data.EMAIL_ID == undefined) &&
      (this.data.MOBILE_NUMBER == '' ||
        this.data.MOBILE_NUMBER == null ||
        this.data.MOBILE_NUMBER == undefined) &&
      (this.data.PASSWORD == '' ||
        this.data.PASSWORD == null ||
        this.data.PASSWORD == undefined)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    }
    else if (
       this.data.ROLE_ID == '' ||
      this.data.ROLE_ID == null  ||
      this.data.ROLE_ID == undefined

    ) {
      this.isOk = false;
      this.message.error(' Please Select Role', '');
    }
    else if (
      this.data.NAME == '' ||
      this.data.NAME == undefined ||
      this.data.NAME == null
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Back Office Name', '');
    }
    else if (
      this.data.EMAIL_ID == '' ||
      this.data.EMAIL_ID == null  ||
      this.data.EMAIL_ID == undefined

    ) {
      this.isOk = false;
      this.message.error(' Please Enter Valid Email', '');
    }
    else if (
      this.data.EMAIL_ID != null &&
      this.data.EMAIL_ID != undefined &&
      !this.commonFunction.emailpattern.test(this.data.EMAIL_ID.toString())
    ) {
      this.isOk = false;
      this.message.error("Please Enter Valid Email ", "");
    }
    else if (
      this.data.MOBILE_NUMBER == '' ||
      this.data.MOBILE_NUMBER == null ||
      this.data.MOBILE_NUMBER == undefined
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Mobile', '');
    }
    else if (
      this.data.MOBILE_NUMBER != null &&
      this.data.MOBILE_NUMBER != undefined &&
      !this.commonFunction.mobpattern.test(this.data.MOBILE_NUMBER.toString())
    ) {
      this.isOk = false;
      this.message.error("Please Enter Valid Mobile Number", "");
    }
    else if (
      this.data.PASSWORD == '' ||
      this.data.PASSWORD == null ||
      this.data.PASSWORD == undefined
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Password', '');
    }


    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateBackOffice(this.data).subscribe((successCode: any) => {
            if (successCode.code == 200) {
              this.message.success('Back Office Master Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Back Office Master Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createBackOffice(this.data).subscribe(
            (successCode: any) => {
              if (successCode.code === 200) {
                this.message.success('Back Office Master Created Successfully', '');
                if (!addNew) {
                  this.drawerClose();
                } else {
                  this.data = new BackOfficeMasterData();
                  this.resetDrawer(BackOfficeForm);
                }
              } else {
                this.message.error('Back Office Master Creation Failed', '');
              }
              this.isSpinning = false;
            },
            (error) => {
              this.message.error('An error occurred while creating the Back Office Master.', '');
              this.isSpinning = false;
            }
          );
        }
      }
    }
  }

  close() {
    this.drawerClose();
  }





}
