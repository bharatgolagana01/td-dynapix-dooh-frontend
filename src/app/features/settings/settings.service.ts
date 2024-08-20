import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient, private keycloakOperationService: KeycloakOperationService) {}

  private appendOrganizationId(params: any = {}) {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params['organizationId'] = organizationId;
    }
    return params;
  }

  createIdentificationType(status: boolean, identificationType: string): Observable<any> {
    const params = this.appendOrganizationId({ status, identificationType });
    return this.http.post(`${this.apiUrl}/settings/user/createIdentificationtype`, params);
  }


  deleteIdentificationType(identificationType: string): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.delete(
      `${this.apiUrl}/settings/user/deleteIdentificationtype`,
      { body: { identificationType, ...params } }
    );
  }

  getIdentificationTypes(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getIdentificationTypes`, { params });
  }

  getActiveIdentificationTypes(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(
      `${this.apiUrl}/settings/user/getActiveIdentificationtypes`, { params }
    );
  }

  updateIdentificationTypeStatus(identificationType: string, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/user/updateIdentificationType/${identificationType}`, body);
  }

  createRole(status: boolean, role: string): Observable<any> {
    const params = this.appendOrganizationId({ status, role });
    return this.http.post(`${this.apiUrl}/settings/user/createRole`, params);
  }

  deleteRole(role: string): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.delete(`${this.apiUrl}/settings/user/deleteRole`, { body: { role, ...params } });
  }

  getRoles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getRoles`, { params });
  }

  getActiveRoles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getActiveRoles`, { params });
  }

  updateRoleStatus(role: string, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/user/updateRole/${role}`, body);
  }


  createProfile(status: boolean, profile: string): Observable<any> {
    const params = this.appendOrganizationId({ status, profile });
    return this.http.post(`${this.apiUrl}/settings/user/createProfile`, params);
  }

  deleteProfile(profile: string): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.delete(`${this.apiUrl}/settings/user/deleteProfile`, { body: { profile, ...params } });
  }

  getProfiles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getProfiles`, { params });
  }

  getActiveProfiles(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/user/getActiveProfiles`, { params });
  }

  updateProfileStatus(profile: string, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/user/updateProfile/${profile}`, body);
  }


  
  getSchedulers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/schedulers/getScheduler`);
  }

  createScheduler(scheduler: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/schedulers/createScheduler`,
      scheduler
    );
  }

  updateScheduler(scheduler: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/schedulers/updateScheduler`,
      scheduler
    );
  }

  deleteScheduler(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/schedulers/deleteScheduler`, {
      body: { id },
    });
  }

  createCustomerName(name: string, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ name, status });
    return this.http.post(`${this.apiUrl}/settings/campaign/createCustomerNames`, params);
  }

  deleteCustomerName(name: string): Observable<any> {
    const params = this.appendOrganizationId({ name });
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteCustomerNames`, { body: params });
  }

  getCustomerNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/campaign/getCustomerNames`, { params });
  }

  updateCustomerNameStatus(name: string, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/campaign/customerNames/${name}`, body);
  }


  createCategoryOption(status: boolean, categoryOption: string): Observable<any> {
    const params = this.appendOrganizationId({ status, categoryOption });
    return this.http.post(`${this.apiUrl}/settings/campaign/createCategoryOption`, params);
  }

  deleteCategoryOption(categoryOption: string): Observable<any> {
    const params = this.appendOrganizationId({ categoryOption });
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteCategoryOption`, { body: params });
  }

  getCategoryOptions(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(`${this.apiUrl}/settings/campaign/categoryOptions`, { params });
  }

  updateCategoryOption(categoryOption: string, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/campaign/updateCategoryOption/${categoryOption}`, body);
  }

  createExtraSlotSize(slotSize: number, status: boolean): Observable<any> {
    const params = this.appendOrganizationId({ slotSize, status });
    return this.http.post(`${this.apiUrl}/settings/campaign/extraSlotSize`, params);
  }

  getExtraSlotSizes(): Observable<any[]> {
    const params = this.appendOrganizationId();
    return this.http.get<any[]>(`${this.apiUrl}/settings/campaign/getExtraSlotSize`, { params });
  }

  updateExtraSlotSizeStatus(slotSize: number, status: boolean): Observable<any> {
    const body = this.appendOrganizationId({ status });
    return this.http.put(`${this.apiUrl}/settings/campaign/updateExtraSlotSize/${slotSize}`, body);
  }

  deleteExtraSlotSize(slotSize: number): Observable<any> {
    const params = this.appendOrganizationId({ slotSize });
    return this.http.delete(`${this.apiUrl}/settings/campaign/deleteExtraSlotSize`, { body: params });
  }
  
}
