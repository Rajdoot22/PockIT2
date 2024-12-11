import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import tr from '@mobiscroll/angular/dist/js/i18n/tr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { orderMasterData } from 'src/app/Pages/Models/orderMasterData';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-orderdetailsdrawer',
  templateUrl: './orderdetailsdrawer.component.html',
  styleUrls: ['./orderdetailsdrawer.component.css']
})
export class OrderdetailsdrawerComponent {
  ngOnInit(){ 
    this.getorderDetails();
    this.Ordermaster();
  }

  showjobcard:boolean=true
  showverification:boolean=false
  showchat:boolean=false
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}
  @Input()
  drawerClose!: Function;
  @Input() vieworderdata: any 
  @Input() orderid: any 
  date=new Date();
  close(): void {
    this.drawerClose();
  }
  gettotal(value1:any,value2:any){
    // console.log(value1,value2)
    return Number(value1)* Number(value2)
  }
  openModal=false
  public commonFunction = new CommonFunctionService();

  skills:any;
  jobdetails:any;
  estimatetime:any
  openmodelll(){
    this.openModal=true
  }
  closemodelll(){
    this.openModal=false
  }

  // getempdata(event: any) {
  //   // if (event) {
  //   //   if (event.length > 2) {
  //   //     var likeQuery = "";
  //   //     likeQuery = " AND (";
  //   //     this.columns.forEach((column) => {
  //   //       likeQuery += " " + column[0] + ' like "%' + event + '%" OR';
  //   //     });
  //   //     likeQuery = likeQuery.substring(0, likeQuery.length - 2);
  //   //     likeQuery += ")";
  //   //     this.loadingRecords = true;

  //   //     if (this.roleid == 55) {
  //   //       likeQuery += ' AND IS_GAZZETTED=1'
  //   //     } else if (this.roleid == 5) {
  //   //       likeQuery += ' AND IS_GAZZETTED=0'
  //   //     }
  //   //     this.api.getAllEmployee(0, 0, "", "", likeQuery).subscribe(
  //   //       (data) => {
  //   //         if (data["code"] == 200) {
  //   //           this.loadingRecords = false;

  //   //           data["data"].forEach(element => {
  //   //             element['EMP_CODE_NAME'] = element.NAME + '-' + element.EMP_NO

  //   //           });


  //   //           this.empdataa = [...[], ...data["data"]];

  //   //         } else {
  //   //           this.loadingRecords = false;
  //   //           this.empdataa = []

  //   //         }
  //   //       },
  //   //       (err) => {
  //   //         this.loadingRecords = false;
  //   //         this.empdataa = []
  //   //         // this.message.error("Server Not Found", "");
  //   //       }
  //   //     );
  //   //   } else {

  //   //   }
  //   // } else {

  //   // }
  // }



  // sanjana




  drawerVisiblepastorder: boolean = false;
  drawerDatapastorder: any;
  drawerTitlepastorder!: string;
  drawerCustomerRatingTitle!:string;
  drawerCustomerRatingVisible:boolean=false;
  drawerRatingVisible:boolean=false;

  STATUS: string = '';  // This will store the selected value of the radio button
  data = {
    REMARK: ''
  };
  dateFormat = 'yyyy/MM/dd';
  time: Date | null = null;


  viewPastOrders(data:any)
  {
    this.drawerTitlepastorder = `Past Order Of `+ this.orderData.CUSTOMER_NAME;
    this.drawerDatapastorder=this.orderData;
    this.drawerVisiblepastorder = true;
  }

  viewCustomerRating()
  {

    this.drawerCustomerRatingTitle = 'Rating';
    this.drawerDatapastorder;
    this.drawerCustomerRatingVisible = true;

  }

  viewCustomerchat(){
    this.showjobcard=false
    this.showverification=false
    this.showchat=true
    this.showmap=false

  }


  acceptOrder()
  {

  }

  rejectOrder()
  {

  }

  rescheduleOrder()
  {

  }


  drawerClosepastorder(): void {
    this.drawerVisiblepastorder = false;
  }

  get closeCallbackpastorder() {
    return this.drawerClosepastorder.bind(this);
  }





  //Customer Rating

  drawerCloseRating(): void {
    this.drawerCustomerRatingVisible = false;
  }

  get closeCallbackRating() {
    return this.drawerClose.bind(this);
  }

  techData: any = [];
  TECHNICIAN_NAME: any;
  selectedTechnicianName: string = '';

  getTechnicianData() {
    this.api.getTechnicianData(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.techData = data['data'];
        } else {
          this.techData = [];
          this.message.error('Failed To Get Technician Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  onTechnicianChange() {
    const selectedTechnician = this.jobcardtechmapdata.find(
      (tech) => tech.ID === this.TECHNICIAN_NAME
    );
    if (selectedTechnician) {
      this.TECHNICIAN_ID = selectedTechnician.ID;
      this.selectedTechnicianName = selectedTechnician.TECHNICIAN_NAME;
      console.log("Selected Technician Name:", this.selectedTechnicianName);
      console.log("Selected Technician ID:", this.TECHNICIAN_ID);
    }
    this.jobCardChat();
  }




  // purva mam
  // Action Log TS

  

  isModalVisible = false;
  selectedInvoice: any = null;
  // showInvoiceModal(data: any): void {
  //   this.selectedInvoice = data;
  //   this.isModalVisible = true;
  // }

  handleCancel(): void {
    this.isModalVisible = false;
    this.selectedInvoice = null;
  }
  checked = true;
  showactionlog:boolean=false
  showinvoicetable:boolean=false
  showmap:boolean=false

  showinvoice(){
    this.showinvoicetable=true
    this.showactionlog=false
    this.showjobcard=false
    this.showverification=false
    this.showchat=false
    this.showmap=false
    this.getInvoiceLog()
  }

  showaction(){
    this.showactionlog=true
    this.showinvoicetable=false
    this.showjobcard=false
    this.showverification=false
    this.showchat=false
    this.showmap=false
    this.getActionLog()
  }

  showverificationn(){
    this.showactionlog=false
    this.showinvoicetable=false
    this.showjobcard=false
    this.showverification=true
    this.showchat=false
    this.showmap=false
  }
  backall(){
    this.showactionlog=false
    this.showinvoicetable=false
    this.showjobcard=true
    this.showverification=false
    this.showchat=false
    this.showmap=false
  }
 

  modalStyle = {
    top: '20px',
  };

  lat = 21.3069;
  lng = -157.8583;
  mapType = 'satellite';
  latitude: number | null = null;
  longitude: number | null = null;
  safeUrl: SafeResourceUrl;
  mapUrl: any;


  MAPlOCATION: any = [
    { "latitude": 16.86134989474639, "longitude": 74.57604282697206, name: "UVtech" },
    // { "latitude": 18.533996040211903, "longitude": 73.89521172337923, name: "Location 2" },
    // { "latitude": 18.511190328632434, "longitude": 73.90544713522702, name: "Location 3" },
    // { "latitude": 18.45096180755418, "longitude": 73.85497558570897, name: "Location 4" }
  ];


  checked1 = false
 


  // purvamam
  timelineData: any = []
  invoiceData:any=[]
  getActionLog() {
    var filter = ''
    if (this.checked == true && this.checked1 == false) {
      filter = " AND ACTION_LOG_TYPE IN('O')"
    }
    else if (this.checked == false && this.checked1 == true) {
      filter = " AND ACTION_LOG_TYPE IN('J')"
    }
    else {
      filter = " AND ACTION_LOG_TYPE IN('O','J')"
    }
    this.api.getActionLog(0, 0, '', '', filter+' AND ORDER_ID= '+this.orderid).subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.timelineData = this.formatTimelineData(data['data']);
          console.log(this.timelineData)
        } else {
          this.message.error('Failed To get Action Log Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }
  formatTimelineData(data: any[]): any[] {
    return data.map((day) => ({
      date: day.DATE,
      events: day.ACTION_LOGS.map((log) => ({
        icon: this.getStatusIcon(
          log.ORDER_STATUS || ''
        ),// Adjust icon logic as needed
        title: log.ACTION_DETAILS || 'Action performed',
        time: log.ORDER_DATE_TIME ? new Date(log.ORDER_DATE_TIME).toLocaleTimeString() : 'N/A',
        user: log.TECHNICIAN_NAME || 'Unknown',
        description: log.TASK_DESCRIPTION || 'No description provided'
      }))
    }));
  }
  getStatusIcon(status: string): string {
    switch (status) {
      case 'order placed':
        return '🛒';
      case 'order accepted':
        return '✅';
      case 'order rejected':
        return '❌';
      case 'order scheduled':
        return '📅';
      case 'order ongoing':
        return '🔄';
      case 'order completed':
        return '🏁';
      case 'order cancelled':
        return '🚫';
      default:
        return 'ℹ️';
    }
  }
  getInvoiceLog() {
    var sort: string;
    try {
      sort = this.sortValue.startsWith('a') ? 'asc' : 'desc';
    } catch (error) {
      sort = '';
    }
    this.api.getInvoiceLogs(   this.pageIndex,  this.pageSize,  this.sortKey, sort, ' AND ORDER_ID= '+this.orderid).subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.invoiceData =data['data'];
        } else {
          this.message.error('Failed To get Invoice Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }
 
  pdfUrl: any
  showInvoiceModal(data: any): void {
    if (data?.INVOICE_URL) {
      const a = this.api.retriveimgUrl + 'Invoices' + '/' + data.INVOICE_URL;
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(a);
      console.log('Sanitized PDF URL:', this.pdfUrl);
      this.isModalVisible = true;
    } else {
      this.message.error('Invoice URL not available','');
    }
  }
  downloadPDF(): void {
    // Extract the original URL from the sanitized URL (without breaking security)
    const urlString = this.pdfUrl.changingThisBreaksApplicationSecurity || '';
    console.log('Attempting to download PDF from URL:', urlString);
 
    if (!urlString) {
      console.error('Invalid PDF URL');
      return;
    }
 
    // Create HTTP request headers to force the PDF MIME type
    const headers = new HttpHeaders().set('Accept', 'application/pdf');
 
    // Fetch the PDF as a Blob from the server with forced MIME type
    this.httpClient.get(urlString, { responseType: 'blob', headers: headers }).subscribe(
      (response: Blob) => {
        // Log the received Blob to ensure it's a PDF
        console.log('Received PDF Blob:', response);
 
        // Create a temporary Blob URL
        const blobUrl = URL.createObjectURL(response);
 
        // Create an anchor element for download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = urlString.split('/').pop() || 'invoice.pdf'; // Use the file name from URL
        a.target = '_self'; // Download in the same tab
 
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Clean up the DOM
 
        // Revoke the Blob URL after the download starts
        URL.revokeObjectURL(blobUrl);
      },
      (error) => {
        console.error('Error fetching PDF:', error);
      }
    );
  }
 
 
  pageIndex = 1;
  pageSize = 10;
  sortValue: string = 'desc';
  sortKey: string = 'id';
  sort(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort } = params;
    console.log(params)
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'desc';
    console.log(currentSort);
    console.log('sortOrder :' + sortOrder);
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
 
    if (this.pageSize != pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }
 
    if (this.sortKey != sortField) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }
 
    this.sortKey = sortField;
    this.sortValue = sortOrder;
    this.getInvoiceLog();
  }

  dataList:any=[{id:1}];


  
  TIME: any
  DATE :any  







 
orderData:any = new orderMasterData();
isSpinning = false;
acceptorder()
  {

    if(this.STATUS != null &&
       this.STATUS  != undefined &&
       this.STATUS  !=  ""
    )
    {
      if(this.STATUS == 'A'){
        this.orderData.ORDER_STATUS ='A'
      }
     else if(this.STATUS == 'R'){
        this.orderData.REMARK,
        this.orderData.ORDER_STATUS ='R'
      }
     else  if(this.STATUS == 'Res'){
      this.orderData.DATE,
      this.orderData.TIME,
        this.orderData.ORDER_STATUS ='Res'
      }

      if(this.STATUS == 'R' && (this.orderData.REMARK == null || this.orderData.REMARK == undefined || this.orderData.REMARK == "" ))
      {
        this.message.error("Please Enter Reject Remark ", "");
      }
      else if(this.STATUS == 'Res' && (this.orderData.DATE == null || this.orderData.DATE == undefined || this.orderData.DATE == "" ))
      {
        this.message.error("Please Select Date and Time ", "");
      }
      else
      {

        this.api.acceptorder(this.orderData).subscribe((successCode: any) => {
          if (successCode.code == "200") {
            if(this.STATUS == 'A')
            {
              this.message.success("Order Accepted Successfully", "");
            }
            if(this.STATUS == 'R')
              {
                this.message.success("Order Rejected", "");
              }
              if(this.STATUS == 'Res')
                {
                  this.message.success("Order Rescheduled", "");
                }
            this.backall();
            this.isSpinning = false;
          } else {
            this.message.error("Order Failed ", "");
            this.isSpinning = false;
          }
        });

      }


  }
  else
  {
    this.message.error("Please Select Order Status","")
  }


  }

  orderDetailsData: any = [];
  jobCardIds: any[] = [];
  getorderDetails() {
    this.api
      .getorderDetails(0, 0, "", "", "AND ORDER_ID = " + this.orderData.ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.orderDetailsData = data["data"];

            this.jobCardIds = this.orderDetailsData.map(
              (order) => order.JOB_CARD_ID
            );

            console.log("this.jobCardIds:", this.jobCardIds);
          } else {
            this.orderDetailsData = [];
            this.message.error("Failed To Get Order Details Data", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }

  TECHNICIAN_ID: any; 
  jobcardtechmapdata: any = [];
  filteredJobcardTechData: any[] = [];

  getjobcardTechnicianMapping() {
    console.log("this.jobCardIds1:", this.jobCardIds);
    console.log("this.orderDetailsData:", this.orderDetailsData);
    this.api
      .getjobcardTechnicianMapping(
        0,
        0,
        "",
        "",
        "AND JOB_CARD_ID IN (" + this.jobCardIds + ")"
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.jobcardtechmapdata = data["data"];

          } else {
            this.jobcardtechmapdata = [];
            this.message.error(
              "Failed To Get JobCard Technician Mapping Data",
              ""
            );
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }



  chatdata: any = [];
  jobCardChat() {
    this.api
      .jobCardChat(
        0,
        0,
        "",
        "",
        "AND ORDER_ID = " +
          this.orderData.ID +
          " AND CUSTOMER_ID = " +
          this.orderData.CUSTOMER_ID +
          " AND TECHNICIAN_ID=" +
          this.TECHNICIAN_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.chatdata = data["data"];
            if (this.chatdata.length > 0) {
              this.jobCardChatDetails();
            }
          } else {
            this.chatdata = [];
            this.message.error("Failed To Get Job Card Chat", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }

  chatDetailsdata: any = [];
  jobCardChatDetails() {
    this.api
      .jobCardChatDetails(0, 0, "", "", "AND CHAT_ID =" + this.chatdata[0].ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.chatDetailsdata = data["data"];
          } else {
            this.chatDetailsdata = [];
            this.message.error("Failed To Get Job Card Chat Details", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }






  // map

  showwmapp(){
    this.showactionlog=false
    this.showinvoicetable=false
    this.showjobcard=false
    this.showverification=false
    this.showchat=false
    this.showmap=true
  }


 
  mapData: any = [];
  OrderAddressMap() {
    this.api
      .OrderAddressMap(
        0,
        0,
        "",
        "",
        "AND ORDER_ID = " +
          this.orderData.ID +
          " AND ID = " +
          this.orderData.SERVICE_ADDRESS_ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.mapData = data["data"];
            console.log("this.mapData", this.mapData);

            if (this.mapData.length > 0) {
              this.MAPlOCATION = [
                ...[],
                ...[
                  {
                    latitude: Number(this.mapData[0].LONGITUDE),
                    longitude: Number(this.mapData[0].LATITUDE),
                    name: this.orderData.CUSTOMER_NAME,
                    address: `${this.mapData[0].COUNTRY_NAME}, 
                ${this.mapData[0].STATE_NAME}, 
                ${this.mapData[0].CITY_NAME}, 
                ${this.mapData[0].ADDRESS_LINE_1}, 
                ${this.mapData[0].ADDRESS_LINE_2} - 
                ${this.mapData[0].PINCODE}`,
                  },
                ],
              ];
              console.log("this.MAPlOCATION2", this.MAPlOCATION);
              this.showmap = true;
            } else {
              this.message.warning("No map data available", "");
            }
          } else {
            this.mapData = [];
            this.message.error(
              "Failed To Get Order Master Address Map Data",
              ""
            );
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }



  ordermasterdata: any = [];
  ServiceAddressId;
  Ordermaster() {
    this.api.Ordermaster(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.ordermasterdata = data["data"];
          console.log("this.ordermasterdata", this.ordermasterdata);
          this.ServiceAddressId = this.ordermasterdata.map(
            (order) => order.SERVICE_ADDRESS_ID
          );
          console.log("this.ServiceAddressId", this.ServiceAddressId);
        } else {
          this.ordermasterdata = [];
          this.message.error("Failed To Get Order Master  Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }

}
