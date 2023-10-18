
import http from '../helpers/axios';
import { IGeneralApplicationsResponse, IHODPendingActionResponse, IProfessionalApplicationResponse, IResponse, ISeniorJuniorApplicationResponse, IStaffInfoResponse } from '../types/responses';

class DataService {


  getLoggedInStaff() {
    return http.get<IStaffInfoResponse>('/get-staff-info');
  }

  sendAdminApplication(data: FormData){
    return http.post<IResponse>('/send-admin-application', data);
  }

  getStaffPreviousProfessionalApplication(){
    return http.get<IProfessionalApplicationResponse>('/get-staff-professional-application');
  }

  sendSeniorJuniorPromotion(data: any) {
    return http.post<IResponse>('/send-junior-senior-application', data);
  }

  getSeniorJuniorApplication() {
    return http.get<ISeniorJuniorApplicationResponse>('/get-staff-snr-jnr-applications');
  }

  getApplicationCountPendingHoDCompletion(){
    return http.get<IHODPendingActionResponse>('/get-hod-pending-actions-count');
  }

  getHodApplications() 
  {
    return http.get<IGeneralApplicationsResponse>('/get-hod-applications');
  }

  getStaffForHoD(staffid: string) 
  {
    return http.post<IStaffInfoResponse>('/get-main-staff',{
      staffid: staffid
    });
  }

  sendAdminHODAssessment(data: string, appid: string, staffid: string){
    return http.post<IResponse>('/admin-submit-hod-assessment', {
      assessment: data,
      appid: appid,
      staffid: staffid
    });
  }

  getAdminProfApplication(appid: string, staffid: string){
    return http.post<IProfessionalApplicationResponse>('/get-admin-prof-application', {
      appid: appid,
      staffid: staffid
    });
  }


  deleteAdminProfApplication(appid: string|number, staffid: string){
    return http.post<IResponse>('/delete-admin-prof-application', {
      appid: appid,
      staffid: staffid
    });
  }

  deleteJuniorSeniorApplication(appid: string|number, staffid: string) {
    return http.post<IResponse>('/delete-jnr-snr-application', {
      appid: appid,
      staffid: staffid
    });
  }

  



}

export default new DataService();
