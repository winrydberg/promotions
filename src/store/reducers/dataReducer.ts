import { AnyAction } from "redux";
import { JuniorSeniorApplication, ProfessionalApplication, StaffData } from "../../types/types";
import { SET_HOD_DETAILS, SET_JNR_SNR_APPLICATION, SET_LOGGED_IN_USER, SET_PROFESSIONAL_APPLICATION } from "../types";


type State = {
    staff: StaffData | null | undefined;
    snr_applications: JuniorSeniorApplication[]
    admin_applications: ProfessionalApplication[];
    hod: {staffid: string, name: string}
}

const initialState: State = {
    staff: null,
    snr_applications:  [],
    admin_applications:  [],
    hod: null
}



const dataReducer = (state: State = initialState, action: AnyAction) => {
    switch (action.type) {
      case SET_LOGGED_IN_USER:
        return {
          ...state,
          staff: action.payload,
        };
      case SET_JNR_SNR_APPLICATION:
        return {
          ...state,
          snr_applications: action.payload,
        };
      case SET_PROFESSIONAL_APPLICATION:
        return {
          ...state,
          admin_applications: action.payload,
        };
      case SET_HOD_DETAILS:
          return {
            ...state,
            hod: action.payload,
          };
      default:
        return state;
    }
};

export default dataReducer;