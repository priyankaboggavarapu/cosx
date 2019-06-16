import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import propic from '../images/pro-pic.PNG';
import edt from '../images/edt.PNG';
import chatroomm from '../images/chatroomm.PNG';
import botschedule from '../images/scheduleaninterview.PNG';
import resume from '../images/resume.PNG';
import videojd from '../images/videojd.PNG';
import videojdd from '../images/videojdd.PNG';
import textjd from '../images/textjd.PNG';
import botscreening from '../images/botscreening.PNG';
import letterpad from '../images/letterpad.PNG';
import okimg from '../images/okimg.PNG';
import notok from '../images/notok.PNG';
import chatt from '../images/chat.PNG';
import { Player } from "video-react";
import send from '../images/send.PNG';
import institutionposts from '../images/institution-posts.PNG';
import './CompaniesIntrestedPage.scss';
import Modal from 'react-awesome-modal';
import DateTimePicker from 'react-datetime-picker';
//import DatePicker from "react-datepicker";
import axios from 'axios';
import Pagination from "../_constants/Pagination";
import { APP_URLS } from '../_constants/application.url';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import moment from 'moment';



class CompaniesIntrestedPage extends Component {
  successMeg = "";
  errorMeg = "";
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      textresume: true,
      videoresume: false,
      bot: false,
      chatroom: false,
      companyInterest: [],
      currentcompanyInterest: [],
      currentPage: null,
      totalPages: null,
      date: new Date(),
      time: '',
      end_time:'',
      message: ""
    }

    this.CompanyAcceptOrRejectRequest = this.CompanyAcceptOrRejectRequest.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange = date => this.setState({ date })
  onChangeTime = time => this.setState({ time })
  onChangeEndTime = end_time => this.setState({ end_time })
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

  }
  componentDidMount() {
    this.getCompaniesInterest()
  }
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
  onPageChanged = data => {
    const { companyInterest } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentcompanyInterest = companyInterest.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentcompanyInterest, totalPages });
  };


  TextResume() {
    if (this.state.textJD) {
      this.setState({
        textresume: true,
        videoresume: false,
        bot: false,
        chatroom: false
      })

      if (this.state.textJD) {
        let filePath = APP_URLS.getUploadedFile + '/' + this.state.textJD;
        console.log('filepath:', filePath)
        this.iframeData = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath} className="job-instance-file-view"></iframe>

      }
    } else {
      this.errorMeg = 'Please Select The Company';
      this.openModal();
    }

  }
  VideoResume() {
    if (this.state.videoJD) {
      this.setState({
        textresume: false,
        videoresume: true,
        bot: false,
        chatroom: false
      })
      if (this.state.videoJD) {
        this.videoPreview = <Player src={APP_URLS.getUploadedFile + '/' + this.state.videoJD} playInline />;
      }
    } else {
      this.errorMeg = 'Please Select The Company';
      this.openModal();
    }

  }
  BotSchedule() {
    this.setState({
      textresume: false,
      videoresume: false,
      bot: true,
      chatroom: false
    })
  }
  ChatRoom() {
    this.setState({
      textresume: false,
      videoresume: false,
      bot: false,
      chatroom: true
    })
  }
  toggle = (user) => {
    if (this.state.active === user) {
      this.setState({ active: null })
    } else {
      this.setState({ active: user })
    }
  };

  myColor = (user) => {
    if (this.state.active === user) {
      // if(this.state.position===user.user)
      return "#7feeef";
    }
    return "";
  };
  handleClick(event, data) {
    event.preventDefault();
    console.log('companies intrested get data', data)
    let currentState = this.state
    currentState['textJD'] = data.text_JD;
    currentState['videoJD'] = data.video_JD;
    currentState['job_Post_Id'] = data.job_Post_Id;
    currentState['date'] = data.interview_details.date;
    currentState['_id'] = data._id
    currentState['message'] = data.interview_details.message;
    if (data.interview_details.time != null) {
      console.log('*********', data.interview_details.time.split(' '));
      let splitArr = data.interview_details.time.split(' ');
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
    else if (data.interview_details.end_time!= null)
    console.log('*********', data.interview_details.end_time.split(' '));
    if (data.interview_details.end_time != null) {
    let splitArr = data.interview_details.end_time.split(' ');
    if (splitArr[1] == 'PM') {
      let a = splitArr[0].split(':')[0] == '12' ? '0' : splitArr[0].split(':')[0];
      let b = Number(a) + 12;
      let c = b.toString();
      let d = splitArr[0].split(':')[1];
      let f = c + ':' + d;
      console.log('24hrs time******', f);
      currentState['end_time'] = f;
      console.log('time******', currentState['end_time']);

    } else if (splitArr[1] == 'AM') {
      let a = splitArr[0].split(':')[0] == '12' ? '00' : splitArr[0].split(':')[0];
      let b = a.toString();
      let c = splitArr[0].split(':')[1];
      let d = b + ':' + c;
      console.log('24hrs time******', d);
      currentState['end_time'] = d;
    }
  }
      this.toggle(data._id)

  }
  getCompaniesInterest() {
    axios.get(APP_URLS.getCompaniesInterested + '/' + this.props.location.state.institution_post_id + '/' + 1, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {
        console.log('explore........', res)
        if (res.data && res.data && res.data.data && res.data.data.length > 0) {
          const companyInterest = res.data.data.map(x => {
            let companyInterestData = x.Job_Post;
            return companyInterestData;


          })[0]
          this.setState({ companyInterest });
        }
      }
      )
      .catch(function (e) {
        console.log('ERROR ', e);
        //  toastr.error(e);
      })
  }
  // scheduleInterViewClick(){
  //   axios.post(APP_URLS.scheduleInterview,
  //     {
  //         "interview_scheduled_date": moment(this.state.date).format('YYYY-MM-DD').toString(),
  //         "interview_scheduled_time": moment(this.state.time, "h:mm A").format("hh:mm A"),
  //         '_id': this.state._id, 'message': this.state.message
  //     }, {
  //         headers: {
  //             Authorization: JSON.parse(localStorage.getItem('user')).data.token
  //         }
  //     })
  //     .then((res) => {
  //         console.log('schedule Interview:', res)
  //         if (res.data.code == 200) {
  //             this.successMeg = res.data.data.status
  //             this.openModal();
  //         }
  //     })
  //     .catch(function (e) {
  //         console.log('ERROR ', e);

  //     })

  // }
  CompanyAcceptOrRejectRequest(data) {

    axios.post(APP_URLS.acceptOrRejectRequest, {
      'institution_post_id': this.props.location.state.institution_post_id, 'job_Post_Id': data.job_Post_Id, "status": data.status
    }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
      .then((res) => {
        console.log(res)
        if (res.data.status == 200) {
          this.successMeg = res.data.message
          // this.setState({
          //   successMeg :message
          // })
          this.openModal();
        }
      })
      .catch(function (e) {
        console.log('ERROR ', e);
      })

  }

  handleSubmit() {
    debugger
    axios.post(APP_URLS.addCandidatesForCampusHire,
      {
        'institution_post_id': this.props.location.state.institution_post_id,
        'job_Post_Id': this.state.job_Post_Id,
        'interview_scheduled_date': this.state.date,
        'interview_scheduled_time': this.state.time,
        'message': this.state.message
      }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
      .then((res) => {

        console.log('SEND CANDIDATE INVITE FOR CAMPUS HIRE:', res)
        if (res.data.status == 200) {
          this.successMeg = res.data.message
          this.openModal();
        }
        else if (res.data.code == 205) {
          this.errorMeg = res.data.message;
          this.openModal();
        }
        else if (res.data.status == 400) {
          this.errorMeg = res.data.error;
          this.openModal();
        }
        // if(res.data.status==205){
        //   let errormsg = res.data.message
        //     this.setState({
        //       error: errormsg
        //     })
        //     this.openModal();

        // }

      })
      .catch(function (e) {
        console.log('ERROR ', e);
        // toastr.error(e)
      })
  }
  render() {
    const { companies } = this.props;
    const { currentcompanyInterest, currentPage, companyInterest } = this.state;
    const totalDocuments = companyInterest.length;
    return (
      <div id="companyinterest">
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h3 className="title-name">
                  VIEW COMPANIES INTERESTED
                </h3>

                <h6 className="jobpostid">
                  INSTITUTION POST ID: SL10101353<br />
                  BATCH NAME: EXECUTIVE PROGRAM 2019<br />
                  BULK CANDIDATE DATA UPLOADED: 3
                                </h6>
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
                      <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="martopbox">
              {this.state.companyInterest.map((item, index) => {
                console.log('companiesintrestedgetdata...', item)
                return (
                  <div key={index + 1} className="row martop" style={{ background: this.myColor(item._id) }}
                    onClick={((e) => this.handleClick(e, item))}>
                    <div className="col-md-3 col-sm-12">
                      <img src={propic} className="img-styles" />
                    </div>

                    <div className="col-md-9 col-sm-12">

                      <div className="jobcompany">
                        JOB: {item.job_title}<br />
                        COMPANY: <br />
                        LOCATION:{item.location}<br />
                        SALARY:{item.salary} <br />
                        <span className="postedoncolor">POSTED ON: {item.created_date}</span>
                      </div>
                      {item.status == 'SENT INTEREST' ?
                        <div className="imgsmallicons">
                          <span>
                            <img src={okimg} className="imgsmall" onClick={() => this.CompanyAcceptOrRejectRequest({ 'status': 'ACCEPTED', 'job_Post_Id': item.job_Post_Id })} />
                          </span>
                          <span>
                            <img src={notok} className="imgsmall" onClick={() => this.CompanyAcceptOrRejectRequest({ 'status': 'REJECTED', 'job_Post_Id': item.job_Post_Id })} />
                          </span>

                        </div>
                        : null
                      }

                      {item.status == 'ACCEPTED' ?
                        <div className="imgsmallicons">
                          <span>
                            <img src={okimg} className="imgsmall" />
                          </span>


                        </div>
                        : null
                      }
                      {item.status == 'REJECTED' ?
                        <div className="imgsmallicons">
                          <span>
                            <img src={notok} className="imgsmall" />
                          </span>
                        </div>
                        : null
                      }
                    </div>
                  </div>
                )
              })}



            </div>
            <div className="paginationalign">
              {totalDocuments != 0 ?
                <Pagination
                  totalRecords={totalDocuments}
                  pageLimit={0}
                  pageNeighbours={1}
                  onPageChanged={this.onPageChanged}
                />
                : null
              }
            </div>

          </div>
          <div className="col-md-6">
            {this.state.textresume ?
              <div className="cardcrd1">
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">

                      {/* <img src={resume} className="resume" /> */}
                      {this.iframeData}
                    </div>


                  </div>
                </div>

                <div className="row comppadtop">
                  <div className="col-md-12">
                    <table className="tablewidth">
                      <tbody>
                        <tr>
                          <td>
                            <div className="addamessage1 text-left">ADD A MESSAGE TO HIRING MANAGER</div>
                          </td>
                          <td >
                            <div className="addamessage2 addamessage3 text-right">
                              <div>POSTED ON: 16 JAN 2019 23:00</div>
                              <div>EXPIRY ON: 16 JAN 2019 23:00</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              : null
            }

            {this.state.videoresume ?
              <div className="cardcrd1">
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">

                      {/* <img src={videojdd} className="resume" /> */}
                      {this.videoPreview}
                    </div>


                  </div>
                </div>

                <div className="row comppadtop">
                  <div className="col-md-12">
                    <table className="tablewidth">
                      <tbody>
                        <tr>
                          <td>
                            <div className="addamessage1 text-left">ADD A MESSAGE TO HIRING MANAGER</div>
                          </td>
                          <td >
                            <div className="addamessage2 addamessage3 text-right">
                              <div>POSTED ON: 16 JAN 2019 23:00</div>
                              <div>EXPIRY ON: 16 JAN 2019 23:00</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              : null
            }
            {this.state.bot ?
              <div className="cardcrd1">
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">
                      <div className="row">
                        <div className="col-md-6 calendar-top">
                          <div className="row">

                            <div className="col-md-10">
                              <div className="scheduleaninterview">SCHEDULE AN INTERVIEW</div>
                            </div>
                            <div className="col-md-2">
                                                        <img src={botscreening} className="scheduleimg" />
                                                    </div>

                          </div>

                          <DatePicker
                            inline disabled
                            selected={this.state.date}
                            onChange={this.onChange}
                          />
                          <strong className="timefont">START TIME</strong>&nbsp;&nbsp;
                          <TimePicker disabled
                            onChange={this.onChangeTime}
                            value={this.state.time}
                          />
                          <strong className="timefont">END TIME</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                            <TimePicker disabled
                            onChange={this.onChangeEndTime}
                            value={this.state.end_time}
                          />

                          {/* <input type="text"
                            // onChange={this.handleChangemessage}
                            name="message"
                            className="form-control candidatetext1"
                            value={this.state.message} /> */}
                          <input type="text" name="message" disabled
                            onChange={this.handleChange} className="form-control candidatetext9"
                            value={this.state.message}></input>

                          {/* <img src={send} onClick={() => this.scheduleInterViewClick()} className="sendstyles" /> */}
                        </div>
                        <div className="col-md-6">
                        </div>


                      </div>

                      {/* <img src={botschedule} className="resume" /> */}

                    </div>


                  </div>
                </div>

                <div className="row comppadtop">
                  <div className="col-md-12">
                    <table className="tablewidth">
                      <tbody>
                        <tr>
                          <td>
                            <div className="addamessage1 text-left">ADD A MESSAGE TO HIRING MANAGER</div>
                          </td>
                          <td >
                            <div className="addamessage2 addamessage3 text-right">
                              <div>POSTED ON: 16 JAN 2019 23:00</div>
                              <div>EXPIRY ON: 16 JAN 2019 23:00</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              : null
            }

            {this.state.chatroom ?
              <div className="cardcrd1">
                <div className="row">
                  <div className="col-md-12">
                    <div className="resumetop">

                      <img src={chatroomm} className="resume" />
                    </div>


                  </div>
                </div>

                <div className="row comppadtop">
                  <div className="col-md-12">
                    <table className="tablewidth">
                      <tbody>
                        <tr>
                          <td>
                            <div className="addamessage1 text-left">ADD A MESSAGE TO HIRING MANAGER</div>
                          </td>
                          <td >
                            <div className="addamessage2 addamessage3 text-right">
                              <div>POSTED ON: 16 JAN 2019 23:00</div>
                              <div>EXPIRY ON: 16 JAN 2019 23:00</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              : null
            }
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
                              <img src={textjd} className="text_resume imgst" onClick={() => this.TextResume()} />
                            </label>
                            {/* <input type="file" name='file' onChange={(e) => this.onChangeTextDoc(e)} /> */}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>TEXT JD</span>
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
                      <img src={videojd} className="video_resume imgst1" onClick={() => this.VideoResume()} />
                    </label>
                    {/* <input type="file" name='file' onChange={(e) => this.onChangeVideoDoc(e)} /> */}
                  </div>
                  <span>VIDEO JD</span>
                </div>
              </div>


              <div className="mrleft">

                <div className="grbox">
                  <table className="tbmar">
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight marrght1">
                          <img src={botscreening} className="img-styles chatrm" onClick={() => this.BotSchedule()} />
                        </td>
                      </tr>
                      <tr>
                        <td className="marrght2">
                          <span>BOT SCHEDULE</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div className="mrleft">

                <div className="grbox">
                  <table>
                    <thead></thead>
                    <tbody>
                      <tr>
                        <td className="tdheight marrght1">
                          <img src={chatt} className="img-styles chatrm" onClick={() => this.ChatRoom()} />
                        </td>
                      </tr>
                      <tr>
                        <td className="marrght2">
                          <span>CHAT ROOM</span>
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
                        <td className="tdheight marrght">
                          <img src={institutionposts} className="img-styles chatrm6" />
                        </td>
                      </tr>
                      <tr>

                        <td className="marrght2">
                          <span>INSTITUTION POSTS</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div className="golivesubmit">

                <div className="golivebtn">
                  <button
                    disabled={this.goliveButton}
                    type="submit"
                    onClick={((e) => this.handleSubmit(e))}
                    className="btn btn-primary golive"
                  >
                    SEND CANDIDATE INVITE FOR CAMPUS HIRE
  </button>
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
    )
  }

}
function mapStateToProps(state) {
  const { companies } = state.authentication;
  return {
    companies
  };
}
const connectedCompaniesIntrested = withRouter(
  connect(mapStateToProps)(CompaniesIntrestedPage)
);
export { connectedCompaniesIntrested as CompaniesIntrestedPage };