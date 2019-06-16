import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { MyProfilePage } from '../MyProfilePage';
import { JobInstancePage } from '../JobInstance';
import { ExploreFreelancersPage } from '../ExploreFreelancersPage';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SubscriptionPage } from '../SubscriptionPage/SubscriptionPage';
import { MyJobPostsPage } from '../MyJobPostsPage/MyJobPosts';
import { InstitutionZonePage } from '../InstitutionZone/InstitutionZonePage';
import { ActiveJobApplicantspage } from '../ActiveJobApplicants/ActiveJobApplicants';
import { ViewJobApplicantPage } from '../ViewJobApplicants/ViewJobApplicants';
import { InstitutionPostsPage } from '../MyInstitutionPosts/InstitutionPostsPage';
import { history } from "../_helpers";
import company_logo from '../images/company_logo.png';
import './DashBoardPage.scss';
import FileViewer from 'react-file-viewer';
import { ViewCandidateDataPage } from '../ViewCandidateData/ViewCandidateData'
import botscoreontop from "../images/botscoreontop.PNG";
import { APP_URLS } from '../_constants/application.url';
import { FeedBackPage } from '../FeedBackPage/FeedBackPage';
import { FreelancersAndCampusHiresPage } from '../FreelancersAndCampusHires/FreelancersAndCampusHirespage'
import { CompaniesIntrestedPage } from '../CompaniesIntrested/CompaniesIntrestedPage'


function DashBoardPage({ props, match }) {
  let user = JSON.parse(localStorage.getItem("user"));
  let ProfileData = JSON.parse(localStorage.getItem('userProfile'))
  console.log("this.userData:", user);

  return (
    <div id="dashnav">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top bckgradient">
        <div className="container-fluid">
          <div className="col-md-6 padleftt">
            <img src={company_logo} className="company_logo" />
          </div>
          <div className="col-md-6 text-right">
            <div>
              {ProfileData == null ? (
                <div>
                  <img className="img-styles2 img-circle" />
                  <span></span>
                </div>
              ) : null}
              {ProfileData != null ? (
                <div>

                  <div className="row">
                    <div className="col-md-5 col-sm-5">

                    </div>
                    <div className="col-md-7 col-sm-7">
                      <div className="row">
                        <div className="col-md-12 padrightt">
                          <div className="profilenamemob">
                            <div className="float-left">
                            {ProfileData.image ? 
                              <img className="img-styles2 img-circle" src={APP_URLS.getUploadedFile + '/' + ProfileData.image} />
                              : <img className="img-styles2 img-circle" src={company_logo} />
                           
                            }
                            {/* {!ProfileData.image ?
                               <img className="img-styles2 img-circle" src={company_logo} />
                               :null
                          } */}
                            </div>
                            <div className="profileaname float-left">
                              {ProfileData.user_name.toUpperCase()}<br />
                              {ProfileData.email.toUpperCase()}<br />
                              <span className="profilesym">{ProfileData.mobile}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-2">

          </div>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="nav nav-pills nav-fill col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <div className="clearfix"><br />
            </div>
            <div>
              <NavLink className="nav-item nav-link" to={`${match.url}/JobInstance`}>
                VIEW INSTANT JOBS
              </NavLink>
              {/* <NavLink className="nav-item nav-link" to={`${match.url}/explorefreelancer`}>
                FREELANCERS & CAMPUS HIRES
             </NavLink> */}
              <NavLink className="nav-item nav-link" to={`${match.url}/Myprofile`}>
                CANDIDATE ZONE
             </NavLink>
              <NavLink className="nav-item nav-link" to={`${match.url}/myjobposts`}>
                EMPLOYER ZONE
             </NavLink>
              {/* <NavLink className="nav-item nav-link" to={`${match.url}/institutionzone`}>
                INSTITUTION ZONE
             </NavLink> */}
              {/* <NavLink className="nav-item nav-link" to={`${match.url}/subscription`}>
                MY SUBSCRIPTION
             </NavLink> */}
              <NavLink className="nav-item nav-link" to="/login">
                SIGN OUT
              </NavLink>
            </div>
          </nav>
          <main role="main" className="col-sm-9 ml-sm-auto col-md-10 pt-3">
            <div className="clearfix"></div>
            <Route path={`${match.url}/Myprofile`} component={MyProfilePage} />
            <Route path={`${match.url}/JobInstance`} component={JobInstancePage} />
            <Route path={`${match.url}/myjobposts`} component={MyJobPostsPage} />
            <Route path={`${match.url}/explorefreelancer`} component={ExploreFreelancersPage} />
            <Route path={`${match.url}/subscription`} component={SubscriptionPage} />
            <Route path={`${match.url}/viewjobapplicants`} component={ViewJobApplicantPage} />
            <Route path={`${match.url}/institutionzone`} component={InstitutionZonePage} />
            <Route path={`${match.url}/ActiveJobApplicants`} component={ActiveJobApplicantspage} />
            <Route path={`${match.url}/InstitutionPosts`} component={InstitutionPostsPage} />
            <Route path={`${match.url}/FeedBackPage`} component={FeedBackPage} />
            <Route path={`${match.url}/cadidatedata`} component={ViewCandidateDataPage} />
            <Route path={`${match.url}/companyintrested`} component={CompaniesIntrestedPage} />
            <Route path={`${match.url}/FreelancersAndCampusHires`} component={FreelancersAndCampusHiresPage} />
            <Route exact path={match.url} render={() => (
              console.log(match),
              <div>
              </div>
            )} />
          </main>
        </div>
      </div>
    </div>
  )

}
function mapStateToProps(state) {
  const { dash } = state.dashboard;
  console.log('dash:', state);
  return {
    dash
  };
}

const connectedDashboardPage = withRouter(
  connect(mapStateToProps)(DashBoardPage)
);
export { connectedDashboardPage as DashBoardPage }
