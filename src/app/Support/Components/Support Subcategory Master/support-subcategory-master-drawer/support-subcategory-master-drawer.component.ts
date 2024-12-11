import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';
import { SupportsubCategory } from 'src/app/Support/Models/supportsubcategory';

@Component({
  selector: 'app-support-subcategory-master-drawer',
  templateUrl: './support-subcategory-master-drawer.component.html',
  styleUrls: ['./support-subcategory-master-drawer.component.css']
})
export class SupportSubcategoryMasterDrawerComponent {



  @Input() data: any = SupportsubCategory;
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
    this.data = new SupportsubCategory();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  ngOnInit(){
    this.getSupportcategoryData();
  }
  SupportCategoryData: any = [];
  getSupportcategoryData() {
    this.api.getCustomerSupport(0, 0, "", "", "AND STATUS = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.SupportCategoryData = data["data"];
        } else {
          this.SupportCategoryData = [];
          this.message.error("Failed To Get Support Category Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  save(addNew: boolean, websitebannerPage: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    
    if (
      (this.data.SUB_CATEGORY_NAME == ' ' ||
        this.data.SUB_CATEGORY_NAME == null ||
        this.data.SUB_CATEGORY_NAME == undefined) &&
      (this.data.CATEGORY_ID == undefined ||
        this.data.CATEGORY_ID == null ||
        this.data.CATEGORY_ID == 0) 
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    } 
    else if (
      this.data.CATEGORY_ID == null ||
      this.data.CATEGORY_ID == undefined ||
      this.data.CATEGORY_ID == 0
    ) {
      this.isOk = false;
      this.message.error('Please Select Support Category.', '');
    } 
    else if (
      this.data.SUB_CATEGORY_NAME == null ||
      this.data.SUB_CATEGORY_NAME == undefined ||
      this.data.SUB_CATEGORY_NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Support Subcategory Name.', '');
    }
 
  
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateSupportSubcategory(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Support Subcategory Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Support Subcategory Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createSupportSubcategory(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Support SubCategory Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new SupportsubCategory();
                this.resetDrawer(websitebannerPage);
              }
              this.isSpinning = false;
            } else {
              this.message.error(' Support Subcategory Creation Failed', '');
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











































































  // @Input() data: any = SupportsubCategory;
  // @Input() drawerVisible: boolean = false;
  // @Input() drawerClose: any = Function;

  // public commonFunction = new CommonFunctionService();

  // isSpinning = false;
  // isOk = true;

  // constructor(
  //   private message: NzNotificationService,
  //   private api: ApiServiceService,
  // ) {}
  // resetDrawer(websitebannerPage: NgForm) {
  //   this.data = new SupportsubCategory();
  //   websitebannerPage.form.markAsPristine();
  //   websitebannerPage.form.markAsUntouched();
  // }

  // ngOnInit(){
  //   this.getSupportcategoryData();
  // }
  // SupportCategoryData: any = [];
  // getSupportcategoryData() {
  //   this.api.getCustomersupport(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
  //     (data) => {
  //       if (data["code"] == 200) {
  //         this.SupportCategoryData = data["data"];
  //       } else {
  //         this.SupportCategoryData = [];
  //         this.message.error("Failed To get Support Sub category Data", "");
  //       }
  //     },
  //     () => {
  //       this.message.error("Something Went Wrong", "");
  //     }
  //   );
  // }
  // save(addNew: boolean, websitebannerPage: NgForm): void {
  //   this.isSpinning = false;
  //   this.isOk = true;
    
  //   if (
  //     (this.data.SUB_CATEGORY_NAME == ' ' ||
  //       this.data.SUB_CATEGORY_NAME == null ||
  //       this.data.SUB_CATEGORY_NAME == undefined) &&
  //     (this.data.CATEGORY_ID == undefined ||
  //       this.data.CATEGORY_ID == null ||
  //       this.data.CATEGORY_ID == 0) 
  //   ) {
  //     this.isOk = false;
  //     this.message.error('Please Fill All The Required Fields ', '');
  //   } 
  //   else if (
  //     this.data.CATEGORY_ID == null ||
  //     this.data.CATEGORY_ID == undefined ||
  //     this.data.CATEGORY_ID == 0
  //   ) {
  //     this.isOk = false;
  //     this.message.error('Please Select Support Category.', '');
  //   } 
  //   else if (
  //     this.data.SUB_CATEGORY_NAME == null ||
  //     this.data.SUB_CATEGORY_NAME == undefined ||
  //     this.data.SUB_CATEGORY_NAME.trim() == ''
  //   ) {
  //     this.isOk = false;
  //     this.message.error(' Please Enter Support Subcategory Name.', '');
  //   }
 
  
  //   if (this.isOk) {
  //     this.isSpinning = true;
  //     {
  //       if (this.data.ID) {
  //         this.api.updateSupportSubcategory(this.data).subscribe((successCode: any) => {
  //           if (successCode.code == '200') {
  //             this.message.success('Support Subcategory Updated Successfully', '');
  //             if (!addNew) this.drawerClose();
  //             this.isSpinning = false;
  //           } else {
  //             this.message.error('Support Subcategory Updation Failed', '');
  //             this.isSpinning = false;
  //           }
  //         });
  //       } else {
  //         this.api.createSupportSubcategory(this.data).subscribe((successCode: any) => {
  //           if (successCode.code == '200') {
  //             this.message.success('Support Subcategory Created Successfully', '');
  //             if (!addNew) this.drawerClose();
  //             else {
  //               this.data = new SupportsubCategory();
  //               this.resetDrawer(websitebannerPage);
  //             }
  //             this.isSpinning = false;
  //           } else {
  //             this.message.error(' Support Subcategory Creation Failed', '');
  //             this.isSpinning = false;
  //           }
  //         });
  //       }
  //     }
  //   }
  // }

  // close() {
  //   this.drawerClose();
  // }
}
