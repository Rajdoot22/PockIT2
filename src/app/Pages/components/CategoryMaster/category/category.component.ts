import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CookieService } from 'ngx-cookie-service';  
import { category } from 'src/app/Pages/Models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  @Input() drawerClose: Function;
  @Input() data: category;
  @Input() drawerVisible: boolean; 
  Parentcategories:any=[] 
  orgId = this.cookie.get('orgId');
  loadingRecords = true;
  isSpinning = false;
  isOk = true;
  namepatt = /[a-zA-Z][a-zA-Z ]+/; 
   
  onlynum = /^[0-9]*$/
  onlychar = /^[a-zA-Z ]*$/ 
   
  imgUrl
 

  constructor(private api: ApiServiceService, private cookie: CookieService, private datePipe: DatePipe, private message: NzNotificationService) {
  }

  ngOnInit() { 
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
    this.data = new category();
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();

  }


  save(addNew: boolean, accountMasterPage: NgForm): void {
    this.isOk = true;
    if ( this.data.CATEGORY_NAME == undefined
      && this.data.DESCRIPTION== undefined && this.data.CATEGORY_IMAGE == undefined ) {
     this.isOk = false
     this.message.error('Please fill all required details', '')
   }
 
  else if(this.data.CATEGORY_NAME == undefined || this.data.CATEGORY_NAME==''){
    this.isOk=false
    this.message.error('Please Enter Category Name', '')
  }
 
  


    if (this.isOk) {
      this.isSpinning = true;
      this.orgId = this.cookie.get('orgId');

      if (this.data.ID) {

        this.api.updateCategory(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.message.success("Category Information Updated Successfully", "");

            if (!addNew)
              this.drawerClose();

            this.isSpinning = false;
            this.resetDrawer(accountMasterPage);

          } else {
            this.message.error("Category Inforamtion Updation Failed", "");
            this.isSpinning = false;
          }
        });



      } else {

        this.api.createCategory(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.isSpinning = false;
            this.message.success("Category Information saved  Successfully", "");

            if (!addNew) {
              this.drawerClose();
              this.resetDrawer(accountMasterPage);

            } else {
              this.data = new category();
              this.resetDrawer(accountMasterPage);
            }
 
          } else {
            this.message.error("Cannot save Category Information", "");
            this.isSpinning = false;
          }
        });

      }
    }
  }
  image
  IMAGE
  onFileSelected(event: any) {

    const reader = new FileReader();
    const [file] = event.target.files;
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.image = reader.result as string;
    };
    this.imgUrl = <File>event.target.files[0];
    var number = Math.floor(100000 + Math.random() * 900000);
    var fileExt = this.imgUrl.name.split('.').pop();
    var d = this.datePipe.transform(new Date(), 'yyyyMMdd');
    var url = '';
    url = d == null ? '' : d + number + '.' + fileExt;
    if (this.data.CATEGORY_IMAGE  != undefined && this.data.CATEGORY_IMAGE.trim() != '') {
      var arr = this.data.CATEGORY_IMAGE.split('/');
      if (arr.length > 1) {
        url = arr[5];
      }
    }
    this.IMAGE = url;

    this.isSpinning = true;
    // this.api
    //   .onImageUpload(' ', this.imgUrl, url)
    //   .subscribe((successCode) => {
    //     if (successCode.code == '200') {

    //       this.message.success('Image Uploaded Successfully', '');
    //       this.isSpinning = false;
    //     }
    //     (err) => {
    //       if (err['ok'] == false)
    //         this.message.error('Failed to Upload the Image', '');
    //     };
    //   });

  }
  fileURL
  removeImage() {
    this.data.CATEGORY_IMAGE = null;
    this.imgUrl = null;
    this.IMAGE = ''
  }
  alphaOnly(event) {
    event = (event) ? event : window.event;
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
}
