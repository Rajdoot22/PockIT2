import { Component, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatePipe } from '@angular/common';
import { ApiServiceService } from './Service/api-service.service';
import { environment } from 'src/environments/environment.prod';
import { getMessaging, getToken } from 'firebase/messaging';
import { NgForm } from '@angular/forms';
import { CommonFunctionService } from './Service/CommonFunctionService';
import { Subscription } from 'rxjs';
import { customer } from './Pages/Models/customer';
import { VendorMasterData } from './Pages/Models/vendorMaterData';
export class PasswordData {
  LOGIN_ID: any;
  OLD_PASSWORD: any;
  NEW_PASSWORD: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent {
  isCollapsed: boolean = false;
  isLogedIn: boolean = false;
  public commonFunction = new CommonFunctionService()
  selectedRecord2 :any =  new VendorMasterData();
  userId = sessionStorage.getItem('userId');
  decrepteduserIDString = this.userId ? this.commonFunction.decryptdata(this.userId) : '';
  decrepteduserID = parseInt(this.decrepteduserIDString, 10);

  roleId = sessionStorage.getItem('roleId');
  decreptedroleIdString = this.roleId ? this.commonFunction.decryptdata(this.roleId) : '';
  decreptedroleId = parseInt(this.decreptedroleIdString, 10);

  USERNAME = sessionStorage.getItem('userName');
  decreptedUserName = this.USERNAME ? this.commonFunction.decryptdata(this.USERNAME) : '';

  Emaiid = sessionStorage.getItem('emailId');
  decryptedEmail = this.Emaiid ? this.commonFunction.decryptdata(this.Emaiid) : '';

  MobileNo = sessionStorage.getItem('mobile');
  year: any;
  level = Number(this.cookie.get('level'));
  menus: any[] = [];

  RoleDetails: any = sessionStorage.getItem('roledetailss');

  RoleName: any = sessionStorage.getItem('roleName');
  screenwidth = 0;
  currentroute = window.location.href;
  ROLE_ID: any;
  passwordData = new PasswordData();

  private routerSubscription: Subscription;
  constructor(
    private router: Router,
    private cookie: CookieService,
    private _notificationService: NzNotificationService,
    private datePipe: DatePipe,
    private api: ApiServiceService
  ) {
    // this.loggerInit();
  }

  loggerInit() {
    if (
      this.cookie.get('supportKey') === '' ||
      this.cookie.get('supportKey') === null
    ) {
      this.api.loggerInit().subscribe(
        (data) => {
          if (data['code'] == 200) {
            this.cookie.set(
              'supportKey',
              data['data'][0]['supportkey'],
              365,
              '',
              '',
              false,
              'Strict'
            );
          }
        },
        () => { }
      );
    } else {
    }
  }

  roleDetails: any[];
  roleNames: string[] = [];
  lastlogin: any = sessionStorage.getItem('lastlogindate');
  decryptedLastLogin = this.lastlogin ? this.commonFunction.decryptdata(this.lastlogin) : '';

  ngOnInit(): void {

    if (this.cookie.get('token') === '' || this.cookie.get('token') === null) {
      this.isLogedIn = false;
      // this.api.logoutForSessionValues();
      sessionStorage.clear();
      localStorage.clear();
      this.cookie.delete('token');
      this.cookie.delete('supportKey');
      this.cookie.delete('roleId');
      this.cookie.delete('emailId');
      this.cookie.delete('userId');
      this.router.navigate(['/login']);
    } else {
      if (this.decrepteduserID && this.decreptedroleId != 0) {
        this.isLogedIn = true;
        this.loadForms();
      } else {
        this.isLogedIn = false;
        // this.api.logoutForSessionValues();
        sessionStorage.clear();
        localStorage.clear();
        this.cookie.delete('token');
        this.cookie.delete('supportKey');
        this.cookie.delete('roleId');
        this.cookie.delete('emailId');
        this.cookie.delete('userId');
        this.router.navigate(['/login']);
      }

    }

    this.year = new Date().getFullYear();

    this.RoleDataGet();
    const roleDetailsString: any = sessionStorage.getItem('roledetailss');
    this.roleDetails = JSON.parse(roleDetailsString);

    if (this.roleDetails) {
      this.roleDetails.forEach((role) => {
        this.roleNames.push(role.ROLE_NAME);
      });
    }

    this.lastlogin = this.datePipe.transform(
      this.decryptedLastLogin,
      'dd/MMM/yyyy, hh:mm:ss a'
    );

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Clear search query on route change
        this.searchQuery = '';
      }
    });

    this.onMasterChange(this.selectedMaster1);
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  callAfterMessageReceived() { }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebase.apiKey })
      .then((currentToken) => {
        if (currentToken) {
          this.cookie.set('CLOUD_ID', currentToken, 365, '', '', true, 'None');
        }
      })
      .catch(() => {
        Notification.requestPermission().then(function () { });
      });
  }

  forms: any[] = [];
  allTitles: any[] = [];
  titleWiseChildren: Record<string, any[]> = {};

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  loadForms() {

    this.api.getForms(this.decreptedroleId).subscribe((data) => {
      if (data['code'] == 200 && data['data']) {
        data['data'].forEach((element: any) => {
          element['children'].sort(this.sortFunction);
          if (element['children'].length == 0) delete element['children'];
        });

        this.menus = data['data'].sort(this.sortFunction);

        this.forms = data['data'];

        // Create an object that maps each title to its corresponding children
        this.titleWiseChildren = this.forms.reduce((acc, item) => {
          acc[item.title] = item.children;  // Associate title with its children
          return acc;
        }, {});

        // Collecting all titles from the nested children arrays
        this.allTitles = this.forms.flatMap(category => category.children ? category.children.map(item => item.title) : []);

      }
    });
  }

  selectedMaster: string = '';
  navigateToMaster(masterLink: string) {
    this.router.navigate([masterLink]);
  }

  sortFunction(a, b) {
    var dateA = a.SEQ_NO;
    var dateB = b.SEQ_NO;
    return dateA > dateB ? 1 : -1;
  }

  isSpinning: boolean = false;

  logout() {
    this.cookie.deleteAll();
    sessionStorage.clear();
    this._notificationService.success('Logout Successfully', '');
    window.location.reload();
    // this.router.navigateByUrl('/login', { replaceUrl: false });
    // this.router.navigate(['/login']).then(() => {
    //   window.location.reload();
    // });
  }

  rolesData: any = [];

  RoleDataGet() {
    if (this.RoleDetails && this.RoleDetails.length > 0) {
      let tempRoleDetails: any = JSON.parse(this.RoleDetails);
      let roleIDS: any = [];
      tempRoleDetails.forEach((element) => {
        roleIDS.push(element.ROLE_ID);
      });

      this.api
        .getAllRoles(0, 0, '', '', ' AND ID in (' + roleIDS.toString() + ')')
        .subscribe(
          (data) => {
            if (data['code'] == 200) {
              this.rolesData = data['data'];
              this.ROLE_ID = this.decreptedroleId;
            } else {
              this.rolesData = [];
            }
          },
          () => { }
        );
    } else {
      this.rolesData = [];
    }
  }

  isChangePasswordVisible = false;

  isChangePassword() {
    this.visiblesave = true;
  }

  isChangePasswordCancel() {
    this.resetForm();
    this.isChangePasswordVisible = false;
  }

  isPasswordVisible: boolean = false;
  passwordVisible: boolean = false;
  newPasswordVisible: boolean = false;
  reEnterNewPasswordVisible: boolean = false;
  checkPasswordLoading: boolean = false;
  resetPasswordLoading: boolean = false;
  showConfirmPassword: boolean = false;
  PASSWORD: any = '';
  NEWPASSWORD: any = '';
  CONFPASSWORD: any = '';
  isLoading = false;

  checkPassword(): void {
    let isOk = true;

    // Check if all fields are undefined, null, or empty
    if (
      (!this.PASSWORD || this.PASSWORD.trim() === '') &&
      (!this.NEWPASSWORD || this.NEWPASSWORD.trim() === '') &&
      (!this.CONFPASSWORD || this.CONFPASSWORD.trim() === '')
    ) {
      isOk = false;
      this._notificationService.error(
        'Please fill all the required fields',
        ''
      );
      return;
    }

    // Check if current PASSWORD is filled
    if (!this.PASSWORD || this.PASSWORD.trim() === '') {
      isOk = false;
      this._notificationService.error('Please Enter Current Password', '');
    }

    if (isOk) {
      this.NEWPASSWORD = this.NEWPASSWORD == undefined ? '' : this.NEWPASSWORD;
      this.CONFPASSWORD =
        this.CONFPASSWORD == undefined ? '' : this.CONFPASSWORD;

      if (this.NEWPASSWORD.trim() !== '') {
        if (this.NEWPASSWORD.length < 8) {
          isOk = false;
          this._notificationService.error(
            'Password must be at least 8 characters long.',
            ''
          );
        } else if (this.PASSWORD && this.NEWPASSWORD === this.PASSWORD) {
          isOk = false;
          this._notificationService.error(
            'Change the New Password',
            'Your new password is similar to the old password. Please choose a different password.'
          );
        } else if (this.CONFPASSWORD.trim() === '') {
          isOk = false;
          this._notificationService.error('Please Enter Confirm Password.', '');
        } else if (this.NEWPASSWORD !== this.CONFPASSWORD) {
          isOk = false;
          this._notificationService.error(
            'Password Mismatch',
            'The new password and the confirmation password do not match. Please ensure both fields contain the same password.'
          );
        }
      } else {
        isOk = false;
        this._notificationService.error('Please Enter New Password', '');
      }
    }

    if (isOk) {
      this.resetPasswordLoading = true;
      this.passwordData.LOGIN_ID = this.decryptedEmail;
      this.passwordData.OLD_PASSWORD = this.PASSWORD;
      this.passwordData.NEW_PASSWORD = this.CONFPASSWORD;
      this.isLoading = true; // Show the spinner
      this.api.changePassword(this.passwordData).subscribe(
        (successCode) => {
          if (successCode['code'] == 200) {
            this.resetPasswordLoading = false;
            this._notificationService.success(
              'Password Reset Successfully',
              ''
            );
            this.resetForm();
            this.isPasswordVisible = false;
            this.isLoading = false;
            this.showConfirmPassword = false;
            this.isChangePasswordVisible = false;
          } else if (successCode['message'] == 'invalid old password ') {
            this._notificationService.info(
              'Invalid Old Password',
              'The old password you entered is incorrect. Please double-check and try again.'
            );
            this.resetPasswordLoading = false;
            this.isLoading = false;
          } else {
            this.resetPasswordLoading = false;
            this.isLoading = false;
            this._notificationService.error('Failed to Reset Password', '');
          }
        },
        () => {
          this.resetPasswordLoading = false;
          this.isLoading = false;
          this._notificationService.error('Failed to Reset Password', '');
        }
      );
    }
  }
  @ViewChild('resetform') resetform: NgForm;
  resetForm(): void {
    // Reset form fields
    this.PASSWORD = '';
    this.NEWPASSWORD = '';
    this.CONFPASSWORD = '';

    // Reset the form's dirty and touched states to avoid showing validation errors
    if (this.resetform) {
      this.resetform.resetForm();
    }
  }
  sendNotiDrawerVisible = false;
  sendNotiDrawerTitle: string;
  // @ViewChild(AddNewNotificationDrawerComponent, { static: false })
  // AddNewNotificationDrawerComponentVar: AddNewNotificationDrawerComponent;
  // add(): void {
  //   this.sendNotiDrawerVisible = true;
  //   this.sendNotiDrawerTitle = 'Send Notification';
  //   this.AddNewNotificationDrawerComponentVar.NotificationMode = 'E';
  //   // this.AddNewNotificationDrawerComponentVar.disableRadioButtons();
  //   // this.AddNewNotificationDrawerComponentVar.changeRadioButton('I');
  //   this.AddNewNotificationDrawerComponentVar.NOTI_TYPE = 'T';
  // }
  sendNotiDrawerClose() {
    this.sendNotiDrawerVisible = false;
    // this.pageSize = 8;
    // this.getNotifications(this.ttype);
  }

  get sendNotiDrawerCloseCallback() {
    return this.sendNotiDrawerClose.bind(this);
  }

  // Notification Drawer Code
  isNotificationVisible = false;

  isNotification() {
    this.isNotificationVisible = true;
  }

  isNotificationCancel() {
    this.resetForm();
    this.isNotificationVisible = false;
  }

  searchTerm = '';
  selectedTab = 'all'; // Current active tab ('all', 'mentions', 'appointments')

  // Sample Notifications
  notifications = [
    // { type: 'Info', category: 'mentions', message: 'You were mentioned in a comment.' },
    { type: 'Warning', category: 'appointments', message: 'Upcoming meeting at 3 PM.' },
    { type: 'Success', category: 'all', message: 'Your document was approved.' },
    { type: 'Error', category: 'all', message: 'Failed to upload the file.' }
  ];

  // Notifications filtered based on the active tab and search input
  filteredNotifications = [...this.notifications];

  // Filter notifications based on the active tab and search input
  filterNotifications(): void {
    this.filteredNotifications = this.notifications.filter(
      (notification) =>
        (this.selectedTab === 'all' || notification.category === this.selectedTab) &&
        notification.message.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Handle search input changes
  onSearch(): void {
    this.filterNotifications();
  }

  // Handle tab change
  onTabChange(selectedIndex: any): void {
    // Map tab index to category ('all', 'mentions', 'appointments')
    const tabMapping = ['all', 'mentions', 'appointments'];
    this.selectedTab = tabMapping[selectedIndex];
    this.filterNotifications();
  }

  // Profile Drawer Code
  isProfileVisible = false;

  isProfile() {
    this.isProfileVisible = true;
  }

  isProfileCancel() {
    this.resetForm();
    this.isProfileVisible = false;
  }

  public visiblesave = false;

  saveQuery() {
    this.visiblesave = !this.visiblesave;
  }

  handleOkTop(): void {
    let isOk = true;

    // Check if all fields are undefined, null, or empty
    if (
      (!this.PASSWORD || this.PASSWORD.trim() === '') &&
      (!this.NEWPASSWORD || this.NEWPASSWORD.trim() === '') &&
      (!this.CONFPASSWORD || this.CONFPASSWORD.trim() === '')
    ) {
      isOk = false;
      this._notificationService.error(
        'Please fill all the required fields',
        ''
      );
      return;
    }

    // Check if current PASSWORD is filled
    if (!this.PASSWORD || this.PASSWORD.trim() === '') {
      isOk = false;
      this._notificationService.error('Please Enter Current Password', '');
    }

    if (isOk) {
      this.NEWPASSWORD = this.NEWPASSWORD == undefined ? '' : this.NEWPASSWORD;
      this.CONFPASSWORD =
        this.CONFPASSWORD == undefined ? '' : this.CONFPASSWORD;

      if (this.NEWPASSWORD.trim() !== '') {
        if (this.NEWPASSWORD.length < 8) {
          isOk = false;
          this._notificationService.error(
            'Password must be at least 8 characters long.',
            ''
          );
        } else if (this.PASSWORD && this.NEWPASSWORD === this.PASSWORD) {
          isOk = false;
          this._notificationService.error(
            'Change the New Password',
            'Your new password is similar to the old password. Please choose a different password.'
          );
        } else if (this.CONFPASSWORD.trim() === '') {
          isOk = false;
          this._notificationService.error('Please Enter Confirm Password.', '');
        } else if (this.NEWPASSWORD !== this.CONFPASSWORD) {
          isOk = false;
          this._notificationService.error(
            'Password Mismatch',
            'The new password and the confirmation password do not match. Please ensure both fields contain the same password.'
          );
        }
      } else {
        isOk = false;
        this._notificationService.error('Please Enter New Password', '');
      }
    }

    if (isOk) {
      this.resetPasswordLoading = true;
      this.passwordData.LOGIN_ID = this.decryptedEmail;
      this.passwordData.OLD_PASSWORD = this.PASSWORD;
      this.passwordData.NEW_PASSWORD = this.CONFPASSWORD;
      this.isLoading = true; // Show the spinner
      this.api.changePassword(this.passwordData).subscribe(
        (successCode) => {
          if (successCode['code'] == 200) {
            this.resetPasswordLoading = false;
            this._notificationService.success(
              'Password Reset Successfully',
              ''
            );
            this.resetForm();
            this.isPasswordVisible = false;
            this.isLoading = false;
            // this.showConfirmPassword = false;
            this.visiblesave = false;
            // this.isChangePasswordVisible = false;
          } else if (successCode['message'] == 'invalid old password ') {
            this._notificationService.info(
              'Invalid Old Password',
              'The old password you entered is incorrect. Please double-check and try again.'
            );
            this.resetPasswordLoading = false;
            this.isLoading = false;
          } else {
            this.resetPasswordLoading = false;
            this.isLoading = false;
            this._notificationService.error('Failed to Reset Password', '');
          }
        },
        () => {
          this.resetPasswordLoading = false;
          this.isLoading = false;
          this._notificationService.error('Failed to Reset Password', '');
        }
      );
    }

  }

  handleCancelTop(): void {
    this.resetForm();
    this.visiblesave = false;
  }

  masters = [
    { name: 'Customer', apiEndpoint: 'customer/get', url:'masters/customers' },
    { name: 'Vendor', apiEndpoint: 'vendor/get', url:'masters/vendor_master' },
  ];

  selectedMaster1 = this.masters[0];
  masterRecords: any[] = [];
  searchQuery: string = '';
  drawerVisible: boolean = false;
  selectedRecord: customer = new customer();
  drawerTitle: string = '';

  onMasterChange(value:any) {
    this.selectedMaster1 = value;

    if (!this.selectedMaster1) {
      this.masterRecords = [];
      return;
    }

    this.fetchRecords(this.selectedMaster1.apiEndpoint);
  }

  fetchRecords(apiEndpoint: string) {
    this.masterRecords = []; // Clear the current records
    this.api.getRecords(0, 0, "", "", "", apiEndpoint).subscribe({
      next: (records) => {
        this.masterRecords = records['data'];
      },
      error: (err) => {
        console.error('Failed to fetch records:', err);
      }
    });
  }

  matchedRecord: any;
  onSearch1() {
    // if (!this.selectedMaster1) {
    //   this._notificationService.error('Please select a master and enter a search.','');
    // }

    // Search when input length is 3 or more
    if (this.searchQuery.length >= 3) {
      this.matchedRecord = this.masterRecords.find(record =>
        Object.values(record).some(value =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    } else {
      this.matchedRecord = null;
    }
  }

  onMatchedRecordClick() {
    if (this.matchedRecord) {
      this.selectedRecord = this.matchedRecord;
      // this.drawerTitle = `Update ${this.selectedMaster1.name}`;
      this.router.navigate([this.selectedMaster1.url]);
      // this.drawerVisible = true;
      this.searchQuery = '';
    }
  }

  closeCallback = () => {
    this.drawerVisible = false;
    this.selectedRecord = new customer(); // Clear the selected record when closing
  };

  drawerClose = () => {
    this.drawerVisible = false;
    this.selectedRecord = new customer();  // Optionally reset the selected record
  }

  reset(){
    this.searchQuery = '';
  }
}
