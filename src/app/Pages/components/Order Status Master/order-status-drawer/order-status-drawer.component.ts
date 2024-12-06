import { DatePipe } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderMasterData } from 'src/app/Pages/Models/OrderMasterData';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-order-status-drawer',
  templateUrl: './order-status-drawer.component.html',
  styleUrls: ['./order-status-drawer.component.css']
})
export class OrderStatusDrawerComponent
{

  isSpinning = false;
  isOk = true;
  UrlImageOne;
  progressBarImageOne: boolean = false;
  percentImageOne = 0;
  timer: any;
  urlImageOneShow: boolean = false;
  fileURL: any = "";

  ngOnInit(): void
  {


  }

  public commonFunction = new CommonFunctionService();
  @Input() data: any = OrderMasterData;
  @Input()
  drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}

  resetDrawer(OrderStatusmaster: NgForm) {
    this.data = new OrderMasterData();
    OrderStatusmaster.form.markAsPristine();
    OrderStatusmaster.form.markAsUntouched();
  }


  save(addNew: boolean, OrderStatusmaster: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
          (this.data.NAME == '' ||
          this.data.NAME == null ||
          this.data.NAME == undefined) &&
          (this.data.DESCRIPTION == '' ||
          this.data.DESCRIPTION == null ||
          this.data.DESCRIPTION == undefined)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    }    else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Status Title', '');
    }
    else if (
      this.data.DESCRIPTION == null ||
      this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Description', '');
    }
    else if (
      this.data.ICON == null ||
      this.data.ICON == undefined ||
      this.data.ICON == 0
    ) {
      this.isOk = false;
      this.message.error(' Please Select Icon', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateOrderStatus(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Order Status Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Order Status Not Updated', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createOrderStatus(this.data).subscribe((successCode: any) => {
            if (successCode.code == '200') {
              this.message.success('Order Status Saved Successfully', '');
              if (!addNew) this.drawerClose();
              else {
                this.data = new OrderMasterData();
                this.resetDrawer(OrderStatusmaster);
              }
              this.isSpinning = false;
            } else {
              this.message.error('Order Status Not Saved', '');
              this.isSpinning = false;
            }
          });
        }
      }
    }

    // if (this.isOk) {
    //   this.isSpinning = true;
    //   {
    //     if (this.data.ID) {
    //       if (this.fileURL != null && this.fileURL != "") {
    //       this.timer = this.api
    //       .onUpload("Icons", this.fileURL, this.UrlImageOne)
    //       .subscribe((res) => {
    //         this.data.ICON = this.UrlImageOne;

    //         if (res.type === HttpEventType.Response) {
    //         }

    //           if (res.type == 4 && res.status == 200) {
    //           if (res.body["code"] == 200) {
    //             this.message.success("File Uploaded Successfully...", "");
    //             console.log(this.data.ICON,'this.data.ICON');
    //             this.isSpinning = false;
    //             this.data.ICON = this.UrlImageOne;


    //       this.api
    //         .updateOrderStatus(this.data)
    //         .subscribe((successCode: any) => {
    //           if (successCode.code == "200") {
    //             this.message.success(
    //               "Order Status Updated Successfully",
    //               ""
    //             );
    //             if (!addNew) this.drawerClose();
    //             this.isSpinning = false;
    //           } else {
    //             this.message.error("Order Status Updation Failed", "");
    //             this.isSpinning = false;
    //           }
    //         });
    //       }

    //     }
    //         else if (res.type == 2 && res.status != 200) {
    //           this.message.error("Failed To Upload File...", "");
    //           console.log(this.data.ICON,'this.data.ICON');

    //           this.isSpinning = false;
    //           this.progressBarImageOne = false;
    //           this.percentImageOne = 0;
    //           this.data.ICON = null;
    //         }
    //         else {
    //           console.log(this.data.ICON,'this.data.ICON');
    //           this.isSpinning = false;
    //           this.progressBarImageOne = false;
    //           this.percentImageOne = 0;
    //           this.data.ICON = null;
    //         }
    //       });
    //     }
    //     else{
    //       this.api
    //       .updateOrderStatus(this.data)
    //       .subscribe((successCode: any) => {
    //         if (successCode.code == "200") {
    //           this.message.success(
    //             "Order Status Updated Successfully",
    //             ""
    //           );
    //           if (!addNew) this.drawerClose();
    //           this.isSpinning = false;
    //         } else {
    //           this.message.error("Order Status Updation Failed", "");
    //           this.isSpinning = false;
    //         }
    //       });
    //     }
    //     } else {
    //       this.timer = this.api
    //       .onUpload("Icons", this.fileURL, this.UrlImageOne)
    //       .subscribe((res) => {
    //         this.data.ICON = this.UrlImageOne;

    //         if (res.type === HttpEventType.Response) {
    //         }

    //           if (res.type == 4 && res.status == 200) {
    //           if (res.body["code"] == 200) {
    //             this.message.success("File Uploaded Successfully...", "");
    //             console.log(this.data.ICON,'this.data.ICON');
    //             this.isSpinning = false;
    //             this.data.ICON = this.UrlImageOne;

    //       this.api
    //         .createOrderStatus(this.data)
    //         .subscribe((successCode: any) => {
    //           if (successCode.code == "200") {
    //             this.message.success(
    //               "Order Status Created Successfully",
    //               ""
    //             );
    //             if (!addNew) this.drawerClose();
    //             else {
    //               this.data = new OrderMasterData();
    //               this.resetDrawer(OrderStatusmaster);
    //             }
    //             this.isSpinning = false;
    //           } else {
    //             this.message.error(" Order Status Creation Failed", "");
    //             this.isSpinning = false;
    //           }
    //         });
    //       }
    //     }
    //     else if (res.type == 2 && res.status != 200) {
    //       this.message.error("Failed To Upload File...", "");
    //       console.log(this.data.ICON,'this.data.ICON');

    //       this.isSpinning = false;
    //       this.progressBarImageOne = false;
    //       this.percentImageOne = 0;
    //       this.data.ICON = null;
    //     }
    //     else {
    //       console.log(this.data.ICON,'this.data.ICON');
    //       this.isSpinning = false;
    //       this.progressBarImageOne = false;
    //       this.percentImageOne = 0;
    //       this.data.ICON = null;
    //     }
    //   });
    //     }
    //   }
    // }
  }


  close() {
    this.drawerClose();
  }


