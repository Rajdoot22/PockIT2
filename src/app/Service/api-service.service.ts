import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { appkeys } from '../app.constant';
import { OrganizationMaster } from '../Pages/Models/organization-master';
import { Branchmaster } from '../Pages/Models/branchmaster';
import { pincode } from '../Pages/Models/pincode';
import { taxes } from '../Pages/Models/taxes';
import { category } from '../Pages/Models/category';
import { subcategory } from '../Pages/Models/subcategory';
import { customer } from '../Pages/Models/customer';
import { Address } from '../Pages/Models/Address';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  clientId: number = 1;
  cloudID: any;
  httpHeaders = new HttpHeaders();
  options = {
    headers: this.httpHeaders,
  };

  httpHeaders1 = new HttpHeaders();
  options1 = {
    headers: this.httpHeaders1,
  };

  gmUrl = appkeys.gmUrl;
  applicationId = 1;

  baseUrl = appkeys.baseUrl;
  url = appkeys.url;
  retriveimgUrl = appkeys.retriveimgUrl;
  imgUrl = appkeys.imgUrl;
  imgUrl1 = appkeys.imgUrl1;
  dateforlog =
    new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
  emailId = sessionStorage.getItem('emailId');
  userId = Number(sessionStorage.getItem('userId'));
  userName = sessionStorage.getItem('userName');
  roleId = sessionStorage.getItem('roleId');

  constructor(private cookie: CookieService, private httpClient: HttpClient) {
    this.getheader();
  }

  // For  Testing server
  getheader() {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      apikey: 'WGykEs0b241gNKcDshYU9C4I0Ft1JoSb',
      applicationkey: 'ZU63HDzj79PEFzz5',
      deviceid: this.cookie.get('deviceId'),
      supportkey: this.cookie.get('supportKey'),
      Token: this.cookie.get('token'),
    });
    this.options = {
      headers: this.httpHeaders,
    };
  }

  login(email: string, password: string) {
    this.getheader();

    this.options = {
      headers: this.httpHeaders,
    };

    var data = {
      username: email,
      password: password,
    };

    return this.httpClient.post(
      this.baseUrl + 'user/login',
      JSON.stringify(data),
      this.options
    );
  }

  createUser(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/create',
      JSON.stringify(user),
      this.options
    );
  }

  loggerInit() {
    this.getheader();

    this.options1 = {
      headers: this.httpHeaders1,
    };

    var data = {
      CLIENT_ID: this.clientId,
    };

    return this.httpClient.post(
      this.gmUrl + 'device/init',
      JSON.stringify(data),
      this.options1
    );
  }

  getForms(roleId: number) {
    this.getheader();

    this.options = {
      headers: this.httpHeaders,
    };

    var data = {
      ROLE_ID: roleId,
    };

    return this.httpClient.post<any>(
      this.url + 'user/getForms',
      JSON.stringify(data),
      this.options
    );
  }

  getAllForms(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/form/get',
      JSON.stringify(data),
      this.options
    );
  }

  createForm(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/form/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateForm(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/form/update',
      JSON.stringify(form),
      this.options
    );
  }

  getAllRoles(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/get',
      JSON.stringify(data),
      this.options
    );
  }

  createRole(application: any): Observable<any> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/create',
      JSON.stringify(application),
      this.options
    );
  }

  updateRole(application: any): Observable<any> {
    application.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/role/update',
      JSON.stringify(application),
      this.options
    );
  }

  updateUser(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/user/update',
      JSON.stringify(user),
      this.options
    );
  }

  getRoleDetails(roleId: number) {
    var data = {
      ROLE_ID: roleId,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/roleDetails/getData',
      JSON.stringify(data),
      this.options
    );
  }

  getAllUsers(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/get',
      JSON.stringify(data),
      this.options
    );
  }

  addRoleDetails(roleId: number, data1: string[]): Observable<any> {
    var data = {
      ROLE_ID: roleId,
      data: data1,
    };

    return this.httpClient.post<any>(
      this.baseUrl + 'api/roleDetails/addBulk',
      data,
      this.options
    );
  }

  sendOTP(TYPE: any, TYPE_VALUE): Observable<any> {
    var data = {
      TYPE: TYPE,
      TYPE_VALUE: TYPE_VALUE,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/sendOtpToDevice',
      JSON.stringify(data),
      this.options
    );
  }

  confirmOTP(passwordData: any): Observable<any> {
    var data = {
      TYPE: passwordData.TYPE,
      TYPE_VALUE: passwordData.TYPE_VALUE,
      OTP: passwordData.OTP,
      RID: passwordData.RID,
      VID: passwordData.VID,
    };

    return this.httpClient.post<any>(
      this.baseUrl + 'api/verifyOtp',
      JSON.stringify(data),
      this.options
    );
  }

  changePassword(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/changePassword',
      JSON.stringify(user),
      this.options
    );
  }

  forgetPasswordAdmin(data: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'api/user/forgetPasswordAdmin',
      JSON.stringify(data),
      this.options
    );
  }

  deleteAllCookies() {
    // Retrieve all cookies
    const cookies: string[] = document.cookie.split(';');

    // Iterate over each cookie
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const cookieName =
        eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Explicitly delete the cookie with the root path '/'
      this.cookie.delete(cookieName, '/');
    }
  }

  getDesignationData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/designation/get',
      JSON.stringify(data),
      this.options
    );
  }

  onUpload(folderName, selectedFile, filename): Observable<any> {
    this.onuploadheader();
    let params = new HttpParams();

    const options1 = {
      headers: this.httpHeaders1,
      params: params,
      reportProgress: true,
    };

    const fd = new FormData();
    fd.append('Image', selectedFile, filename);
    const req = new HttpRequest('POST', this.imgUrl + folderName, fd, options1);
    return this.httpClient.request(req);
  }

  // For Testing server
  onuploadheader() {
    this.httpHeaders1 = new HttpHeaders({
      Accept: 'application/json',
      apikey: 'WGykEs0b241gNKcDshYU9C4I0Ft1JoSb',
      applicationkey: 'ZU63HDzj79PEFzz5',
      supportkey: this.cookie.get('supportKey'),
      Token: this.cookie.get('token'),
    });

    this.options1 = {
      headers: this.httpHeaders,
    };
  }
  getAllCityMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    this.getheader();
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'city/get',
      JSON.stringify(data),
      this.options
    );
  }

  CreateCityMaster(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'city/create',
      JSON.stringify(user),
      this.options
    );
  }

  UpdateCityMaster(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;

    return this.httpClient.put<any>(
      this.url + 'city/update',
      JSON.stringify(user),
      this.options
    );
  }
  getAllStateMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    this.getheader();
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'State/get',
      JSON.stringify(data),
      this.options
    );
  }
  getAllOrganizations(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<OrganizationMaster[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<OrganizationMaster[]>(
      this.url + 'organisation/get',
      JSON.stringify(data),
      this.options
    );
  }

  createOrganization(organization: OrganizationMaster): Observable<number> {
    organization.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'organisation/createOrg',
      JSON.stringify(organization),
      this.options
    );
  }

  updateOrganization(organization: OrganizationMaster): Observable<number> {
    organization.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'organisation/updateOrg',
      JSON.stringify(organization),
      this.options
    );
  }
  getAllBranch(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'branch/get',
      JSON.stringify(data),
      this.options
    );
  }
  createBranch(department: any): Observable<number> {
    department.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'branch/create',
      JSON.stringify(department),
      this.options
    );
  }

  updateBranch(department: any): Observable<number> {
    department.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'branch/update',
      JSON.stringify(department),
      this.options
    );
  }
  getAllCountryMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    this.getheader();
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'country/get',
      JSON.stringify(data),
      this.options
    );
  }
  getAllPincodeMaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    this.getheader();
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'pincode/get',
      JSON.stringify(data),
      this.options
    );
  }
  getAllPincode(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<OrganizationMaster[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<OrganizationMaster[]>(
      this.url + 'pincode/get',
      JSON.stringify(data),
      this.options
    );
  }

  createPincode(pincode: pincode): Observable<number> {
    pincode.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'pincode/create',
      JSON.stringify(pincode),
      this.options
    );
  }

  updatePincode(pincode: pincode): Observable<number> {
    pincode.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'pincode/update',
      JSON.stringify(pincode),
      this.options
    );
  }
  getAllTaxDetails(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<taxes[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<taxes[]>(
      this.url + 'taxDetails/get',
      JSON.stringify(data),
      this.options
    );
  }

  createTaxDetails(taxes: taxes): Observable<number> {
    taxes.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'taxDetails/create',
      JSON.stringify(taxes),
      this.options
    );
  }

  updateTaxDetails(taxes: taxes): Observable<number> {
    taxes.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'taxDetails/update',
      JSON.stringify(taxes),
      this.options
    );
  }
  getAllCategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<category[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<category[]>(
      this.url + 'category/get',
      JSON.stringify(data),
      this.options
    );
  }

  createCategory(category: category): Observable<number> {
    category.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'category/create',
      JSON.stringify(category),
      this.options
    );
  }

  updateCategory(category: category): Observable<number> {
    category.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'category/update',
      JSON.stringify(category),
      this.options
    );
  }
  getAllsubCategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<subcategory[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<subcategory[]>(
      this.url + 'subCategory/get',
      JSON.stringify(data),
      this.options
    );
  }

  createsubCategory(category: subcategory): Observable<number> {
    category.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'subCategory/create',
      JSON.stringify(category),
      this.options
    );
  }

  updatesubCategory(category: subcategory): Observable<number> {
    category.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'subCategory/update',
      JSON.stringify(category),
      this.options
    );
  }
  getAllCustomer(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<customer[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<customer[]>(
      this.url + 'customer/get',
      JSON.stringify(data),
      this.options
    );
  }

  createCustomer(customer: customer): Observable<number> {
    customer.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'customer/create',
      JSON.stringify(customer),
      this.options
    );
  }

  updateCustomer(customer: customer): Observable<number> {
    customer.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'customer/update',
      JSON.stringify(customer),
      this.options
    );
  }

  getTeritory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/territory/get',
      JSON.stringify(data),
      this.options
    );
  }

  updateTerritory(data: any) {
    return this.httpClient.put(
      this.baseUrl + 'api/territory/update',
      JSON.stringify(data),
      this.options
    );
  }

  createTerritory(data: any) {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post(
      this.baseUrl + 'api/territory/create',
      JSON.stringify(data),
      this.options
    );
  }

  getServiceItem(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/service/get',
      JSON.stringify(data),
      this.options
    );
  }

  updateServiceItem(data: any) {
    return this.httpClient.put(
      this.baseUrl + 'api/service/update',
      JSON.stringify(data),
      this.options
    );
  }

  createServiceItem(data: any) {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post(
      this.baseUrl + 'api/service/create',
      JSON.stringify(data),
      this.options
    );
  }

  getCurrency(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/currency/get',
      JSON.stringify(data),
      this.options
    );
  }

  updateCurrency(data: any) {
    return this.httpClient.put(
      this.baseUrl + 'api/currency/update',
      JSON.stringify(data),
      this.options
    );
  }

  createCurrency(data: any) {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post(
      this.baseUrl + 'api/currency/create',
      JSON.stringify(data),
      this.options
    );
  }
  getServiceCatlogData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/serviceCatalog/get',
      JSON.stringify(data),
      this.options
    );
  }
  getSkillData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/skill/get',
      JSON.stringify(data),
      this.options
    );
  }

  createSkill(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/skill/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateSkill(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/skill/update',
      JSON.stringify(user),
      this.options
    );
  }

  getTaxData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/tax/get',
      JSON.stringify(data),
      this.options
    );
  }

  createTax(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/tax/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateTax(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/tax/update',
      JSON.stringify(user),
      this.options
    );
  }

  getOrderStatusData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/orderStatus/get',
      JSON.stringify(data),
      this.options
    );
  }

  createOrderStatus(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/orderStatus/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateOrderStatus(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/orderStatus/update',
      JSON.stringify(user),
      this.options
    );
  }

  getJobCardStatusData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/jobCardStatus/get',
      JSON.stringify(data),
      this.options
    );
  }

  createJobCardStatus(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/jobCardStatus/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateJobCardStatus(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/jobCardStatus/update',
      JSON.stringify(user),
      this.options
    );
  }

  getLanguageData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/language/get',
      JSON.stringify(data),
      this.options
    );
  }

  createLanguage(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/language/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateLanguage(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/language/update',
      JSON.stringify(user),
      this.options
    );
  }

  getUnitData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/unit/get',
      JSON.stringify(data),
      this.options
    );
  }

  createUnit(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/unit/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateUnit(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/unit/update',
      JSON.stringify(user),
      this.options
    );
  }
  // State get, create, update
  getState(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'state/get',
      JSON.stringify(data),
      this.options
    );
  }

  createState(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'state/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateState(data: any): Observable<any> {
    return this.httpClient.put<any>(
      this.url + 'state/update',
      JSON.stringify(data),
      this.options
    );
  }

  // City get, create, update
  getCity(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'city/get',
      JSON.stringify(data),
      this.options
    );
  }

  createCity(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;

    return this.httpClient.post<any>(
      this.url + 'city/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateCity(data: any): Observable<any> {
    return this.httpClient.put<any>(
      this.url + 'city/update',
      JSON.stringify(data),
      this.options
    );
  }
  createCountryData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'country/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateCountryData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'country/update',
      JSON.stringify(user),
      this.options
    );
  }

  getCustomerCategeroyData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/customerCategory/get',
      JSON.stringify(data),
      this.options
    );
  }
  CreateCustomerCategeroyData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'customerCategory/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateCustomerCategeroyData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'customerCategory/update',
      JSON.stringify(user),
      this.options
    );
  }
  getVendorData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/vendor/get',
      JSON.stringify(data),
      this.options
    );
  }
  createVendorData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'vendor/createVendor',
      JSON.stringify(data),
      this.options
    );
  }

  updateVendorData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'vendor/updateVendor',
      JSON.stringify(user),
      this.options
    );
  }
  getBackOfficeData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/backofficeTeam/get',
      JSON.stringify(data),
      this.options
    );
  }

  createBackOffice(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/backofficeTeam/createTeam',
      JSON.stringify(form),
      this.options
    );
  }

  updateBackOffice(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/backofficeTeam/updateTeam',
      JSON.stringify(user),
      this.options
    );
  }

  getRolesData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/role/get',
      JSON.stringify(data),
      this.options
    );
  }

  getCategoryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/category/get',
      JSON.stringify(data),
      this.options
    );
  }

  getSubCategoryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/subCategory/get',
      JSON.stringify(data),
      this.options
    );
  }
  getServiceCatData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/serviceCatalog/get',
      JSON.stringify(data),
      this.options
    );
  }

  createServiceCat(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.baseUrl + 'api/serviceCatalog/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateServiceCat(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/serviceCatalog/update',
      JSON.stringify(user),
      this.options
    );
  }

  getCountryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    this.getheader();
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<any>(
      this.url + 'country/get',
      JSON.stringify(data),
      this.options
    );
  }
  getTechnicianData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/Technician/get',
      JSON.stringify(data),
      this.options
    );
  }
  createTechnicianData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'Technician/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateTechnicianData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'Technician/update',
      JSON.stringify(user),
      this.options
    );
  }
  getAppLanguageData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/appLanguage/get',
      JSON.stringify(data),
      this.options
    );
  }
  createAppLanguageData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'appLanguage/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateAppLanguageData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'appLanguage/update',
      JSON.stringify(user),
      this.options
    );
  }

  getterritoryPincodeData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/territoryPincodeMapping/get',
      JSON.stringify(data),
      this.options
    );
  }

  addTerritoryPincodeMapping(
    TERRITORY_ID: number,
    CLIENT_ID: number,
    datas: any[]
  ): Observable<any> {
    var data = {
      TERITORY_ID: TERRITORY_ID,
      CLIENT_ID: CLIENT_ID,
      data: datas,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/territoryPincodeMapping/addBulk',
      data,
      this.options
    );
  }
  // getterritoryPincodeData(
  //   pageIndex: number,
  //   pageSize: number,
  //   sortKey: string,
  //   sortValue: string,
  //   filter: string
  // ): Observable<any> {
  //   var data = {
  //     pageIndex: pageIndex,
  //     pageSize: pageSize,
  //     sortKey: sortKey,
  //     sortValue: sortValue,
  //     filter: filter,
  //   };
  //   return this.httpClient.post<any>(
  //     this.baseUrl + "api/territoryPincodeMapping/get",
  //     JSON.stringify(data),
  //     this.options
  //   );
  // }
  getAllCustomerAddress(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<customer[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };

    return this.httpClient.post<customer[]>(
      this.url + 'customerAddress/get',
      JSON.stringify(data),
      this.options
    );
  }

  createCustomerAddress(Address: Address): Observable<number> {
    Address.CLIENT_ID = this.clientId;
    return this.httpClient.post<number>(
      this.url + 'customerAddress/create',
      JSON.stringify(Address),
      this.options
    );
  }

  updateCustomerAddress(Address: Address): Observable<number> {
    Address.CLIENT_ID = this.clientId;
    return this.httpClient.put<number>(
      this.url + 'customerAddress/update',
      JSON.stringify(Address),
      this.options
    );
  }
  getBackofcTerritoryMappedData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/backofficeTerritoryMapping/get',
      JSON.stringify(data),
      this.options
    );
  }

  mapBackofficeTerritoryMapping(
    BACKOFFICE_ID: number,
    CLIENT_ID: number,
    datas: any[]
  ): Observable<any> {
    var data = {
      BACKOFFICE_ID: BACKOFFICE_ID,
      CLIENT_ID: CLIENT_ID,
      data: datas,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/backofficeTerritoryMapping/addBulk',
      data,
      this.options
    );
  }

  getServiceSkillMappedData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ) {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post(
      this.baseUrl + 'api/serviceSkillMapping/get',
      JSON.stringify(data),
      this.options
    );
  }

  mapServiceSkillMapping(SERVICE_ID: number, CLIENT_ID: number, datas: any[]) {
    var data = { SERVICE_ID: SERVICE_ID, CLIENT_ID: CLIENT_ID, data: datas };
    return this.httpClient.post(
      this.baseUrl + 'api/serviceSkillMapping/addBulk',
      data,
      this.options
    );
  }

  getKnowledgeBaseCategoryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/knowledgeBaseCategory/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createKnowledgeBaseCategoryData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'knowledgeBaseCategory/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateKnowledgeBaseCategoryData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'knowledgeBaseCategory/update',
      JSON.stringify(user),
      this.options
    );
  }

  getKnowledgeBasesubCategoryData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/knowledgebaseSubCategory/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createKnowledgeBasesubCategoryData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'knowledgebaseSubCategory/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateKnowledgeBasesubCategoryData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'knowledgebaseSubCategory/update',
      JSON.stringify(user),
      this.options
    );
  }

  getRecords(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    apiEndpoint: string
  ): Observable<any[]> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any[]>(
      this.url + apiEndpoint,
      JSON.stringify(data),
      this.options
    );
  }

  getKnowledgeBaseData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/knowledgeBase/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createKnowledgeBaseData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'knowledgeBase/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateKnowledgeBaseData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'knowledgeBase/update',
      JSON.stringify(user),
      this.options
    );
  }

  getTechnicianPincodeMappedData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianPincodeMapping/get',
      JSON.stringify(data),
      this.options
    );
  }
  addskillsTeachniacianMapping(id: number, datas: any[]): Observable<any> {
    var data = {
      TECHNICIAN_ID: id,
      CLIENT_ID: this.clientId,
      data: datas,
    };

    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianSkillMapping/addBulk',
      data,
      this.options
    );
  }
  getTechnicianSkillData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianSkillMapping/get',
      JSON.stringify(data),
      this.options
    );
  }
  addTechnicianPincodeMapping(
    TECHNICIAN_ID: number,
    CLIENT_ID: number,
    datas: any[]
  ): Observable<any> {
    var data = {
      TERITORY_ID: TECHNICIAN_ID,
      CLIENT_ID: CLIENT_ID,
      data: datas,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianPincodeMapping/addBulk',
      data,
      this.options
    );
  }

  //shreya
  getOrdersData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/order/getOrderDetails',
      JSON.stringify(data),
      this.options
    );
  }
  createOrdersDatabasic(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'api/order/create',
      JSON.stringify(data),
      this.options
    );
  }

  createOrdersData(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'order/createOrder',
      JSON.stringify(data),
      this.options
    );
  }
  updateOrdersData(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'api/order/update',
      JSON.stringify(user),
      this.options
    );
  }
  // getstatetax(user: any): Observable<any> {
  //   // user.CLIENT_ID = this.clientId;
  //   return this.httpClient.post<any>(
  //     this.url + "taxDetails/getTaxDetails",
  //     JSON.stringify(user),
  //     this.options
  //   );
  // }

  getstatetax(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    stateid: any
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      STATE_ID: stateid,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/taxDetails/getTaxDetails',
      JSON.stringify(data),
      this.options
    );
  }
  getorderdetails(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    ORDER_ID: any
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      ORDER_ID: ORDER_ID,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/order/getPaymentOrdeDetails',
      JSON.stringify(data),
      this.options
    );
  }

  getActionLog(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianActionLogs/getDateWiseLogs',
      JSON.stringify(data),
      this.options
    );
  }
  getInvoiceLogs(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/invoice/getInvoiceLogs',
      JSON.stringify(data),
      this.options
    );
  }
  //Inventory Master
  getInventory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'inventory/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createInventory(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'inventory/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateInventory(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'inventory/update',
      JSON.stringify(user),
      this.options
    );
  }
  getInventorySubCategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'inventorySubCategory/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createInventorySubCategory(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'inventorySubCategory/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateInventorySubCategory(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'inventorySubCategory/update',
      JSON.stringify(user),
      this.options
    );
  }
  getInventoryCategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/inventoryCategory/get',
      JSON.stringify(data),
      this.options
    );
  }
  getWarehousesLocation(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'warehouseLocations/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createWarehousesLocation(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'warehouseLocations/create',
      JSON.stringify(data),
      this.options
    );
  }

  updateWarehousesLocation(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'warehouseLocations/update',
      JSON.stringify(user),
      this.options
    );
  }

  getWarehouses(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'warehouse/get ',
      JSON.stringify(data),
      this.options
    );
  }
  createInventoryAdjustment(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'inventoryAdjustment/create',
      JSON.stringify(data),
      this.options
    );
  }
  getInventoryTransactions(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.url + 'inventoryTransactions/get',
      JSON.stringify(data),
      this.options
    );
  }
  getTechnicianDataFilter(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    TYPE: any,
    SKILL_ID: any,
    EXPERIANCE: any,
    PINCODE_ID: any
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      TYPE: TYPE,
      SKILL_ID: SKILL_ID,
      EXPERIANCE: EXPERIANCE,
      PINCODE_ID: PINCODE_ID,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianLocationTrack/getTechnicianLocations',
      JSON.stringify(data),
      this.options
    );
  }

  getTechnicianDetailData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianLocationTrack/getTechnicianLocations',
      JSON.stringify(data),
      this.options
    );
  }

  getTechnicaionActionLog(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianActionLogs/get',
      JSON.stringify(data),
      this.options
    );
  }

  getTechnicaionLoacionTrack(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/technicianLocationTrack/get',
      JSON.stringify(data),
      this.options
    );
  }
  //Order Review
  getCustomerReviewData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    ORDER_ID: any
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      ORDER_ID: ORDER_ID,
    };

    return this.httpClient.post<any>(
      this.url + 'customerServiceFeedback/getCustomerServiceFeedback',
      JSON.stringify(data),
      this.options
    );
  }

  getTechnicianReviewData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    ORDER_ID: any
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      ORDER_ID: ORDER_ID,
    };

    return this.httpClient.post<any>(
      this.url + 'customertechnicianfeedback/getcustomerTechnicianFeedback',
      JSON.stringify(data),
      this.options
    );
  }

  // Past Order
  getAllPastOrders(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/order/get',
      JSON.stringify(data),
      this.options
    );
  }

  // Accept Order
  acceptorder(form: any): Observable<any> {
    form.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/order/update',
      JSON.stringify(form),
      this.options
    );
  }

  getjobcardTechnicianMapping(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/jobCardTechnicianMapping/get',
      JSON.stringify(data),
      this.options
    );
  }

  getorderDetails(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/orderDetails/get',
      JSON.stringify(data),
      this.options
    );
  }

  jobCardChat(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/jobcardchat/get',
      JSON.stringify(data),
      this.options
    );
  }

  jobCardChatDetails(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/jobcardchatdetails/get',
      JSON.stringify(data),
      this.options
    );
  }

  OrderAddressMap(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/orderMasterAddressMap/get',
      JSON.stringify(data),
      this.options
    );
  }

  Ordermaster(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/order/get',
      JSON.stringify(data),
      this.options
    );
  }
  getterritoryServiceData(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string,
    TERRITORY_ID: number
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
      TERRITORY_ID: TERRITORY_ID,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/serviceCatalog/getMappedServices',
      JSON.stringify(data),
      this.options
    );
  }
  addTerritoryServiceMapping(
    TERRITORY_ID: number,
    CLIENT_ID: number,
    datas: any[]
  ): Observable<any> {
    var data = {
      TERITORY_ID: TERRITORY_ID,
      CLIENT_ID: CLIENT_ID,
      data: datas,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/territoryServicenOnAvailabilityMapping/addBulk',
      data,
      this.options
    );
  }

  createInventoryCategory(form: any): Observable<any> {
    return this.httpClient.post<any>(
      this.baseUrl + 'api/inventoryCategory/create',
      JSON.stringify(form),
      this.options
    );
  }

  updateInventoryCategory(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.baseUrl + 'api/inventoryCategory/update',
      JSON.stringify(user),
      this.options
    );
  }
  // Support category calls

  createSupportSubcategory(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'supportSubCategory/create',
      JSON.stringify(data),
      this.options
    );
  }
  updateSupportSubcategory(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'supportSubCategory/update',
      JSON.stringify(user),
      this.options
    );
  }

  getSupportSubcategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/supportSubCategory/get',
      JSON.stringify(data),
      this.options
    );
  }
  CreateCustomersupport(data: any): Observable<any> {
    data.CLIENT_ID = this.clientId;
    return this.httpClient.post<any>(
      this.url + 'supportCategory/create',
      JSON.stringify(data),
      this.options
    );
  }

  UpdateCustomersupport(user: any): Observable<any> {
    user.CLIENT_ID = this.clientId;
    return this.httpClient.put<any>(
      this.url + 'supportCategory/update',
      JSON.stringify(user),
      this.options
    );
  }

  getSupportCategory(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/supportCategory/get ',
      JSON.stringify(data),
      this.options
    );
  }
  getCustomerSupport(
    pageIndex: number,
    pageSize: number,
    sortKey: string,
    sortValue: string,
    filter: string
  ): Observable<any> {
    var data = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      sortKey: sortKey,
      sortValue: sortValue,
      filter: filter,
    };
    return this.httpClient.post<any>(
      this.baseUrl + 'api/supportCategory/get ',
      JSON.stringify(data),
      this.options
    );
  }
}
