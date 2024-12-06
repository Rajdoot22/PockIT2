import { Component, OnInit } from '@angular/core';
import { CommonFunctionService } from '../Service/CommonFunctionService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  // userName: string = String(sessionStorage.getItem('userName'));
  // emailId: string = String(sessionStorage.getItem('emailId'));

  public commonFunction = new CommonFunctionService()

  userName = sessionStorage.getItem('userName');
  decreptedUserName = this.userName ? this.commonFunction.decryptdata(this.userName) : '';
  emailId = sessionStorage.getItem('emailId');
  decryptedEmail = this.emailId ? this.commonFunction.decryptdata(this.emailId) : '';

  constructor() { }
  ngOnInit() { }
}