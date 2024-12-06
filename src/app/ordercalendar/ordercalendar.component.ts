// import { Component, Input, ViewChild } from '@angular/core';
// import {
//   formatDate,
//   MbscCalendarEvent,
//   MbscDatepickerOptions,
//   MbscEventcalendar,
//   MbscEventcalendarOptions,
//   MbscPopup,
//   MbscPopupOptions,
//   MbscResource,
//   Notifications,
//   setOptions,
// } from '@mobiscroll/angular';

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// })
// @Component({
//   selector: 'app-ordercalendar',
//   templateUrl: './ordercalendar.component.html',
//   styleUrls: ['./ordercalendar.component.css'],
//   providers: [Notifications],
// })
// export class OrdercalendarComponent {
//   constructor(private notify: Notifications) {}


//   @ViewChild('calendar', { static: false })
//   calendar!: MbscEventcalendar;

//   @ViewChild('popup', { static: false })
//   popup!: MbscPopup;

//   popupEventTitle: string | undefined;
//   popupEventLocation: string | undefined;
//   popupEventBill: number | undefined;
//   popupEventNotes: string | undefined;
//   popupEventDates: any;
//   formatDate = formatDate;
//   myEvents: MbscCalendarEvent[] = [
//     {
//       start: '2024-11-23T06:00',
//       end: '2024-11-23T14:00',
//       title: 'Farmhouse TPH',
//       location: '3339 Spruce Drive',
//       resource: ['d2', 'cm2', 'd4', 'cp1', 'cm2', 'ce2', 'b1'],
//       color: '#12ca6c',
//       cost: 48000,
//     },
//     {
//       start: '2024-11-24T08:00',
//       end: '2024-11-24T18:00',
//       title: 'Block of flats KXT',
//       location: '4698 Mercer Street',
//       resource: ['d1', 'cm1', 'd3', 'cp1', 'cm3', 'ce2', 'b2'],
//       color: '#c170c3',
//       cost: 36000,
//     },
//     {
//       start: '2024-11-25T12:00',
//       end: '2024-11-25T20:00',
//       title: 'Apartment house UGL',
//       location: '3647 Tavern Place',
//       resource: ['d3', 'cm2', 'd4', 'cp2', 'cm3', 'ce1', 'b2'],
//       color: '#03c9d2',
//       cost: 50000,
//     },
//     {
//       start: '2024-11-26T11:00',
//       end: '2024-11-26T19:00',
//       title: 'Detached house WKB',
//       location: '956 Dovetail Estates',
//       resource: ['d1', 'cm3', 'd4', 'cp3', 'cm4', 'c2', 'b1', 'ce2'],
//       color: '#ff1515',
//       cost: 55000,
//     },
//     {
//       start: '2024-11-27T10:00',
//       end: '2024-11-27T18:00',
//       title: 'Apartment house XAZ',
//       location: '4919 Jett Lane, Inglewood',
//       resource: ['d1', 'cm4', 'd4', 'cp1', 'cm2', 'c2', 'b2'],
//       color: '#12ca6c',
//       cost: 62000,
//     },
//     {
//       start: '2024-11-27T08:00',
//       end: '2024-11-27T16:00',
//       title: 'Block of flats DRG',
//       location: '486 Sycamore Fork Road',
//       resource: ['d2', 'cm1', 'd3', 'cp2', 'ce2', 'c1', 'b1'],
//       color: '#efd414',
//       cost: 39000,
//     },
//     {
//       start: '2024-11-28T09:00',
//       end: '2024-11-28T17:00',
//       title: 'Farmhouse YQK',
//       location: '1563 Retreat Avenue',
//       resource: ['d2', 'cm4', 'd4', 'cm2', 'cp1', 'c2', 'b2'],
//       color: '#cf49d8',
//       cost: 45000,
//     },
//     {
//       start: '2024-11-29T07:00',
//       end: '2024-11-29T15:00',
//       title: 'Apartment house SWP',
//       location: '628 Daylene Drive',
//       resource: ['d2', 'cm3', 'd3', 'cm1', 'cp2', 'c1', 'b1'],
//       color: '#c170c3',
//       cost: 53000,
//     },
//     {
//       start: '2024-11-30T10:00',
//       end: '2024-11-30T18:00',
//       title: 'Detached house OZL',
//       location: '1830 Rinehart Road',
//       resource: ['d3', 'cm2', 'd4', 'cp2', 'cm3', 'ce1', 'b2'],
//       color: '#ff1515',
//       cost: 47000,
//     },
//     {
//       start: '2024-12-01T11:00',
//       end: '2024-12-01T19:00',
//       title: 'Farmhouse PSZ',
//       location: '2410 Union Street',
//       resource: ['d1', 'cm3', 'd4', 'cp3', 'cm4', 'c2', 'b1', 'ce2'],
//       color: '#ff1515',
//       cost: 64000,
//     },
//   ];
//   myResources11: MbscResource[] = [
//     {
//       id: 'b1',
//       name: 'Jude Chester',
//     },
//     {
//       id: 'b2',
//       name: 'Willis Kane',
//     },
//   ];
//   myResources: MbscResource[] = [
//     {
//       id: 'b1',
//       name: 'Jude Chester',
//     },
//     {
//       id: 'b2',
//       name: 'Willis Kane',
//     },
//     {
//       id: 'c1',
//       name: 'Derek Austyn',
//     },
//     {
//       id: 'c2',
//       name: 'Merv Kenny',
//     },
//     {
//       id: 'ce1',
//       name: 'Ford Kaiden',
//     },
//     {
//       id: 'ce2',
//       name: 'Jewell Ryder',
//     },

   
//   ];
//   tempEvent!: MbscCalendarEvent;
//   getCostString(cost: any): any {
//     return cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//   }
//   getRevenue(args: any): any {
//     const events = args.events;
//     let costs = 0;

