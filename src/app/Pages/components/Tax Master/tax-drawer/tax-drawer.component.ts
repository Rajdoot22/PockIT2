import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TaxMasterData } from 'src/app/Pages/Models/TaxmasterData';
// import { TaxMasterData } from 'src/app/Pages/Models/TaxmasterData';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-tax-drawer',
  templateUrl: './tax-drawer.component.html',
  styleUrls: ['./tax-drawer.component.css']
})
export class TaxDrawerComponent {


  isSpinning = false;
  isOk = true;

  ngOnInit(): void
  {


  }

  public commonFunction = new CommonFunctionService();
  @Input() data: any = TaxMasterData;
  @Input()
  drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService
  ) {}

  resetDrawer(Taxmaster: NgForm) {
    this.data = new TaxMasterData();
    Taxmaster.form.markAsPristine();
    Taxmaster.form.markAsUntouched();
  }


  save(addNew: boolean, Taxmaster: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
          (this.data.NAME == '' ||
          this.data.NAME == null ||
          this.data.NAME == undefined) &&
          (this.data.SHORT_CODE == '' ||
          this.data.SHORT_CODE == null ||
          this.data.SHORT_CODE == undefined)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    }    else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME == ''
    ) {
      this.isOk = false;
      this.message.error('Please Enter Tax Name.', '');
    }
    else if (
      this.data.SHORT_CODE == null ||
      this.data.SHORT_CODE == undefined ||
      this.data.SHORT_CODE.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Short Code.', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateTax(this.data).subscribe((successCode: any) => {
            if (successCode.code == 200) {
              this.message.success('Tax Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Tax Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createTax(this.data).subscribe(
            (successCode: any) => {
              if (successCode.code === 200) {
                this.message.success('Tax Created Successfully', '');
                if (!addNew) {
                  this.drawerClose();
                } else {
                  this.data = new TaxMasterData();
                  this.resetDrawer(Taxmaster);
                }
              } else {
                this.message.error('Tax Creation Failed', '');
              }
              this.isSpinning = false;
            },
            (error) => {
              this.message.error('An error occurred while creating the Tax.', '');
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
