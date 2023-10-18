export interface StaffData {
    surname?: string | undefined;
    othernames?: string |undefined;
    department?: string | undefined;
    email?: string | undefined;
    staff_id?: string | undefined;
    position?: string;
    app_type?: string;
}

export interface ProfessionalApplication {
    id?: string|number
    surname?: string | undefined;
    othernames?: string |undefined;
    department?: string | undefined;
    email?: string | undefined;
    staffid?: string | undefined;
    dob: string;
    newroledepartment: string;
    schedulesheld: string;
    adminprojects: string;
    conferencesattended: string;
    promotionto: string;
    year: string;
    cvfile: string;
    currentposition: string;
    staffcompleted: string|number;
    hodcompleted: string|number;
    state: number;
    hodid: string;
    hodname: string;
    hodassessment: string
}

export interface JuniorSeniorApplication {
    id?: string|number;
    surname?: string | undefined;
    othernames?: string |undefined;
    department?: string | undefined;
    email?: string | undefined;
    staffid?: string | undefined;
    dob: string;
    newroledepartment: string;
    schedulesheld: string;
    adminprojects: string;
    conferencesattended: string;
    promotionto: string;
    year: string;
    cvfile: string;
    currentposition: string;
    staffcompleted: string|number;
    hodcompleted: string|number;
    state: number;
    hodid: string;
    hodname: string;
}

export interface GeneralApplication {
    id?: string|number;
    surname?: string | undefined;
    othernames?: string |undefined;
    department?: string | undefined;
    email?: string | undefined;
    staffid?: string | undefined;
    dob: string;
    promotionto: string;
    year: string;
    state: number;
    hodid: string;
    hodname: string;
    applicationtype: string;
}