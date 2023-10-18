import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import FormWizard from "react-form-wizard-component";
import { StaffData } from "../types/types";
import DataService from "../Service/DataService";
import Loader from "../Loader/Loader";

function CompleteSeniorJuniorApplication() {
  const search = useLocation().search;
  const staffid = new URLSearchParams(search).get("staffid");
  const appid = new URLSearchParams(search).get("appid");
  const [loading, setLoading] = useState<boolean>(false);
  const [mainstaff, setMainStaff] = useState<StaffData>(null);
  const [conversant, setConversantWithWork] = useState<string>("");
  const [wellinformed, setWellInformed] = useState<string>("");
  const [knowledgecomments, setKnowledgeComments] = useState<string>("");

  const [workperformance, setWorkPerformance] = useState<string>("");
  const [minsupervision, setMinSupervisionRes] = useState<string>("");
  const [additionalresponsibility, setAcceptAdditionalResponsibility] =
    useState<string>("");
  const [punctual, setPunctuality] = useState<string>("");
  const [workavailability, setWorkAvailability] = useState<string>("");
  const [initiative, setInitiative] = useState<string>("");
  const [performanceimprovement, setperformanceImprovementSuggestions] =
    useState<string>("");

  //Control of Subordinate Staff
  const [workbestwithsubordinate, setWorkBestWithSubordinate] =
    useState<string>("");
  const [workwellwithsub, setWorkWellWithSubordinate] = useState<string>("");
  const [competentwithsubordinate, setCompetentWithSubordinate] =
    useState<string>("");
  const [subordinateComment, setSubordinateComment] = useState<string>("");

  //General Disposition
  const [courteousness, setCourteousness] = useState<string>("");
  const [respectseniorandjuniorrstaff, setRespectJuniorSeniorStaff] =
    useState<string>("");
  const [disposition_comment, setDispositionComments] = useState<string>("");

  //General Impression
  const [generalimpression, setGeneralImpressions] = useState<string>("");

  //Overall grading
  const [overallgrading, setOverallgrading] = useState<string>("");
  const [recommendationforpromotion, setRecommendationForPromotion] =
    useState<string>("");

  //Establishment
  const [gradeestablishment, setGradeEstablishment] = useState<string>("");
  const [vacantpost, setVacantPost] = useState<string>("");
  const [jobdescription, setJobDescription] = useState<string>("");
  const [jobqualification, setJobQualification] = useState<string>("");

  useEffect(() => {
    getMainStaffInfo();
    console.log(staffid, appid, mainstaff, loading);
    setLoading(false);
  }, []);

  const getMainStaffInfo = () => {
    DataService.getStaffForHoD(staffid)
      .then((response) => {
        if (response.data.status == "success") {
          setMainStaff(response.data.staff);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   *
   *
   */
  const handleComplete = () => {
    // sendPromotionApplication();
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
   * @returns
   *
   */
  const renderKnowledgeOfWork = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                I). To what extent is he/she conversant with his/her work?
                (Where necessary refer for Technical/professional assessment)
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={conversant != null || undefined ? conversant : ""}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  // setHodAssessment(data);
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
                II). Is he/she well-informed as to the rules and regulations
                relevant to his/her duties
              </label>
              <select
                className="form-control"
                onChange={(event) => setWellInformed(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">III).Any other comments</label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  knowledgecomments != null || undefined
                    ? knowledgecomments
                    : ""
                }
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  // setHodAssessment(data);
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
   *
   */
  const renderSenseOfResponsibility = () => {
    return (
      <>
        <div className="row" style={{ marginBottom: 20 }}>
          <div style={{ marginLeft: 10 }}>
            <label htmlFor="surname">
              I). To what extent is the officer conscientious in the performance
              of his/her duties? (Please tick as appropriate)
            </label>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Excellent"
                  checked={workperformance == "Excellent" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setWorkPerformance("Excellent")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Excellent</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Very Good"
                  checked={workperformance == "Very Good" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setWorkPerformance("Very Good")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Very Good</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Good"
                  checked={workperformance == "Good" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setWorkPerformance("Good")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Good</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Satisfactory"
                  checked={workperformance == "Satisfactory" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setWorkPerformance("Satisfactory")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Satisfactory</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Indifferent"
                  checked={workperformance == "Indifferent" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setWorkPerformance("Indifferent")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Indifferent</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                II). Can he / she be relied upon to do his work as required with
                the minimum of supervision??
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) => setMinSupervisionRes(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                III). Does he / she willingly accept additional responsibility?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setAcceptAdditionalResponsibility(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                III). Is he / she punctual to work?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) => setPunctuality(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                III). Is he / she normally available at work?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) => setWorkAvailability(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                III). Does he /she always take initiative?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) => setInitiative(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                III). Suggestions for improvement of candidate's performance
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  performanceimprovement != null || undefined
                    ? performanceimprovement
                    : ""
                }
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setperformanceImprovementSuggestions(data);
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
   *
   */
  const renderGeneralDispositionAndImpression = () => {
    return (
      <>
        {renderControlOfSubOrdinateStaff()}

        {renderGeneralDisposition()}

        {renderGeneralImpression()}
      </>
    );
  };

  /**
   * 
   * @returns 
   * 
   */
  const renderGeneralDisposition = () => {
    return (
      <>
        <div className="row">
          <h3>General Disposition</h3>
        </div>

        <hr />

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                I). Is he / she courteouss and affable, cheerful and obliging to
                his/her colleagues?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) => setCourteousness(event.target.value)}
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                II). Does he/she show respect for his/her senior / junior staff?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setRespectJuniorSeniorStaff(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">II). Any other comments?</label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  disposition_comment != null || undefined
                    ? disposition_comment
                    : ""
                }
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setDispositionComments(data);
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
   */
  const renderGeneralImpression = () => {
    return (
        <>
            <div className="row">
            <h3>General Impression</h3>
            </div>
    
            <hr />
    
            <div className="row" style={{ marginBottom: 30 }}>
            <div className="col-md-12">
                <div className="form-group">
                <label htmlFor="surname">II). Any other comments?</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={
                    generalimpression != null || undefined
                        ? generalimpression
                        : ""
                    }
                    onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(_: any, editor: any) => {
                    const data = editor.getData();
                    setGeneralImpressions(data);
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
    )
  };

  /**
   * 
   * @returns 
   * 
   */
  const renderControlOfSubOrdinateStaff = () => {
    return (
      <>
        <div className="row">
          <h3>Control of Subordinate Staff (If Any)</h3>
        </div>

        <hr />

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                I). Does he /she get the best out of them?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setWorkBestWithSubordinate(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                II). Do they work quite well with him/her or for him/her?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setWorkWellWithSubordinate(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                II). Do they work quite well with him/her or for him/her?
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setCompetentWithSubordinate(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">II). Any other comments?</label>
              <CKEditor
                editor={ClassicEditor}
                data={
                  subordinateComment != null || undefined
                    ? subordinateComment
                    : ""
                }
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(_: any, editor: any) => {
                  const data = editor.getData();
                  setSubordinateComment(data);
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
   */
  const renderOverallGrading = () => {
   return (
    <>
        <div className="row col-md-12">
        <h3>Overall grading of officer's performance</h3>
        </div>

        <hr />

        <div className="row" style={{ marginBottom: 20 }}>
          <div style={{ marginLeft: 10 }}>
            <label htmlFor="surname">
              I). Please tick one of the following grading, as appropriate (NB: A grade C does not enhance chance of promotion)
            </label>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Excellent"
                  checked={overallgrading == "Excellent" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Excellent")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Excellent (90% to 100%)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Very Good"
                  checked={overallgrading == "Very Good" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Very Good")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Very Good (75% to 89%)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Good"
                  checked={overallgrading == "Good" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Good")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Good (60% to 74%)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Satisfactory"
                  checked={overallgrading == "Satisfactory" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Satisfactory")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Satisfactory/Average (50% to 59%)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Indifferent"
                  checked={overallgrading == "Below Average" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Below Average")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Below Wverage (40% to 49%)</span>
                </span>
              </label>
            </div>
            <div>
              <label className="d-inline-block custom-control custom-radio">
                <input
                  type="radio"
                  name="workevaluation"
                  value="Indifferent"
                  checked={overallgrading == "Poor" ? true : false}
                  // disabled={workperformance == "Excellent" ? false : true}
                  onChange={(_) => setOverallgrading("Poor")}
                  className="custom-control-input"
                />
                <span className="custom-control-indicator"></span>
                <span className="custom-control-description">
                  <span>Poor (Below 40%)</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginBottom: 30, borderColor:'red', borderWidth: 2 }}>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="surname">
                I). RECOMMENDATION
              </label>
              <select
                className="form-control col-md-6"
                onChange={(event) =>
                  setRecommendationForPromotion(event.target.value)
                }
              >
                <option value="">Select an option</option>
                <option value="I Recommend For Promotion">I Recommend For Promotion</option>
                <option value="I Do NOT Recommend for Promotion">I Do NOT Recommend for Promotion</option>
              </select>
            </div>
          </div>
        </div>
     
    </>
   )
  }

  /**
   *
   *
   */
  return (
    <div className="container" style={{ paddingBottom: 50 }}>
      <Loader isOpen={loading} loading={loading} />
      {/* <button onClick={()=> navigate(-1)} className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}}><i className="fa fa-arrow-left"></i> Go Back</button> */}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">HOD ASSESSMENT</h4>
        </div>
        <div className="card-body">
          <FormWizard
            stepSize="sm"
            color="#094899"
            onComplete={handleComplete}
            onTabChange={tabChanged}
            finishButtonTemplate={(handleComplete: any) => (
              <button
                className="btn btn-danger btn-md pull-right"
                onClick={handleComplete}
              >
                Submit Application
              </button>
            )}
          >
            <FormWizard.TabContent
              style={{ textAlign: "start" }}
              title="Knowledge Of Work "
              icon="ti-user"
            >
              {renderKnowledgeOfWork()}
            </FormWizard.TabContent>

            <FormWizard.TabContent
              style={{ textAlign: "start" }}
              title="Sense of Responsibility"
              icon="ti-user"
            >
              {renderSenseOfResponsibility()}
            </FormWizard.TabContent>

            <FormWizard.TabContent
              style={{ textAlign: "start" }}
              title="General Disposition / General Impression"
              icon="ti-user"
            >
              {renderGeneralDispositionAndImpression()}
            </FormWizard.TabContent>

            <FormWizard.TabContent
              style={{ textAlign: "start" }}
              title="Overall Grading / Job Description"
              icon="ti-user"
            >
              {renderOverallGrading()}
            </FormWizard.TabContent>

            <FormWizard.TabContent title="Summary" icon="ti-check">
              {/* {renderGeneralDisposition()} */}
            </FormWizard.TabContent>
          </FormWizard>
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

export default CompleteSeniorJuniorApplication;
