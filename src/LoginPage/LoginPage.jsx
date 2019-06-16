import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import company_logo from '../images/company_logo.png';
import erroricon from '../images/error.png';
import { userActions } from '../_actions';
import '../LoginPage/Login.scss';
import toastr from 'reactjs-toastr';
import axios from 'axios';
import { APP_URLS } from '../_constants/application.url';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.props.dispatch(userActions.logout());

        this.state = {
            country: '+91',
            bgColor: "",
            email: '',
            login_Otp: '',
            submitted: false,
            showme: false,
            disable: true,
            hidden: true,
            showmeerror: false,
            showmecolor: false,
            resMessage: ''
        };

        this.handleChange = this.handleChange.bind(this);
        //  this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOtp = this.handleSubmitOtp.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
    }
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    componentDidMount() {
        this.setState({
            showme: true
        })
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmitOtp(){
      //  this.handleSubmit();
        let currentstate=this.state
        let url =APP_URLS.generateOTP;
        axios.post(url,{'email':this.state.email.trim()})
          .then((res) => {
            console.log(res)
           
            if(res.data.code==200){
            let message=res.data.message
                this.setState({
                    disable:false,
                    resMessage:message,submitted: true,showmecolor:true,showmeerror:false})
                 }
                 if (res.data.status == 200) {
                    let message = res.data.message

                    this.setState({
                        disable: false,
                        resMessage: message, submitted: true, showmecolor: true, showmeerror: false
                    })
                }
                 else if(res.data.code==204){
                // toastr.error(res.data.message)
                let message=res.data.message
                this.setState({ resMessage:message, disable:false,submitted: true,showmeerror:true,showmecolor:false});
            }
          },
     )
          .catch(function (e) {
            console.log('ERROR ', e);
            // let message=e.message
            // this.setState({ resMessage:message, disable:false,submitted: true,showmeerror:true,showmecolor:false});
            toastr.error(e);
          })
         
  
      }
     
    handleSubmitLogin() {
        // e.preventDefault();
        const { email, login_Otp } = this.state;
        this.setState({ submitted: true });
        const { dispatch } = this.props;
        if (email != "" && login_Otp != "") {
            var emailis = email.trim();
            var Otpis = login_Otp.trim();
            dispatch(userActions.login(emailis, Otpis));
        }
    }

    login() {
        this.setState({
            showme: !this.state.showm,
        })
    }
    render() {
        const { loggingIn } = this.props;
        const { email, login_Otp, submitted, resMessage } = this.state;
        return (
            <div className="loginborder" id="loginpage">
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
                <div className="bckgradient1 page-height">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3"></div>
                            <div className="col-lg-6 text-left">
                                <h3 className="mt-5">SIGN IN</h3>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <h5 className="account">
                                            <span className="account1">DON'T HAVE AN ACCOUNT?&nbsp;&nbsp;</span>
                                            <Link to="/register" href="#">CREATE YOUR ACCOUNT</Link>
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
                            <div className="col-lg-7 text-left loginmargintop formlogin">
                            {/* <form name="form" onSubmit={this.handleSubmit}> */}
                                    {/* <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>  */}
                                        <label>EMAIL ID</label>
                                        <input type="email" autoComplete='off' className="form-control"
                                            name="email" value={email} onChange={this.handleChange} id="email" />
                                        {/* {submitted && !email && */}
                                        {this.state.showmecolor ?
                                        <div className="greencolor">{resMessage.toUpperCase()}</div>
                                        :null
                                        }
                                         {this.state.showmeerror ?
                                        <div className="help-block">
                                        <img src={erroricon} className="error_icon" />{resMessage.toUpperCase()}</div>
                                        :null
                                        }
                                    

                                {/* } */}
                                {/* </div> */}

                                {this.state.showme ?
                                    <div className={'form-group' + (submitted && !login_Otp ? ' has-error' : '')}>
                                        <label className="otpmargintop">OTP</label>
                                        <input type={this.state.hidden ? "password" : "text"} autoComplete='off' disabled={this.state.disable} className="form-control login-form-control"
                                            className="form-control" name="login_Otp" value={login_Otp}
                                            onChange={this.handleChange} id="pwd" />
                                        <div className="eyerelative">
                                            <i className="fas fa-eye-slash" onClick={this.toggleShow}></i>
                                        </div>
                                    </div>
                                    : null
                                }
                                <div className="form-group form-check">
                                    <label className="form-check-label">
                                        {/* <input className="form-check-input" type="checkbox" />  */}

                                        {/* <div className="checktxt">By creating an account you agree to our Terms & Conditions and Privacy Policy.</div> */}

                                    </label>
                                </div>
                                <button type="submit" className="btn register float-right" disabled={this.state.disable} onClick={() => this.handleSubmitLogin()}>SUBMIT</button>

                                {/* </form> */}
                            </div>
                            <div className="col-lg-2 otpmargin">
                                <a className="generatenewotp" onClick={() => this.handleSubmitOtp()}><strong className="otpbtn">GENERATE NEW OTP</strong></a>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-lg-12 col-md-12 login-footer">
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
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage));
export { connectedLoginPage as LoginPage }; 