import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "react-bootstrap";
import '../ActiveJobApplicants/ActiveJobApplicants.scss';
import okimg from "../images/okimg.PNG";
import notok from "../images/notok.PNG";
import accounts1 from "../images/accounts1.PNG";
import accounts2 from "../images/accounts2.PNG";
import accounts3 from "../images/accounts3.PNG";
import reject from "../images/reject.PNG";
import call from "../images/call.PNG";
import chat from "../images/chat.PNG";
import sharesmall from "../images/sharesmall.PNG";
import companyprofilesmall from "../images/companyprofilesmall.PNG";
import jobdescriptiondoc from "../images/jobdescriptiondoc.PNG";
import letterpad from "../images/letterpad.PNG";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { APP_URLS } from '../_constants/application.url';
import axios from 'axios';
import Moment from 'moment';
import Pagination from "../_constants/Pagination";
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import send from '../images/send.PNG';
import botscreening from '../images/botscreening.PNG';
import renderHTML from 'react-render-html';
import Modal from 'react-awesome-modal';
class ActiveJobApplicantspage extends Component {
    successMeg = "";
    errorMeg = "";
    constructor(props) {
        super(props)
        this.state = {
            selectedDoc: false,
            visible: false,
            staticDoc: true,
            bot: false,
            active: null,
            ActiveApplicants: [],
            date: new Date(),
            time: '',
            message: '',
            currentJobApplicants: [],
            currentPage: null,
            totalPages: null,
            entityreport: false,
            offer: false,
            document: false,
            rawhtml: "",
            reschedule: false
        }
        this.selectedjob = this.selectedjob.bind(this);
        this.bot = this.bot.bind(this);
        this.offer = this.offer.bind(this);
        this.EntityReport = this.EntityReport.bind(this);
        this.Document = this.Document.bind(this);
        this.accept = this.accept.bind(this);
        this.decline = this.decline.bind(this);

    }
    onChange = date => this.setState({ date })
    componentDidMount() {
        let userProfileName = this.props.location.state.userName
        axios
            .get(APP_URLS.getMyJobApplications, {
                headers: {
                    Authorization: JSON
                        .parse(localStorage.getItem('user'))
                        .data
                        .token
                }
            })
            .then((res) => {
                console.log(res)
                let currentState = this.state;
                if (res.data && res.data.data && res.data.data && res.data.data.length > 0) {
                    currentState.ActiveApplicants = res
                        .data
                        .data
                        .map(x => {
                            let jobData = x.Job_Post[0];
                            jobData.phase = x.phase;
                            jobData.applied_Date = x.applied_Date;
                            jobData._id = x._id;
                            if (x.phase == 'INTERVIEW') {
                                jobData.interview_Details = x.interview_Details;
                                jobData.status = x.interview_Details.status
                            }
                            if (x.phase == 'OFFER') {
                                jobData.offer_Details = x.offer_Details;
                                jobData.status = x.offer_Details.status
                            }
                            return jobData;

                        })

                    this.setState(currentState);
                }
            })
            .catch(function (e) {
                console.log('ERROR ', e);
            })
    }
    toggle = (item) => {
        if (this.state.active === item) {
            this.setState({ active: null })
        } else {
            this.setState({ active: item })
        }
    };
    openModal() {
        this.setState({ visible: true });
    }

    closeModal() {
        this.setState({ visible: false });
    }

