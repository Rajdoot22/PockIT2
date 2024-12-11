import { DatePipe } from "@angular/common";
import { Component, Input } from "@angular/core";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { Address } from "src/app/Pages/Models/Address";
import { customer } from "src/app/Pages/Models/customer";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { differenceInCalendarDays } from "date-fns";
import { NgForm } from "@angular/forms";
import { orderMasterData } from 'src/app/Pages/Models/orderMasterData';;
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-ordercreatedrawer",
  templateUrl: "./ordercreatedrawer.component.html",
  styleUrls: ["./ordercreatedrawer.component.css"],
  providers: [DatePipe],
})
export class OrdercreatedrawerComponent {
  @Input() drawerCloseorder: any;
  @Input() data: any = new orderMasterData();
  isOk: boolean = false;
  expandKeys = ["0-0", "0-1"];
  isSpinning: boolean = false;
  drawerVisible: boolean = false;
  drawerVisibleAddress: boolean = false;
  drawerData: customer = new customer();
  drawerDataaddress: Address = new Address();
  drawerTitle: any = "";
  showbutton: boolean = true;
  cartVisible: boolean = false;
  selectedService: any = "";
  orderMediums = ["Online", "Offline"];
  quantity = 1;
  rate = 0;
  total = 0;
  unit: any;
  time: any;
  territories: any = [];
  subcategories: any = [];
  servicescatalogue: any = [];
  services: any = [];
  categories: any = [];
  uniteDta: any = [];
  selectedTerritory: string;
  selectedOrderMedium: string;
  tableData: any = [];
  isEditing = false;
  editingIndex: number | null = null;
  expectedDate: Date | null = null;
  addresses: any = [];
  ID: any;
  selectedCategory: any;
  selectedSubcategory: any;
  selectedServices: any;
  selectedServiceItem: any;
  specialInstruction = "";
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe
  ) {}
  showcbutton: boolean = false;
  ngOnInit() {
    this.getcustomer();
    this.getcategories();
    // this.getsubcategories()
    this.getUnits();
    if (this.data.CUSTOMER_ID === "" || this.data.CUSTOMER_ID === undefined) {
      this.showcbutton = true;
      this.showbutton = false;
    } else {
      this.showcbutton = false;
      this.showbutton = true;
    }
  }

  nodes = [
    {
      title: "Service 1",
      key: "0-0",
      rate: 100,
      children: [
        { title: "Sub-Service 1.1", key: "0-0-0", rate: 50 },
        { title: "Sub-Service 1.2", key: "0-0-1", rate: 70 },
      ],
    },
    {
      title: "Service 2",
      key: "0-1",
      rate: 200,
      children: [
        { title: "Sub-Service 2.1", key: "0-1-0", rate: 80 },
        { title: "Sub-Service 2.2", key: "0-1-1", rate: 90 },
      ],
    },
  ];
  closeCallbackorder() {
    this.drawerCloseorder();
  }
  custaddress: any = [];
  getcustomer() {
    this.api.getAllCustomer(0, 0, "", "", "").subscribe((data) => {
      this.custaddress = data["data"];
    });
  }

  showbillingaddress: boolean = false;
  storeCustomerType: any = "I";
  storeserviceaddress: any;
  storeBillingaddress: any;
  getaddress(event) {
    if (event) {
      if (
        this.data.CUSTOMER_ID === "" ||
        this.data.CUSTOMER_ID === undefined ||
        this.data.CUSTOMER_ID === null
      ) {
        this.showcbutton = true;
        this.showbutton = false;
        this.showbillingaddress = false;
        this.storeCustomerType = "I";
      } else {
        this.showcbutton = false;
        this.showbutton = true;
        var cust: any = this.custaddress.filter(
          (element) => element.ID == this.data.CUSTOMER_ID
        );
        console.log(cust, "fghj");
        if (cust) {
          this.storeCustomerType = cust[0].CUSTOMER_TYPE;
        } else {
          this.storeCustomerType = "I";
        }
      }
      this.ID = event;

      this.api
        .getAllCustomerAddress(
          0,
          0,
          "",
          "",
          " AND CUSTOMER_ID= " + this.data.CUSTOMER_ID
        )
        .subscribe((data) => {
          this.addresses = data["data"];
        });
      this.data.ADDRESS_ID = null;
      this.data.ADDRESS_ID1 = null;
      this.storeBillingaddress = null;
      this.storeserviceaddress = null;
    } else {
      this.data.ADDRESS_ID = null;
      this.data.ADDRESS_ID1 = null;
      this.storeBillingaddress = null;
      this.storeserviceaddress = null;
    }
  }

  taxdata: any;
  getteritory(event) {
    var serviceAddress: any = this.addresses.filter(
      (element) => element.ID == event
    );
    console.log(serviceAddress, "fghj");
    var long: any;
    var longitude: any;
    var latitude: any;
    if (serviceAddress) {
      if (serviceAddress[0]["GEO_LOCATION"]) {
        long = serviceAddress[0].GEO_LOCATION.split(",");
        longitude = long[0];
        latitude = long[1];
      }
      this.storeserviceaddress = {
        ADDRESS_LINE_1: serviceAddress[0].ADDRESS_LINE_1,
        ADDRESS_LINE_2: serviceAddress[0].ADDRESS_LINE_2,
        CITY_ID: serviceAddress[0].CITY_ID,
        STATE_ID: serviceAddress[0].STATE_ID,
        COUNTRY_ID: serviceAddress[0].COUNTRY_ID,
        PINCODE_ID: serviceAddress[0].PINCODE_ID,
        LONGITUDE: longitude,
        LATITUDE: latitude,
      };
    }
    this.api
      .getterritoryPincodeData(0, 0, "", "", " AND PINCODE_ID =" + event)
      .subscribe((data) => {
        this.territories = data["data"];
      });

    this.api
      .getstatetax(0, 0, "", "", "", serviceAddress[0].STATE_ID)
      .subscribe((data) => {
        this.taxdata = data["data"];
      });
  }

  getteritory1(event) {
    var serviceAddress: any = this.addresses.filter(
      (element) => element.ID == event
    );
    console.log(serviceAddress, "fghj");
    var long: any;
    var longitude: any;
    var latitude: any;
    if (serviceAddress) {
      if (serviceAddress[0].GEO_LOCATION) {
        long = serviceAddress[0].GEO_LOCATION.split(",");
        longitude = long[0];
        latitude = long[1];
      }
      this.storeBillingaddress = {
        ADDRESS_LINE_1: serviceAddress[0].ADDRESS_LINE_1,
        ADDRESS_LINE_2: serviceAddress[0].ADDRESS_LINE_2,
        CITY_ID: serviceAddress[0].CITY_ID,
        STATE_ID: serviceAddress[0].STATE_ID,
        COUNTRY_ID: serviceAddress[0].COUNTRY_ID,
        PINCODE_ID: serviceAddress[0].PINCODE_ID,
        LONGITUDE: longitude,
        LATITUDE: latitude,
      };
    }
    this.api
      .getterritoryPincodeData(0, 0, "", "", " AND PINCODE_ID =" + event)
      .subscribe((data) => {
        this.territories = data["data"];
      });
  }

  getcategories() {
    this.api
      .getCategoryData(0, 0, "", "", " AND IS_ACTIVE =1")
      .subscribe((data) => {
        this.categories = data["data"];
      });
  }

  getUnits() {
    this.api
      .getUnitData(0, 0, "ID", "desc", " AND IS_ACTIVE =1")
      .subscribe((data) => {
        if (data.code == 200) {
          this.uniteDta = data["data"];
        } else {
          this.uniteDta = [];
        }
      });
  }
  totalamount = 0;
  calculateTotalAmount() {
    this.totalamount = this.tableData.reduce(
      (sum, item) => sum + item.TOTAL_AMOUNT,
      0
    );
    return this.totalamount;
  }

  calculateTotal() {
    this.total = this.quantity * this.rate;
  }

  deleteRow(index: number) {
    this.tableData.splice(index, 1);
  }

  servicechange(event: any) {
    if (event) {
      this.api
        .getServiceItem(
          0,
          0,
          "",
          "",
          " AND IS_ACTIVE =1 AND SERVICE_CATLOG_ID=" + event
        )
        .subscribe((data) => {
          if (data.code == 200) {
            this.services = data["data"];
          }
        });

      var serviceee: any = this.servicescatalogue.filter(
        (element) => element.ID == event
      );
      this.servicenamee = serviceee[0].NAME;
    } else {
      this.selectedService = null;
      this.services = [];
    }
  }

  categoryname = "";
  subcategoryname = "";
  servicenamee = "";
  serviceitemnamee = "";

  categorychange(event: any) {
    if (
      this.data.CUSTOMER_ID == "" ||
      this.data.CUSTOMER_ID == null ||
      this.data.CUSTOMER_ID == undefined
    ) {
      this.message.error("Please select customer name to proceed further.", "");
    } else {
      if (event) {
        this.api
          .getSubCategoryData(
            0,
            0,
            "",
            "",
            " AND STATUS =1 AND CATEGORY_ID=" + event
          )
          .subscribe((data) => {
            this.subcategories = data["data"];
          });
        var categoryyy: any = this.categories.filter(
          (element) => element.ID == event
        );
        this.categoryname = categoryyy[0].CATEGORY_NAME;
      } else {
        this.subcategories = [];
        this.selectedSubcategory = null;
      }
    }
  }
  Subcategorychange(event: any) {
    if (event) {
      this.api
        .getServiceCatlogData(
          0,
          0,
          "",
          "",
          " AND AVAILABILITY_STATUS=1 AND SUBCATEGORY_ID=" + event
        )
        .subscribe((data) => {
          if (data.code == 200) {
            this.servicescatalogue = data["data"];
          }
        });

      var subcategoryyy: any = this.subcategories.filter(
        (element) => element.ID == event
      );
      this.subcategoryname = subcategoryyy[0].NAME;
    } else {
      this.servicescatalogue = [];
      this.selectedServices = null;
    }
  }

  onServiceChange(serviceKey: string) {
    console.log(serviceKey);

    var cust: any = this.services.filter((element) => element.ID == serviceKey);
    console.log(cust, "fghj");
    if (cust) {
      if (this.storeCustomerType == "I") {
        this.rate = cust[0].PRICE_B2C;
        this.calculateTotal();
      } else {
        this.rate = cust[0].PRICE_B2B;
        this.calculateTotal();
      }
    } else {
      this.rate = 0;
      this.calculateTotal();
    }

    if (serviceKey) {
      var servieitem: any = this.services.filter(
        (element) => element.ID == Number(serviceKey)
      );
      this.serviceitemnamee = servieitem[0].NAME;
    }
    // this.getServiceNameAndItem(serviceKey)
  }

  cancel() {}
  omit(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }
  addcustomer(): void {
    this.drawerTitle = "Create New Customer";
    this.drawerData = new customer();
    this.drawerVisible = true;
  }

  drawerClose(): void {
    this.drawerVisible = false;
    this.getcustomer();
  }
  get closeCallback() {
    return this.drawerClose.bind(this);
  }

  addcustomerAddress(): void {
    this.drawerTitle = "Create New Address";
    this.drawerDataaddress = new Address();
    this.drawerVisibleAddress = true;
  }
  drawerAddressClose(): void {
    this.drawerVisibleAddress = false;
    this.getaddress("");
  }
  get closeCallbackAddress() {
    return this.drawerAddressClose.bind(this);
  }

  addToTable() {
    // if (!this.selectedCategory || !this.selectedSubcategory || !this.selectedService || !this.quantity || !this.rate || !this.total) {
    //   this.message.error("Please fill all fields.", '');
    //   return;
    // }
    if (!this.selectedCategory) {
      this.message.error("Please select category.", "");
      return;
    } else if (!this.selectedSubcategory) {
      this.message.error("Please select subcategory.", "");
      return;
    } else if (!this.selectedService) {
      this.message.error("Please select  service.", "");
      return;
    } else if (!this.quantity || this.quantity <= 0) {
      this.message.error("Please enter valid quantity.", "");
      return;
    } else if (!this.rate || this.rate <= 0) {
      this.message.error("Please enter valid rate.", "");
      return;
    } else if (!this.unit || this.unit == "") {
      this.message.error("Please select unit.", "");
      return;
    } else if (!this.total || this.total <= 0) {
      this.message.error("Total amount cannot be zero or negative.", "");
      return;
    }
    console.log(this.serviceName, this.serviceItemName, "before");

    const selectedService = this.serviceName;
    const selectedServiceItem = this.serviceItemName;
    console.log(selectedService, selectedServiceItem, "after");

    this.tableData.push({
      CATEGORY_ID: this.selectedCategory,
      SUB_CATEGORY_ID: this.selectedSubcategory,
      SERVICE_CATALOGUE_ID: this.selectedServices,
      SERVICE_ITEM_ID: this.selectedService,
      JOB_CARD_ID: 0,
      category: this.categoryname,
      subcategory: this.subcategoryname,
      serviceName: this.servicenamee,
      serviceItem: this.serviceitemnamee,
      QUANTITY: this.quantity,
      RATE: this.rate,
      UNIT_ID: this.unit,
      TOTAL_AMOUNT: this.total,
    });
    this.resetForm();
  }
  resetForm() {
    this.selectedCategory = "";
    this.selectedSubcategory = "";
    this.selectedService = null;
    this.selectedServices = null;
    this.selectedServiceItem = null;
    this.quantity = 0;
    this.rate = 0;
    this.unit = "";
    this.total = 0;
    this.isEditing = false;
    this.editingIndex = null;
  }

  editRow(index: number) {
    this.isEditing = true;
    this.editingIndex = index;

    const rowData = this.tableData[index];
    console.log("rowData:", rowData);
    this.selectedCategory = rowData.CATEGORY_ID;
    this.selectedSubcategory = rowData.SUB_CATEGORY_ID;
    (this.selectedServices = rowData.SERVICE_CATALOGUE_ID),
      (this.selectedService = rowData.SERVICE_ITEM_ID),
      (this.quantity = rowData.QUANTITY);
    this.rate = rowData.RATE;
    this.unit = rowData.UNIT_ID;
    this.total = rowData.TOTAL_AMOUNT;
    this.categoryname = rowData.category;
    this.subcategoryname = rowData.subcategory;
    this.servicenamee = rowData.serviceName;
    this.serviceitemnamee = rowData.serviceItem;

    this.api
      .getSubCategoryData(
        0,
        0,
        "",
        "",
        " AND STATUS =1 AND CATEGORY_ID=" + this.selectedCategory
      )
      .subscribe((data) => {
        this.subcategories = data["data"];
      });

    this.api
      .getServiceCatlogData(
        0,
        0,
        "",
        "",
        " AND AVAILABILITY_STATUS=1 AND SUBCATEGORY_ID=" +
          this.selectedSubcategory
      )
      .subscribe((data) => {
        if (data.code == 200) {
          this.servicescatalogue = data["data"];
        }
      });
    this.api
      .getServiceItem(
        0,
        0,
        "",
        "",
        " AND IS_ACTIVE =1 AND SERVICE_CATLOG_ID=" + this.selectedServices
      )
      .subscribe((data) => {
        if (data.code == 200) {
          this.services = data["data"];
        }
      });
    // const serviceItemKey = this.findServiceKeyByTitle(
    //   this.nodes,
    //   rowData.serviceItem
    // );
    // this.selectedService = serviceItemKey;
    // console.log("selectedService (key):", this.selectedService);
    // this.getServiceNameAndItem(this.selectedService);
  }

  findServiceKeyByTitle(nodes: any[], serviceTitle: string): string | null {
    for (const node of nodes) {
      if (
        node.title.trim().toLowerCase() === serviceTitle.trim().toLowerCase()
      ) {
        return node.key;
      }

      if (node.children) {
        const foundKey = this.findServiceKeyByTitle(
          node.children,
          serviceTitle
        );
        if (foundKey) {
          return foundKey;
        }
      }
    }
    return null;
  }

  updateRow() {
    if (this.editingIndex !== null) {
      this.tableData[this.editingIndex] = {
        // category: this.selectedCategory,
        // subcategory: this.selectedSubcategory,
        // serviceName: this.serviceName,
        // serviceItem: this.serviceItemName,
        // quantity: this.quantity,
        // rate: this.rate,
        // unit: this.unit,
        // total: this.total,
        CATEGORY_ID: this.selectedCategory,
        SUB_CATEGORY_ID: this.selectedSubcategory,
        SERVICE_CATALOGUE_ID: this.selectedServices,
        SERVICE_ITEM_ID: this.selectedService,
        JOB_CARD_ID: 0,
        category: this.categoryname,
        subcategory: this.subcategoryname,
        serviceName: this.servicenamee,
        serviceItem: this.serviceitemnamee,
        QUANTITY: this.quantity,
        RATE: this.rate,
        UNIT_ID: this.unit,
        TOTAL_AMOUNT: this.total,
      };
      this.resetForm();
      this.isEditing = false;
      this.editingIndex = null;
    }
  }
  fullPath: any;
  serviceItemName: any;
  serviceName: any;
  getServiceNameAndItem(event: any): void {
    const selectedNode = this.findServiceByKey(this.nodes, event);
    const selectedKey = event;
    const parentTitle = this.findParentServiceName(this.nodes, selectedKey);
    if (parentTitle) {
      this.serviceName = parentTitle;
    } else {
      this.serviceName = selectedNode?.title || "Unknown Service";
    }

    this.serviceItemName = selectedNode?.title || "Unknown Service Item";
    console.log(this.serviceName, this.serviceItemName);
  }
  findServiceByKey(nodes: any[], key: number): any | null {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const foundNode = this.findServiceByKey(node.children, key);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return null;
  }

  findParentServiceName(nodes: any[], childKey: number): string | null {
    for (const node of nodes) {
      if (node.children) {
        const childNode = node.children.find(
          (child: any) => child.key === childKey
        );
        if (childNode) {
          return node.title;
        }
        const parentTitle = this.findParentServiceName(node.children, childKey);
        if (parentTitle) {
          return parentTitle;
        }
      }
    }
    return null;
  }
  disabledPastDates = (current: Date): boolean =>
    differenceInCalendarDays(current, new Date()) < 0;

  currentHour = new Date().getHours();
  currentMinute = new Date().getMinutes();
  currentSecond = new Date().getSeconds();

  // Disable hours earlier than the current hour
  disableHours = (): number[] => {
    return Array.from({ length: this.currentHour }, (_, i) => i);
  };

  // Disable minutes earlier than the current minute for the current hour
  disableMinutes = (hour: number): number[] => {
    if (hour === this.currentHour) {
      return Array.from({ length: this.currentMinute }, (_, i) => i);
    }
    return [];
  };

  // Disable seconds earlier than the current second for the current minute and hour
  disableSeconds = (hour: number, minute: number): number[] => {
    if (hour === this.currentHour && minute === this.currentMinute) {
      return Array.from({ length: this.currentSecond }, (_, i) => i);
    }
    return [];
  };

  resetDrawer(orderDrawer: NgForm) {
    this.data = new orderMasterData();
    orderDrawer.form.markAsPristine();
    orderDrawer.form.markAsUntouched();
  }
  save(addNew: boolean, orderDrawer: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    this.data.TERRITORY_ID = this.selectedTerritory;
    if (
      this.data.CUSTOMER_ID == null ||
      this.data.CUSTOMER_ID == undefined ||
      this.data.CUSTOMER_ID == ""
    ) {
      this.isOk = false;
      this.message.error(" Please select custome name", "");
    } else if (
      this.storeserviceaddress == null ||
      this.storeserviceaddress == undefined ||
      this.storeserviceaddress == ""
    ) {
      this.isOk = false;
      this.message.error("Please select service address", "");
    } else if (
      this.storeCustomerType == "B" &&
      (this.storeBillingaddress == null ||
        this.storeBillingaddress == undefined ||
        this.storeBillingaddress == "")
    ) {
      this.isOk = false;
      this.message.error("Please select billing address", "");
    } else if (
      this.data.TERRITORY_ID == null ||
      this.data.TERRITORY_ID == undefined ||
      this.data.TERRITORY_ID == 0
    ) {
      this.isOk = false;
      this.message.error("Please select territory", "");
    } else if (
      this.data.ORDER_MEDIUM == null ||
      this.data.ORDER_MEDIUM == undefined ||
      this.data.ORDER_MEDIUM == 0
    ) {
      this.isOk = false;
      this.message.error("Please select order madium", "");
    } else if (this.tableData.length <= 0) {
      this.isOk = false;
      this.message.error("Please add atleast one service item", "");
    }

    if (this.isOk) {
      this.isSpinning = true;
      this.data.SERVICE_ADDRESS_DATA = this.storeserviceaddress;
      this.data.ORDER_DETAILS_DAT = this.tableData;
      if (this.storeCustomerType != "I") {
        this.data.BILLING_ADDRESS_DATA = this.storeBillingaddress;
      } else {
        this.data.BILLING_ADDRESS_DATA = this.storeserviceaddress;
      }
      this.data.ORDER_DETAILS_DAT = this.tableData;

      var ORDER_DATA = {
        CUSTOMER_ID: this.data.CUSTOMER_ID,
        ORDER_MEDIUM: this.data.ORDER_MEDIUM,
        TERRITORY_ID: this.data.TERRITORY_ID,
        CLIENT_ID: "1",
      };

      var SERVICE_ADDRESS_DATA = this.data.SERVICE_ADDRESS_DATA;
      var BILLING_ADDRESS_DATA = this.data.BILLING_ADDRESS_DATA;

      var ORDER_DETAILS_DATA = this.data.ORDER_DETAILS_DAT;

      var expecteddateee = this.datePipe.transform(
        this.expectedDate,
        "yyyy-MM-dd"
      );
      var expecteddateeetime = this.datePipe.transform(this.time, "hh:mm:ss");
      var totaldatee = `${expecteddateee} ${expecteddateeetime}`;
      var SUMMARY_DATA = {
        GROSS_AMOUNT: this.totalamount,
        TAX_RATE: this.taxdata[0].RATE,
        COUPON_CHARGES: 0,
        DISCOUNT_CHARGES: 0,
        TOTAL_TAX: this.totaltaxamount,
        SERVICE_CHARGES: 20.0,
        NET_AMOUNT: this.totalamount + this.totaltaxamount,
        SPECIAL_INSTRUCTIONS: this.specialInstruction,
        EXPECTED_DATE_TIME: totaldatee,
      };

      var maindata = {
        ORDER_DATA: ORDER_DATA,
        SERVICE_ADDRESS_DATA: SERVICE_ADDRESS_DATA,
        BILLING_ADDRESS_DATA: BILLING_ADDRESS_DATA,
        ORDER_DETAILS_DATA: ORDER_DETAILS_DATA,
        SUMMARY_DATA: SUMMARY_DATA,
      };

      {
        if (this.data.ID) {
          this.api.updateOrdersData(this.data).subscribe(
            (successCode: any) => {
              if (successCode.code == "200") {
                this.message.success("Order Updated Successfully", "");
                if (!addNew) this.drawerClose();
                this.isSpinning = false;
              } else {
                this.message.error("Order Updation Failed", "");
                this.isSpinning = false;
              }
            },
            (err: HttpErrorResponse) => {
              this.isSpinning = false;
              if (err.status === 0) {
                this.message.error(
                  "Unable to connect. Please check your internet or server connection and try again shortly.",
                  ""
                );
              } else {
                this.message.error("Something Went Wrong.", "");
              }
            }
          );
        } else {
          this.api.createOrdersData(maindata).subscribe(
            (successCode: any) => {
              if (successCode.code == "200") {
                this.message.success("New Order Created Successfully", "");
                if (!addNew) this.drawerClose();
                else {
                  // this.data = new AppLanguageData();
                  this.resetDrawer(orderDrawer);
                }
                this.isSpinning = false;
              } else {
                this.message.error("Order Creation Failed", "");
                this.isSpinning = false;
              }
            },
            (err: HttpErrorResponse) => {
              this.isSpinning = false;
              if (err.status === 0) {
                this.message.error(
                  "Unable to connect. Please check your internet or server connection and try again shortly.",
                  ""
                );
              } else {
                this.message.error("Something Went Wrong.", "");
              }
            }
          );
        }
      }
    }
  }
  close() {
    this.drawerClose();
  }
  totaltaxamount: any = 0;
  gettotaltax() {
    if (this.taxdata) {
      if (this.totalamount && this.taxdata[0].RATE) {
        var tax = (this.totalamount * this.taxdata[0].RATE) / 100;
        console.log(tax);

        this.totaltaxamount = tax;
        return "( Rate " + this.taxdata[0].RATE + " %)";
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
}
