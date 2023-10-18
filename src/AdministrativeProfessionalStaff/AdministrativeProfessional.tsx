import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StaffData } from "../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Swal from "sweetalert2";
import DataService from "../Service/DataService";
import Loader from "../Loader/Loader";

function AdministrativeProfessional() {
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [dob, setDoB] = useState<string>("");
  const [schedules_held, setSchedulesheld] = useState<string>("");
  const [admin_projects, setAdminProjects] = useState<string>("");
  const [conferences_attended, setConferencesAttended] = useState<string>("");
  const [promotionto, setPromotionTo] = useState<string>("");
  const [newrole_department, setNewRoleDepartment] = useState<string>("");
  const [cvfirstdegree, setCVFirstDegree] = useState<Blob>();
  const [cvfilename, setCVFirstDegreeFilename] = useState<string>("");
  const staff: StaffData = useSelector((state: RootState) => state.data.staff);
  const hod = useSelector((state: RootState) => state.data.hod);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loading)
  }, [])


/**
 * 
 * @param event 
 */
  const handlePromotionTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromotionTo(event.target.value);
  };

  /**
   * 
   * @param event 
   */
  const handleNewRoleDepartmentEntry = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewRoleDepartment(event.target.value);
  };

  /**
   * 
   * @param event 
   */
  const onCVFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files != null) {
        setCVFirstDegree(event.target.files[0]);
        setCVFirstDegreeFilename(event.target.files[0].name);
    }
  }

  /**
   * 
   * 
   */
  const handleComplete = () => {
    sendPromotionApplication();
  };


  /**
   * 
   * @param param0 
   */
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


  /**
   * 
   * 
   * 
   */

  const sendPromotionApplication = () => {
    // event.preventDefault();
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
            // setLoading(true);

            let formdata = new FormData();
            formdata.append("staffid", staff?.staff_id == null ? "" : staff?.staff_id);
            formdata.append("surname", staff?.surname == null ? "" : staff?.surname);
            formdata.append("dob", dob);
            formdata.append("phone", phone);
            formdata.append("email", staff?.email == null ? "" : staff?.email);
            formdata.append("othernames", staff?.othernames == null ? "" : staff?.othernames);
            formdata.append("department", staff?.department == null ? "" : staff?.department);
            formdata.append("newrole_department", newrole_department);
            formdata.append("schedules_held", schedules_held);
            formdata.append("admin_projects", admin_projects);
            formdata.append("conferences_attended", conferences_attended);
            formdata.append("promotionto", promotionto);
            formdata.append('hodname', hod.name);
            formdata.append('hodid', hod.staffid);
            if(cvfirstdegree != undefined){
                formdata.append('cvfile', cvfirstdegree, cvfilename)
            }
            DataService.sendAdminApplication(formdata).then(response => {
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


/**
 * 
 * @returns 
 * 
 */
  const renderStaffBio = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Staff ID</label>
              <input
                disabled={true}
                value={staff?.staff_id}
                type="text"
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
                value={phone}
                onChange={(event)=>setPhone(event?.target.value)}
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
                value={dob}
                onChange={(event) => setDoB(event.target.value)}
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
                className="form-control"
                value={staff?.department}
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  /**
   * ADDITIONAL INFO
   * @returns
   */
  const renderAdditionalInformation = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">Application For Promotion To</label>
              <input
                type="text"
                onChange={(event) => handlePromotionTo(event)}
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">
                Department/Institution of new role
              </label>
              <input
                type="text"
                onChange={(event) => handleNewRoleDepartmentEntry(event)}
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
              <label htmlFor="surname">
                Full Curriculum Vitae from first degree
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => onCVFileUpload(event)}
                className="form-control"
                id="surname"
                name="surname"
              />
              <small style={{color:'red'}}>Supported File Formats[ .PDF]</small>
            </div>
          </div>
        </div>
        <div className="row editorug">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="othername">Details of Schedules held</label>
              {/* <textarea name="" className="form-control" id="" rows={5}></textarea> */}
              <CKEditor
                editor={ClassicEditor}
                data={schedules_held}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setSchedulesheld(data);
                  console.log(event)
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                  console.log(event)
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                  console.log(event)
                }}
              />
            </div>
          </div>
        </div>
        <div className="row editorug">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="othername">
                Details of Major Administrative Projects or Assignments
                undertaken
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={admin_projects}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event: any, editor: any) => {
                  const data = editor.getData();
                  setAdminProjects(data);
                  console.log(event)
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                  console.log(event)
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                  console.log(event)
                }}
              />
            </div>
          </div>
        </div>
        <div className="row editorug">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="othername">
                Conferences, Special Seminars and Workshops attended and
                contributions made
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={conferences_attended}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setConferencesAttended(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log(event)
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log(event)
                  console.log("Focus.", editor);
                }}
              />
            </div>
          </div>
        </div>

        {/* <hr/> */}

        <legend>Head Of Department Information</legend>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="surname">HoD Staff ID</label>
              <input
                disabled={true}
                value={hod?.staffid}
                type="text"
                className="form-control"
                id="surname"
                name="surname"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="othername">HoD Name</label>
              <input
                disabled={true}
                type="text"
                value={hod?.name}
                // onChange={(event)=>setPhone(event?.target.value)}
                className="form-control"
                id="othername"
                name="othername"
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <Loader isOpen={loading} loading={loading} />
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
            <h4 className="card-title">
              SENIOR ADMINISTRATIVE & PROFESSIONAL STAFF
            </h4>
          </div>
          <div className="card-body">
            <FormWizard
              stepSize="sm"
              color="#094899"
              onComplete={handleComplete}
              onTabChange={tabChanged}finishButtonTemplate={(handleComplete:any) => (
                <button className="btn btn-danger btn-md pull-right" onClick={handleComplete}>
                  Submit Application
                </button>
              )}
            >
              <FormWizard.TabContent
                style={{ textAlign: "start" }}
                title="Personal details"
                icon="ti-user"
              >
                {renderStaffBio()}
              </FormWizard.TabContent>
          
              <FormWizard.TabContent title="Summary" icon="ti-check">
               {renderAdditionalInformation()}
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
                .editorug {
                    margin-top: 30px;
                }
            `}</style>
    </div>
  );
}

export default AdministrativeProfessional;
