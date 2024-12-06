import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormMaster } from 'src/app/CommonModels/form-master';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-master-menu-list',
  templateUrl: './master-menu-list.component.html',
  styleUrls: ['./master-menu-list.component.css'],
})
export class MasterMenuListComponent implements OnInit {
  loadingRecords = true;
  forms: any[] = [];
  public commonFunction = new CommonFunctionService()

  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) { }

  ngOnInit() {
    this.loadForms();
  }

  roleId = sessionStorage.getItem('roleId');
  decreptedroleIdString = this.roleId ? this.commonFunction.decryptdata(this.roleId) : '';
  decreptedroleId = parseInt(this.decreptedroleIdString, 10);

  titleWiseChildren: Record<string, any[]> = {};

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }


  loadForms() {
    this.api.getForms(this.decreptedroleId).subscribe(
      (data) => {

        //   this.forms = data['data'].sort((a, b) => a.SEQ_NO - b.SEQ_NO);

        //   // Create an object that maps each title to its corresponding children
        //   this.titleWiseChildren = this.forms.reduce((acc, item) => {
        //     // Sort children by SEQ_NO
        //     const sortedChildren = item.children?.sort((a, b) => a.SEQ_NO - b.SEQ_NO) || [];
        //     acc[item.title] = sortedChildren; // Associate title with its sorted children
        //     return acc;
        //   }, {});

        //   console.log('Title Wise Children:', this.titleWiseChildren);
        // },
        // () => {
        //   this.message.error('Something Went Wrong ...', '');
        // }

        if (data['code'] == 200 && data['data']) {
          this.loadingRecords = false;
          this.forms = data['data'].sort((a, b) => a.SEQ_NO - b.SEQ_NO);

          // Create an object that maps each title to its corresponding children
          this.titleWiseChildren = this.forms.reduce((acc, item) => {
            // Sort children by SEQ_NO
            const sortedChildren = item.children?.sort((a, b) => a.SEQ_NO - b.SEQ_NO) || [];
            acc[item.title] = sortedChildren; // Associate title with its sorted children
            return acc;
          }, {});
        } else {
          this.forms = [];
          this.message.error('Something Went Wrong', '');
          this.loadingRecords = false;
        }
      },
      (err: HttpErrorResponse) => {
        this.loadingRecords = false;
        if (err.status === 0) {
          this.message.error(
            "Network error: Please check your internet connection.",
            ""
          );
        } else {
          this.message.error("Something Went Wrong.", "");
        }
      }
    );
  }

}
