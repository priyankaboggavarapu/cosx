import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import company_logo from '../images/company_logo.png';
import erroricon from '../images/error.png';
import { userActions } from '../_actions';
import '../RegisterPage/Register.scss';
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router-dom';
import Dropdown from 'react-dropdown'
import { LoginPage } from '../LoginPage';
import axios from 'axios';
import '../LoginPage/Login.scss';
import toastr from 'reactjs-toastr';
import { APP_URLS } from '../_constants/application.url';


class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: '',
                mobile: '',
            
                
            },
            submitted: false,
            disabled: true,
            checked: false,
            resEmail: "",
            resNO: '',
            ressuccess: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMultiSelect = this.handleMultiSelect.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    }
    handleCountryCodeChange(e){
        this.setState({
            countrycodes:[e.target.value]
        })

    }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleChangeMobile(event) {
        const re = /^[0-9-+()]*$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            const { name, value } = event.target;
            const { user } = this.state;
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }
    }

    handleChangeEmail(event) {
        const reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        if (event.target.value === '' || reg.test(event.target.value)) {
            const { name, value } = event.target;
            const { user } = this.state;
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }
    }
    handleMultiSelect(e) {
        let currentState = this.state;
        currentState.checked = e.target.checked;
        this.setState({
            currentState,
            disabled: this.state.disabled = !this.state.disabled
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { user, res } = this.state;
        const { dispatch } = this.props;
        let currentstate = this.state

        if(this.state.user.email){
            if(this.state.countrycodes){
                if(this.state.user.mobile){
                    axios.post(APP_URLS.signup,
                        {
                            'email': this.state.user.email,
                            'mobile': this.state.countrycodes + this.state.user.mobile,
                            'country': this.state.user.country
                        }
                    )
                        .then((res) => {
                            let currentstate = this.state
                            console.log('registerdata..', res)
            
                            if (res.data.code == 200) {
                                let message = 'REGISTRATION SUCCESSFUL AND EMAIL VERIFICATION SENT'
            
                                this.setState({
                                    ...currentstate, disable: false,
                                    ressuccess: message, submitted: true, resEmail: "", resNO: ""
                                })
                                // toastr.success('Registration successfully and sent Verification to Your Email', { displayDuration: 3000, })
                            }
            
                            if (res.data.message.message && res.data.message) {
                                let message = "MOBILE IS REQUIRED"
                                this.setState({
                                    ...currentstate, disable: false,
                                    resNO: message, submitted: true, resEmail: "", ressuccess: ""
                                })
                            }
            
                            else if (res.data.code == 204) {
                                //when email is not given
                                let message = "PLEASE ENTER YOUR EMAIL"
                                //let message= res.data.message
                                let mobilvalidate = "PLEASE ENTER YOUR MOBILE NUMBER"
                                this.setState({
                                    ...currentstate, disable: false,
                                    resEmail: message, submitted: true, resNO: mobilvalidate, ressuccess: ""
                                })
                            }
                            else if (res.data.message == "Email_id already exists") {
                                ///already registered email
                                let message = "EMAIL_ID ALREADY EXISTS";
            
            
                                this.setState({
                                    ...currentstate, disable: false,
                                    resEmail: message, submitted: true, resNO: "", ressuccess: ""
                                })
                                // this.test();
                                //toastr.error(res.data.message.errmsg, { displayDuration: 3000, });
                            }
                            else if (res.data.status == 400) {
                                let message = res.data.message;
                                this.setState({
                                    ...currentstate, disable: false,
                                    resNO: message, submitted: true, resEmail: "", ressuccess: ""
                                })
            
            
            
                            }
                            else if (res.data.code == 400) {
                                 let message = res.data.message.err.errmsg
                                // let message = "PLEASE ENTER YOUR MOBILE NUMBER"
                                this.setState({
                                    ...currentstate, disable: false,
                                    resNO: message, submitted: true, resEmail: "", ressuccess: ""
                                })
                            }
            
                            else if (res.data.message.errmsg) {
                                //    let message =res.data.message.errmsg
                                let message = "MOBILE NUMBER ALREADY EXISTS"
                                this.setState({
                                    ...currentstate, disable: false,
                                    resNO: message, submitted: true, resEmail: "", ressuccess: ""
                                })
                            }
            
                        }
                        )
                        .catch(function (e) {
                            console.log('ERROR ', e);
                            // toastr.error(e);
                        })
                }
                else{
                    let message = "PLEASE ENTER YOUR MOBILE NUMBER"
                    this.setState({
                        ...currentstate, disable: false,
                        resNO: message, submitted: true, resEmail: "", ressuccess: ""
                    }) 
                }
            }
            else{
                let message = "PLEASE ENTER YOUR COUNTRY CODE"
                        this.setState({
                            ...currentstate, disable: false,
                            resNO: message, submitted: true, resEmail: "", ressuccess: ""
                        }) 
            }
         
        }
        
        else if( this.state.countrycodes == undefined || this.state.user.mobile == ""  ){
            let message = "PLEASE ENTER REQUIRED FEILDS"
            this.setState({
                ...currentstate, disable: false,
                resNO: message, submitted: true, resEmail: "", ressuccess: ""
            }) 
        }
        else if(this.state.user.email == ""  ){
            let message = "PLEASE ENTER YOUR EMAIL ID"
            this.setState({
                ...currentstate, disable: false,
                resEmail: message, submitted: true, resNO:"", ressuccess: ""
            }) 
        }
       


    }
    // handleSubmit(event) {
    //     event.preventDefault();
    //     const { user,res } = this.state;
    //     const { dispatch } = this.props;
    //     axios.post(APP_URLS.signup,
    //         {
    //             'email': this.state.user.email,
    //             'mobile': this.state.user.mobile,
    //             'country': this.state.user.country
    //         }
    //     )
    //         .then((res) => {
    //             let currentstate = this.state
    //             console.log('registerdata..',res)

    //                 if(res.data.code==200){
    //                     let message='REGISTRATION SUCCESSFUL AND EMAIL VERIFICATION SENT'

    //                     this.setState({
    //                         ...currentstate,disable:false,
    //                         ressuccess:message,submitted:true,resEmail:"",resNO:""
    //                     })
    //                 // toastr.success('Registration successfully and sent Verification to Your Email', { displayDuration: 3000, })
    //                 }

    //                if ( res.data.message.message && res.data.message) {

    //                ////when mobile is not given

    //                 let message="MOBILE IS REQUIRED"
    //                 this.setState({
    //                     ...currentstate,disable:false,
    //                     resNO:message,submitted: true,resEmail:"",ressuccess:""})
    //                 }

    //                 else if(res.data.code == 204){
    //                     //when email is not given
    //                     let message="PLEASE ENTER YOUR EMAIL"
    //                     this.setState({
    //                         ...currentstate,disable:false,
    //                         resEmail:message,submitted:true,resNO:"",ressuccess:""
    //                     })
    //                 }
    //                   else if (res.data.message == "Email_id already exists" ) {
    //                       ///already registered email
    //                     let message="EMAIL_ID ALREADY EXISTS" ;


    //                     this.setState({
    //                         ...currentstate,disable:false,
    //                         resEmail:message,submitted: true,resNO:"",ressuccess:""})
    //                         // this.test();
    //                         //toastr.error(res.data.message.errmsg, { displayDuration: 3000, });
    //                 }

    //                else if(res.data.message.errmsg){
    //                 //    let message =res.data.message.errmsg
    //                 let message="MOBILE NUMBER ALREADY EXISTS"
    //                    this.setState({
    //                     ...currentstate,disable:false,
    //                     resNO:message,submitted: true,resEmail:"",ressuccess:""})
    //                }

    //             }
    //         )
    //         .catch(function (e) {
    //             console.log('ERROR ', e);
    //            // toastr.error(e);
    //         })


    // }
    render() {
        const { registering } = this.props;
        const { user, submitted, resEmail, resNO, ressuccess } = this.state;
        return (
            <div className="loginborder" id="regpage">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top bckgradient2">
                    <div className="container-fluid">

                        <img src={company_logo} className="comp_logo" />
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

                <div className="bckgradient1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6 text-left">
                                <h4 className="mt-5">CREATE YOUR ACCOUNT</h4>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <h5 className="account"><span className="account1">ALREADY HAVE AN ACCOUNT?&nbsp;&nbsp;</span>
                                            <Link to="/login" href="#">SIGN IN</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-7 text-left formlogin">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    {/* <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}> */}
                                    <label >EMAIL</label>
                                    <input type="email" autoComplete='off'
                                        className="form-control inputboxstyles" name="email"
                                        value={user.email} onChange={this.handleChange} id="email" />

                                    <div className="help-block">
                                        {resEmail ?
                                            <img src={erroricon} className="error_icon" />
                                            : null
                                        }
                                        {resEmail}</div>

                                        <label className="mobnumberstyles">MOBILE NUMBER</label>
                                        <div className="row">
                                    
                                            <div className="col-md-2">
                                            <div className="form-group">
                                        <select className="form-control countrycode" name="countrycodes"
                                            onChange={this.handleCountryCodeChange}
                                            value={this.state.countrycodes}
                                            placeholder="">
                                            <option>Code</option>
                                            <option>+91-</option>
                                            <option>+65-</option>
                                            <option>+41-</option>
                                            <option>+1-</option>
                                          
                                        </select>
                                    </div>
                                            </div>
                                            <div className="col-md-10">
                                            <div className={'form-group' + (submitted && !user.mobile ? ' has-error' : '')}>
                                        
                                        <input type="text" autoComplete='off' maxLength={14} className="form-control inputboxstyles"
                                         name="mobile"
                                            value={user.mobile} onChange={this.handleChangeMobile} id="pwd" />

                                        <div className="help-block">
                                            {resNO ?
                                                <img src={erroricon} className="error_icon" />
                                                : null
                                            }
                                            {resNO}</div>


                                    </div>
                                            </div>
                                        </div>
                                    
                                    
                                    <div className="reggreencolor">{ressuccess}</div>
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="termsstyles">
                                                <input type="checkbox" name="vehicle1" value="Terms" className="ckbox float-left" checked={this.state.checked} onChange={this.handleMultiSelect} />
                                                BY CREATING AN ACCOUNT YOU AGREE TO OUR<strong>&nbsp;&nbsp;TERMS & CONDITIONS</strong> and <strong>PRIVACY POLICY.</strong></div>
                                        </div>
                                    </div>

                                    <div className="row">


                                        <div className="col-md-12">
                                            <div className="form-group float-right">
                                                <button type="submit" className="btn register" disabled={this.state.disabled}>REGISTER</button>
                                                {registering &&
                                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="cancel float-left cancel">
                        <Link to="/login" className="btn btn-link ">CANCEL</Link>
                      </div> */}
                                </form>
                            </div>

                        </div>



                    </div>
                    <div className="row">

                        <div className="col-lg-12 col-md-12">
                            <div className="gigxfooter">
                                GIG-X &copy; 2019
                </div>
                        </div>

                    </div>

                </div>

            </div>

        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = withRouter(connect(mapStateToProps)(RegisterPage));
export { connectedRegisterPage as RegisterPage };