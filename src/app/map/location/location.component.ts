import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
declare const google: any;

@Component({
  selector: "app-location",
  standalone: true,
  imports: [],
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"],
})
export class LocationComponent implements AfterViewInit {
  @Input() MAPlOCATION: any;
  // @Input() Data:any;
  latitude: any | null = null;
  longitude: any | null = null;

  safeUrl: SafeResourceUrl;
  safeUrl1: SafeResourceUrl;
  mapUrl: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log('MAPlOCATION1',this.MAPlOCATION);
    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
  address;
 

  private currentInfoWindow: any = null;
  Location_Details: any = "";
  initMap(): void {
    const mapCenter = {
      lat:
        this.MAPlOCATION.reduce((sum, loc) => sum + loc.latitude, 0) /
        this.MAPlOCATION.length,
      lng:
        this.MAPlOCATION.reduce((sum, loc) => sum + loc.longitude, 0) /
        this.MAPlOCATION.length,
    };

    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: mapCenter,
        zoom: 21,
      }
    );
console.log('map.zoom',map.zoom);

    this.MAPlOCATION.forEach((location: any) => {
      console.log('MAPlOCATION',location);
      this.address=location.address;
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
      });
      this.Location_Details = location.address;
      const popoverContent = `
      <div class="popover-content" style="max-height: 100px !important; overflow: auto;">
    <div>${location.name}</div>
    <div>${location.address}</div>
  </div>
  
  
  `;
      const infoWindow = new google.maps.InfoWindow({
        content: popoverContent,
      });

      marker.addListener("mouseover", () => {
        if (this.currentInfoWindow) {
          this.currentInfoWindow.close();
        }
        this.currentInfoWindow = infoWindow; // Set the current info window
        infoWindow.open(map, marker);
        
      });

      // marker.addListener('mouseout', () => {
      //   if (this.currentInfoWindow === infoWindow) {
      //     infoWindow.close(); // Close the current info window
      //     this.currentInfoWindow = null;
      //   }
      // });
    });
  }

  closePopover(): void {
    if (this.currentInfoWindow) {
      this.currentInfoWindow.close(); // Close the open info window
    }
  }

   // initMap(): void {
  //   const mapCenter = {
  //     lat: this.MAPlOCATION.reduce((sum, loc) => sum + loc.latitude, 0) / this.MAPlOCATION.length,
  //     lng: this.MAPlOCATION.reduce((sum, loc) => sum + loc.longitude, 0) / this.MAPlOCATION.length,
  //   };

  //   const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
  //     center: mapCenter,
  //     zoom: 14,
  //   });

  //   this.MAPlOCATION.forEach((location: any) => {
  //     this.name=location.name
  //     const marker = new google.maps.Marker({
  //       position: { lat: location.latitude, lng: location.longitude },
  //       map: map,

  //     });

  //     const infoWindow = new google.maps.InfoWindow({
  //       content: `<div style="width: 150px; padding: 10px; font-size: 14px; color: #333;
  //     background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
  //     <h6>${location.name}</h6></div>`,
  //     });

  //     marker.addListener('click', () => {
  //       infoWindow.open(map, marker);
  //     });
  //   });
  // }
}
