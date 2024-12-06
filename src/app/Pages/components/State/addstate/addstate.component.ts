import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { StateMaster } from '../../../Models/state';
// import { StateMaster } from '../../Models/state';

@Component({
  selector: 'app-addstate',
  templateUrl: './addstate.component.html',
  styleUrls: ['./addstate.component.css']
})
export class AddstateComponent {
  @Input()
  drawerClose!: Function;
  @Input()
  data: StateMaster = new StateMaster();
  @Input()
  dataList: any[] = [];
  @Input()
  data2: StateMaster[] = [];
  @Input()
  drawerVisible: boolean = false;
  isSpinning = false;
  isOk = true;

  namepatt = /^([^0-9]*)$/;
  pinpatt = /^-?(0|[1-9]\d*)?$/;
  onlynumber = /^[0-9]*$/;

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService,
  ) { }

  ngOnInit(): void { 
    this.getCountyData();
  }
  // For Accepting Only Alphabits/ Character

  alphaOnly(event: any) {
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (
      charCode > 32 &&
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)
    ) {
      return false;
    }
    return true;
  }

  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  close(): void {
    this.drawerClose();
  }

  countryData: any = [];
  getCountyData() {
    this.api.getAllCountryMaster(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.countryData = data["data"];          
        } else {
          this.countryData = [];
          this.message.error("Failed To Get Country Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

  save(addNew: boolean, StateMasterPage: NgForm): void {
    this.isOk = true;
    if (
      (this.data.COUNTRY_ID == undefined || this.data.COUNTRY_ID == null) &&
      (this.data.NAME == undefined || this.data.NAME == "" || this.data.NAME.trim() == "") 
      // && (this.data.SHORT_CODE == undefined || this.data.SHORT_CODE == "" || this.data.SHORT_CODE.trim() == "")
    ) {
      this.isOk = false;
      this.message.error("Please Fill All The Required Fields ", "");
    }
    else if(this.data.COUNTRY_ID == undefined || this.data.COUNTRY_ID == null){
      this.isOk = false;
      this.message.error('Please Select Country', '');
    }
    else if(this.data.NAME == undefined || this.data.NAME == "" || this.data.NAME.trim() == ""){
      this.isOk = false;
      this.message.error('Please Enter State Name', '');
    }
    // else if (this.data.SHORT_CODE == null || this.data.SHORT_CODE == "") {
    //   this.isOk = false;
    //   this.message.error('Please Enter Short Code', '');
    // }
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateState(this.data).subscribe((successCode) => {
            if (successCode.code == '200') {
              this.message.success('Information Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Information Not Updated', '');
              this.isSpinning = false;
            }
          });
        } else {          
          this.api.createState(this.data).subscribe((successCode) => {
            if (successCode.code == '200') {
              this.message.success('Information Saved Successfully', '');
              this.isSpinning = false;
              if (!addNew) this.drawerClose();
              else {
                this.resetDrawer(StateMasterPage);
                this.data = new StateMaster();
              }
              this.isSpinning = false;
            } else {
              this.message.error('Information Not Saved', '');
              this.isSpinning = false;
            }
          });
        }
      }
    }
  }

  stateSeq(): void {
    this.api.getState(1, 1, 'SEQ_NO', 'desc', '').subscribe(data => {
      if (data['count'] == 0) {
        this.data.SEQ_NO = 1;
      } else {
        this.data.SEQ_NO = Number(data['data'][0]['SEQ_NO']) + 1;
        this.data.IS_ACTIVE = true;
      }
    }, err => {
      console.log(err);
    })
  }

  resetDrawer(StateMasterPage: NgForm) {
    this.data = new StateMaster();
    StateMasterPage.form.markAsPristine();
    StateMasterPage.form.markAsUntouched();
    this.stateSeq()
  }

}
