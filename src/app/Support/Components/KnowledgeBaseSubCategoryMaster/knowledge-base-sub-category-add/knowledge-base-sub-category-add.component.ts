import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';
import { KnowledgeBaseSubCategory } from 'src/app/Support/Models/KnowledgeBaseSubCategory';

@Component({
  selector: 'app-knowledge-base-sub-category-add',
  templateUrl: './knowledge-base-sub-category-add.component.html',
  styleUrls: ['./knowledge-base-sub-category-add.component.css']
})
export class KnowledgeBaseSubCategoryAddComponent {
  @Input() data: any = KnowledgeBaseSubCategory;
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
    this.data = new KnowledgeBaseSubCategory();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  ngOnInit(){
    this.getcategoryData();
  }
  CategoryData: any = [];
  getcategoryData() {
    this.api.getKnowledgeBaseCategoryData(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.CategoryData = data["data"];
        } else {
          this.CategoryData = [];
          this.message.error("Failed To Get Knowledge Base Category Data", "");
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
      (this.data.NAME == ' ' ||
        this.data.NAME == null ||
        this.data.NAME == undefined) &&
      (this.data.KNOWLEDGEBASE_CATEGORY_ID == undefined ||
        this.data.KNOWLEDGEBASE_CATEGORY_ID == null ||
        this.data.KNOWLEDGEBASE_CATEGORY_ID == 0) 
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    } 
    else if (
      this.data.KNOWLEDGEBASE_CATEGORY_ID == null ||
      this.data.KNOWLEDGEBASE_CATEGORY_ID == undefined ||
      this.data.KNOWLEDGEBASE_CATEGORY_ID == 0
    ) {
      this.isOk = false;
      this.message.error('Please Select Knowledge Base Category.', '');
    } 
    else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Knowledge Base Subcategory Name.', '');
    }
 
  
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateKnowledgeBasesubCategoryData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Subcategory Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Knowledge Base Subcategory Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createKnowledgeBasesubCategoryData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Subcategory Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new KnowledgeBaseSubCategory();
                this.resetDrawer(websitebannerPage);
              }
              this.isSpinning = false;
            } else {
              this.message.error(' Knowledge Base Subcategory Creation Failed', '');
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
