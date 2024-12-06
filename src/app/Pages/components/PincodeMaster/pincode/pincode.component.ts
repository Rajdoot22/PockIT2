import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CookieService } from 'ngx-cookie-service'; 
import { pincode } from 'src/app/Pages/Models/pincode';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent {
  @Input() drawerClose: Function;
  @Input() data: pincode;
  @Input() drawerVisible: boolean;

  listdata1 = [];
  listdata2 = [];
  orgId = this.cookie.get('orgId');
  loadingRecords = true;
  isSpinning = false;
  isOk = true;
  emailpattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  namepatt = /^[a-zA-Z \-\']+/
  mobpattern = /^[6-9]\d{9}$/
  onlynum = /^[0-9]*$/
  onlychar = /^[a-zA-Z ]*$/
  longitudepattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
  latitudepattern = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
  pat1 = /^\d{6}$/;
  namepattern = /[a-zA-Z][a-zA-Z ]+/
  cityRegex = /^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$/;
  aaddpattern = /^[a-zA-Z0-9\s,'-]*$/
  namepatte = /[ .a-zA-Z]+/
  passpattern = /^([A-Za-z0-9@#\s]){8,}$/
  imgUrl
  time
  time1
  time2
  date

  constructor(private api: ApiServiceService, private cookie: CookieService, private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() { 
    this.getCountry() 
  }

  omit(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }

  close(accountMasterPage: NgForm) {
    this.drawerClose();
    this.resetDrawer(accountMasterPage);
  }

  resetDrawer(accountMasterPage: NgForm) {
    this.data = new pincode();
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();
    this.add();
  }

  add(): void {
    // this.api.getAllDesignation(1,1,'STATUS','desc', ' AND  ORG_ID ='+ this.orgId).subscribe (data =>{
    //   if (data['count']==0){
    //     this.data.STATUS=true;
    //   }else
    //   {
    //     this.data.STATUS=true;
    //   }
    // },err=>{
    //   console.log(err);
    // })
  }

 
 
 

  save(addNew: boolean, accountMasterPage: NgForm): void {
    this.isOk = true;
    if (this.data.STATE_ID == undefined && this.data.COUNTRY_ID == undefined
      && this.data.PINCODE== undefined ) {
     this.isOk = false
     this.message.error('Please fill all required details', '')
   }
   else if(this.data.COUNTRY_ID==undefined||this.data.COUNTRY_ID==''){
    this.isOk = false;
    this.message.error("Please Select Country", '');
   }

   else if(this.data.STATE_ID==undefined||this.data.STATE_ID==''){
    this.isOk = false;
    this.message.error("Please Select State", '');
   }
   else if(this.data.PINCODE==undefined||this.data.PINCODE==''){
    this.isOk = false;
    this.message.error("Please Select Pincode", '');
   }

    


    if (this.isOk) {
      this.isSpinning = true;
      this.orgId = this.cookie.get('orgId');

      if (this.data.ID) {

        this.api.updatePincode(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.message.success("Pincode Information Updated Successfully", "");

            if (!addNew)
              this.drawerClose();

            this.isSpinning = false;
            this.resetDrawer(accountMasterPage);

          } else {
            this.message.error("Pincode Information Updation Failed", "");
            this.isSpinning = false;
          }
        });



      } else {

        this.api.createPincode(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.isSpinning = false;
            this.message.success("Pincode Information Saved Successfully", "");

            if (!addNew) {
              this.drawerClose();
              this.resetDrawer(accountMasterPage);

            } else {
              this.data = new pincode();
              this.resetDrawer(accountMasterPage);
            }
 
          } else {
            this.message.error("Cannot save Pincode Information", "");
            this.isSpinning = false;
          }
        });

      }
    }
  }
  state:any=[]
  getstates(event) {
    this.api.getAllStateMaster(0, 0, '', '', 'AND IS_ACTIVE = 1 AND COUNTRY_ID ='+event).subscribe(data => {
      this.state = data['data']
    },)
  }
  CountryList:any=[]
 
  getCountry() {
    this.api.getAllCountryMaster(0, 0, '', '', 'AND IS_ACTIVE = 1').subscribe(data => {
      this.CountryList = data['data']
    },)
  }
}
