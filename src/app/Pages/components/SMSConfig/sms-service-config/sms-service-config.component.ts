import { Component, Input } from '@angular/core';
import { smsservice } from 'src/app/Pages/Models/smsservice';

@Component({
  selector: 'app-sms-service-config',
  templateUrl: './sms-service-config.component.html',
  styleUrls: ['./sms-service-config.component.css']
})
export class SmsServiceConfigComponent {
  @Input()data:smsservice
  @Input() drawerClose: any;
  @Input()drawerVisible:boolean
  passwordVisible: boolean = false;
  isSpinning:boolean=false
  senderIds:any=[]
  countryCodes:any=[]
  Close(){
  this.drawerClose
  }
  timeLogs = [
    {
      date: '2024-04-15',
      time: '',
      action: 'Order Placed',
      description: '10 Apr. 2024, 10:40 AM',
    },
    {
      date: '2024-04-15',
      time: '11:00 AM',
      action: 'Order Accepted ',
      description: '11 Apr. 2024, 04:00 PM',

    },
    {
      date: '2024-04-15',
      time: '02:00 PM',
      action: 'Job Scheduled',
      description: '12 Apr. 2024, 11:50 AM',

    },
    {
      date: '2024-04-16',
      time: '09:00 AM',
      action: 'Job Done',
      description: '15 Apr. 2024, 03:40 PM',

    },
  ];

  // Current step index
  currentStep = 2;

  // Get status for each step
  getStatus(index: number): 'finish' | 'process' | 'wait' {
    if (index < this.currentStep) return 'finish';
    if (index === this.currentStep) return 'process';
    return 'wait';
  }

}
