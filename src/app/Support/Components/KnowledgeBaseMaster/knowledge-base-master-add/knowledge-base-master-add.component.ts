import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';
import { KnowledgeBaseMaster } from 'src/app/Support/Models/KnowledgeBaseMaster';

@Component({
  selector: 'app-knowledge-base-master-add',
  templateUrl: './knowledge-base-master-add.component.html',
  styleUrls: ['./knowledge-base-master-add.component.css']
})
export class KnowledgeBaseMasterAddComponent {
  @Input() data: any = KnowledgeBaseMaster;
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
    this.data = new KnowledgeBaseMaster();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  ngOnInit(){
    this.getsubcategoryData();
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

  SubcategoryData: any = [];
  getsubcategoryData() {
    this.api.getKnowledgeBasesubCategoryData(0, 0, "", "", "AND IS_ACTIVE = 1").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.SubcategoryData = data["data"];
        } else {
          this.SubcategoryData = [];
          this.message.error("Failed To Get Knowledge Base Subcategory Data", "");
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
      (this.data.TITLE == ' ' ||
        this.data.TITLE == null ||
        this.data.TITLE == undefined) &&
      (this.data.KNOWLEDGE_SUB_CATEGORY_ID == undefined ||
        this.data.KNOWLEDGE_SUB_CATEGORY_ID == null ||
        this.data.KNOWLEDGE_SUB_CATEGORY_ID == 0)  &&
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
      this.data.KNOWLEDGE_SUB_CATEGORY_ID == null ||
      this.data.KNOWLEDGE_SUB_CATEGORY_ID == undefined ||
      this.data.KNOWLEDGE_SUB_CATEGORY_ID == 0
    ) {
      this.isOk = false;
      this.message.error('Please Select Knowledge Base Subcategory.', '');
    } 
    else if (
      this.data.TITLE == null ||
      this.data.TITLE == undefined ||
      this.data.TITLE.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Title.', '');
    }
 
  
    if (this.isOk) {
      this.isSpinning = true;
      this.data.DESCRIPTION = JSON.stringify(this.data.DESCRIPTION);
      {
        if (this.data.ID) {
          this.api.updateKnowledgeBaseData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Knowledge Base Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createKnowledgeBaseData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new KnowledgeBaseMaster();
                this.resetDrawer(websitebannerPage);
              }
              this.isSpinning = false;
            } else {
              this.message.error(' Knowledge Base Creation Failed', '');
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    placeholder: 'Enter Description',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    // toolbarHiddenButtons: [
    //   ['bold']
    //   ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
