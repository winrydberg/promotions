import FormWizard from "react-form-wizard-component";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-form-wizard-component/dist/style.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataService from "../Service/DataService";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { StaffData } from "../types/types";
import Loader from "../Loader/Loader";
// import { useState } from "react";

function JuniorSeniorPromotion() {
  const navigate = useNavigate();
  const [years, setyears] = useState<Array<number>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [additional_qualifications, setAdditionalQualifications] =
    useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [yearof_firstappointment, setYearOfFirstAppointment] = useState<string>("");
  const [first_appointment_qualification, setFirstAppointmentQualification] = useState<string>("");
  const [first_appointment_grade, setFirstAppointmentgrade] = useState<string>("");
  const [present_grade, setPresentGrade] = useState<string>("");
  const [promotionto, setPromotionTo] = useState<string>("");
  const [last_promotion_date, setLastPromotionDate] = useState<string>("");
  const [last_promotion_qualification, setLastPromotionQualification] = useState<string>("");
  const [dutiesperformed, setDutiesperformed] = useState<string>("");
  const [improvementsuggestion, setImprovmentSuggestion] = useState<string>("");
  const [promotionjustification, setPromotionJustification] =
    useState<string>("");
  const [supervisorotherstaff, setSuperviseOtherStaff] = useState<string>("");
  const [supervisiondetails, setSupervisionDetails] = useState<string>("");


  const staff : StaffData = useSelector((state: RootState) => state.data.staff);

  useEffect(() => {
    generateyears();
  }, [])


  const generateyears = () => {
    let curryear:number = new Date().getFullYear();
    let startyear = 1990;
    let theyear = [];
    for(let year=startyear; year<=curryear; year++){
        theyear.push(year);
    }
    setyears(theyear);
  }

  const handleComplete = () => {
    console.log("Form completed!");
    sendPromotionApplication();
  };
  const tabChanged = ({
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number;
    nextIndex: number;
  }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };

  const sendPromotionApplication = () => {

    Swal.fire({
        title: 'Promotion Application',
        text: "Confirm to send application",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Send!'
    }).then((result) => {
        if (result.isConfirmed) {
            setLoading(true);
            let data = {
                staffid: staff?.staff_id,
                surname: staff?.surname,
                othernames: staff?.othernames,
                department: staff?.department,
                email: staff?.email,
                phone: phone,
                yearof_firstappointment: yearof_firstappointment,
                first_appointment_qualification: first_appointment_qualification,
                first_appointment_grade: first_appointment_grade,
                present_grade: present_grade,
                promotionto: promotionto,
                last_promotion_date: last_promotion_date,
                last_promotion_qualification: last_promotion_qualification,
                supervisorotherstaff: supervisorotherstaff,
                supervisiondetails: supervisiondetails,
                additional_qualifications: additional_qualifications,
                dutiesperformed: dutiesperformed,
                improvementsuggestion: improvementsuggestion,
                promotionjustification: promotionjustification
            }
         
            DataService.sendSeniorJuniorPromotion(data).then(response => {
                if(response.data.status == 'success'){
                    setLoading(false);
                    Swal.fire(
                        'Success!',
                        response.data.message,
                        'success'
                    )
                }else{
                    setLoading(false);
                    Swal.fire(
                        'Error!',
                        response.data.message,
                        'error'
                    )
                }
            }).catch(error => {
                setLoading(false);
                Swal.fire(
                    'Error!',
                    error.message,
                    'error'
                )
            })
        }else{
            Swal.fire(
                'Cancelled!',
                'You have cancelled action. Promotion applicationn not sent',
                'info'
              )
        }
    })
}



const renderYears = () => {
    if(Array.isArray(years)){
       return  years.map((year, index) => {
            return (
                <option key={index} value={year}>{year}</option>
            )
        })
    }
}


/**
 * 
 * @returns 
 * 
 * 
 */
  const personalRecord = () => {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Staff ID</label>
              <input
                disabled={true}
                type="text"
                value={staff?.staff_id}
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Surname</label>
              <input
                disabled={true}
                value={staff?.surname}
                type="text"
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">Othername(s)</label>
              <input
                disabled={true}
                type="text"
                value={staff?.othernames}
                className="form-control"
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Email</label>
              <input
                disabled={true}
                value={staff?.email}
                type="text"
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">Phone No</label>
              <input
                type="text"
                onChange={(event) => setPhone(event.target.value)}
                className="form-control"
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Date Of Birth</label>
              <input
                type="date"
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">Department</label>
              <input
                type="text"
                value={staff?.department}
                className="form-control"
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };


  /**
   * 
   * @returns 
   * 
   * 
   */
  const appointmentInfo = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">
                Year of First Employment in the University
              </label>
              <select className="form-control" name="year" onChange={(event) => setYearOfFirstAppointment(event.target.value)}>
                <option value="">Select Year</option>
                {renderYears()}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">
                Grade of First Employment in the University
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setFirstAppointmentgrade(event.target.value)}
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">
                Qualification on your first appointment in the University
              </label>
              <input
                type="text"
                onChange={(event) => setFirstAppointmentQualification(event.target.value)}
                className="form-control"
                id="qualification"
                name="qualification"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">Present Grade/Post</label>
              <input
                type="text"
                onChange={(event) => setPresentGrade(event.target.value)}
                className="form-control"
                id="presentgrade"
                name="presentgrade"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Application for Promotion to</label>
              <input
                type="text"
                onChange={(event) => setPromotionTo(event.target.value)}
                className="form-control"
                id="promotionto"
                name="promotionto"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">
                Date of last promotion(if applicable)
              </label>
              <input
                type="date"
                onChange={(event) => setLastPromotionDate(event.target.value)}
                className="form-control"
                id="presentgrade"
                name="presentgrade"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Qualification at last promotion</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => setLastPromotionQualification(event.target.value)}
                id="lastpromoqualification"
                name="lastpromoqualification"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                Additional qualifications obtained since last
                Appointment/Promotion(List subjects studied and grades obtained
                where applicable)
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={additional_qualifications}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setAdditionalQualifications(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log(event);
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log(event);
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };


  /**
   * 
   * @returns 
   * 
   * 
   */
  const performancePromotion = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">Duties performed in present grade</label>
              <CKEditor
                editor={ClassicEditor}
                data={dutiesperformed}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setDutiesperformed(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log(event);
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log(event);
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                Do you hae anu suggestions for improvement of your performance
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={improvementsuggestion}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setImprovmentSuggestion(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log(event);
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log(event);
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                Justification For Promotion
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={promotionjustification}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setPromotionJustification(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log(event);
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log(event);
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">
                Dou you supervise other staff?
              </label>
              <select className="form-control" name="year" onChange={(event)=>setSuperviseOtherStaff(event.target.value)}>
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {renderSupervisionDetails()}
      </>
    );
  };


  const renderSupervisionDetails = () => {
    if(supervisorotherstaff == "Yes"){
        return (
            <div className="row">
                <div className="col-md-12">
                <div className="form-group">
                    <label htmlFor="surname">
                    If yes, give details
                    </label>
                    <CKEditor
                    editor={ClassicEditor}
                    data={supervisiondetails}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(_: any, editor: any) => {
                        const data = editor.getData();
                        setSupervisionDetails(data);
                        // console.log( { event, editor, data } );
                    }}
                    onBlur={(event, editor) => {
                        console.log(event);
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log(event);
                        console.log("Focus.", editor);
                    }}
                    />
                </div>
                </div>
            </div>
        )
    }
  }


  /**
   * 
   * 
   * 
   */

  return (
    <div>
      <Loader isOpen={loading} loading={false} />
      <div className="container" style={{ paddingBottom: 50 }}>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-primary"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          <i className="fa fa-arrow-left"></i> Go Back
        </button>
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">JUNIOR & SENIOR STAFF PROMOTION</h4>
          </div>
          <div className="card-body">
            <FormWizard
              style={{ textAlign: "none" }}
              stepSize="sm"
              color="#094899"
              onComplete={handleComplete}
              onTabChange={tabChanged}
            >
              <FormWizard.TabContent
                style={{ textAlign: "start" }}
                title="Personal details"
                icon="ti-user"
              >
                {personalRecord()}
              </FormWizard.TabContent>
              <FormWizard.TabContent
                title="Appointment Info"
                icon="ti-settings"
              >
                {appointmentInfo()}
              </FormWizard.TabContent>
              <FormWizard.TabContent title="Performance & Promotion" icon="ti-check">
                {performancePromotion()}
              </FormWizard.TabContent>
            </FormWizard>
          </div>
        </div>
      </div>
      <style>{`
                @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                .react-form-wizard .wizard-tab-content {
                    min-height: 100px;
                    padding: 30px 20px 10px;
                    text-align: start; 
                }
                .ck-editor__editable {
                    min-height: 200px;
                }
            `}</style>
    </div>
  );
}

export default JuniorSeniorPromotion;
