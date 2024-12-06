import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InventoryCategoryData } from 'src/app/Inventorypages/inventorymodal/InventoryCategoryMaster';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-inventory-category-master-drawer',
  templateUrl: './inventory-category-master-drawer.component.html',
  styleUrls: ['./inventory-category-master-drawer.component.css']
})
export class InventoryCategoryMasterDrawerComponent {

  isSpinning = false;
  isOk = true;

  ngOnInit(): void
  {


  }

  public commonFunction = new CommonFunctionService();
  @Input() data: any = InventoryCategoryData;
  @Input()
  drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService

  ) {}

  resetDrawer(Taxmaster: NgForm) {
    this.data = new InventoryCategoryData();
    Taxmaster.form.markAsPristine();
    Taxmaster.form.markAsUntouched();
  }


  save(addNew: boolean, Taxmaster: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
          (this.data.CATEGORY_NAME == '' ||
          this.data.CATEGORY_NAME == null ||
          this.data.CATEGORY_NAME == undefined) &&
          (this.data.DESCRIPTION == '' ||
          this.data.DESCRIPTION == null ||
          this.data.DESCRIPTION == undefined)&&
          (this.data.PARENT_ID == '' ||
          this.data.PARENT_ID == null ||
          this.data.PARENT_ID == undefined)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    }    else if (
      this.data.CATEGORY_NAME == null ||
      this.data.CATEGORY_NAME == undefined ||
      this.data.CATEGORY_NAME == ''
    ) {
      this.isOk = false;
      this.message.error('Please Enter Category Name.', '');
    }
    else if (
      this.data.DESCRIPTION == null ||
      this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Description.', '');
    }
    else if (
      this.data.PARENT_ID == null ||
      this.data.PARENT_ID == undefined ||
      this.data.PARENT_ID.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Select parent.', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          // this.api.updateTax(this.data).subscribe((successCode: any) => {
          //   if (successCode.code == 200) {
          //     this.message.success('Inventory category Updated Successfully', '');
          //     if (!addNew) this.drawerClose();
          //     this.isSpinning = false;
          //   } else {
          //     this.message.error('Inventory Category Updation Failed', '');
          //     this.isSpinning = false;
          //   }
          // });
        }
         else {
          // this.api.createTax(this.data).subscribe(
          //   (successCode: any) => {
          //     if (successCode.code === 200) {
          //       this.message.success('Inventory Category Created Successfully', '');
          //       if (!addNew) {
          //         this.drawerClose();
          //       } else {
          //         this.data = new InventoryCategoryData();
          //         this.resetDrawer(Taxmaster);
          //       }
          //     } else {
          //       this.message.error('Inventory Category Creation Failed', '');
          //     }
          //     this.isSpinning = false;
          //   },
          //   (error) => {
          //     this.message.error('An error occurred while creating the Inventory category.', '');
          //     this.isSpinning = false;
          //   }
          // );
        }
      }
    }
  }

  close() {
    this.drawerClose();
  }
}
