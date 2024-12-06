import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare const google: any;

@Component({
  selector: 'app-list-technicain-map',
  templateUrl: './list-technicain-map.component.html',
  styleUrls: ['./list-technicain-map.component.css']
})
export class ListTechnicainMapComponent implements OnInit {

  loadingRecords = false;
  selectedTerritor: string = '';
  selectedDate: Date | null = null;
  selectedTechnicianDropdown: string = 'tech1';

  // techniciansdata: any[] = [];
  technicians: any = [
    {
      name: 'Technician 1', email: 'technician1@gmail.com', mobile: '9876543210', city: 'Sangli', status: 'on',
      "latitude": 18.533996040211903, "longitude": 73.89521172337923
    },
    {
      name: 'Technician 2', email: 'technician2data123@gmail.com', mobile: '8765432189', city: 'Miraj', status: 'on',
      "latitude": 18.511190328632434, "longitude": 73.90544713522702
    },
    {
      name: 'Technician 3', email: 'technician3@gmail.com', mobile: '8765432999', city: 'Pune', status: 'off',
      "latitude": 18.45096180755418, "longitude": 73.85497558570897
    },
    {
      name: 'Technician 4', email: 'technician4@gmail.com', mobile: '8765432109', city: 'Mumbai', status: 'on',
      "latitude": 18.45096180755418, "longitude": 73.85497558570897
    }
  ];


  technician = [
    {
      name: 'Technician 1',
      email: 'admin123@gmail.com',
      mobile: '9876543210',
      city: 'Sangli',
      locations: [
        { latitude: 18.533996040211903, longitude: 73.89521172337923, locationName: 'Location 1' },
        { latitude: 18.511190328632434, longitude: 73.90544713522702, locationName: 'Location 2' },
        { latitude: 18.510000000000000, longitude: 73.900000000000000, locationName: 'Location 3' },
      ],
    },
    {
      name: 'Technician 2',
      email: 'technician2@gmail.com',
      mobile: '9876543211',
      city: 'Kolhapur',
      locations: [
        { latitude: 16.705751, longitude: 74.244712, locationName: 'Location 1' },
        { latitude: 16.710300, longitude: 74.249581, locationName: 'Location 2' },
        { latitude: 16.712800, longitude: 74.254011, locationName: 'Location 3' },
      ],
    },
    {
      name: 'Technician 3',
      email: 'technician3@gmail.com',
      mobile: '9876543212',
      city: 'Pune',
      locations: [
        { latitude: 18.520430, longitude: 73.856743, locationName: 'Location 1' },
        { latitude: 18.524872, longitude: 73.870243, locationName: 'Location 2' },
        { latitude: 18.528573, longitude: 73.883945, locationName: 'Location 3' },
      ],
    },
    {
      name: 'Technician 4',
      email: 'technician4@gmail.com',
      mobile: '9876543213',
      city: 'Mumbai',
      locations: [
        { latitude: 19.076090, longitude: 72.877426, locationName: 'Location 1' },
        { latitude: 19.080000, longitude: 72.890000, locationName: 'Location 2' },
        { latitude: 19.085000, longitude: 72.900000, locationName: 'Location 3' },
      ],
    },
  ];


  leaveTechnicians = ['Technician 3', 'Technician 4'];

  constructor(private api: ApiServiceService,
    private message: NzNotificationService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.getTechniciandata();
  }

  // getTechniciandata() {
  //   this.api.getTechnicianData(1, 1, "", "desc", "").subscribe(
  //     (data) => {
  //       if (data["code"] == 200) {

