import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';
import { KnowledgeBaseCategory } from 'src/app/Support/Models/KnowledgeBaseCategory';

@Component({
  selector: 'app-konwledge-base-category-add',
  templateUrl: './konwledge-base-category-add.component.html',
  styleUrls: ['./konwledge-base-category-add.component.css']
})
export class KonwledgeBaseCategoryAddComponent {
  @Input() data: any = KnowledgeBaseCategory;
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
    this.data = new KnowledgeBaseCategory();
    websitebannerPage.form.markAsPristine();
    websitebannerPage.form.markAsUntouched();
  }

  save(addNew: boolean, websitebannerPage: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Knowledge Base Category Name.', '');
    }
    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateKnowledgeBaseCategoryData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Category Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Knowledge Base Category Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createKnowledgeBaseCategoryData(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Knowledge Base Category Created Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new KnowledgeBaseCategory();
                this.resetDrawer(websitebannerPage);
              }
              this.isSpinning = false;
            } else {
              this.message.error(' Knowledge Base Category Creation Failed', '');
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