    onPageChanged = data => {
        const { ActiveApplicants } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentJobApplicants = ActiveApplicants.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentJobApplicants, totalPages });
    };
    onChange = date => this.setState({ date })
    onChangeTime = time => this.setState({ time })
    myColor = (item) => {
        if (this.state.active === item) {
            return "#caf6ec";
        }
        return "";
    };
    selectedjob(selectdata) {
        console.log('selectProof:', selectdata);
        let currentState = this.state
        currentState['selectedActivJobDocument'] = selectdata.text_JD;
        currentState['selectedActiveJobAppliedDate'] = selectdata.applied_Date;
        currentState['selectedActiveJobPhase'] = selectdata.phase;
        currentState['expiry_date'] = selectdata.expiry_date;
        if (selectdata.interview_Details) {
            currentState['selectedStatus'] = selectdata.interview_Details.status;
        }

        if (selectdata.offer_Details) {
            currentState['rawhtml'] = selectdata.offer_Details.offer_letter;
            currentState['selectedStatus'] = selectdata.offer_Details.status;
        }
        currentState['_id'] = selectdata._id;
        currentState['phase'] = selectdata.phase;

        this.setState(currentState);
        this.setState({
            selectedDoc: true,
            staticDoc: false,
            bot: false,
            entityreport: false,
            offer: false,
            document: false
        })
        this.toggle(selectdata._id)
    }

    bot(data) {
        let slectedbot = data;
        let currentState = this.state;
        if (data.phase == 'INTERVIEW') {
            currentState['date'] = data.interview_Details.interview_scheduled_date;

            currentState['message'] = data.interview_Details.message;
            console.log('*********', data.interview_Details.interview_scheduled_time);


            // let splitArr = data
            //     .interview_Details
            //     .interview_scheduled_time
            //     .split(' ');
            // if (splitArr[1] == 'PM') {
            //     let a = splitArr[0].split(':')[0] == '12'
            //         ? '0'
            //         : splitArr[0].split(':')[0];
            //     let b = Number(a) + 12;
            //     let c = b.toString();
            //     let d = splitArr[0].split(':')[1];
            //     let f = c + ':' + d;
            //     console.log('24hrs time******', f);
            //     currentState['time'] = f;
            //     console.log('time******', currentState['time']);

            // } else if (splitArr[1] == 'AM') {
            //     let a = splitArr[0].split(':')[0] == '12'
            //         ? '00'
            //         : splitArr[0].split(':')[0];
            //     let b = a.toString();
            //     let c = splitArr[0].split(':')[1];
            //     let d = b + ':' + c;
            //     console.log('24hrs time******', d);
            //     currentState['time'] = d;
            // }
        }
        this.setState({
            selectedDoc: false,
            staticDoc: false,
            bot: true,
            entityreport: false,
            offer: false,
            document: false,
            jobapplicantid: slectedbot._id,
            phase: slectedbot.phase,
            currentState
        })
    }

    offer() {
        let x = this.state;
        if (this.state.rawhtml) {
            renderHTML(this.state.rawhtml)
            this.setState({ rawhtml: this.state.rawhtml })
        }

        this.setState({
            offer: true,
            selectedDoc: false,
            staticDoc: false,
            bot: false,
            entityreport: false,
            document: false,
            rawHtml: this.state.rawhtml
        })
    }
    EntityReport() {
        let x = this.state;
        if (this.state.rawhtml) {
            renderHTML(this.state.rawhtml)
           // this.setState({ rawhtml: this.state.rawhtml })
           this.setState({
            offer: false,
            selectedDoc: false,
            staticDoc: false,
            bot: false,
            entityreport: true,
            document: false,
            rawHtml: this.state.rawhtml
        })
        }
      
    }
    Document() {
        this.setState({
            offer: false,
            selectedDoc: false,
            staticDoc: false,
            bot: false,
            entityreport: false,
            document: true
        })
    }
    accept(status) {
        debugger
        let interview_status = status;
        if (status == 'INTERVIEW ACCEPTED') {
            axios.post(APP_URLS.updateJobApplicationStatus, {
                '_id': this.state._id,
                'phase': this.state.phase,
                'interview_status': status
            }, {
                    headers: {
                        Authorization: JSON
                            .parse(localStorage.getItem('user'))
                            .data
                            .token
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.successMeg = res.data.data.status;
                        this.openModal();
                    }
                    else if (res.data.code == 204) {
                        this.errorMeg = res.data.data.status;
                        this.openModal();
                    }

                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                })
        }

        if (status == 'ACCEPTED') {
            axios.post(APP_URLS.updateJobApplicationStatus, {
                '_id': this.state._id,
                'phase': this.state.phase,
                'offer_status': status
            }, {
                    headers: {
                        Authorization: JSON
                            .parse(localStorage.getItem('user'))
                            .data
                            .token
                    }
                }).then((res) => {
                    console.log(res)
                    this.successMeg = res.data.data.status;
                    // this.setState({ success: successMeg })
                    this.openModal();

                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                })
        }

    }
    decline(status) {
        debugger
        let interview_status = status;
        if (status == 'INTERVIEW REJECTED') {
            axios.post(APP_URLS.updateJobApplicationStatus, {

                '_id': this.state._id,
                'phase': this.state.phase,
                'interview_status': status
            }, {
                    headers: {
                        Authorization: JSON
                            .parse(localStorage.getItem('user'))
                            .data
                            .token
                    }
                }).then((res) => {
                    console.log(res)
                    this.successMeg = res.data.data.status;
                    // this.setState({ success: successMeg })
                    this.openModal();

                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                })
        }

        if (status == 'REJECTED') {
            axios.post(APP_URLS.updateJobApplicationStatus, {

                '_id': this.state._id,
                'phase': this.state.phase,
                'offer_status': status
            }, {
                    headers: {
                        Authorization: JSON
                            .parse(localStorage.getItem('user'))
                            .data
                            .token
                    }
                }).then((res) => {
                    console.log(res)
                    this.successMeg = res.data.data.status;
                    // this.setState({ success: successMeg })
                    this.openModal();

                })
                .catch(function (e) {
                    console.log('ERROR ', e);
                })
        }
    }

    render() {
        const { ActiveJobApplicants } = this.props;
        const { ActiveApplicants, currentJobApplicants, currentPage } = this.state;

        const totalDocuments = ActiveApplicants.length;
        const headerClass = [
            "text-dark py-2 pr-4 m-0", currentPage
                ? "border-gray border-right"
                : ""
        ]
            .join(" ")
            .trim();
        console.log('applicantData:', ActiveApplicants)
        let iframeActiveJob = '';
        let filePath = '';
        let userprofile = JSON.parse(localStorage.getItem('userProfile'))

        if (this.state['selectedActivJobDocument']) {
            let filePath = APP_URLS.getUploadedFile + '/' + this.state['selectedActivJobDocument'];
            console.log('filepath:', filePath)
            iframeActiveJob = <iframe
                src={"https://docs.google.com/viewer?embedded=true&url=" + filePath}
                className="activejob-file-view"></iframe>
        }
        return (
            <div id="activejob">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="title-name">ACTIVE JOB APPLICATIONS</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-primary float-right rfs"
                                    onClick={() => this.componentDidMount()}>REFRESH</button>
                            </div>
                        </div>
                        <Table bordered hover responsive striped className="tablemain tablemargin">
                            <thead>
                                <tr>
                                    <th width="17%">DATE</th>
                                    <th>STATUS</th>
                                    <th>ENTITY NAME</th>
                                    <th>JOB TITLE & SALARY RANGE
                                    </th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentJobApplicants.map((item, index) => {
                                    console.log('active job Applicants...', item)
                                    return (

                                        <tr
                                            key={index}
                                            style={{
                                                background: this.myColor(item._id)
                                            }}>

                                            <td >{Moment(item.created_date).format("DD-MM-YYYY")}</td>
                                            {item.phase == "PENDING" ?
                                                <td onClick={(e) => this.selectedjob(item)} className="INTEREST">{item.phase}</td>
                                                : <td onClick={(e) => this.selectedjob(item)} className="INTEREST">{item.status}</td>
                                            }



                                            <td onClick={(e) => this.selectedjob(item)}>{item.entity_name
                                                .toUpperCase()}</td>
                                            <td onClick={(e) => this.selectedjob(item)}>{item
                                                .job_title
                                                .toUpperCase()}
                                            </td>
                                            {item.phase == "INTERVIEW"
                                                ? <td><img src={call} className="" onClick={(e) => this.bot(item)} /></td>
                                                : null
                                            }
                                            {item.phase == "OFFER" && item.offer_Details.status == 'OFFER ISSUED'
                                                ? <td onClick={this.offer}><img src={accounts1} className="accs1" /></td>

                                                : null
                                            }
                                            {item.phase == "OFFER" && item.offer_Details.status == 'REJECTED'
                                                ? <td onClick={this.offer}><img src={reject} className="accs1" /></td>

                                                : null
                                            }
                                            {item.phase == "OFFER" && item.offer_Details.status == 'ACCEPTED'
                                                ? <td onClick={this.EntityReport}><img src={accounts2} className="accs1" /></td>
                                                : null
                                            }{item.phase == 'INTERVIEW' || item.phase == "OFFER"
                                                ? <td onClick={this.Document}><img src={accounts3} className="accs1" /></td>
                                                : null
                                            } {item.phase == 'REQUEST'
                                                ? <span>

                                                    <td><img src={okimg} className="" /></td>
                                                    <td><img src={notok} className="" /></td>
                                                </span>
                                                : null
                                            }

                                        </tr>

                                    )
                                })}

                            </tbody>
                        </Table>
                        {totalDocuments != 0
                            ? <Pagination
                                totalRecords={totalDocuments}
                                pageLimit={5}
                                pageNeighbours={1}
                                onPageChanged={this.onPageChanged} />
                            : null
                        }

                        <br></br>
                        <hr></hr>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="chatbck">
                                            <div className="float-left">
                                                <img src={chat} className="chatstyles" />
                                            </div>
                                            <div className="float-left chatroom">
                                                CHAT ROOM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row martopp">
                                    <div className="col-md-10 text-center viewchat">
                                        VIEW CHAT MESSAGES
                                    </div>
                                    <div className="col-md-2">
                                        <img src={sharesmall} className="" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="chatmsgs">
                                            <p className="txtchat">
                                                I AM AVAILABLE TO MEET BETWEEN 2PM TO 5PM FOR NEXT 5 DAYS.
                                            </p>
                                            <div className="chatnametime">JOHN 15/01/2019 9:30</div>
                                        </div>
                                        <div className="chatmsgsgreen">
                                            <p className="txtchat">
                                                I AM AVAILABLE TO MEET BETWEEN 2PM TO 5PM FOR NEXT 5 DAYS.
                                            </p>
                                            <div className="chatnametime">JOHN 15/01/2019 9:30</div>
                                        </div>
                                        <div className="chatmsgs">
                                            <p className="txtchat">
                                                SURE. LOOKING FORWARD.
                                            </p>
                                            <div className="chatnametime">JOHN 15/01/2019 9:30</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 borderleft">
                                <div className="row">
                                    <div className="col-md-2 checkkbx">
                                        <input type="checkbox" name="request" value="Request" />
                                    </div>
                                    <div className="col-md-10 requestparapad">
                                        <p className="requestpara">REQUEST COMPANY BACKGROUND REPORT<br />
                                            FOR EMPLOYER CHECK</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <img src={companyprofilesmall} className="cfm" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div>
                            <div className="card bg-light text-dark">
                                <div className="card-body ">
                                    <div className="cardcrdactive">
                                        {this.state.selectedDoc
                                            ? <div className="jobdesc">
                                                {iframeActiveJob}
                                            </div>
                                            : null
                                        }
                                        {this.state.staticDoc
                                            ? <div>
                                                <img src={jobdescriptiondoc} className="jobdesc" />
                                            </div>
                                            : null
                                        }
                                        {this.state.bot
                                            ? <div>
                                                <div className="row">
                                                    <div className="col-md-12 datemartop"></div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 dt">
                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <div className="scheduleaninterview1">{userprofile
                                                                    .user_name
                                                                    .toUpperCase()}</div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <img src={botscreening} className="scheduleimg1" />
                                                            </div>
                                                        </div>
                                                        <DatePicker
                                                            inline
                                                            value={this.state.date}
                                                            selected={this.state.date}
                                                            onChange={this.onChange} />
                                                        {/* <TimePicker onChange={this.onChangeTime} value={this.state.time} /> */}
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
                                                        <textarea
                                                            type="text"
                                                            name="message"
                                                            className="form-control candidatetext1"
                                                            value={this.state.message}></textarea>

                                                        {/* <img src={send} className="sendstyles1" /> */}
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <button
                                                                    onClick={() => this.accept('INTERVIEW ACCEPTED')}
                                                                    className="btn btn-primary acceptbtn">ACCEPT</button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <button className="btn btn-primary reschedulebtn">RESCHEDULE</button>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <button
                                                                    onClick={() => this.decline('INTERVIEW REJECTED')}
                                                                    className="btn btn-primary declinebtn">DECLINE</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            : null
                                        }

                                        {this.state.offer
                                            ? <div>
                                                {this.state.selectedStatus == 'ACCEPTED'
                                                    ? <img src={accounts1} className="accs1" width="50" />
                                                    : null
                                                }
                                                {this.state.selectedStatus == 'REJECTED'
                                                    ? <img src={reject} className="accs1" width="50" />
                                                    : null
                                                }

                                                <div class="card">
                                                    <div class="card-body offer-page">
                                                        {renderHTML(this.state.rawHtml)}

                                                    </div>
                                                </div>
                                                {this.state.selectedStatus == 'ACCEPTED' || this.state.selectedStatus != 'REJECTED' || this.state.selectedStatus == 'OFFER ISSUED'
                                                    ? <div className="col-md-6 reviseoffer">
                                                        <a
                                                            className="select blue"
                                                            href="javascript:void(0)"
                                                            onClick={() => this.accept('ACCEPTED')}>ACCEPT</a>
                                                        <a className="select canceloffer" onClick={() => this.decline('REJECTED')}>REJECT</a>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                            : null
                                        }
                                        {this.state.document
                                            ? <div>
                                                <h3>document</h3>
                                            </div>
                                            : null
                                        }
                                        {this.state.entityreport ?
                                            // ? <div>
                                            //     <h3>entityreport</h3>
                                            // </div>
                                            <div class="card">
                                                    <div class="card-body offer-page">
                                                        {renderHTML(this.state.rawHtml)}

                                                    </div>
                                                </div>
                                            : null
                                        }
                                        <div className="row martopp">
                                            <div className="col-md-6 padrightt">
                                                <div className="addamessage2">

                                                    APPLIED ON :{Moment(this.state.selectedActiveJobAppliedDate).format('DD-MM-YYYY')}<br />

                                                    STATUS :
                                                    <span className="pendingcolor">{this.state.selectedStatus}</span>
                                                    <div className="addmsg1">
                                                        INTERVIEWED ON DATE & TIME: 27 JAN 2019 5PM OFFER ACCEPTED ON 28 JAN 4PM BGV
                                                        REPORT ISSUED ON:15 FEB 2019
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-6 text-center padleftt">
                                                <h6 className="updateon">UPDATE ON: 16 FEB 2019 23:00</h6>
                                                <a href="#" className="activestyles">ACTIVE</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* <div className="bxwidth">
                            <div className="row">
                                <div className="col-md-6 ">
                                    <div className="row maroffertop">
                                        <div className="col-md-10 offerjohn">
                                            <h6>OFFER - JOHN</h6>
                                            <p>
                                                INITIATED ON 31 MARC 2019 18:00<br />
                                                ACCEPTED ON 31 MAR 2019 19:00
                                            </p>
                                        </div>
                                        <div className="col-md-2">
                                            <img src={letterpad} className="letterp" />
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-12 padrightt">
                                            <div className="ratingbox">
                                                <div className="row">
                                                    <div className="col-md-6 padrightt">

                                                        <div className="rating">
                                                            &#9733;&#9733;&#9734;&#9734;&#9734;
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 padleftt">
                                                        RESPONSIVENESS
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 padrightt">

                                                        <div className="rating">
                                                            &#9733;&#9733;&#9734;&#9734;&#9734;
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6 padleftt">
                                                        COMMITMENT
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 padrightt">
                                                        <div className="rating">
                                                            &#9733;&#9733;&#9734;&#9734;&#9734;
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 padleftt">
                                                        OVERALL RATING
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="reportconcerns">
                                        <h6 className="reportstyles">REPORT ANY CONCERNS</h6>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <input type="radio" name="request" value="Request" />
                                            </div>
                                            <div className="col-md-10 padleftt">
                                                <p className="visible">VISIBLE ONLY FOR THE APPLICANT</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> */}
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
    const { ActiveJobApplicants } = state.authentication;
    return { ActiveJobApplicants };
}

const connectedActiveJobApplicants = withRouter(connect(mapStateToProps)(ActiveJobApplicantspage));
export { connectedActiveJobApplicants as ActiveJobApplicantspage }