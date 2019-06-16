import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from '../_actions';
import img from '../images/img.png';
import './ViewCandidateData.scss';
import edt from '../images/edt.PNG';
import call from '../images/call.PNG';
import cht from '../images/cht.PNG';
import resume from '../images/resume.PNG';
import propic from '../images/pro-pic.PNG';
import { Table } from "react-bootstrap";
// import textjd from '../images/textjd.PNG';
import docproofs from '../images/docproofs.PNG';
import zynga from '../images/zynga.PNG';
import send from '../images/send.PNG';
import foldericon from '../images/foldericon.PNG';
import botscreening from '../images/botscreening.PNG';
import videojd from '../images/videojd.PNG';
import Modal from 'react-awesome-modal';
import textjd from '../images/textjd.PNG';
import accounts1 from "../images/accounts1.PNG";
import accounts2 from "../images/accounts2.PNG";
import accounts3 from "../images/accounts3.PNG";
import reject from "../images/reject.PNG";
import chatt from '../images/chat.PNG';
import chatroom from '../images/chatroomm.PNG';
import letterpad from '../images/letterpad.PNG';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { APP_URLS } from '../_constants/application.url';
import axios from 'axios';
import { Player } from "video-react";
import DateTimePicker from 'react-datetime-picker';
import Pagination from "../_constants/Pagination";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Moment from 'moment';
import { Editor } from '@tinymce/tinymce-react';
import moment from 'moment';
import renderHTML from 'react-render-html';
class ViewCandidateDataPage extends Component {


