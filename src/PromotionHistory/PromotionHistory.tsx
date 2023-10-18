import { useSelector } from "react-redux"
import Swal from "sweetalert2";
import { RootState } from "../store"
import { JuniorSeniorApplication, ProfessionalApplication } from "../types/types";
import DataService from "../Service/DataService";
import { useState } from "react";
import Loader from "../Loader/Loader";


function PromotionHistory() {

  const [loading, setLoading] = useState<boolean>(false);
  const jnr_snr_applications: Array<JuniorSeniorApplication> = useSelector((state: RootState) => state.data.snr_applications);
  const admin_applications: Array<ProfessionalApplication> = useSelector((state: RootState) => state.data.admin_applications);



  const deleteApplication = (appid: string|number, staffid: string, type: string) => {
      // event.preventDefault();
      Swal.fire({
        title: 'Delete Application',
        text: "Confirm to delete application",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
        if (result.isConfirmed) {
            setLoading(true);
            if(type == 'professional'){
                DataService.deleteAdminProfApplication(appid, staffid).then(response => {
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
                DataService.deleteJuniorSeniorApplication(appid, staffid).then(response => {
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
            }
            
        }else{
            Swal.fire(
                'Cancelled!',
                'Oops, something went wrong.',
                'info'
              )
        }
    })
  }


  const renderStatus = (state: number) => {
    if(state == 1){
        return (
            <label className="badge badge-danger">NOT COMPLETE</label>
        )
    }else if(state == 2){
        return (
            <label className="badge badge-primary">PENDING HOD COMPLETION</label>
        )
    }else if(state == 3){
        return (
            <label className="badge badge-success">COMPLETE</label>
        )
    }
    else{
        return (
            <label className="badge badge-danger">NOT COMPLETE</label>
        )
    }
  }



  /**
   * 
   * 
   */
  const renderSeniorJuniorApplications = () => {
    if(Array.isArray(jnr_snr_applications)){
        return jnr_snr_applications.map((app, index) => {
            return (
               <tr key={index}>
                    <td>{app.staffid}</td>
                    <td>{app.surname+" "+app.othernames}</td>
                    <td>{app.email}</td>
                    <td>{app.year}</td>
                    <td>{app.promotionto}</td>
                    <td>{renderStatus(app.state)}</td>
                    <td>{app.hodid}</td>
                    <td>{app.hodname}</td>

                    <td>
                        {/* <button className="btn btn-danger">Delete</button> */}
                        <button onClick={() => deleteApplication(app.id, app.staffid, 'jnrsnr')} disabled={app.state <= 2 || null ? false : true } className="btn btn-danger">Delete</button>

                    </td>
               </tr>
            )
        })
    }
  }


  const renderAdminProfApplications = () => {
    if(Array.isArray(admin_applications)){
        return admin_applications.map((app, index) => {
            return (
               <tr key={index}>
                    <td>{app.staffid}</td>
                    <td>{app.surname+" "+app.othernames}</td>
                    <td>{app.email}</td>
                    <td>{app.year}</td>
                    <td>{app.promotionto}</td>
                    <td>{renderStatus(app.state)}</td>
                    <td>{app.hodid}</td>
                    <td>{app.hodname}</td>
                    <td>
                        <button onClick={() => deleteApplication(app.id, app.staffid, 'professional')} disabled={app.state <= 2 || null ? false : true } className="btn btn-danger">Delete</button>
                    </td>
               </tr>
            )
        })
    }
  }



  /**
   * 
   * 
   * 
   */
  return (
        <div className="container" style={{paddingBottom: 50}}>
            <Loader isOpen={loading} loading={loading} />
                {/* <button onClick={()=> navigate(-1)} className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}}><i className="fa fa-arrow-left"></i> Go Back</button> */}
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">APPLICATION HISTORY</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>STAFF ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>YEAR</th>
                                <th>PROMOTION TO</th>
                                <th>STATUS</th>
                                <th>HOD ID</th>
                                <th>HOD NAME</th>
                                <th>ACTION</th>
                            </thead>
                            <tbody>
                                {renderSeniorJuniorApplications()}
                                {renderAdminProfApplications()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PromotionHistory