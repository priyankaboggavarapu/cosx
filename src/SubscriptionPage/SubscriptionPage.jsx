import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import './SubscriptionPage.scss';
class SubscriptionPage extends Component {
  
    constructor(props) {
        super(props)
      //  this.componentDidMount();
    }

    // componentDidMount() {
    //     this.props.dispatch(userActions.viewAllApplication(this.props.location.state.val3));
    // }
    render() {
        const { subscription } = this.props;
        console.log('props:', this.props)
        return (
            <div id="subscription">
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                    <h3 className="title-name">SUBSCRIPTION</h3>
                            <h6 className="freeplan">FREE PLAN</h6>
                                <ul className="freeplanbtm">
                                <li>UPTO 3 JOB POSTINGS</li>
                                    <li>UNLIMITED JOB APPLICATIONS</li>
                                    <li>RECORD STORAGE LIMIT ZONE</li>
                                    <li>FREELANCE POSTING FOR FIRST 30 DAYS FREE</li>
                                    
                                </ul>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-md-7">
                            
                                <div className="row">
                                    <div className="col-md-2">
                                        <h6 className="candidatezoneblue">CURRENCY</h6>
                                    </div>
                                    <div className="col-md-10">

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        
                                    </div>
                                    <div className="col-md-10">
                                        <h4 className="introductoryoffer">INTRODUCTORY OFFER</h4>  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 chkmargintop">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="candidatezonered">CANDIDATE ZONE</p>  
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2 chkmargintop">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="candidatezonered">CANDIDATE ZONE</p>  
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-2 chkmargintop1">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        {/* <p className="candidatezonered">CANDIDATE ZONE</p>   */}
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-2 chkmargintop1">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        {/* <p className="candidatezonered">CANDIDATE ZONE</p>   */}
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-2 chkmargintop1">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        {/* <p className="candidatezonered">CANDIDATE ZONE</p>   */}
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div> 
                                <div className="row">
                                    <div className="col-md-2 chkmargintop">
                                    <div className="float-left chkmargin"><input type="checkbox" name="vehicle1" value="Bike"/></div>
                                    <div className="float-left chkside">2</div>
                                    </div>
                                    <div className="col-md-10">
                                        <p className="candidatezonered">CANDIDATE ZONE</p>  
                                        <p className="candidatezoneblue">                                            
                                            UPTO 3 JOB POSTINGS<br/>
                                            UNLIMITED JOB APPLICATIONS<br/>
                                            RECORD STORAGE LIMIT ZONE<br/>
                                            FREELANCE POSTING FOR FIRST 30 DAYS FREE
                                        </p>
                                    </div>
                                </div>  
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="totalfee">TOTAL FEE: SGD 140</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <h5 className="totalfee totalfee1"><input type="radio" name="gender" value="male" checked/> CREDIT / DEBIT CARD</h5>
                                    </div>
                                    <div className="col-md-3">
                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-9">
                                        <h5 className="totalfee totalfee1"><input type="radio" name="gender" value="male" checked/> CREDIT / DEBIT CARD</h5>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="paynow">PAY NOW</div>
                                    </div>
                                </div>

                        </div>
                        <div className="col-md-5">
                            <h6 className="freeplan">FREE PLAN</h6>
                            <ul className="freeplanbtmgreen">
                                        
                                        <li>3 JOB POSTS</li>
                                        <li>15MB DOCUMENT PROOFS STORAGE</li>
                                        <li>20 DAYS FREELANCE POSTING</li>
                            </ul>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="plandetails">
                                        <h6 className="freeplan">FREE PLAN</h6>
                                        <div className="freeplanbtm">
                                            <p className="freeplanbottom">
                                            JOB POSTS WITH 15 DAYS VALIDITY<br/>
                                            AVAILABLE: 10<br/>
                                            UTILIZED: 0<br/>
                                            <br/>
                                            RECORD STORAGE LIMIT<br/>
                                            AVAILABLE: 1GB<br/>
                                            UTILIZED: 20MD<br/>
                                            <br/>
                                            NUMBER OF CERTIFICATES TO BE VERIFIED<br/>
                                            REGISTERED BACKGROUND VERIFICATION<br/>
                                            COMPANY FOR LIFE TIME VALIDITY<br/>
                                            PAID FOR: 3 CERTIFICATES<br/>
                                            UTILIZED: 1
                                            </p>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { subscription } = state.authentication;
    return {
        subscription
    };
}

const connectedMyProfilePage = withRouter(
    connect(mapStateToProps)(SubscriptionPage)
);
export { connectedMyProfilePage as SubscriptionPage };