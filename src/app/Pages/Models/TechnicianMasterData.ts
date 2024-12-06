export class TechnicianMasterData {
  TYPE: string = "O";
  NAME: string = "";
  EXPERIENCE_LEVEL: string = "";
  MOBILE_NUMBER: number;
  EMAIL_ID: string;
  ADDRESS_LINE_1: string;
  ADDRESS_LINE_2: string = "";
  IS_ACTIVE: boolean = true;
  COUNTRY_ID: number;
  CITY_ID: number;
  STATE_ID: number;
  PINCODE_ID: number;
  PAN_CARD_NUMBER: string;
  AADHAR_NUMBER: string;
  GENDER: string;
  DOB: Date;
  IS_OWN_VEHICLE: boolean = true;
  VEHICLE_TYPE: string;
  VEHICLE_DETAILS: any = "";
  VEHICLE_NO;
  PHOTO: string;
  VENDOR_ID: any;
  CONTRACT_START_DATE: Date;
  CONTRACT_END_DATE: Date;
}
