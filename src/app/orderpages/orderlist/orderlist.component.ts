import { Component } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent {
 date=new Date();

 drawerTitle: string = '';
 drawerVisible = false;
 vieworder(): void {
   this.drawerTitle = 'Manege Jobs';
   
   this.drawerVisible = true;
   // this.api.getCity(1, 1, 'SEQ_NO', 'desc', '' + '').subscribe(data => {
   //   if (data['count'] == 0) {
   //     this.drawerData.SEQ_NO = 1;

   //   } else {
   //     this.drawerData.SEQ_NO = data['data'][0]['SEQ_NO'] + 1;
   //   }

   // }, err => {
   //   console.log(err);
   // })

 
 }

 drawersize='85%'
 drawerClose(): void {

   this.drawerVisible = false;
 }
 ordercreateVisible:boolean=false
 //Drawer Methods
 get closeCallback() {
   return this.drawerClose.bind(this);
 }
 drawerCloseorder(): void {

   this.ordercreateVisible = false;
 }

 //Drawer Methods
 get closeCallbackorder() {
   return this.drawerCloseorder.bind(this);
 }

 isfilterapply: boolean = false;

 createneworder(){
  this.ordercreateVisible=true

 }



 
}
