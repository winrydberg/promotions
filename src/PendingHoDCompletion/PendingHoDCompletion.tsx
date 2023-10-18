import { useState, useEffect } from "react";
import { GeneralApplication } from "../types/types";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../Service/DataService";
import Loader from "../Loader/Loader";

const prodBaseURL = process.env.NODE_ENV =='development' ? '' : '/services/staff/staff-promotions';


function PendingHoDCompletion() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [applications, setApplication] = useState<GeneralApplication[]>([]);



  useEffect(() => {
    hodApplications();
  }, [])


  const hodApplications = () => {
    DataService.getHodApplications().then(response => {
        setLoading(false);
        if(response.data.status == 'success'){
            setApplication(response.data.applications);
        }
    }).catch(error => {
        setLoading(false);
        console.log(error);
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


  const completeApplicationForStaff = (apptype: string, staffid: string, appid: string|number) => {
    if(apptype == "SENIOR AND JUNIOR STAFF PROMOTOION"){
        return (
            <Link to={prodBaseURL+"/snrjnr-hod-complete-application?staffid="+staffid+"&appid="+appid} className="btn btn-danger">COMPLETE APPLICATION</Link>
        )
    }else if(apptype == "ADMINISTRATIVE AND PROFESSIONAL STAFF PROMOTOION"){
        return (
            <Link to={prodBaseURL+"/adminprof-hod-complete-application?staffid="+staffid+"&appid="+appid} className="btn btn-danger">COMPLETE APPLICATION</Link>
        )
    }
  }

  const renderApplications = () => {
    if(Array.isArray(applications)){
        return applications.map((app, index) => {
            return (
                <tr key={index}>
                    <td>{app.staffid}</td>
                    <td>{app.surname+" "+app.othernames}</td>
                    <td>{app.email}</td>
                    <td>{app.year}</td>
                    <td>{app.promotionto}</td>
                    <td>{app.applicationtype}</td>
                    <td>{renderStatus(app.state)}</td>
                    <td>{completeApplicationForStaff(app.applicationtype, app.staffid, app.id)}</td>
                </tr>
            )
        })
    }
  }

  return (
    <div className="container" style={{paddingBottom: 50}}>
            <Loader isOpen={loading} loading={loading} />
            <button onClick={()=> navigate(-1)} className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}}><i className="fa fa-arrow-left"></i> Go Back</button>
            <div className="card">
                <div className="card-header">
                    <h4 className="card-title">APPLICATIONS PENDING YOUR COMPLETION AS HOD</h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <th>STAFF ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>YEAR APPLIED</th>
                                <th>PROMOTION TO</th>
                                <th>APPLICATION TYPE</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </thead>
                            <tbody>
                               {renderApplications()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PendingHoDCompletion