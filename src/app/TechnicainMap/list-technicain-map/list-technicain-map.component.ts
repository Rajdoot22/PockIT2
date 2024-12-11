import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";
import { ApiServiceService } from "src/app/Service/api-service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { differenceInCalendarDays } from 'date-fns';
import { DatePipe } from '@angular/common';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { NgForm } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-list-technicain-map',
  templateUrl: './list-technicain-map.component.html',
  styleUrls: ['./list-technicain-map.component.css']
})
export class ListTechnicainMapComponent implements OnInit {

  loadingRecords = false;
  selectedTerritor: string = '';
  selectedDate: any;

  selectedTechnicianDropdown: string = 'tech1';

  techniciansdata: any[] = [];
  timelineData: any[] = [];
  technician: any[] = []

  technicians: any = [
    {
      name: 'Technician 1', email: 'technician1@gmail.com', mobile: '9876543210', city: 'Sangli',
      "latitude": 18.533996040211903, "longitude": 73.89521172337923
    },
    {
      name: 'Technician 2', email: 'technician2data123@gmail.com', mobile: '8765432189', city: 'Miraj',
      "latitude": 18.511190328632434, "longitude": 73.90544713522702
    },
    {
      name: 'Technician 3', email: 'technician3@gmail.com', mobile: '8765432999', city: 'Pune',
      "latitude": 18.45096180755418, "longitude": 73.85497558570897
    },
    {
      name: 'Technician 4', email: 'technician4@gmail.com', mobile: '8765432109', city: 'Mumbai',
      "latitude": 18.45096180755418, "longitude": 73.85497558570897
    }
  ];


  // technician = [
  //   {
  //     name: 'Technician 1',
  //     email: 'admin123@gmail.com',
  //     mobile: '9876543210',
  //     city: 'Sangli',
  //     status: 'on',
  //     locations: [
  //       {
  //         latitude: 18.533996040211903,
  //         longitude: 73.89521172337923,
  //         locationName: 'Location 1',
  //         time: '10:00 am'
  //       },
  //       {
  //         latitude: 18.511190328632434,
  //         longitude: 73.90544713522702,
  //         locationName: 'Location 2',
  //         time: '12:30 pm'
  //       },
  //       {
  //         latitude: 18.510000000000000,
  //         longitude: 73.900000000000000,
  //         locationName: 'Location 3',
  //         time: '03:00 pm'
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Technician 2',
  //     email: 'technician2@gmail.com',
  //     mobile: '9876543211',
  //     city: 'Kolhapur',
  //     status: 'on',
  //     locations: [
  //       {
  //         latitude: 16.705751,
  //         longitude: 74.244712,
  //         locationName: 'Location 1',
  //         time: '09:00 am'
  //       },
  //       {
  //         latitude: 16.710300,
  //         longitude: 74.249581,
  //         locationName: 'Location 2',
  //         time: '11:30 am'
  //       },
  //       {
  //         latitude: 16.712800,
  //         longitude: 74.254011,
  //         locationName: 'Location 3',
  //         time: '02:00 pm'
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Technician 3',
  //     email: 'technician3@gmail.com',
  //     mobile: '9876543212',
  //     city: 'Pune',
  //     status: 'on',
  //     locations: [
  //       {
  //         latitude: 18.520430,
  //         longitude: 73.856743,
  //         locationName: 'Location 1',
  //         time: '08:30 am'
  //       },
  //       {
  //         latitude: 18.524872,
  //         longitude: 73.870243,
  //         locationName: 'Location 2',
  //         time: '11:00 am'
  //       },
  //       {
  //         latitude: 18.528573,
  //         longitude: 73.883945,
  //         locationName: 'Location 3',
  //         time: '01:30 pm'
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Technician 4',
  //     email: 'technician4@gmail.com',
  //     mobile: '9876543213',
  //     city: 'Mumbai',
  //     status: 'off',
  //     locations: [
  //       {
  //         latitude: 19.076090,
  //         longitude: 72.877426,
  //         locationName: 'Location 1',
  //         time: '07:00 am'
  //       },
  //       {
  //         latitude: 19.080000,
  //         longitude: 72.890000,
  //         locationName: 'Location 2',
  //         time: '10:30 am'
  //       },
  //       {
  //         latitude: 19.085000,
  //         longitude: 72.900000,
  //         locationName: 'Location 3',
  //         time: '02:00 pm'
  //       },
  //     ],
  //   },
  // ];

