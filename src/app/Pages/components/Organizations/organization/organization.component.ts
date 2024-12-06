import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { OrganizationMaster } from 'src/app/Pages/Models/organization-master';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  providers: [DatePipe]
})

export class OrganizationComponent implements OnInit {
  @Input() drawerClose: Function;
  @Input() data: OrganizationMaster;
  @Input() drawerVisible: boolean;
  passwordVisible: boolean = false;
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
    this.data = new OrganizationMaster();
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
    console.log(this.data)
    if (this.data.NAME == undefined && this.data.EMAIL_ID == undefined
      && this.data.PASSWORD == undefined  && this.data.ADDRESS == undefined
      && this.data.COUNTRY_ID == undefined && this.data.STATE_ID == undefined && this.data.CITY_ID == undefined && this.data.PINCODE_ID == undefined) {
      this.isOk = false
      this.message.error('Please fill all required details', '')
    }
    else if (this.data.NAME == undefined || this.data.NAME == '') {
      this.isOk = false;
      this.message.error("Please Enter Organization Name", '');
    }

    else if (this.data.NAME != undefined && this.data.NAME.trim() != '') {
      if (!this.namepatte.test(this.data.NAME.toString())) {
        this.isOk = false;
        this.message.error("Please Enter Valid Organization Name", '');
      }

    }

    else if (this.data.EMAIL_ID == undefined || this.data.EMAIL_ID == '') {
      this.isOk = false;
      this.message.error("Please Enter Email-Id", '');
    }
    else if (this.data.EMAIL_ID != null && this.data.EMAIL_ID != undefined) {
      if (!this.emailpattern.test(this.data.EMAIL_ID)) {
        this.isOk = false;
        this.message.error("Please Enter Valid Email-Id", '');
      }

    }


    else if (this.data.PASSWORD != null && this.data.PASSWORD != undefined) {
      if (!this.passpattern.test(this.data.PASSWORD.toString())) {
        this.isOk = false;
        this.message.error("Please Enter valid Password", '');
      }

    }
    else if (this.data.PASSWORD == undefined || this.data.PASSWORD == '') {
      this.isOk = false;
      this.message.error("Please Enter Password", '');
    }


    else if (this.data.ADDRESS == undefined || this.data.ADDRESS == '') {
      this.isOk = false;
      this.message.error("Please Enter Address ", '');
    }

    else if (this.data.COUNTRY_ID == undefined || this.data.COUNTRY_ID == '') {
      this.isOk = false;
      this.message.error("Please Enter City", '');
    }
    else if (this.data.STATE_ID == undefined || this.data.STATE_ID == '') {
      this.isOk = false;
      this.message.error("Please Select State", '');
    }


    else if (this.data.CITY_ID == undefined || this.data.CITY_ID == '') {
      this.isOk = false;
      this.message.error("Please Enter City", '');
    }
    else if (this.data.PINCODE_ID == undefined) {
      this.isOk = false;
      this.message.error("Please Enter Pincode", '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      this.orgId = this.cookie.get('orgId');

      if (this.data.ID) {

        this.api.updateOrganization(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.message.success("Oraganization Information Updated Successfully", "");

            if (!addNew)
              this.drawerClose();

            this.isSpinning = false;
            this.resetDrawer(accountMasterPage);

          } else {
            this.message.error("Oraganization Information Updation Failed", "");
            this.isSpinning = false;
          }
        });



      } else {

        this.api.createOrganization(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.isSpinning = false;
            this.message.success("Oraganization Information saved Successfully", "");

            if (!addNew) {
              this.drawerClose();
              this.resetDrawer(accountMasterPage);

            } else {
              this.data = new OrganizationMaster();
              this.resetDrawer(accountMasterPage);
            }

          } else {
            this.message.error("Oraganization Information Information Failed", "");
            this.isSpinning = false;
          }
        });

      }
    }
  }
 
  City1: any = []
  getCityyy1(event: any) { 
    var filter = ' AND IS_ACTIVE = 1 AND STATE_ID = ' + event;

    this.api.getAllCityMaster(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.City1 = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  state: any = []
  country: any = []
  pincode: any = []
  getstate(event: any) {
    this.data.STATE_ID = 0;
    var filter = ' AND IS_ACTIVE = 1 AND COUNTRY_ID = ' + event;

    this.api.getAllStateMaster(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.state = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  getCountry() {

    this.api.getAllCountryMaster(0, 0, '', '', ' AND IS_ACTIVE = 1').subscribe(
      (forms) => {
        this.country = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }
  getpincode(event: any) {
    this.data.PINCODE_ID = 0;
    var filter = ' AND IS_ACTIVE = 1 AND CITY_ID = ' + event;

    this.api.getAllPincode(0, 0, '', '', filter).subscribe(
      (forms) => {
        this.pincode = forms['data'];
        this.isSpinning = false;
      },
      (err) => {
        this.isSpinning = false;
      }
    );
  }

}