  //         this.techniciansdata = data;
  //         console.log(this.techniciansdata)
  //       } else {
  //         this.message.error("Server Not Found.", "");
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.loadingRecords = false;
  //       if (err.status === 0) {
  //         // Network error
  //         this.message.error(
  //           "Unable to connect. Please check your internet or server connection and try again shortly.",
  //           ""
  //         );
  //         // this.dataList = [];
  //       } else {
  //         // Other errors
  //         this.message.error("Something Went Wrong.", "");
  //       }
  //     }
  //   );
  // }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Ensure the view is initialized
    setTimeout(() => {
      this.selectedTechnician = this.technicians[0];
      this.initMap(); // Initialize map after view rendering
    }, 0);
  }

  selectedTechnician: any = null;

  initMap(): void {
    // For technician travel map
    const technician = this.selectedTechnician;

    if (technician) {
      const mapCenter = {
        lat: this.technician.reduce((sum, technician) => sum + technician.locations[0].latitude, 0) / this.technician.length,
        lng: this.technician.reduce((sum, technician) => sum + technician.locations[0].longitude, 0) / this.technician.length,
      };


      const mapElement = document.getElementById('map');
      if (mapElement) {

        const map = new google.maps.Map(mapElement as HTMLElement, {
          center: mapCenter,
          zoom: 14,
        });

        this.technician.forEach((technician: any) => {
          const locations = technician.locations;

          // Add markers for each location
          locations.forEach((location: any) => {
            const marker = new google.maps.Marker({
              position: { lat: location.latitude, lng: location.longitude },
              map: map,
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
            <div style="width: 150px; padding: 10px; font-size: 14px; color: #333; 
                background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
            <p style="font-size: 12px; margin: 5px 0;">${location.locationName}</p>
            </div>`,
            });

            // Open the InfoWindow immediately (default open)
            infoWindow.open(map, marker);

            // Optional: Add a listener to close the InfoWindow when clicking on the marker
            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

          });

          // Directly use the locations array for polyline
          // Create a dotted polyline by setting strokeDasharray
          new google.maps.Polyline({
            path: locations.map((location: any) => new google.maps.LatLng(location.latitude, location.longitude)),
            geodesic: true,
            strokeColor: '#FF0000', // Red color for the dotted line
            strokeOpacity: 1.0,
            strokeWeight: 2,
            strokeDasharray: "1, 4", // This creates a dotted line (1px dash, 4px gap)
            map: map
          });
        });
      }
    }

    // For all technicians location map
    const map2Center = {
      lat: this.technicians.reduce((sum, loc) => sum + loc.latitude, 0) / this.technicians.length,
      lng: this.technicians.reduce((sum, loc) => sum + loc.longitude, 0) / this.technicians.length,
    };

    const map2Element = document.getElementById('map1');
    if (map2Element) {
      const map2 = new google.maps.Map(map2Element as HTMLElement, {
        center: map2Center,
        zoom: 14,
      });

      this.technicians.forEach((location: any) => {
        console.log(location, 'location');

        const marker = new google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map2,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
        <div style="width: 150px; padding: 10px; font-size: 14px; color: #333; 
            background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
        <h6>${location.name}</h6>
        </div>`,
        });

        infoWindow.open(map2, marker);

        marker.addListener('click', () => {
          infoWindow.open(map2, marker);
        });
      });
    }

  }

  onTechnicianCardClick(technican: any) {
    this.selectedTechnician = technican;
    this.initMap();
  }

  drawerTitle!: string;
  drawerFilterVisible: boolean = false;
  // drawerData: CurrencyMaster = new CurrencyMaster();
  applyCondition: any;

  addtechnicianfilter(data: any) {
    if (data == 'Technician') {
      this.drawerTitle = 'Technician FIlter';
    } else if (data == 'order') {
      this.drawerTitle = 'Order FIlter';
    } else if (data == 'jobcard') {
      this.drawerTitle = 'Job Card FIlter';
    }
    this.applyCondition = data
    // this.drawerData = new CurrencyMaster();
    this.drawerFilterVisible = true;

  }


  drawerflterClose(): void {
    this.drawerFilterVisible = false;
  }

  get closefilterCallback() {
    return this.drawerflterClose.bind(this);
  }


  selectedmode = 'tech'
  // order
  // job

  selectmodeee(event) {
    this.selectedmode = event
  }

  date = new Date()

  onlymap: boolean = false;

  fullmap() {
    this.onlymap = true;
    this.cdr.detectChanges(); // Manually trigger change detection to re-render the view
    this.initMap();
  }

  back() {
    this.onlymap = false;
    this.cdr.detectChanges(); // Manually trigger change detection to re-render the view
    this.initMap();
  }

}
