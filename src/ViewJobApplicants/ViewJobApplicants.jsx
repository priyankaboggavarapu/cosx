import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Player } from "video-react";
import textjd from '../images/textjd.PNG';
import videojd from '../images/videojd.PNG';
import botscreening from '../images/botscreening.PNG';
import edt from '../images/edt.PNG';
import cht from '../images/cht.PNG';
import call from '../images/call.PNG';
import propic from '../images/pro-pic.PNG';
import viewjob from '../images/viewjob.PNG';
import viewbckbig from '../images/viewbckbig.PNG';
import viewbcksmall from '../images/viewbcksmall.PNG';
import downloadimg from '../images/downloadimg.PNG';
import share from '../images/share.PNG';
import jobdesc from '../images/jobdesc.PNG';
import { userActions } from "../_actions";
import './ViewJobApplicants.scss';
import 'reactjs-toastr/lib/toast.css';
import Modal from 'react-awesome-modal';
import toastr from 'reactjs-toastr';
import textimg from '../images/textjd.PNG';
import videoimg from '../images/videoimg.PNG';
import chatimg from '../images/chatimage.PNG';
import textimage from '../images/resume.PNG';
import chatroomm from '../images/chatroomm.PNG';
import chaticon from '../images/chat.PNG';
import bgvreport from '../images/bgvreport.PNG';
import Nodatafoundbanner from '../images/No-data-found-banner.png';
import botscoreontop from '../images/botscoreontop.PNG';
import send from '../images/send.PNG';
import margaret from '../images/margaret.PNG';
import footer from '../images/footer.jpg';
import axios from 'axios';
import moment from 'moment';
import { APP_URLS } from '../_constants/application.url';
import { common } from '../_constants/data';
import { Table } from "react-bootstrap";
import Calendar from 'react-calendar';
import Pagination from "../_constants/Pagination";
// import TimePicker from 'react-time-picker';
// import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import { Editor } from '@tinymce/tinymce-react';
//import Download from '@axetroy/react-download';
import renderHTML from 'react-render-html';
class ViewJobApplicantPage extends Component {
    errorMeg = "";
    successMeg = "";
    constructor(props) {
        super(props);
        this.onClickTextDoc = this.onClickTextDoc.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.handleClickUpdateStatus = this.handleClickUpdateStatus.bind(this);
        this.onClickTextDoc = this.onClickTextDoc.bind(this);
        this.onChangeVideoDoc = this.onChangeVideoDoc.bind(this);
        this.initialOffer = this.initialOffer.bind(this);
        this.scheduleInterViewClick = this.scheduleInterViewClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeScheduleInterview = this.onChangeScheduleInterview.bind(this);
        this.download = this.download.bind(this);
        this.handleReviseOffer = this.handleReviseOffer.bind(this);
        this.onChangeOffer = this.onChangeOffer.bind(this);
        this.state = {
            staticImg: true,
            textimage: false,
            chatimage: false,
            videoimage: false,
            offerletter: false,
            scheduleInterview: false,
            active: null,
            Applicants: [],
            currentJobApplicantsData: [],
            currentPage: null,
            totalPages: null,
            activeJob: [],
            rawHtml: "",
            message: '',
            date: new Date(),
            time: '',
            endtime:'',
            interview_scheduled_date: '',
            successMeg: "",
            errorMeg: "",
            letter: ""
        }
    }
    onChange = date => this.setState({ date })
    onChangeTime = time => this.setState({ time })
    onChangeEndTime = endtime => this.setState({ endtime })
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    }
    onChangechat(e) {
        this.setState({
            chatimage: true,
            staticImg: false,
            textimage: false,
            videoimage: false,
            offerletter: false,
            scheduleInterview: false,
        });
    }
    onChangeOffer() {
        debugger
        let currentState = this.state.userData;
        console.log('*************',currentState)
        if(currentState == undefined){
            this.errorMeg = 'Please try again..!'
            this.openModal();
        } else{
            if ((currentState.phase == 'INTERVIEW' || currentState.phase == 'OFFER') && (currentState.status == 'SELECTED' || currentState.status == 'OFFER ISSUED') ) {
                this.setState({
                    chatimage: false,
                    staticImg: false,
                    textimage: false,
                    videoimage: false,
                    offerletter: true,
                    scheduleInterview: false,
                });
            } else {
                this.errorMeg = 'Please try again..!'
                this.openModal();
            }
        }
      
    }
    handleEditorChange = (rawHtml) => {
        this.setState({
            rawHtml
            // "letter": e.target.getContent()
        });

    }

    handleReviseOffer() {
        axios.post(APP_URLS.initiateOffer, {
            "_id": this.state._id,
            "offer_letter": this.state.rawHtml
        }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            })
            .then((res) => {
                console.log('view job applicants data', res)
                if (res.data.code == 200) {
                    this.successMeg = res.data.message;
                    this.openModal();
                }
                else if (res.data.code == 204) {
                    this.successMeg = res.data.message;
                    this.openModal();
                }
            })
            .catch(function (e) {
                console.log('ERROR ', e);
                toastr.error(e);
            })
    }
    toggle = (item) => {
        if (this.state.active === item) {
            this.setState({ active: null })
        } else {
            this.setState({ active: item })
        }
    };

    myColor = (item) => {
        if (this.state.active === item) {
            return "#7feeef";
        }
        return "";
    };
    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }
    componentDidMount() {
        this.getJobApplicationById();
    }

    getJobApplicationById() {
        debugger
        if (this.props.location.state.val3 != "") {
            axios.get(APP_URLS.getJobApplicationsByPostId + '/' + this.props.location.state.val3 + '/' + 1, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            })
                .then((res) => {
                    console.log('view job applicants data', res)
                    let currentState = this.state;
                    if (res.data && res.data.data && res.data.data && res.data.data.length > 0) {
                        currentState.Applicants = res.data.data.map(x => {
                            let activeJob = x.Applicant[0];
                            if (x.interview_Details) {
                                activeJob.interview_scheduled_date = x.interview_Details.interview_scheduled_date;
                                activeJob.interview_scheduled_time = x.interview_Details.interview_scheduled_time;
                            }
                            activeJob.offer_Details = x.offer_Details;
                            activeJob.phase = x.phase;
                            if (x.phase == 'INTERVIEW') {
                                activeJob.status = x.interview_Details.status;
                                activeJob.message = x.interview_Details.message;
                            }
                            if (x.phase == 'PENDING') {
                                activeJob.status = "";
                            }
                            if (x.phase == 'OFFER') {
                                activeJob.status = x.offer_Details.status;
                            }
                            //activeJob.phase = x.phase;
                            activeJob._id = x._id;
                            if (x.Applicant[0].salary_range != undefined) {
                                activeJob.salary_range = x.Applicant[0].salary_range.from + "-" + x.Applicant[0].salary_range.to;
                            }
                            else {
                                activeJob.salary_range = x.Applicant[0].salary_range;
                            }
                            return activeJob
                            console.log('activeJob:', activeJob);
                        });
                        this.setState(currentState);
                    }
                    else {
                        // toastr.error('No Job Applications Found');
                        this.errorMeg = 'No Job Applications Found';
                        this.openModal();
                    }
                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                    toastr.error(e);
                })
        } else {
            alert('error')
        }
    }
    // selected user
    selectUser(event, userData) {
        event.preventDefault();
        console.log("|||||||||||||",userData);
        this.setState({
            '_id': userData._id, 'user_Id': userData.user_Id, 'user_name': userData.user_name,
            'rawHtml': userData.offer_Details.offer_letter,
            'applicationId': userData._id, userData, 'phase': userData.phase,"Selectstatus":userData.status,
            'message': userData.message, 'date': userData.interview_scheduled_date,
        });

        let currentState = this.state
        if (userData.interview_scheduled_time != null) {
            console.log('*********', userData.interview_scheduled_time.split(' '));
            let splitArr = userData.interview_scheduled_time.split(' ');
            if (splitArr[1] == 'PM') {
                let a = splitArr[0].split(':')[0] == '12' ? '0' : splitArr[0].split(':')[0];
                let b = Number(a) + 12;
                let c = b.toString();
                let d = splitArr[0].split(':')[1];
                let f = c + ':' + d;
                console.log('24hrs time******', f);
                currentState['time'] = f;
                console.log('time******', currentState['time']);

            } else if (splitArr[1] == 'AM') {
                let a = splitArr[0].split(':')[0] == '12' ? '00' : splitArr[0].split(':')[0];
                let b = a.toString();
                let c = splitArr[0].split(':')[1];
                let d = b + ':' + c;
                console.log('24hrs time******', d);
                currentState['time'] = d;
            }
        }
        this.toggle(userData._id)

    }

    onPageChanged = data => {
        const { Applicants } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentJobApplicantsData = Applicants.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentJobApplicantsData, totalPages });
    };
    initialOffer() {
        let currentState = this.state.userData
        if (currentState) {
            axios.post(APP_URLS.initiateOffer, { _id: this.state._id, user_Id: this.state.user_Id }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            })
                .then((res) => {
                    console.log('initial offer:', res)
                    if (res.data.code == 200) {
                        this.successMeg = res.data.message;
                        this.openModal();
                    }
                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                })
        }
        else {
            this.errorMeg = 'Please select the job Applicant';
            this.openModal();
        }

    }

    onChange = date => this.setState({ date })
    scheduleInterViewClick() {
        axios.post(APP_URLS.scheduleInterview,
            {
                "interview_scheduled_date": moment(this.state.date).format('YYYY-MM-DD').toString(),
                "interview_scheduled_time": moment(this.state.time, "h:mm A").format("hh:mm A"),
                "interview_end_time":moment(this.state.endtime,"h:mm A").format("hh:mm A"),
                '_id': this.state.applicationId, 'message': this.state.message
            }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            })
            .then((res) => {
                console.log('schedule Interview:', res)
                setTimeout(() => {
                    this.getJobApplicationById()
                }, 2000)
                if (res.data.code == 200) {
                    this.successMeg = res.data.data.status
                    this.openModal();
                }
            })
            .catch(function (e) {
                console.log('ERROR ', e);
                toastr.error(e)
            })
    }
    onClickTextDoc() {
        let currentState = this.state.userData
        if (currentState) {
            currentState['selectedDocument'] = this.state.userData.text_resume;
            this.setState(currentState);
            this.setState({
                textimage: true,
                staticImg: false,
                chatimage: false,
                videoimage: false,
                offerletter: false,
                scheduleInterview: false,
            });
        }
        else {
            // toastr.error('Please select the job Applicant');
            this.errorMeg = 'Please select the job Applicant';
            this.openModal();
        }
    }
    onChangeVideoDoc() {
        let currentState = this.state.userData
        if (currentState) {
            currentState['selectedDocumentVideo'] = this.state.userData.video_resume;
            this.setState(currentState);
            //   this.setState({ textJD: true, videoJD: false, staticImg: false });
            this.setState({
                videoimage: true,
                staticImg: false,
                textimage: false,
                chatimage: false,
                offerletter: false,
                scheduleInterview: false,
            });
        }
        else {
            this.errorMeg = 'Please select the job Applicant';
            this.openModal();
        }
    }

    onChangeScheduleInterview(e) {
        let currentState = this.state.userData
        if (currentState) {
            this.setState({
                chatimage: false,
                staticImg: false,
                textimage: false,
                videoimage: false,
                offerletter: false,
                scheduleInterview: true,
            });
        }
        else {
            this.errorMeg = 'Please select the job Applicant';
            this.openModal();
        }

    }
    handleClickUpdateStatus(status) {
        let interview_status = status;
        axios.post(APP_URLS.updateJobApplicationStatus, {

            '_id': this.state.applicationId, 'phase': this.state.phase, 'interview_status': status
        }, {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            })
            .then((res) => {
                console.log(res)
                if (res.data.code == 200) {
                    this.successMeg = res.data.message;
                    this.openModal();
                }
               else if(res.data.code == 204){
                    this.errorMeg = res.data.message;
                    this.openModal();
                }
                setTimeout(() => {
                    this.getJobApplicationById()
                }, 2000)

            })
            .catch(function (e) {
                console.log('ERROR ', e);
            })
    }
    download() {
    }
    render() {
        const { data, value } = this.state;
        const { jobapplicant, users, viewJobs, userItem, page } = this.props;
        const { user, submitted, message, interview_scheduled_date, Applicants, activeJob,
            currentJobApplicantsData, currentPage } = this.state;

        console.log("the bing data is ", users)
        let { imagePreviewUrl, videoPreviewUrl } = this.state;
        const file = imagePreviewUrl;
        let $imagePreview = null;
        let iframeData = '';
        let samlliframeData = '';
        let filePath = '';
        const totalDocuments = Applicants.length;
        //  if (totalDocuments === 0) return null;
        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();
        let videoPreview = '';
        const type = "doc";
        if (imagePreviewUrl) {
            console.log('imagePreviewUrl:', imagePreviewUrl)
            $imagePreview = <img src={imagePreviewUrl} />;
        }
        if (this.state['selectedDocument']) {
            let filePath = APP_URLS.getUploadedFile + '/' + this.state['selectedDocument'];
            console.log('filepath:', filePath)
            iframeData = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath}
                className="file-view"></iframe>
        }
        if (this.state['selectedDocumentVideo']) {
            videoPreview = <Player src={APP_URLS.getUploadedFile + '/' + this.state['selectedDocumentVideo']} playInline />;
        }

        console.log('viewJobs:', viewJobs);
        return (
            <div id="viewjob">

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="title-name">
                                    VIEW JOB APPLICANTS
                                </h3>

                                <h6 className="jobpostid">JOB POST ID: {this.props.location.state.val3}<br />
                                    JOB TITLE:{this.props.location.state.job_title}</h6>
                            </div>
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-6">

                                </div>
                                <div className="col-md-6">
                                    <div className="input-group srchbyname">
                                        <input placeholder="SEARCH BY NAME" className="searchbyname" />
                                        <div className="input-group-append">
                                            <button className="btn btn-secondary srchbyname" type="button">
                                                <i className="fa fa-search" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className='h3-color'>{users.error}</h3>
                        </div>
                        <div className="martopbox">

                            {Applicants.length > 0 ?
                                <div>
                                    {currentJobApplicantsData.map((item, index) => {
                                        // console.log('view job Applicants.....', item)

                                        return <div key={index} className="row martop"
                                            onClick={((e) => this.selectUser(e, item))}
                                            style={{ background: this.myColor(item._id) }}>
                                            <div className="col-md-3 col-sm-12">
                                                <img src={propic} className="img-styles profilepic" />
                                            </div>
                                            <div className="col-md-9 col-sm-12">
                                                <div className="jobcompany">
                                                    Name:{item.user_name}<br />
                                                    EmailId:{item.email}<br />
                                                    Function:{item.function}<br />
                                                    Location:{item.country}<br />
                                                    {/* SalaryRange:{item.salary_range}<br /> */}
                                                    {item.status ?
                                                    <div>
                                                        <span className="statuscolor">Status:</span>
                                                        <span className="pendingcolor">
                                                            {item.status}

                                                        </span><br />

                                                    </div>
                                                    :null
                                                    }
                                                     {item.phase == 'PENDING' ?
                                                    <div>
                                                        <span className="statuscolor">Status:</span>
                                                        <span className="pendingcolor">
                                                            {item.phase}

                                                        </span><br />

                                                    </div>
                                                    :null
                                                    }

                                                    {
                                                        item.interview_scheduled_date != null ?
                                                            <div>
                                                                <span className="statuscolor">Interview:</span>
                                                                <span className="pendingcolor">
                                                                    {item.interview_scheduled_date}
                                                                </span>
                                                            </div>
                                                            : null
                                                    }

                                                    <br />

                                                </div>
                                                <div className="imgsmallicons">
                                                    <span>
                                                        <img src={edt} className="imgsmall" />
                                                    </span>
                                                    <span>
                                                        <img src={call} className="imgsmall" />
                                                    </span>
                                                    <span>
                                                        <img src={cht} className="imgsmall" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    )}

                                </div>
                                : null
                            }

                            {Applicants.length == 0 ?
                                <div className="row martop">
                                    <div className="col-md-3 col-sm-12">
                                        <img src={propic} className="img-styles" />
                                    </div>
                                    <div className="col-md-9 col-sm-12">
                                        <div className="jobcompany">
                                            Name:test<br />
                                            EmailId:test@gmail.com<br />
                                            Function:HR<br />
                                            Location:Hyderabad<br />
                                            SalaryRange:200000-500000<br />

                                            <div>
                                                <span className="statuscolor">Status:</span>
                                                <span className="pendingcolor">
                                                    interview
                                        </span>
                                            </div>

                                            <br />

                                        </div>
                                        <div className="imgsmallicons">
                                            <span>
                                                <img src={edt} className="imgsmall" />
                                            </span>
                                            <span>
                                                <img src={call} className="imgsmall" />
                                            </span>
                                            <span>
                                                <img src={cht} className="imgsmall" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                : null
                            }
                        </div>
                        <div className="paginationalign">
                            {totalDocuments != 0 ?
                                <Pagination
                                    totalRecords={totalDocuments}
                                    pageLimit={5}
                                    pageNeighbours={1}
                                    onPageChanged={this.onPageChanged}
                                />
                                : null
                            }
                        </div>
                    </div>
                    <div className="col-md-6">

                        <div className="row requestcandidate">
                            <div className="col-md-4">
                                <h6 className="viewresume">
                                    {/* <b>VIEW BACKGROUND VERIFICATION REPORT</b> */}
                                    <b>VIEW RESUME</b>
                                </h6>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-2">
                                        <input type="checkbox"

                                            value=""

                                            name="display" value="display" />
                                    </div>
                                    <div className="col-md-10 padleftt">
                                        <div className="float-left dipslaytxt">REQUEST CANDIDATE BGV REPORT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 text-right">
                                <img src={bgvreport} className="bgvreport" />
                            </div>
                        </div>

                        <div className="cardcrd1">



                            {/* {this.state.staticImg ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-3">
                                        </div>
                                        <div className="col-md-6">
                                            <a onClick={() => this.handleClickUpdateStatus('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('REJECTED')} className="select red">REJECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('PENDING')} className="select gray">PENDING</a>
                                        </div>
                                        <div className="col-md-3 text-right">
                                        </div>
                                    </div>
                                    <div className="viewbckbig viewbckscroll">
                                        <img src={margaret} height="80px" className="viewbckbig" />
                                    </div>
                                    <div className="postexpiry">
                                        <div className="row">
                                            VIEW BOT RESPONSE
                                            <div className="col-md-12 text-left forthiscompany">
                                                1. Why do you want to work for this company?
                                                Culture and reputation of the Company is one of the key reasons for me to consider this opportunity.
                                                <br></br>2. What are two contributions you can bring to this role?
                                                I believe I can simplify sales cycles and build a very strong sales team.
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                : null
                            } */}

                            {this.state.textimage ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {/* <img src={viewbcksmall} /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <a onClick={() => this.handleClickUpdateStatus('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('REJECTED')} className="select red">REJECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('PENDING')} className="select gray">PENDING</a>
                                        </div>

                                        <div className="col-md-3 text-right">
                                            <img src={downloadimg} className="downloadimg" onClick={() => this.download()} />
                                            <img src={share} className="shareimg" />
                                        </div>
                                    </div>
                                    <div className="viewbckbig">
                                        {iframeData}
                                        {/* <img src={viewbckbig} className="viewbckbig" /> */}
                                    </div>


                                </div>
                                : null}

                            {this.state.videoimage ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {/* <img src={viewbcksmall} /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <a onClick={() => this.handleClickUpdateStatus('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('REJECTED')} className="select red">REJECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('PENDING')} className="select gray">PENDING</a>
                                        </div>

                                        <div className="col-md-3 text-right">
                                            {/* <img src={downloadimg} className="downloadimg"  onClick={() => this.download()}/>
                                    <img src={share} className="shareimg" /> */}
                                        </div>
                                    </div>
                                    <div className="viewbckbig">
                                        {videoPreview}
                                    </div>


                                </div>

                                : null}
                            {this.state.scheduleInterview ?
                                <div>

                                    <div className="viewbckbigg">
                                        <div className="row">
                                            <div className="col-md-6">

                                            </div>
                                            <div className="col-md-6">
                                                <img src={botscoreontop} className="botscoreontop" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                            </div>
                                            <div className="col-md-6 calendar-top">
                                            {this.state.Selectstatus ?
                                                <div className="row">

                                                    <div className="col-md-10">
                                                 
                                                     <div className="scheduleaninterview">{this.state.Selectstatus}</div>
                                                    
                                                       
                                                    </div>
                                                    <div className="col-md-2">
                                                        <img src={botscreening} className="scheduleimg" />
                                                    </div>
                                                    </div>

                                                    :null
                                                    
                                                }
                                            
                                                {this.state.user_name ?
                                                    <div className="candidatetext1">{this.state.user_name.toUpperCase()}</div>
                                                    : null
                                                }

                                                <div className="row">
                                                    <div className="col-md-12">
                                                    <DatePicker
                                                    inline
                                                    value={this.state.date}
                                                    selected={this.state.date}
                                                    onChange={this.onChange}
                                                />
                                                    </div>
                                                </div>
                                                

                                                {/* <div className="row">

                                                    <div className="col-md-10">
                                                        <div className="scheduleaninterview">SCHEDULE AN INTERVIEW</div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <img src={botscreening} className="scheduleimg" />
                                                    </div>
                                                </div> */}
                                                
                                                <strong className="timefont">START TIME</strong>&nbsp;&nbsp;
                                                <TimePicker
                                                    onChange={this.onChangeTime}
                                                    value={this.state.time}
                                                /><br></br>
                                                <strong className="timefont">END TIME</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <TimePicker
                                                    onChange={this.onChangeEndTime}
                                                    value={this.state.endtime}
                                                />
                                                <input type="text" name="message"
                                                    onChange={this.handleChange} className="form-control candidatetext9"
                                                    value={this.state.message}></input>
                                                <img src={send} onClick={() => this.scheduleInterViewClick()} className="sendstyles" />
                                            </div>
                                            <div className="col-md-3">
                                            </div>


                                        </div>


                                    </div>


                                </div>

                                : null}
                            {this.state.chatimage ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {/* <img src={viewbcksmall} /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <a onClick={() => this.handleClickUpdateStatus('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('REJECTED')} className="select red">REJECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('PENDING')} className="select gray">PENDING</a>
                                        </div>

                                        <div className="col-md-3 text-right">
                                            {/* <img src={downloadimg} className="downloadimg"  onClick={() => this.download()}/>
                                    <img src={share} className="shareimg" /> */}
                                        </div>
                                    </div>
                                    <div className="viewbckbig">
                                        <img src={chatroomm} className="chatroombig" />
                                    </div>
                                    <div className="postexpiry">


                                    </div>

                                </div>

                                : null}



                            {this.state.offerletter ?
                                <div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            {/* <img src={viewbcksmall} /> */}
                                        </div>
                                        <div className="col-md-6">
                                            <a onClick={() => this.handleClickUpdateStatus('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('REJECTED')} className="select red">REJECT</a>
                                            <a onClick={() => this.handleClickUpdateStatus('PENDING')} className="select gray">PENDING</a>
                                        </div>

                                        <div className="col-md-3 text-right">
                                            {/* <img src={downloadimg} className="downloadimg"  onClick={() => this.download()}/>
                                    <img src={share} className="shareimg" /> */}
                                        </div>
                                    </div>
                                    {/* <div className="viewbckbig"> */}
                                    {/* <img src={chatroomm} className="chatroombig" /> */}
                                    {/* </div> */}
                                    <div className="row postexpiry postexpiry1 paddrightt">

                                        <div className="col-md-10 padrightt">
                                            <Editor value={this.state.rawHtml} onEditorChange={this.handleEditorChange} />
                                            {/* <Editor
                                                initialValue="<div>header</div>"
                                                init={{
                                                    plugins: 'link image code',
                                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                                                }}
                                                onChange={this.handleEditorChange}
                                            /> */}
                                        </div>
                                        <div className="col-md-2 padrightt padleftt text-right">
                                            <img src={downloadimg} className="downloadimg" />
                                            <img src={share} className="shareimg" />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 reviseoffer">
                                                <a className="select blue" href="javascript:void(0)" onClick={this.handleReviseOffer}>REVISE OFFER</a>
                                                <a className="select canceloffer">CANCEL OFFER</a>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="addamessage2">
                                                    APPLIED ON : 28 JAN 2019 19:39<br />
                                                    STATUS : <span className="pendingcolor">SELECTED</span>
                                                    <div className="addmsg">
                                                        INTERVIEWED ON DATE & TIME: 27 JAN 2019 5PM
                                                        OFFER ACCEPTED ON 28 JAN 4PM
                                                        BGV REPORT ISSUED ON : 15 FEB 2019
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                : null}


                        </div>



                        <div className="boxleftt">
                            <div className="mrleft">

                                <div className="grbox" onClick={(e) => this.onClickTextDoc()} >
                                    <Table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td className="tdheight">
                                                    <div onSubmit={this.onFormSubmit} >
                                                        <label>
                                                            <img src={textjd} className="img-styles" />
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span >TEXT RESUME</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>


                            </div>
                            <div className="mrleft">
                                <div className="grbox" onClick={(e) => this.onChangeVideoDoc()}>
                                    <Table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td className="tdheight">
                                                    <div onSubmit={this.onFormSubmit} className="image-upload1"  >
                                                        <label>
                                                            <img src={videojd} className="img-styles" />
                                                        </label>
                                                        <input type="file" name='file' />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>VIDEO RESUME</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="mrleft">
                                <div className="grbox" onClick={((e) => this.onChangechat(e))}>
                                    <Table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td className="tdheight marrght">
                                                    <img src={chaticon} className="img-styles chatrm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="marrght2">
                                                    <span>CHAT ROOM</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="mrleft">
                                <div className="grbox" onClick={() => { this.onChangeScheduleInterview() }}>
                                    <Table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td className="tdheight marrght3" >
                                                    <img src={botscreening} className="img-styles chatrm" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="marrght3">
                                                    <span>SCHEDULE INTERVIEW</span>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className="mrleft">
                                <div className="grbox">
                                    <Table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                {/* <td className="tdheight marrght3" onClick={() => this.initialOffer()}> */}
                                                <td className="tdheight marrght3" onClick={this.onChangeOffer}>
                                                    <img src={viewjob} className="img-styles chatrm1" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="marrght3">
                                                    <span>INITIAL OFFER</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <section>
                    <div onClick={() => this.openModal()} />
                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="150"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div className="popheader text-center"></div>
                        <div>
                            {this.successMeg ?
                                <h4 className="text-center popmessage">{this.successMeg}</h4>
                                : null
                            }
                            {this.errorMeg ?
                                <p className="text-center popmessagered">{this.errorMeg}</p>
                                : null
                            }
                        </div>
                        <div className="popfooter text-right">
                            <button type="button" className="closebtn" onClick={() => this.closeModal()}>CLOSE</button>
                        </div>
                    </Modal>
                </section>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { jobapplicant } = state.authentication;
    const { users, viewJobs, authentication } = state;
    const { userItem } = authentication;
    return {
        jobapplicant,
        users,
        userItem,
        viewJobs
    };
}

const connectedMyProfilePage = withRouter(
    connect(mapStateToProps)(ViewJobApplicantPage)
);
export { connectedMyProfilePage as ViewJobApplicantPage };

