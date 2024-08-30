import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { KeycloakOperationService } from 'src/app/core/services/keycloak.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    private keycloakOperationService: KeycloakOperationService
  ) {}

  private appendOrganizationId(params: any = {}) {
    const organizationId = this.keycloakOperationService.getOrganizationId();
    if (organizationId) {
      params['organizationId'] = organizationId;
    }
    return params;
  }

  searchScreensByName(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/campaign/search`, {
      params: { screenName }
    });
  }

  getScreenDetailsByName(screenName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/campaign/screen/details?screenName=${screenName}`);
  }
  

  getCustomerNames(): Observable<any> {
    const params = this.appendOrganizationId();
    return this.http.get(
      `${this.baseApiUrl}/settings/campaign/getActiveCustomerNames`,
      { params }
    );
  }

  getExtraSlotSize(): Observable<any[]> {
    const params = this.appendOrganizationId();
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/getActiveExtraSlotSize`,
      { params }
    );
  }

  getCategoryOptions(): Observable<any[]> {
    const params = this.appendOrganizationId();
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/getActiveCategoryOptions`,
      { params }
    );
  }

  getCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/campaign`);
  }

  getDateOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/date`);
  }

  getScreenTypeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/screenType`
    );
  }

  getStatusOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseApiUrl}/settings/campaign/status`);
  }

  getSlotSizeOptions(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseApiUrl}/settings/campaign/slotSize`
    );
  }

  createCampaign(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/campaign/create`, formData);
  }

  uploadMedia(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/uploadMedia`, formData);
  }

  screensList(filters: any): Observable<any> {
    return this.http.post(
      `${this.baseApiUrl}/screen/api/available-screens`,
      filters
    );
  }
}
