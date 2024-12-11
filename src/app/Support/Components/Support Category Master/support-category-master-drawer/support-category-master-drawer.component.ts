import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';
import { SupportCategory } from 'src/app/Support/Models/SupportCategory';

@Component({
  selector: 'app-support-category-master-drawer',
  templateUrl: './support-category-master-drawer.component.html',
  styleUrls: ['./support-category-master-drawer.component.css']
})
export class SupportCategoryMasterDrawerComponent {
  @Input() data: any = SupportCategory;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  public commonFunction = new CommonFunctionService();

  isSpinning = false;
  isOk = true;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
  ) {}
  resetDrawer(websitebannerPage: NgForm) {
    this.data = new SupportCategory();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  save(addNew: boolean, websitebannerPage: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
    (  this.data.CATEGORY_NAME == null ||
      this.data.CATEGORY_NAME == undefined ||
      this.data.CATEGORY_NAME.trim() == '') &&
      (
        this.data.DESCRIPTION == null ||
        this.data.DESCRIPTION == undefined ||
        this.data.DESCRIPTION.trim() == ''
      )
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields .', '');
    }
   else if (
      this.data.CATEGORY_NAME == null ||
      this.data.CATEGORY_NAME == undefined ||
      this.data.CATEGORY_NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Category Nmae.', '');
    }
   else if (
      this.data.DESCRIPTION == null ||
      this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Description.', '');
    }

    
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.UpdateCustomersupport(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Support Category Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Support Category Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.CreateCustomersupport(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Support Category Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new SupportCategory();
                this.resetDrawer(websitebannerPage);
              }
              this.isSpinning = false;
            } else {
              this.message.error('Support Category Creation Failed', '');
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
