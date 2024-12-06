import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import tr from '@mobiscroll/angular/dist/js/i18n/tr';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-orderdetailsdrawer',
  templateUrl: './orderdetailsdrawer.component.html',
  styleUrls: ['./orderdetailsdrawer.component.css']
})
export class OrderdetailsdrawerComponent {
  ngOnInit(){
    this.getTechnicianData();

    this.latitude = 17.096616801880028;
    this.longitude = 74.4495388718186;
    this.mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAn3IkTKrIw54Bu_rx_WaWXcmUjrA4bVj4&center=${this.latitude},${this.longitude}&zoom=14`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

  showjobcard:boolean=true
  showverification:boolean=false
  showchat:boolean=false
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) {}
  @Input()
  drawerClose!: Function;
  date=new Date();
  close(): void {
    this.drawerClose();
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


  viewPastOrders()
  {
    this.drawerTitlepastorder = 'Past Orders';
    this.drawerDatapastorder;
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
    const selectedTechnician = this.techData.find(tech => tech.ID === this.TECHNICIAN_NAME);
    if (selectedTechnician) {
      this.selectedTechnicianName = selectedTechnician.NAME;
      console.log('Selected Technician Name:', this.selectedTechnicianName);
    }
  }




  // purva mam
  // Action Log TS
  timelineData = [
    {
      date: 'Today - Nov 29, 2024',
      events: [
        {
          icon: '📅',
          title: 'Service Appointment AP-1 created',
          time: '02:57 PM',
          user: 'John Doe',
          description: 'Scheduled a follow-up appointment for the customer.'
        },
        {
          icon: '✏️',
          title: 'Contact details updated',
          time: '02:55 PM',
          user: 'John Doe',
          description: 'Email updated from "old@example.com" to "new@example.com".'
        },
        {
          icon: '📄',
          title: 'Work Order WO1 created',
          time: '02:54 PM',
          user: 'Emily Clark',
          description: 'Work order created for repairing the air conditioning unit.'
        }
      ]
    },
    {
      date: 'Oct 16, 2024',
      events: [
        {
          icon: '⚙️',
          title: 'Asset1 added',
          time: '04:15 PM',
          user: 'John Doe',
          description: 'Added a new server to the IT inventory.'
        },
        {
          icon: '👤',
          title: 'Contact created',
          time: '04:15 PM',
          user: 'Emily Clark',
          description: 'Added customer contact information to the database.'
        }
      ]
    }
  ];
  listOfData = [
    {
      date: '2024-04-15',
      invoiceNo: 'INV123456',
      orderNo: 'ORD987654',
      jobNo: 'JOB112233',
      customerName: 'John Doe',
      mobileNo: '9876543210',
      emailId: 'john.doe@example.com',
      address: '123 Main St, Springfield',
      dueDate: '2024-04-20',
      total: '$100.00',
      invoiceDetails: {
        items: [
          { name: 'Product A', quantity: 2, price: '$20.00' },
          { name: 'Service B', quantity: 1, price: '$60.00' },
        ],
        paymentMethod: 'Credit Card',
        transactionId: 'TXN1001',
      },
    },
    {
      date: '2024-04-16',
      invoiceNo: 'INV123457',
      orderNo: 'ORD987655',
      jobNo: 'JOB112234',
      customerName: 'Jane Smith',
      mobileNo: '9876543211',
      emailId: 'jane.smith@example.com',
      address: '456 Oak St, Springfield',
      dueDate: '2024-04-21',
      total: '$200.00',
      invoiceDetails: {
        items: [
          { name: 'Product C', quantity: 3, price: '$50.00' },
          { name: 'Service D', quantity: 1, price: '$50.00' },
        ],
        paymentMethod: 'PayPal',
        transactionId: 'TXN1002',
      },
    },
    {
      date: '2024-04-17',
      invoiceNo: 'INV123458',
      orderNo: 'ORD987656',
      jobNo: 'JOB112235',
      customerName: 'Samuel Lee',
      mobileNo: '9876543212',
      emailId: 'samuel.lee@example.com',
      address: '789 Pine St, Springfield',
      dueDate: '2024-04-22',
      total: '$300.00',
      invoiceDetails: {
        items: [
          { name: 'Product E', quantity: 4, price: '$75.00' },
          { name: 'Service F', quantity: 2, price: '$75.00' },
        ],
        paymentMethod: 'Bank Transfer',
        transactionId: 'TXN1003',
      },
    },
    {
      date: '2024-04-18',
      invoiceNo: 'INV123459',
      orderNo: 'ORD987657',
      jobNo: 'JOB112236',
      customerName: 'Alice Johnson',
      mobileNo: '9876543213',
      emailId: 'alice.johnson@example.com',
      address: '101 Maple St, Springfield',
      dueDate: '2024-04-23',
      total: '$400.00',
      invoiceDetails: {
        items: [
          { name: 'Product G', quantity: 5, price: '$80.00' },
          { name: 'Service H', quantity: 3, price: '$60.00' },
        ],
        paymentMethod: 'Cash',
        transactionId: 'TXN1004',
      },
    },
  ];

  isModalVisible = false;
  selectedInvoice: any = null;
  showInvoiceModal(data: any): void {
    this.selectedInvoice = data;
    this.isModalVisible = true;
  }

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
  }

  showaction(){
    this.showactionlog=true
    this.showinvoicetable=false
    this.showjobcard=false
    this.showverification=false
    this.showchat=false
    this.showmap=false
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
  showwmapp(){
    this.showactionlog=false
    this.showinvoicetable=false
    this.showjobcard=false
    this.showverification=false
    this.showchat=false
    this.showmap=true
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
}