  constructor(props) {
    super(props);
    this.state = {
      candidateData: [],
      textresume: false,
      visible: false,
      videoresume: false,
      staticimg: true,
      chatroom: false,
      scheduleInterview: false,
      initialOffer: false,
      date: new Date(),
      time: '',
      entity_logo:"",

      message: '',
      currentcandidateData: [],
      currentPage: null,
      totalPages: null,
      details: [],
      currentCandidateDatadetails: [],
      currentPagetabledetails: null,
      totalPagestabledetails: null,
      flag: '',
      offerletterdata: "",

    }
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.AcceptAndDecline = this.AcceptAndDecline.bind(this);
    this.handleClickInitialOffer = this.handleClickInitialOffer.bind(this);
    // this.botInterviewSchedule = this.botInterviewSchedule.bind(this);
    //this.OfferLetter = this.OfferLetter.bind(this);
  }
  onPageChanged = data => {

    const { candidateData } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
  
    const currentcandidateData = candidateData.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentcandidateData, totalPages });
  };
  onPageChangedtabledetails = data => {
    const { details } = this.state;
    const { currentPagetabledetails, totalPagestabledetails, pageLimit } = data;

    const offset = (currentPagetabledetails - 1) * pageLimit;
    const currentCandidateDatadetails = details.slice(offset, offset + pageLimit);

    this.setState({ currentPagetabledetails, currentCandidateDatadetails, totalPagestabledetails });
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
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
  }
  onChange = date => this.setState({ date })
  onChangeTime = time => this.setState({ time })
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

  }
  componentDidMount() {
    this.getCandidatesByInstitutionId();
  }


  getCandidatesByInstitutionId() {
    if (this.props.location.state.candidate_id != "") {
      axios.get(APP_URLS.getCandidatesByInstitutionPostId + '/' + this.props.location.state.candidate_id + '/' + 1, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
        .then((res) => {
          console.log(res)
          let currentState = this.state;
          if (res.data.data) {
            currentState.candidateData = res.data.data.map(x => {
              let institutionData = x
              return institutionData;
            })

            this.setState(currentState);;
          }
        })
        .catch(function (e) {
          console.log('ERROR ', e);
          toastr.error(e);
        })
    } else {
      alert('error')
    }
    let entity_logo = this.props.location.state.entity_logo;
  this.setState({
    entity_logo:entity_logo
  })
  }
  myColor = (selectedcandidate) => {
    if (this.state.active === selectedcandidate) {
      // if(this.state.position===user.user)
      return "#caf6ec";
    }
    return "";
  };
  myColortable = (selectedcandidate) => {
    if (this.state.activetable === selectedcandidate) {
      // if(this.state.position===user.user)
      return "#caf6ec";
    }
    return "";
  };
  toggle = (selectedcandidate) => {
    if (this.state.active === selectedcandidate) {
      this.setState({ active: null })
    } else {
      this.setState({ active: selectedcandidate })
    }
  };
  
  tabletoggle = (selectedcandidate) => {
    if (this.state.activetable === selectedcandidate) {
      this.setState({ activetable: null })
    } else {
      this.setState({ activetable: selectedcandidate })
    }
  };
  selectcandidate(data) {
    debugger
    //this.handleClickScheduleInterview();
    let currentstate = this.state;
    currentstate['textResume'] = data.text_resume;
    currentstate['videoResume'] = data.video_resume;
    currentstate['candidateId'] = data._id;
    currentstate['candidate_name'] = data.candidate_name;
    currentstate['id'] = data._id;
    if (data.Application != '' || data.Application != null || data.Application != undefined) {
      currentstate['Application'] = data.Application;

    }
    this.setState({ data, currentstate });
    this.toggle(data._id)
  }
  search(event) {
    const { value } = event.target;
    let state = this.state;
    state['searchText'] = value;
    this.setState(state);
  };
  AcceptAndDecline(status) {
    axios.post(APP_URLS.acceptOrRejectRequest, { 'status': status }, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {
        console.log(res)
        let currentState = this.state;
        if (res.data.data) {
          currentState.candidateData = res.data.data.map(x => {
            let institutionData = x
            return institutionData;
          })

          this.setState(currentState);;
        }
      })
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e);
      })
  }
  handleClicktextResume() {
    if (this.state.textResume) {
      this.setState({
        textresume: true,
        videoresume: false,
        staticimg: false,
        chatroom: false,
        scheduleInterview: false,
        initialOffer: false,
      })
    } else {
      this.errorMeg = 'Please Select the Candidate';
      this.openModal();
    }
  }
  handleClickVideoResume() {
    if (this.state.videoResume) {
      this.setState({
        textresume: false,
        videoresume: true,
        staticimg: false,
        chatroom: false,
        scheduleInterview: false,
        initialOffer: false,
      })
    } else {
      this.errorMeg = 'Please Select the Candidate';
      this.openModal();
    }
  }
  handleClickScheduleInterview() {
    if (this.state.candidateId) {
      this.setState({
        textresume: false,
        videoresume: false,
        staticimg: false,
        chatroom: false,
        scheduleInterview: true,
        initialOffer: false,
      })
      this.getJobApplicationsForInsitutionCandidate();
    } else {
      this.errorMeg = 'Please Select the Candidate';
      this.openModal();
    }

  }
  handleClickInitialOffer() {
    if (this.state.candidateId) {
      this.setState({
        textresume: false,
        videoresume: false,
        staticimg: false,
        chatroom: false,
        scheduleInterview: false,
        initialOffer: true
      })
    } else {
      this.errorMeg = 'Please Select the Candidate';
      this.openModal();
    }
  }
  handleClickChat() {
    if (this.state.candidateId) {
      this.setState({
        textresume: false,
        videoresume: false,
        staticimg: false,
        chatroom: true,
        scheduleInterview: false
      })
    } else {
      this.errorMeg = 'Please Select the Candidate';
      this.openModal();
    }
  }
  scheduleInterViewClick() {
    axios.post(APP_URLS.scheduleInterview,
      {
        'interview_scheduled_date': moment(this.state.date).format('YYYY-MM-DD HH:mm:ss').toString(),
        '_id': this.state.candidateId, 'message': this.state.message
      }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
      .then((res) => {
        console.log('schedule Interview:', res)
        toastr.success('Interview Scheduled')
      })
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e)
      })
  }

  botInterviewSchedule(details) {

    this.setState({
      message: details.message,
      date: details.interview_scheduled_date,
      time: details.interview_scheduled_time,
      flag: 'date'
    })
  }
  OfferLetter(offerdata) {
    let letter = offerdata.offerDetails.offer_letter
    renderHTML(letter)
    this.setState({ offerletterdata: letter,application_id:offerdata.application_id,phase:offerdata.phase, flag: 'showOffer' })
  }
  OfferLetterAccepted(offerdata){
    let letter = offerdata.offerDetails.offer_letter;
    renderHTML(letter);
    this.setState({offerletterdata: letter,flag: 'showOfferAccept'})
  }
  OfferLetterRejected(offerdata){
    let letter = offerdata.offerDetails.offer_letter;
    renderHTML(letter);
    this.setState({
      offerletterdata: letter,flag:'showOfferReject'
    })

  }
  getJobApplicationsForInsitutionCandidate() {
    axios.get(APP_URLS.getJobApplicationsForInsitutionCandidate + '/' + this.state.id + '/1',
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
      .then((res) => {
        console.log('getJobApplicationsForInsitutionCandidate:', res)
        let currentState = this.state
        if (res.data && res.data.data && res.data.data.length > 0) {
          let details = res.data.data.map(x => {
            let jobpost = x.Job_Post[0];

            return {
              entity_name: jobpost.entity_name, date: jobpost.created_date,
              salary: jobpost.salary, job_title: jobpost.job_title,
              interviewDetails: x.interview_Details,
              offerDetails: x.offer_Details,
              phase: x.phase,
              application_id:x._id
              //rawhtml: x.offer_Details.offer_letter
            };
          });
          console.log(details);

          this.setState({
            details: details
          })
        }
      })
      .catch(function (e) {
        console.log('ERROR ', e);
        //toastr.error(e)
      })
      
  }

  accept(status) {
    debugger
    let interview_status = status;
  
    if (status == 'ACCEPTED') {
        axios.post(APP_URLS.updateInterviewOrOfferStatus, {
            '_id': this.state.application_id,
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
                var successMeg = res.data.data.status;
                this.setState({ success: successMeg })
                this.openModal();

            })
            .catch(function (e) {
                console.log('ERROR ', e);
            })
    }

}
decline(status) {
    debugger
   

    if (status == 'REJECTED') {
        axios.post(APP_URLS.updateInterviewOrOfferStatus, {

            '_id': this.state.application_id,
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
    const { candidate, users, userItem } = this.props;
    const { submitted, value, currentcandidateData, candidateData,offerletterdata} = this.state;
    const totalDocuments = candidateData.length
    const totalPagestabledetails = this.state.details.length
    let filePath = '';

    let iframeTextResume = "";
    let iframeVideoResume = "";
    if (this.state['textResume']) {
      let filePath = this.state['textResume'].split('=').length > 0 ? this.state['textResume'].split('=')[1] : '';
      console.log('filePath:', filePath)
      iframeTextResume = <iframe src={"https://docs.google.com/viewer?srcid=" + [filePath] + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"}
        className="file-view"></iframe>
    }
    if (this.state['videoResume']) {
      let VideofilePath = this.state['videoResume'].split('=').length > 0 ? this.state['videoResume'].split('=')[1] : '';
      iframeVideoResume = <Player src={"https://docs.google.com/viewer?srcid=" + [VideofilePath] + "&pid=explorer&efh=false&a=v&chrome=false&embedded=true"} playInline />;
    }


    return (
      <div id="viewcandidate">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h3 className="title-name">
                  VIEW CANDIDATE DATA (INSTITUTION VERIFIED)
                </h3>

                <h6 className="jobpostid">INSTITUTION POST ID: {this.props.location.state.candidate_id} <br/>
                  BATCH NAME: {this.props.location.state.batchName}<br/>
                  BULK CANDIDATE DATA UPLOADED: {this.state.candidateData.length}</h6>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6">
                  <div className="input-group srchbyname">
                    <input
                      value={value}
                      onChange={this.search}
                      type="text"
                      value={this.state.search}
                      placeholder="SEARCH BY NAME" className="searchbyname" />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className='h3-color'></h3>
            </div>
            <div className="martopbox">
              {this.state.currentcandidateData
                .filter(x => {
                  console.log("x value is ", x)
                  if (this.state.searchText)
                    return (
                      x.batch_name
                        .toLowerCase()
                        .includes(
                          this.state.searchText.toLowerCase()
                        ) ||
                      x.mobile
                        .toLowerCase()
                        .includes(
                          this.state.searchText.toLowerCase()
                        ) ||
                      x.function
                        .toLowerCase()
                        .includes(
                          this.state.searchText.toLowerCase()
                        ) ||
                      x.location
                        .toString()
                        .includes(
                          this.state.searchText
                        ) ||
                      x.email
                        .toString()
                        .includes(
                          this.state.searchText
                        )
                    );

                  else
                    return x
                })
                .map((item, index) => {
                  console.log('candidateData....', item)
                  return (
                    <div className="row martop" onClick={() => this.selectcandidate(item)} style={{ background: this.myColor(item._id) }}>
                      <div className="col-md-3 col-sm-12">
                        <img src={propic} className="img-styles" />
                        {/* <img className="img-styles" src={APP_URLS.getUploadedFile + '/' + this.state.entity_logo}></img> */}
                      </div>
                      <div className="col-md-9 col-sm-12">

                        <div className="jobcompany">
                          NAME: {item.candidate_name}<br />
                          MOBILE: {item.mobile}<br />
                          EMAIL ID: {item.email}<br />
                          FUNCTION: {item.function}<br />
                          LOCATION: {item.location}<br />
                        
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
                  )
                })

              }


              {/* <div></div> */}

            </div>
            <div className="paginationalign">
              {totalDocuments != 0 ?
                <Pagination
                  totalRecords={totalDocuments}
                  pageLimit={3}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
                />
                : null
              }
            </div>
          </div>
          <div className="col-md-6">
            <div className="cardcrd1">
              {this.state.staticimg ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">
                      <img src={resume} className="resume" />
                    </div>
                  </div>
                  <div className="row padtop">
                    <div className="col-md-12">
                      <div className="row mrlftrght">
                        <span className="viewbot">VIEW BOT RESPONSE</span>
                        <div className="viewbotbox">
                          1. Why do you want to work for this company?<br />
                          Culture and reputation of the Company is one of the key reasons for me to consider this opportunity.<br /><br />
                          2. What are two key contributions you can bring to this role?<br />
                          I will be a team player and achieve my sales targets.
                    </div>
                      </div>
                    </div>
                  </div>
                </div>
                : null
              }
              {this.state.textresume == true ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">
                      {iframeTextResume}
                    </div>
                  </div>
                  <div className="row padtop">
                    <div className="col-md-12">
                      <div className="row mrlftrght">
                        <span className="viewbot">VIEW BOT RESPONSE</span>
                        <div className="viewbotbox">
                          1. Why do you want to work for this company?<br />
                          Culture and reputation of the Company is one of the key reasons for me to consider this opportunity.<br /><br />
                          2. What are two key contributions you can bring to this role?<br />
                          I will be a team player and achieve my sales targets.
                                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : null
              }
              {this.state.videoresume == true ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">
                      {iframeVideoResume}
                    </div>
                  </div>
                  <div className="row padtop">
                    <div className="col-md-12">
                      <div className="row mrlftrght">
                        <span className="viewbot">VIEW BOT RESPONSE</span>
                        <div className="viewbotbox">
                          1. Why do you want to work for this company?<br />
                          Culture and reputation of the Company is one of the key reasons for me to consider this opportunity.<br /><br />
                          2. What are two key contributions you can bring to this role?<br />
                          I will be a team player and achieve my sales targets.
                                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : null
              }

              {this.state.chatroom == true ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">
                      <img src={chatroom} className="chatroombig" />
                    </div>
                  </div>
                </div>
                : null
              }
              {this.state.scheduleInterview == true ?
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">

                      <Table bordered hover responsive striped className="tablemain">
                        <thead>
                          <th>DATE</th>
                          <th>STATUS</th>
                          <th>ENTITY NAME</th>
                          <th>JOB TITLE & SALARY RANGE</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </thead>
                        <tbody>
                          {this.state.details.map((item, index) => {
                            console.log('tabledata', item)
                            return (
                              <tr key={index + 1} style={{ background: this.myColortable(item.application_id) }} onClick={((e) => this.tabletoggle(item.application_id))} >
                                <td>{Moment(item.date).format("DD-MM-YYYY HH:mm:ss")}</td>
                                {item.phase == 'INTERVIEW' ?
                                  <td>{item.interviewDetails.status}</td>
                                  : null
                                }
                                {item.phase == "OFFER" ?
                                  <td>{item.offerDetails.status}</td>
                                  : null
                                }
                                <td>{item.entity_name}</td>
                                <td>{item.job_title}{item.salary}</td>
                                {item.interviewDetails.status == "INTERVIEW SCHEDULED" && item.phase == "INTERVIEW" ?
                                  <td onClick={(e) => this.botInterviewSchedule(item.interviewDetails)}> <img src={call} className="imgsmall" /></td>
                                  : null
                                }
                                {item.phase == "OFFER" &&
                                  item.offerDetails.status == "OFFER ISSUED" ?
                                  <td onClick={(e) => this.OfferLetter(item)}>
                                    <img src={accounts1} className="imgsmall" /></td>
                                  : null
                                }
                                {item.phase == "OFFER" &&
                                  item.offerDetails.status == "ACCEPTED" ?
                                  <td onClick={(e) => this.OfferLetterAccepted(item)}><img src={accounts2} className="imgsmall" /></td>
                                  : null
                                }
                                {item.phase == "OFFER" &&
                                  item.offerDetails.status == "REJECTED" ?
                                  <td onClick={(e) => this.OfferLetterRejected(item)}><img src={reject} className="accs1" /></td>
                                  : null
                                }
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                      {totalPagestabledetails != 0 ?
                <Pagination
                  totalRecords={totalPagestabledetails}
                  pageLimit={0}
                  pageNeighbours={1}
                  onPageChangedtabledetails={this.onPageChangedtabledetails}
                />
                : null
              }

                    </div>
                    {this.state.flag == 'date' ?
                      <div className="row dtdt">
                        <div className="col-md-6 dt">
                          <div className="row">
                            <div className="col-md-10">
                              <div className="scheduleaninterview1">{this.state.candidate_name}</div>
                            </div>
                            <div className="col-md-2">
                              <img src={botscreening} className="scheduleimg1" />
                            </div>
                          </div>
                          <DatePicker
                            inline
                            value={this.state.date}
                            selected={this.state.date}
                            onChange={this.onChange}
                          />
                          <TimePicker
                            onChange={this.onChangeTime}
                            value={this.state.time}
                          />
                          <TimePicker
                            onChange={this.onChangeTime}
                            value={this.state.time}
                          />
                          <textarea type="text" name="message"
                            className="form-control candidatetext1"
                            value={this.state.message}></textarea>
                          <img src={send} className="sendstyles1" />
                        </div>

                      </div>
                      : null
                    }

                    {this.state.flag == 'showOffer' ?
                      <div className="row">
                      <div className="col-md-7">
                      <div className="row">
                            <div className="col-md-2">
                              <img src={accounts1} className="imgsmall" />
                            </div>
                            <div className="col-md-10 viewoffer">
                              VIEW OFFER<br></br>ACCEPTED ON 10/02/2019
                            </div>
                          </div>
                        <div className="card-body offer-page">
                          {renderHTML(this.state.offerletterdata)}
                        </div>
                        <div className="col-md-6 reviseoffer">
                          <a
                            className="select blue"
                            href="javascript:void(0)"
                            onClick={() => this.accept('ACCEPTED')}>ACCEPT</a>
                          <a className="select canceloffer" onClick={() => this.decline('REJECTED')}>REJECT</a>
                        </div>
                        </div>
                        <div className="col-md-5">
                          
                        </div>
                      </div>
                      : null
                    }

                  {this.state.flag == 'showOfferAccept' ?
                      <div className="row text-left">
                      <div className="col-md-7">
                          <div className="row">
                            <div className="col-md-2">
                            <img src={accounts2} className="imgsmall" />
                            </div>
                            <div className="col-md-10 viewoffer">
                              VIEW OFFER<br></br>ACCEPTED ON 10/02/2019
                            </div>
                          </div>
                        <div className="card-body offer-page">
                          {renderHTML(this.state.offerletterdata)}
                        </div>
                      </div>
                      <div className="col-md-5">
                       
                      </div>
                      </div>
                      : null
                    }
                    {this.state.flag == 'showOfferReject' ?
                        <div className="row text-left">
                        <div className="col-md-7">
                            <div className="row">
                              <div className="col-md-2">
                              <img src={reject} className="accs1" />
                              </div>
                              <div className="col-md-10 viewoffer">
                                VIEW OFFER<br></br>ACCEPTED ON 10/02/2019
                              </div>
                            </div>
                          <div className="card-body offer-page">
                            {renderHTML(this.state.offerletterdata)}
                          </div>
                        </div>
                        <div className="col-md-5">
                         
                        </div>
                        </div>
                      : null
                    }

                  </div>
                </div>
                : null
              }

              {this.state.initialOffer == true ?
                <div className="row">
                  <div className="col-md-12"> `

                  </div>
                </div>
                : null
              }


            </div>

            <div className="myprofileboxleft marbottom">
              <div className="mrleft">
                <div className="grbox">

                  <table>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight">
                          <div className="image-upload">
                            <label>
                              <img src={textjd} className="text_resume imgst" onClick={() => this.handleClicktextResume()} />
                            </label>
                            {/* <input type="file" name='file' onChange={(e) => this.onChangeTextDoc(e)} /> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>TEXT RESUME</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mrleft">
                <div className="grbox">
                  <div className="image-upload">
                    <label>
                      <img src={videojd} className="video_resume imgst1" onClick={() => this.handleClickVideoResume()} />
                    </label>
                    {/* <input type="file" name='file' onChange={(e) => this.onChangeVideoDoc(e)} /> */}
                  </div>
                  <span>VIDEO RESUME</span>
                </div>
              </div>

              <div className="mrleft">

                <div className="grbox">
                  <table>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight marrght1" onClick={() => this.handleClickChat()}>
                          <img src={chatt} className="img-styles chatrm" />
                        </td>
                      </tr>
                      <tr>
                        <td className="marrght1">
                          <span>CHAT ROOM</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div className="mrleft">

                <div className="grbox">
                  <table className="tbmar">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight marrght1" onClick={() => this.handleClickScheduleInterview()}>
                          <img src={botscreening} className="img-styles chatrm" />
                        </td>
                      </tr>
                      <tr>
                        <td className="marrght1">
                          <span>SCHEDULE INTERVIEW</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div className="mrleft">
                <div className="grbox" >
                  <table>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight marrght" onClick={() => this.handleClickInitialOffer()}>
                          <img src={letterpad} className="img-styles chatrm6" />
                        </td>
                      </tr>
                      <tr>

                        <td className="marrght">
                          <span>INITIAL OFFER</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
              {/* <h4 className="text-center popmessage">Successfully completed</h4>
                        <h4 className="text-center popmessagered">Successfully completed</h4> */}


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
  const { candidate } = state.authentication;
  const { users, authentication } = state;
  const { userItem } = authentication;
  return {
    candidate, users, userItem
  };
}
const connectedViewCandidateDataPage = withRouter(
  connect(mapStateToProps)(ViewCandidateDataPage)
);
export { connectedViewCandidateDataPage as ViewCandidateDataPage };