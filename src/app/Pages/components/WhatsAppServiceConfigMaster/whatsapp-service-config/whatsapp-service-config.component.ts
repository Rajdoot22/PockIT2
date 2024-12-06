import { Component, Input } from '@angular/core';
import { whatsappconfig } from 'src/app/Pages/Models/whatsappconfig';

@Component({
  selector: 'app-whatsapp-service-config',
  templateUrl: './whatsapp-service-config.component.html',
  styleUrls: ['./whatsapp-service-config.component.css']
})
export class WhatsappServiceConfigComponent {
  @Input()data:whatsappconfig
  @Input() drawerClose: any;
  @Input()drawerVisible:boolean
  isSpinning:boolean=false
  passwordVisible: boolean = false;
  senderIds:any=[]
  countryCodes:any=[]
  phoneNumbers:any=[]
  Close(){
  this.drawerClose
  }
}
