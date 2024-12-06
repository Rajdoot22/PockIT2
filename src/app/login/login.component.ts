import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../Service/api-service.service';
import { UserMaster } from '../CommonModels/user-master';
import { environment } from 'src/environments/environment.prod';
import { CommonFunctionService } from '../Service/CommonFunctionService';
import { HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

export class PasswordData {
  TYPE: string;
  TYPE_VALUE: any;
  OTP: any;
  RID: any;
  VID: any;
}

export class ChangePasswordData {
  TYPE: string;
  TYPE_VALUE: any;
  PASSWORD: any;
  CONFIRM_PASSWORD: any;
  VID: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: UserMaster = new UserMaster();
  passwordData = new PasswordData();
  changePasswordData = new ChangePasswordData();
  EMAIL_ID = '';
  PASSWORD = '';
  NEW_PASSWORD = '';
  supportKey = '';
  ORGANIZATION_ID: number | undefined;
  passwordVisible: boolean = false;
  newpasswordVisible: boolean = false;
  isloginSpinning: boolean = false;
  isLogedIn: boolean = false;
  isOk: boolean = true;
  roleId = localStorage.getItem('roleId');

  constructor(
    private router: Router,
    private api: ApiServiceService,
    private message: NzNotificationService,
    private cookie: CookieService
  ) { }

  currentApplicationVersion: any;
  public commonFunction = new CommonFunctionService();
  showOTP: boolean = false;
  TYPE_VALUE: any;
  TYPE = 'E';
  OTP: any;

  ngOnInit(): void {
    this.currentApplicationVersion = environment.appVersioning.appVersion;
    if (this.cookie.get('token') === '' || this.cookie.get('token') === null) {
      this.isLogedIn = false;
      this.router.navigate(['/login']);
    } else {
      this.isLogedIn = true;
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (this.EMAIL_ID == '' && this.PASSWORD == '') {
      this.isOk = false;
      this.message.error('Please Enter  Email ID and Password.', '');
    } else if (this.EMAIL_ID == null || this.EMAIL_ID.trim() == '') {
      this.isOk = false;
      this.message.error('Please Enter Email', '');
    } else if (!this.commonFunction.emailpattern.test(this.EMAIL_ID)) {
      this.isOk = false;
      this.message.error('Please Enter a Valid Email ID', '');
    } else if (this.PASSWORD == null || this.PASSWORD.trim() == '') {
      this.isOk = false;
      this.message.error('Please Enter Password', '');
    } else {
      this.isloginSpinning = true;

      this.api.login(this.EMAIL_ID, this.PASSWORD).subscribe(
        (data) => {
          
          if (data['code'] == '200') {
            this.isloginSpinning = false;
            this.message.success('Successfully Logged In', '');
            this.cookie.set(
              'token',
              data['data'][0]['token'],
              365,
              '',
              '',
              false,
              'Strict'
            );
            sessionStorage.setItem(
              'userId',
              this.commonFunction.encryptdata((data['data'][0]['UserData'][0]['USER_ID']).toString())
            );
            sessionStorage.setItem(
              'userName',
              this.commonFunction.encryptdata(data['data'][0]['UserData'][0]['NAME'])
            );
            sessionStorage.setItem(
              'roleId',
              this.commonFunction.encryptdata((data['data'][0]['UserData'][0]['ROLE_ID']).toString())
            );
            sessionStorage.setItem(
              'emailId',
            this.commonFunction.encryptdata(data['data'][0]['UserData'][0]['EMAIL_ID'])
            );
            if (
              data['data'][0]['UserData'][0]['LAST_LOGIN_DATETIME'] != null &&
              data['data'][0]['UserData'][0]['LAST_LOGIN_DATETIME'] != undefined
            ) {
              sessionStorage.setItem(
                'lastlogindate',
              this.commonFunction.encryptdata(data['data'][0]['UserData'][0]['LAST_LOGIN_DATETIME'])
              );
            }
            sessionStorage.setItem(
              'roomnumber',
             this.commonFunction.encryptdata(data['data'][0]['UserData'][0]['ROOM_NUMBER'])
            );
            sessionStorage.setItem(
              'designationid',
              this.commonFunction.encryptdata(data['data'][0]['UserData'][0]['DESIGNATION_ID'])
            );
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();
            });
          } else {
            this.isloginSpinning = false;
            this.message.error('You have entered wrong credentials', '');
          }
        },
        (err: HttpErrorResponse) => {
          this.isloginSpinning = false;
          if (err.error instanceof ErrorEvent) {
            // Client-side or network error
            this.message.error(
              'Network error: Please check your connection and try again.',
              ''
            );
          } else {
            // Backend returned an unsuccessful response code
            this.message.error('Something Went Wrong...', '');
          }
        }
      );
    }
  }

}