  leaveTechnicians = ['Technician 3', 'Technician 4'];

  constructor(private api: ApiServiceService,
    private message: NzNotificationService, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getTechniciandata();
    this.selectedDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
  }

  getTechniciandata() {
    this.api.getTechnicianDetailData(0, 0, "", "desc", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.originalTechniciansData = data.data; // Save the original data
          this.techniciansdata = [...this.originalTechniciansData]; // Initialize the display list
  
          if (this.techniciansdata.length > 0) {
            const firstTechnician = this.techniciansdata[0]; // Select the first technician
            this.selectedTechnicianDropdown = firstTechnician.ID; // Set the dropdown value
            this.loadTechnicianDetails(firstTechnician); // Load their details
          }
        } else {
          this.message.error("Server Not Found.", "");
        }
      },
      (err: HttpErrorResponse) => {
        this.handleHttpError(err);
      }
    );
  }

  searchValue: string = ""; // Two-way bound to the input field
originalTechniciansData: any[] = []; // To preserve the original list


  onSearchChange(value: string): void {
    this.searchValue = value;
    if (value.length >= 3) {
      const lowerValue = value.toLowerCase();
  
      this.techniciansdata = this.originalTechniciansData.filter(technician =>
        technician.NAME.toLowerCase().includes(lowerValue) || 
        technician.EMAIL_ID.toLowerCase().includes(lowerValue) ||
        technician.MOBILE_NUMBER.includes(value) ||
         (technician.IS_ACTIVE === 1 && "active".includes(lowerValue)) || // Match "Active" status
        (technician.IS_ACTIVE === 0 && "inactive".includes(lowerValue))
      );
    } else {
      this.techniciansdata = [...this.originalTechniciansData];
    }
  }

  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  // Disable dates only, not time
  disabledDate = (current: Date): boolean => {
    // Disable all dates after the selected date
    return differenceInCalendarDays(current, this.selectedDate) > 0;
  };

  dateformat(data: any) {
    this.selectedDate = this.datepipe.transform(data, 'yyyy-MM-dd');
  }

  technicianName: any
  loadTechnicianDetails(technician: any) {
    // console.log(technician, 'Selected Technician');

    this.technicianName = technician.NAME;

    this.api.getTechnicaionActionLog(0, 0, "", "desc", `AND TECHNICIAN_ID = ${technician.ID}` + ' AND DATE(DATE_TIME) = ' + `'${this.selectedDate}'`).subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.timelineData = data.data;
          // console.log(this.timelineData, 'this.technicianActionLogdata');
        } else {
          this.message.error("Server Not Found.", "");
        }
      },
      (err: HttpErrorResponse) => {
        this.handleHttpError(err);
      }
    );

    this.api.getTechnicaionLoacionTrack(0, 0, "", "desc", `AND TECHNICIAN_ID = ${technician.ID}` + ' AND DATE(DATE_TIME) = ' + `'${this.selectedDate}'`).subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.technician = data.data;
          // console.log(this.technician, 'this.technicianLocationTrack');
          this.initMap(); // Initialize the map with updated data
        } else {
          this.message.error("Server Not Found.", "");
        }
      },
      (err: HttpErrorResponse) => {
        this.handleHttpError(err);
      }
    );
  }

  handleHttpError(err: HttpErrorResponse) {
    this.loadingRecords = false;
    if (err.status === 0) {
      this.message.error(
        "Unable to connect. Please check your internet or server connection and try again shortly.",
        ""
      );
    } else {
      this.message.error("Something Went Wrong.", "");
    }
  }

  onTechnicianCardClick(technician: any) {
    this.loadTechnicianDetails(technician); // Reuse the same method
  }


  initMap(): void {
    // For technician travel map
    const technician = this.technician;

    if (technician) {
      const locations = technician
        .map((loc: any) => ({
          latitude: parseFloat(loc.LOCATION_LATITUDE),
          longitude: parseFloat(loc.LOCATION_LONG),
          locationName: `Location ID: ${loc.ID}`,
          time: new Date(loc.CREATED_MODIFIED_DATE).toLocaleString(),
        }))
        .filter((loc: any) =>
          !isNaN(loc.latitude) &&
          !isNaN(loc.longitude) // Filter out invalid locations
        );

      if (locations.length === 0) {
        this.message.error('No valid locations found for the technician.', '');
        return; // Exit if no valid locations
      }

      const mapCenter = {
        lat: locations.reduce((sum: number, loc: any) => sum + loc.latitude, 0) / locations.length,
        lng: locations.reduce((sum: number, loc: any) => sum + loc.longitude, 0) / locations.length,
      };

      if (isNaN(mapCenter.lat) || isNaN(mapCenter.lng)) {
        console.error('Invalid map center coordinates:', mapCenter);
        return; // Exit if map center is invalid
      }

      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = new google.maps.Map(mapElement as HTMLElement, {
          center: mapCenter,
          zoom: 14,
        });

        locations.forEach((location: any) => {
          const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
          });

          const convertedDate = this.datepipe.transform(location.time, 'h:mm a');

          const infoWindow = new google.maps.InfoWindow({
            content: `
            <div style="width: 150px; padding: 10px; font-size: 14px; color: #333; 
                background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
            <p style="font-size: 12px; margin: 5px 0;">${convertedDate}</p>
            </div>`,
          });

          // Show the InfoWindow on hover
          marker.addListener("mouseover", () => {
            infoWindow.open(map, marker);
          });

          // Close the InfoWindow when the mouse leaves the marker
          marker.addListener("mouseout", () => {
            infoWindow.close();
          });
        });

        new google.maps.Polyline({
          path: locations.map((location: any) => new google.maps.LatLng(location.latitude, location.longitude)),
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: map,
        });
      }
    }



    // For all technicians location map

    // Check for valid technician data with proper latitude and longitude
    const validLocations = this.techniciansdata.filter(location =>
      !isNaN(parseFloat(location.LOCATION_LATITUDE)) &&
      !isNaN(parseFloat(location.LOCATION_LONG))
    );

    // Calculate the center only if there are valid locations
    const map2Center = {
      lat: validLocations.length > 0
        ? validLocations.reduce((sum, loc) => sum + parseFloat(loc.LOCATION_LATITUDE), 0) / validLocations.length
        : 0,
      lng: validLocations.length > 0
        ? validLocations.reduce((sum, loc) => sum + parseFloat(loc.LOCATION_LONG), 0) / validLocations.length
        : 0,
    };

    const map2Element = document.getElementById('map1');
    if (map2Element) {
      const map2 = new google.maps.Map(map2Element as HTMLElement, {
        center: map2Center,
        zoom: 14,
      });

      validLocations.forEach((location: any) => {
        const marker = new google.maps.Marker({
          position: { lat: parseFloat(location.LOCATION_LATITUDE), lng: parseFloat(location.LOCATION_LONG) },
          map: map2,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
      <div style="width: 150px; padding: 10px; font-size: 14px; color: #333; 
          background-color: #fff; border-radius: 5px; box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);">
        <h6>${location.NAME}</h6>
        <p>${location.MOBILE_NUMBER}</p>
        <p>${location.CITY_NAME}</p>
      </div>`,
        });

        infoWindow.open(map2, marker);

        marker.addListener("mouseover", () => {
          infoWindow.open(map2, marker);
        });

        marker.addListener("mouseout", () => {
          infoWindow.close();
        });
      });
    }



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

  public visiblesave = false;
  resetPasswordLoading: boolean = false;

  isChangePassword() {
    this.getPincodeData();
    this.getSkillData();
    this.visiblesave = true;
  }

  handleCancelTop(): void {
    this.resetForm();
    this.visiblesave = false;
  }



  PINCODE_ID

  checkOptionsOne = [
    { label: 'Inhouse', value: 'I', checked: false },
    { label: 'Freelancer', value: 'F', checked: false },
    { label: 'Vendor Tech', value: 'V', checked: false }
  ];

  checkOptionsTwo = [
    { label: 'Fresher', value: 'F', checked: false },
    { label: 'Junior', value: 'J', checked: false },
    { label: 'Mid-Level', value: 'M', checked: false },
    { label: 'Senior', value: 'S', checked: false },
    { label: 'Lead', value: 'L', checked: false },
    { label: 'Expert', value: 'E', checked: false },
  ];

  pincodeData: any = [];
  getPincodeData() {
    this.api.getAllPincode(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.pincodeData = data['data'];
        } else {
          this.pincodeData = [];
          this.message.error('Failed To Get Pincode Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  selectedSkills: { [key: number]: boolean } = {};
  skillData: any = [];
  getSkillData() {
    this.api.getSkillData(0, 0, '', '', 'AND IS_ACTIVE =1').subscribe(
      (data) => {
        if (data['code'] == 200) {
          this.skillData = data['data'];
        } else {
          this.skillData = [];
          this.message.error('Failed To Get Skill Data', '');
        }
      },
      () => {
        this.message.error('Something Went Wrong', '');
      }
    );
  }

  handleOkTop(): void {
    // Gather selected values from checkboxes for TYPE
    const selectedTypes = this.checkOptionsOne
      .filter(option => option.checked)
      .map(option => `'${option.value}'`);

    // console.log(selectedTypes);

    // Gather selected EXPERIENCE values
    const selectedExperience = this.checkOptionsTwo
      .filter(option => option.checked)
      .map(option => `'${option.value}'`);

    // Gather selected SKILLS (using the selectedSkills object to store selected skill IDs)
    const selectedSkills = Object.keys(this.selectedSkills)
      .filter(skillId => this.selectedSkills[skillId])
      .map(skillId => parseInt(skillId)); // Convert skill IDs to numbers

    // Gather selected PINCODES
    const selectedPincodes = this.PINCODE_ID ? this.PINCODE_ID : [];

    this.api.getTechnicianDataFilter(0, 0, 'someSortKey', 'desc', '', selectedTypes, selectedSkills, selectedExperience, selectedPincodes,).subscribe(
      (data) => {
        if (data["code"] == 200) {
          // Handle success
          // console.log('API Success', data);
          this.techniciansdata = data.data;
          if (this.techniciansdata.length > 0) {
            const firstTechnician = this.techniciansdata[0]; // Select the first technician
            this.selectedTechnicianDropdown = firstTechnician.ID; // Set the dropdown value
            this.loadTechnicianDetails(firstTechnician); // Load their details
            this.visiblesave = false;
          }
          else {

            this.message.info('No data found for the selected filters.', '')
            this.visiblesave = false;
          }

        } else {
          this.message.error("Server Not Found", "");
          this.visiblesave = false;
        }
      })
  }


  @ViewChild('resetform') resetform: NgForm;
  resetForm(): void {

      // Reset all checkboxes in checkOptionsOne
      this.checkOptionsOne.forEach(option => (option.checked = false));
    
      // Reset all checkboxes in checkOptionsTwo
      this.checkOptionsTwo.forEach(option => (option.checked = false));
    
      // Clear selected skills
      this.selectedSkills = {};
    
      // Reset Pincode selection
      this.PINCODE_ID = null;
    
      // Reset the form's state
      if (this.resetform) {
        this.resetform.resetForm();
      }
  }


}
