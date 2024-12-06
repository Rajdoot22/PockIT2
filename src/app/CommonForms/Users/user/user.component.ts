import { Component, OnInit, Input, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoleMaster } from 'src/app/CommonModels/role-master';
import { UserMaster } from 'src/app/CommonModels/user-master';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @Input() drawerClose!: Function;
  @Input() data: UserMaster = new UserMaster();
  @Input() drawerVisible: boolean = false;
  isSpinning = false;
  roles: RoleMaster[] = [];
  selectedRole: RoleMaster = new RoleMaster();
  passwordVisible: boolean = false;
  public commonFunction = new CommonFunctionService();
  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}

  ngOnInit() {
    this.selectedRole = new RoleMaster();
    this.loadRoles();
    this.getDesignationData();
  }

  loadRoles() {
    this.isSpinning = true;

    this.api.getAllRoles(0, 0, '', '', '').subscribe(
      (roles) => {
        this.roles = roles['data'];
        this.isSpinning = false;
      },
      () => {
        this.isSpinning = false;
        this.message.error('Something Went Wrong ...', '');
      }
    );
  }

  resetDrawer(websitebannerPage: NgForm) {
    this.data = new UserMaster();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  close(): void {
    this.drawerClose();
  }
  designationData: any = [];
  getDesignationData() {
    this.api.getDesignationData(0, 0, '', '', 'AND STATUS =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.designationData = data['data'];
        } else {
          this.designationData = [];
          this.message.error('Failed To Get Designation Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }
  isOk = true;
  save(addNew: boolean, websitebannerPage: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
      (this.data.NAME.trim() == '' ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.ROLE_ID == undefined ||
        this.data.ROLE_ID == null ||
        this.data.ROLE_ID == '') &&
      (this.data.EMAIL_ID == undefined ||
        this.data.EMAIL_ID == null ||
        this.data.EMAIL_ID == '') &&
      (this.data.MOBILE_NUMBER == undefined ||
        this.data.MOBILE_NUMBER == null ||
        this.data.MOBILE_NUMBER == '') &&
      (this.data.PASSWORD == undefined ||
        this.data.PASSWORD == null ||
        this.data.PASSWORD == '')
      
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    } else if (
      this.data.ROLE_ID == null ||
      this.data.ROLE_ID == undefined ||
      this.data.ROLE_ID ==0
    ) {
      this.isOk = false;
      this.message.error(' Please Select User Role', '');
    } else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter User Name', '');
    } 
     else if (
      this.data.EMAIL_ID == null ||
      this.data.EMAIL_ID == undefined ||
      this.data.EMAIL_ID == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Email.', '');
    } else if (!this.commonFunction.emailpattern.test(this.data.EMAIL_ID)) {
      this.isOk = false;
      this.message.error('Please Enter a Valid Email Address.', '');
    } else if (
      this.data.MOBILE_NUMBER == null ||
      this.data.MOBILE_NUMBER == undefined
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Mobile Number.', '');
    } else if (
      this.data.PASSWORD == null ||
      this.data.PASSWORD == undefined ||
      this.data.PASSWORD == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Password.', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateUser(this.data).subscribe((successCode) => {
            if (successCode.code == '200') {
              this.message.success('User Updated Successfully...', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else if (successCode['code'] == '300') {
              this.message.error('Mobile No. or Email Already Registered', '');
              this.isSpinning = false;
            } else {
              this.message.error('User Updation Failed...', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createUser(this.data).subscribe((successCode) => {
            if (successCode.code == '200') {
              this.message.success('User Created Successfully...', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new UserMaster();
                this.resetDrawer(websitebannerPage);
              }

              this.isSpinning = false;
            } else if (successCode['code'] == '300') {
              this.message.error('Mobile No. or Email Already Registered', '');
              this.isSpinning = false;
            } else {
              this.message.error('User Creation Failed...', '');
              this.isSpinning = false;
            }
          });
        }
      }
    }
  }
}