// Used For Icon

// onFileSelected(event: any) {
//   const maxFileSize = 1 * 1024 * 1024;

//   if (
//     event.target.files[0].type == "image/jpeg" ||
//     event.target.files[0].type == "image/jpg" ||
//     event.target.files[0].type == "image/png"
//   ) {
//     this.fileURL = <File>event.target.files[0];
//     if (this.fileURL.size > maxFileSize) {
//       this.message.error("File size should not exceed 1MB.", "");
//       return;
//     }
//     if (this.fileURL != null) {
//       var number = Math.floor(100000 + Math.random() * 900000);
//       var fileExt = this.fileURL.name.split(".").pop();
//       var d = this.datePipe.transform(new Date(), "yyyyMMdd");
//       var url = "";
//       url = d == null ? "" : d + number + "." + fileExt;
//        this.UrlImageOne = url;
//       if (this.data.ICON != undefined && this.data.ICON.trim() != "") {
//         var arr = this.data.ICON.split("/");
//         if (arr.length > 1) {
//           url = arr[5];
//         }
//       }
//     }
//     this.data.ICON = this.fileURL.name;


//   } else {
//     this.message.error("Please Select Only jpg , jpeg , png File", "");
//     this.fileURL = null;
//     this.isSpinning = false;
//     this.data.ICON = null;
//   }
// }

 imageshow;
  onFileSelected(event: any) {
    const maxFileSize = 1 * 1024 * 1024;

    if (
      event.target.files[0].type == "image/jpeg" ||
      event.target.files[0].type == "image/jpg" ||
      event.target.files[0].type == "image/png"

    ) {
      this.fileURL = <File>event.target.files[0];
      if (this.fileURL.size > maxFileSize) {
        this.message.error("Icon size should not exceed 1MB.", "");
        return;
      }
      if (this.fileURL != null) {
        var number = Math.floor(100000 + Math.random() * 900000);
        var fileExt = this.fileURL.name.split(".").pop();
        var d = this.datePipe.transform(new Date(), "yyyyMMdd");
        var url = "";
        url = d == null ? "" : d + number + "." + fileExt;
        this.UrlImageOne = url;
        if (
          this.data.ICON != undefined &&
          this.data.ICON.trim() != ""
        ) {
          var arr = this.data.ICON.split("/");
          if (arr.length > 1) {
            url = arr[5];
          }
        }
      }
      this.progressBarImageOne = true;
      this.urlImageOneShow = true;
      this.isSpinning = true;
      this.timer = this.api
        .onUpload("OrderStatusIcon", this.fileURL, this.UrlImageOne)
        .subscribe((res) => {
          this.data.ICON = this.UrlImageOne;

          if (res.type === HttpEventType.Response) {
          }
          if (res.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((100 * res.loaded) / res.total);
            this.percentImageOne = percentDone;
            if (this.percentImageOne == 100) {
              this.isSpinning = false;
            }
          } else if (res.type == 2 && res.status != 200) {
            this.message.error("Failed To Upload Icon...", "");
            this.isSpinning = false;
            this.progressBarImageOne = false;
            this.percentImageOne = 0;
            this.data.ICON = null;
          } else if (res.type == 4 && res.status == 200) {
            if (res.body["code"] == 200) {
              this.message.success("Icon Uploaded Successfully...", "");
              this.isSpinning = false;
              this.data.ICON = this.UrlImageOne;
            } else {
              this.isSpinning = false;
              this.progressBarImageOne = false;
              this.percentImageOne = 0;
              this.data.ICON = null;
            }
          }
        });
    } else {
      this.message.error("Please Select Only Image Icon", "");
      this.fileURL = null;
      this.isSpinning = false;
      this.progressBarImageOne = false;
      this.percentImageOne = 0;
      this.data.ICON = null;
    }
  }

viewImage(imageURL: string): void {
  console.log("view");

  this.ViewImage = 1;
  this.GetImage(imageURL);
}

sanitizedLink: any = "";

GetImage(link: string) {
  console.log("Getting Icon");
  let imagePath = this.api.retriveimgUrl + "OrderStatusIcon/" + link;
  this.sanitizedLink =
    this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  this.imageshow = this.sanitizedLink;
  console.log("Icon path:", imagePath);

  // Display the modal only after setting the image URL
  // this.ImageModalVisible = true;

  window.open(imagePath, '_blank');
}


IconDeleteConfirm(data: any) {
   this.UrlImageOne = null;
  this.data.ICON = " ";
  this.fileURL = null;
}

deleteCancel() {}


removeImage() {
  this.data.ICON = " ";
  this.fileURL = null;
}

ViewImage: any;
ImageModalVisible = false;

ImageModalCancel() {
  this.ImageModalVisible = false;
}

}
