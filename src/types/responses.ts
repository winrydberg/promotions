import { GeneralApplication, JuniorSeniorApplication, ProfessionalApplication, StaffData } from "./types";

export interface IResponse {
    status: string;
    message: string;
}  

export interface IStaffInfoResponse extends IResponse {
    staff: StaffData,
    hod?:{
        staffid: string,
        name: string,
    }
}

export interface IProfessionalApplicationResponse extends IResponse {
    data: ProfessionalApplication,
}

export interface ISeniorJuniorApplicationResponse extends IResponse {
    data: JuniorSeniorApplication,
}

export interface IHODPendingActionResponse extends IResponse {
    hodcount: number,
}

export interface IGeneralApplicationsResponse extends IResponse {
    applications: GeneralApplication[],
}