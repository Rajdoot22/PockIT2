import { Component, Input } from '@angular/core'; 
import { whatsapptemplate } from 'src/app/Pages/Models/whatsapptemplate';

@Component({
  selector: 'app-templatepreview',
  templateUrl: './templatepreview.component.html',
  styleUrls: ['./templatepreview.component.css']
})
export class TemplatepreviewComponent {
@Input() data : whatsapptemplate
@Input() drawerClose1
inputBody
upload='Whatsapp_Document.pdf'
TYPE='pdf'
inputValue
video='./assets/video.MP4'
image='./assets/demoimage.png'
Date
ngOnInit() {

  
}
showfile(){

}
}