//     if (events) {
//       for (const event of events) {
//         costs += event.cost;
//       }
//     }
//     return 'Total revenue: $' + this.getCostString(costs);
//   }
//   calendarOptions: MbscEventcalendarOptions = {
//     clickToCreate: 'double',
//     dragToCreate: true,
//     dragToMove: true,
//     dragToResize: true,
//     dragTimeStep: 30,
//     view: {
//       timeline: {
//         type: 'week',
//         startDay: 1,
//         endDay: 5,
//       },
//     },
//     onEventClick: (args) => {
//       this.isEdit = true;
//       this.tempEvent = args.event;
//       // fill popup form with event data
//       this.loadPopupForm(args.event);
//       // set popup options
//       this.popupHeaderText = 'Edit event';
//       this.popupButtons = this.popupEditButtons;
//       this.popupAnchor = args.domEvent.currentTarget;
//       // open the popup
//       this.popup.open();
//     },
//     onEventCreated: (args) => {
//       setTimeout(() => {
//         this.isEdit = false;
//         this.tempEvent = args.event;
//         // fill popup form with event data
//         this.loadPopupForm(args.event);
//         // set popup options
//         this.popupHeaderText = 'New work order';
//         this.popupButtons = this.popupAddButtons;
//         this.popupAnchor = args.target;
//         // open the popup
//         this.popup.open();
//       });
//     },
//     onEventDeleted: (args) => {
//       setTimeout(() => {
//         this.deleteEvent(args.event);
//       });
//     },
//     onEventUpdated: () => {
//       // here you can update the event in your storage as well, after drag & drop or resize
//       // ...
//     },
//   };
//   popupHeaderText!: string;
//   popupAnchor: HTMLElement | undefined;
//   popupAddButtons = [
//     'cancel',
//     {
//       handler: () => {
//         this.saveEvent();
//       },
//       keyCode: 'enter',
//       text: 'Add',
//       cssClass: 'mbsc-popup-button-primary',
//     },
//   ];
//   popupEditButtons = [
//     'cancel',
//     {
//       handler: () => {
//         this.saveEvent();
//       },
//       keyCode: 'enter',
//       text: 'Save',
//       cssClass: 'mbsc-popup-button-primary',
//     },
//   ];
//   popupButtons: any = [];
//   popupOptions: MbscPopupOptions = {
//     display: 'bottom',
//     contentPadding: false,
//     fullScreen: true,
//     onClose: () => {
//       if (!this.isEdit) {
//         // refresh the list, if add popup was canceled, to remove the temporary event
//         this.myEvents = [...this.myEvents];
//       }
//     },
//     responsive: {
//       medium: {
//         display: 'anchored',
//         width: 520,
//         fullScreen: false,
//         touchUi: false,
//       },
//     },
//   };
//   datePickerOptions: MbscDatepickerOptions = {
//     controls: ['time'],
//     select: 'range',
//     showRangeLabels: false,
//     touchUi: false,
//     stepMinute: 30,
//     minTime: '06:00',
//     maxTime: '22:00',
//   };
//   isEdit = false;
//   loadPopupForm(event: MbscCalendarEvent): void {
//     this.popupEventTitle = event.title;
//     this.popupEventLocation = event['location'];
//     this.popupEventBill = +event['cost'] || 0;
//     this.popupEventNotes = event['notes'];
//     this.popupEventDates = [event.start, event.end];
//     this.setCheckboxes(event.resource);
//   }
//   saveEvent(): void {
//     this.tempEvent.title = this.popupEventTitle;
//     this.tempEvent['location'] = this.popupEventLocation;
//     this.tempEvent['cost'] = +this.popupEventBill! || 0;
//     this.tempEvent['notes'] = this.popupEventNotes;
//     this.tempEvent.start = this.popupEventDates[0];
//     this.tempEvent.end = this.popupEventDates[1];
//     this.tempEvent.resource = this.getCheckedResources();
//     if (this.isEdit) {
//       // update the event in the list
//       this.myEvents = [...this.myEvents];
//       // here you can update the event in your storage as well
//       // ...
//     } else {
//       // add the new event to the list
//       this.myEvents = [...this.myEvents, this.tempEvent];
//       // here you can add the event to your storage as well
//       // ...
//     }
//     // navigate the calendar
//     this.calendar.navigateToEvent(this.tempEvent);
//     // close the popup
//     this.popup.close();
//   }
//   deleteEvent(event: MbscCalendarEvent): void {
//     this.myEvents = this.myEvents.filter((item) => item.id !== event.id);
//     this.notify.snackbar({
//       button: {
//         action: () => {
//           this.myEvents = [...this.myEvents, event];
//         },
//         text: 'Undo',
//       },
//       message: 'Event deleted',
//     });
//     // here you can delete the event from your storage as well
//     // ...
//   }
//   onDeleteClick(): void {
//     this.deleteEvent(this.tempEvent);
//     this.popup.close();
//   }
//   extendDefaultEvent(): MbscCalendarEvent {
//     return {
//       title: 'Work order',
//       cost: 0,
//     };
//   }
//   setCheckboxes(resource: any): void {
//     for (const resources of this.myResources) {
//       if (resources.children) {
//         for (const res of resources.children) {
//           if (res.children) {
//             for (const r of res.children) {
//               r['checked'] = resource.indexOf(r.id) !== -1;
//             }
//           }
//         }
//       }
//     }
//   }
//   getCheckedResources(): any {
//     const checkedResources = [];
//     const startResource = this.tempEvent.resource;
//     for (const resources of this.myResources) {
//       if (resources.children) {
//         for (const res of resources.children) {
//           if (res.children) {
//             for (const r of res.children) {
//               if (r['checked']) {
//                 // checkedResources.push(r.id);
//               }
//             }
//           }
//         }
//       }
//     }
//     return checkedResources.findIndex((e) => e === startResource) === -1
//       ? [...checkedResources, this.tempEvent.resource]
//       : checkedResources;
//   }

//   toggleSidebar(): void {
//     this.isSidebarHidden = !this.isSidebarHidden;
//   }
//   isSidebarHidden = true;

//   drawerTitle: string = '';
//   drawerVisible = false;
//   addjobcard(): void {
//     this.drawerTitle = 'Manege Jobs';
    
//     this.drawerVisible = true;
//     // this.api.getCity(1, 1, 'SEQ_NO', 'desc', '' + '').subscribe(data => {
//     //   if (data['count'] == 0) {
//     //     this.drawerData.SEQ_NO = 1;

//     //   } else {
//     //     this.drawerData.SEQ_NO = data['data'][0]['SEQ_NO'] + 1;
//     //   }

//     // }, err => {
//     //   console.log(err);
//     // })

  
//   }
//   drawerClose(): void {

//     this.drawerVisible = false;
//   }

//   //Drawer Methods
//   get closeCallback() {
//     return this.drawerClose.bind(this);
//   }

// }


