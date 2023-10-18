import { Link } from 'react-router-dom';
import cardImage from './assets/images/card.jpeg';
// import prodcardImage from 'assets/images/card.jpeg';
import PromotionHistory from './PromotionHistory/PromotionHistory';

import {useEffect, useState}  from 'react'
import DataService from './Service/DataService';
import { setHoDInfo, setJuniorSeniorApplication, setProfessionalApplication, setUser } from './store/actions/dataAction';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';


const prodBaseURL = process.env.NODE_ENV =='development' ? '' : '/services/staff/staff-promotions';


function MainPage() {

    const dispatch : AppDispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const [pending_hod_completion, setPendingHodCompletion] = useState<number>(0)

    /**
     * 
     */
    useEffect(() => {
        getLoggedInStaff();
        console.log(loading);
        getPreviousProfessionalApplication();
        getPreviousSeniorJuniorApplication();
        getApplicationsPendingHoDCompletion();
    }, []);


    /**
     * 
     * 
     */
    const getApplicationsPendingHoDCompletion = () => {
        DataService.getApplicationCountPendingHoDCompletion().then(response => {
            if(response.data.status == 'success'){
                setPendingHodCompletion(response.data.hodcount);
            }
        }).catch(error => {
            console.log(error);
        })
    }


    /**
     * 
     */
    const getLoggedInStaff = () => {
        DataService.getLoggedInStaff().then(response => {
            if(response.data.status == 'success'){
                setLoading(false);
                dispatch(setUser(response.data.staff));
                dispatch(setHoDInfo(response.data.hod));
            }
        }).catch(error=> {
            setLoading(false);
            console.log(error);
        })
    }

    /**
     * 
     */
    const getPreviousProfessionalApplication = () => {
        DataService.getStaffPreviousProfessionalApplication().then(response => {
            if(response.data.status == 'success'){
                dispatch(setProfessionalApplication(response.data.data))
            }
        }).catch(error=> {
            console.log(error);
        })
    }

    /**
     * 
     * 
     */
    const getPreviousSeniorJuniorApplication = () => {
        DataService.getSeniorJuniorApplication().then(response => {
            if(response.data.status == 'success'){
                dispatch(setJuniorSeniorApplication(response.data.data))
            }
        }).catch(error=> {
            console.log(error);
        })
    }

    const generateUrl = () => {
        if(process.env.NODE_ENV =='development'){
            return cardImage;
        }else{
            return 'https://sts.ug.edu.gh/services/promotions/assets/card.jpeg';
        }
    }

    /**
     * 
     * @returns 
     */
    const renderJuniorSeniorCard = () => {
        return (
            <div className="col-md-4">
                <div className="card">
                    <img className="card-img-top" src={generateUrl()} alt="Card image cap" style={{height: 150, objectFit:'cover'}} />
                    <div className="card-body">
                        <h5 className="card-title">JUNIOR & SENIOR STAFF APPLICATION</h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <Link to={prodBaseURL+"/junior-senior-promotion"} className="btn btn-primary">APPLY NOW</Link>
                    </div>
                </div>
            </div>
        )
    }
    /**
     * 
     * @returns 
     */
    const renderAdminProfessionalCard = () => {
        return (
            <div className="col-md-4">
                <div className="card">
                    <img className="card-img-top" src={generateUrl()} alt="Card image cap" style={{height: 150, objectFit:'cover'}} />
                    <div className="card-body">
                        <h5 className="card-title">SENIOR ADMINISTRATIVE & PROFESSIONAL STAFF</h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        <Link to={prodBaseURL+"/admin-professional-promotion"} className="btn btn-primary">APPLY NOW</Link>
                    </div>
                </div>
            </div>
        )
    }

     /**
     * 
     * @returns 
     */
     const renderHodLinks = () => {
        if(pending_hod_completion > 0){
            return (
                <div className="col-md-4">
                    <div className="card">
                        {/* <img className="card-img-top" src={generateUrl()} alt="Card image cap" style={{height: 150, objectFit:'cover'}} /> */}
                        <div className="card-body">
                            <Link to={prodBaseURL+"/pending-hod-completion"} className="btn btn-outline-danger btn-block"> PENDING HOD COMPLETION</Link>
                        </div>
                    </div>
                </div>
            )
        }
        
    }

    /**
     * 
     */
    return (
        <>
           <div className="container" style={{marginTop: 30}}>
                <div className='row'>
                    <div className='container'>
                        <div className='alert alert-info card'>
                            <div className='card-body'>
                                <h2 style={{textAlign:'center'}}>Hello, Welcome to UG Promotions application platform. Select category below to apply.</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {renderJuniorSeniorCard()}
                    {renderAdminProfessionalCard()}
                    {renderHodLinks()}
                </div>

                <div className='row'>
                    <PromotionHistory />
                </div>
           </div>
        </>
    )
}

export default MainPage