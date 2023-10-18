import  { useState, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { ProfessionalApplication, StaffData } from '../types/types';
import DataService from '../Service/DataService';
import Loader from '../Loader/Loader';

function CompleteAdminProfApplication() {

    const navigate = useNavigate();
    const search = useLocation().search;
    const staffid=new URLSearchParams(search).get("staffid");
    const appid=new URLSearchParams(search).get("appid");
    const [loading, setLoading] = useState<boolean>(false);
    const [mainstaff, setMainStaff] = useState<StaffData>(null);
    const [hodassessment, setHodAssessment] = useState<string>("");
    const [application, setApplication] = useState<ProfessionalApplication>(null); //application variable not used for anything yet but may be crucial in the future



    useEffect(() => {
        getMainStaffInfo();
        getApplication();
        console.log(application)
    }, []);



    const getMainStaffInfo = () =>{
        DataService.getStaffForHoD(staffid).then(response => {
            if(response.data.status == 'success'){
                setMainStaff(response.data.staff);
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const getApplication = () => {
        DataService.getAdminProfApplication(appid, staffid).then(response => {
            if(response.data.status == 'success'){
                setApplication(response.data.data);
                setHodAssessment(response.data.data.hodassessment);
            }
        }).catch(_ => {
            console.log(_)
        })
    }

    const submitAssessment = () => {
        Swal.fire({
            title: 'Promotion | HOD Assessment',
            text: "Confirm to submit assessment",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Submit!'
        }).then((result) => {
            if (result.isConfirmed) {
                DataService.sendAdminHODAssessment(hodassessment, appid, staffid).then(response => {
                    if(response.data.status == 'success'){
                        setLoading(false);
                        Swal.fire(
                            'Success!',
                            response.data.message,
                            'success'
                        ).then(_ => {
                            navigate(-1);
                        })
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



    return (  
            
            <div className="container" style={{paddingBottom: 50}}>
                <Loader isOpen={loading} loading={loading} />
                    <button onClick={()=> navigate(-1)} className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}}><i className="fa fa-arrow-left"></i> Go Back</button>
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">HOD ASSESSMENT</h4>
                    </div>
                    <div className="card-body">
                        <div className='col-md-12' style={{marginTop: 30, marginBottom: 30, display:'flex', justifyContent:'center'}}>
                            <h3>Staff Assessment for Promotion | <span>{mainstaff?.othernames+' '+mainstaff?.surname}</span></h3>
                        </div>
                    <div className="row editorug">
                        <div className="col-md-12">
                            <div className="form-group">
                            <label htmlFor="othername">
                                Give your assessment of staff for promotion
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={hodassessment != null||undefined ? hodassessment : ""}
                                onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                                }}
                                onChange={(_: any, editor: any) => {
                                const data = editor.getData();
                                setHodAssessment(data);
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
                     <button className='btn btn-danger' onClick={submitAssessment}><i className='fa fa-send'></i> Submit Assessment</button>
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
                    min-height: 400px;
                }
            `}</style>
            </div>
    )
}

export default CompleteAdminProfApplication