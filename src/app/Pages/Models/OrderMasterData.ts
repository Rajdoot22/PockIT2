export class orderMasterData {
    ID: number;
    CLIENT_ID: number = 1;
    CUSTOMER_ID: number;
    CART_ID: number;
    ORDER_DATE_TIME: Date = new Date();
    EXPECTED_DATE_TIME: Date = new Date();
    ORDER_MEDIUM: any;
    ORDER_STATUS: any;
    PAYMENT_MODE: any;
    PAYMENT_STATUS: any;
    TOTAL_AMOUNT: any;
    COUPON_CODE: any;
    COUPON_AMOUNT: any;
    FINAL_AMOUNT: any;
    SERVICE_ADDRESS_DATA: any;
    BILLING_ADDRESS_DATA: any;
    SPECIAL_INSTRUCTIONS: any;
    ORDER_DETAILS_DAT: any = []
    TERRITORY_ID: number = 0;
}