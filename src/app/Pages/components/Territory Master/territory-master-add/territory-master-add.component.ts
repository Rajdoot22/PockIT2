import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TerritoryMaster } from 'src/app/Pages/Models/TerritoryMaster';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService'; 

@Component({
  selector: 'app-territory-master-add',
  templateUrl: './territory-master-add.component.html',
  styleUrls: ['./territory-master-add.component.css']
})
export class TerritoryMasterAddComponent {
  @Input() data: any = TerritoryMaster;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;
  public commonFunction = new CommonFunctionService();

  isSpinning = false;
  isOk = true;
  
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService
  ) {}

  resetDrawer(teritorymaster: NgForm) {
    this.data = new TerritoryMaster();
    teritorymaster.form.markAsPristine();
    teritorymaster.form.markAsUntouched();
  }
  ngOnInit(){
    this.getBranchData();
    // this.getCityData();
    // this.getStateData();
    this.getCountryData();
  }

  branchData: any = [];
  getBranchData() {
    this.api.getAllBranch(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.branchData = data['data'];
        } else {
          this.branchData = [];
          this.message.error('Failed To Get Branch Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  // cityData: any = [];
  // getCityData() {
  //   this.api.getCityData(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
  //     (data) => {
  //       if (data['code'] == 200) {
  //         this.cityData = data['data'];
  //       } else {
  //         this.cityData = [];
  //         this.message.error('Failed To Get City Data', '');
  //       }
  //     },
  //     () => {
  //       this.message.error('Something Went Wrong', '');
  //     }
  //   );
  // }

  // stateData: any = [];
  // getStateData() {
  //   this.api.getStateData(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
  //     (data) => {
  //       if (data['code'] == 200) {
  //         this.stateData = data['data'];
  //       } else {
  //         this.stateData = [];
  //         this.message.error('Failed To Get State Data', '');
  //       }
  //     },
  //     () => {
  //       this.message.error('Something Went Wrong', '');
  //     }
  //   );
  // }

  countryData: any = [];
  getCountryData() {
    this.api.getAllCountryMaster(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.countryData = data['data'];
        } else {
          this.countryData = [];
          this.message.error('Failed To Get Country Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }
  save(addNew: boolean, teritorymaster: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    console.log(this.data.IS_EXPRESS_SERVICE_AVAILABLE);
    
    if (
      (this.data.NAME.trim() == '' ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.BRANCH_ID == undefined ||
        this.data.BRANCH_ID == null ||
        this.data.BRANCH_ID == 0) &&
            (this.data.COUNTRY_ID == undefined ||
              this.data.COUNTRY_ID == null ||
              this.data.COUNTRY_ID == 0) &&
      (this.data.SEQ_NO == undefined ||
        this.data.SEQ_NO == null ||
        this.data.SEQ_NO == 0)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    } else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Territory Name.', '');
    }
    else if (
      this.data.BRANCH_ID == null ||
      this.data.BRANCH_ID == undefined ||
      this.data.BRANCH_ID == ''
    ) {
      this.isOk = false;
      this.message.error('Please Select Branch.', '');
    } 
    else if (
      this.data.COUNTRY_ID == null ||
      this.data.COUNTRY_ID == undefined ||
      this.data.COUNTRY_ID == ''
    ) {
      this.isOk = false;
      this.message.error('Please Select Country.', '');
    } 
  
   
  
     else if (
      this.data.SEQ_NO == null ||
      this.data.SEQ_NO == undefined ||
      this.data.SEQ_NO == 0
    ) {
      this.isOk = false;
      this.message.error('Please Enter Sequence No.', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
    console.log(this.data.IS_EXPRESS_SERVICE_AVAILABLE,'this.data.IS_EXPRESS_SERVICE_AVAILABLE1');

          this.api.updateTerritory(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Teritory Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Teritory Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createTerritory(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Teritory Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new TerritoryMaster();
                this.resetDrawer(teritorymaster);

                this.api.getTeritory(1, 1, 'SEQ_NO', 'desc', '').subscribe(
                  (data) => {
                    if (data['code'] == 200) {
                      if (data['count'] == 0) {
                        this.data.SEQ_NO = 1;
                      } else {
                        this.data.SEQ_NO = data['data'][0]['SEQ_NO'] + 1;
                      }
                    } else {
                      this.message.error('Server Not Found', '');
                    }
                  },
                  () => {}
                );
              }
              this.isSpinning = false;
            } else {
              this.message.error(' Teritory Creation Failed', '');
              this.isSpinning = false;
            }
          });
        }
      }
    }
  }

  close() {
    this.drawerClose();
  }
}
