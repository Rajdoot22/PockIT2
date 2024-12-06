import { Component, OnInit, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CookieService } from 'ngx-cookie-service';    
import { subcategory } from 'src/app/Pages/Models/subcategory';
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent {
  @Input() drawerClose: Function;
  @Input() data: subcategory;
  @Input() drawerVisible: boolean; 
  Parentcategories:any=[] 
  orgId = this.cookie.get('orgId');
  loadingRecords = true;
  isSpinning = false;
  isOk = true;
 
  onlynum = /^[0-9]*$/
  onlychar = /^[a-zA-Z ]*$/
  namepatt = /[a-zA-Z][a-zA-Z ]+/; 
 
  imgUrl
  categories:any=[]

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
    this.data = new subcategory();
    accountMasterPage.form.markAsPristine();
    accountMasterPage.form.markAsUntouched();

  }


  save(addNew: boolean, accountMasterPage: NgForm): void {
    this.isOk = true;
    if (this.data.CATEGORY_ID == undefined
      && this.data.DESCRIPTION== undefined && this.data.NAME == undefined ) {
     this.isOk = false
     this.message.error('Please fill all required details', '')
   }
  else if(this.data.CATEGORY_ID == undefined || this.data.CATEGORY_ID==''){
    this.isOk=false
    this.message.error('Please select   category', '')
  }
  else if(this.data.NAME == undefined || this.data.NAME==''){
    this.isOk=false
    this.message.error('Please Enter Subcategory Name', '')
  }
  else if(this.data.DESCRIPTION == undefined || this.data.DESCRIPTION==''){
    this.isOk=false
    this.message.error('Please Enter Description', '')
  }
  


    if (this.isOk) {
      this.isSpinning = true;
      this.orgId = this.cookie.get('orgId');

      if (this.data.ID) {

        this.api.updatesubCategory(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.message.success("Subcategory Information Updated Successfully", "");

            if (!addNew)
              this.drawerClose();

            this.isSpinning = false;
            this.resetDrawer(accountMasterPage);

          } else {
            this.message.error("Subcategory Inforamtion Updation Failed", "");
            this.isSpinning = false;
          }
        });



      } else {

        this.api.createsubCategory(this.data).subscribe(successCode => {
          if (successCode['code'] == 200) {
            this.isSpinning = false;
            this.message.success("Subcategory Information saved  Successfully", "");

            if (!addNew) {
              this.drawerClose();
              this.resetDrawer(accountMasterPage);

            } else {
              this.data = new subcategory();
              this.resetDrawer(accountMasterPage);
            }
 
          } else {
            this.message.error("Cannot save Subcategory Information", "");
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
    if (this.data.SUBCATEGORY_IMAGE  != undefined && this.data.SUBCATEGORY_IMAGE.trim() != '') {
      var arr = this.data.SUBCATEGORY_IMAGE.split('/');
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
    this.data.SUBCATEGORY_IMAGE = null;
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
