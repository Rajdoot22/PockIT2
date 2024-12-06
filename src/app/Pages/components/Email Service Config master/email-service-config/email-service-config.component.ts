import { Component, Input } from '@angular/core';
import { emailserviceconfig } from 'src/app/Pages/Models/emailserviceconfig';

@Component({
  selector: 'app-email-service-config',
  templateUrl: './email-service-config.component.html',
  styleUrls: ['./email-service-config.component.css']
})
export class EmailServiceConfigComponent {
@Input()data:emailserviceconfig
@Input() drawerClose: any;
@Input()drawerVisible:boolean
isSpinning:boolean=false
Close(){
this.drawerClose
}
passwordVisible: boolean = false;
}
