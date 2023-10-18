import { JuniorSeniorApplication, ProfessionalApplication, StaffData } from "../../types/types";
import { SET_HOD_DETAILS, SET_JNR_SNR_APPLICATION, SET_LOGGED_IN_USER, SET_PROFESSIONAL_APPLICATION } from "../types";


export function setUser(user: StaffData) {
    return {
      type: SET_LOGGED_IN_USER,
      payload: user,
    };
}


export function setProfessionalApplication(data: ProfessionalApplication) {
  return {
    type: SET_PROFESSIONAL_APPLICATION,
    payload: data,
  };
}

export function setJuniorSeniorApplication(data: JuniorSeniorApplication) {
  return {
    type: SET_JNR_SNR_APPLICATION,
    payload: data,
  };
}

export function setHoDInfo(data: {staffid: string, name: string}) {
  return {
    type: SET_HOD_DETAILS,
    payload: data,
  };
}