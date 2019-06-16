import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import foldericon from "../images/foldericon.PNG";
import zynga from "../images/zynga.PNG";
import amazoncom from "../images/amazoncom.PNG";
import botscreenimg from "../images/botscreening.PNG";
import locationchat from "../images/chat.PNG";
import thok from "../images/thok.PNG";
import sharesmall from "../images/sharesmall.PNG";
import chatlight from "../images/chatlight.PNG";
import freelancer_campus from "../images/freelancer_campus.PNG";
import scheduleaninterview from "../images/scheduleaninterview.PNG";
import lock from "../images/lock.PNG";
import chat from "../images/chat.PNG";
import companyprofilesmall from "../images/companyprofilesmall.PNG";
import jobdescriptiondoc from "../images/jobdescriptiondoc.PNG";
import letterpad from "../images/letterpad.PNG";
import './ExploreFreelancersPage.scss';
import toastr from 'reactjs-toastr';
import { history } from "../_helpers";
import axios from 'axios';
import call from '../images/call.PNG';
import { APP_URLS } from '../_constants/application.url';
import Pagination from "../_constants/Pagination";
import Modal from 'react-awesome-modal';
import Moment from 'moment';
import send from '../images/send.PNG';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import moment from 'moment';

class ExploreFreelancersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freelancerCampus: [],
      currentFreeLancerData: [],
      success: "",
      error: "",
      institution_post_id: "",
      job_Post_Id: "",
      currentPage: null,
      totalPages: null,
      scheduleInterview: false,
      time: '',
      endtime: '',
      message: '',
      // date: new Date(),
      startDate: new Date()
    }
    this.FreelancerAndCampusHires = this.FreelancerAndCampusHires.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.scheduleInterviewClick = this.scheduleInterviewClick.bind(this);
    this.handleChangemessage = this.handleChangemessage.bind(this);
  }
  // onChange = date => this.setState({ date })
  onChange = time => this.setState({ time })
  onChangeEndTime = endtime => this.setState({ endtime })
  componentDidMount() {

    this.getFreelancersAndCampus()
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  openModal() {
    this.setState({
      visible: true
    });
  }
  scheduleInterviewClick() {
    axios.post(APP_URLS.scheduleInterviewForInstitutionPost,
      {
        'institution_post_id': this.state.institution_post_id, 'job_Post_Id': this.props.location.state.job_post_id,
        'scheduled_date': moment(this.state.startDate).format('YYYY-MM-DD').toString(),
        // 'scheduled_time':moment(this.state.time).format('HH:mm:ss').toString(),
        'scheduled_time': moment(this.state.time, "h:mm A").format("hh:mm A"),
        'end_time': moment(this.state.endtime, "h:mm A").format("hh:mm A"),
        'message': this.state.message
      }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
      .then((res) => {

        console.log('schedule Interview:', res)
        if (res.data.status == 200) {
          let sucessmsg = res.data.message
          this.setState({
            success: sucessmsg
          })
          this.openModal();

        }
        if (res.data.status == 205) {
          let errormsg = res.data.message
          this.setState({
            error: errormsg
          })
          this.openModal();

        }

      })
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e)
      })
  }
  closeModal() {
    this.setState({
      visible: false
    });
  }
  scheduleInterview(data) {
    console.log('interviewdata....', data)
    this.setState({ "scheduleInterview": true,"startDate":data.date,"message":data.message,"institution_post_id":data._id
    
    })
    // let currentState = this.state
    // currentState['institution_post_id'] = data._id

  }
  handleChangemessage(event) {
    // const { name, value } = event.target.value;
    // this.setState({ message: value });
    this.setState({
      [event.target.name]: event.target.value
    })

  }
  FreelancerAndCampusHires(id) {
    history.push('/dashboard/FreelancersAndCampusHires', {
      'candidate_id': id,
      'job_post_id': this.props.location.state.job_post_id,
      'entity_logo': this.props.location.state.entity_logo

    })
  }

  ThumbClick(data) {
    if (this.props.location.state != undefined) {
      if (data._id) {
        axios.post(APP_URLS.sendRequestToInstitution, {
          'institution_post_id': data._id, 'job_Post_Id': this.props.location.state.job_post_id
        }, {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('user')).data.token
            }
          })
          .then((res) => {
            console.log(res)

            if (res.data.status == 205) {
              let errormsg = res.data.message
              this.setState({
                error: errormsg

              })
              this.openModal();
            }
            else if (res.data.status == 400) {
              let errormsg = res.data.message
              this.setState({
                error: errormsg

              })
              this.openModal();
            }
            else if (res.data.status == 200) {

              let sucessmsg = res.data.message
              this.setState({
                success: sucessmsg
              })
              this.openModal();
            }


          })
          .catch(function (e) {
            console.log('ERROR ', e);
          })
      }
    } else {
      this.setState({
        error: "error"
      })
      this.openModal();
    }
  }
  ThumbClickUsed() {
    let errormsg = 'Already interest sent.'
    this.setState({
      error: errormsg
    })
    this.openModal();
  }
  onPageChanged = data => {
    const { freelancerCampus } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentFreeLancerData = freelancerCampus.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentFreeLancerData, totalPages });
  };
  getFreelancersAndCampus() {
    debugger
    let job_post_id = this.props.location.state.job_post_id
    axios.get(APP_URLS.getFreelancersAndCampusHires, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {

        console.log('explore........', res)
        let institution_post_id = res.data.data._id
        this.setState({
          institution_post_id: institution_post_id
        })
        //freelancerCampus = res.data.data;
        if (res.data && res.data && res.data.data && res.data.data.length > 0) {
          const freelancerCampus = res.data.data.map(x => {
            var freelancerdocmnet = x;
            if (freelancerdocmnet.salary_range) {
              freelancerdocmnet.salary_range = x.salary_range.from + '-' + x.salary_range.to;
            }
            if (freelancerdocmnet.available_period) {
              freelancerdocmnet.available_period = Moment(x.available_period.from).format('DD/MM/YYYY') + '-' + Moment(x.available_period.to).format('DD/MM/YYYY');
            }

            if (freelancerdocmnet.interested_companies != undefined) {
              if (freelancerdocmnet.interested_companies.length != 0) {
                freelancerdocmnet.interested_companies.forEach(x => {
                  freelancerdocmnet.date=x.interview_details.date;
                  freelancerdocmnet.time = x.interview_details.time;
                  freelancerdocmnet.message = x.interview_details.message

                  if (x.job_Post_Id == job_post_id) {
                    freelancerdocmnet.status = x.status;
                  }
                })
              } else {
                freelancerdocmnet.status = 'empty';
              }
            }

            // if(freelancerdocmnet.interested_companies.job_Post_Id==this.props.location.state.job_post_id){
            //   freelancerdocmnet.status=
            // }


            return freelancerdocmnet;
          })
          this.setState({ freelancerCampus });
        }
      }
      )
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e);
      })
  }
  render() {
    const { ExploreFreeLancer } = this.props;
    const { freelancerCampus, currentFreeLancerData, currentPage } = this.state;
    const totalDocuments = freelancerCampus.length;
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]

    return (
      <div id="explorefreelancer">
        <div className="row">
          <div className="col-md-12">
            <h3 className="title-name">
              <b>EXPLORE FREELANCERS/CAMPUS HIRES</b>
              <br />
              {/* POST ID:{this.props.location.state.job_post_id}
              EXPLORE FREELANCERS/CAMPUS HIRES<br></br> */}

            </h3>
            <h6 className="jobpostid">
              POST ID:{this.props.location.state.job_post_id}
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-12">
                <div className="marcol">
                  <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4">

                      <input
                        type="text"
                        className="search-box"
                        placeholder="SEARCH"
                      />

                    </div>
                  </div>
                  {freelancerCampus.length > 0 ?
                    <div className="explorefreelance">
                      {currentFreeLancerData.map((item, index) => {
                        console.log('selectedExploredata...', item)
                        return (

                          <div key={index + 1} className="row martop1">

                            <div className="col-md-3">
                              <div className="ratingexplore">
                                &#9733;&#9733;&#9734;&#9734;&#9734;
                        </div>
                              <img src={lock} height='50px' />
                            </div>
                            <div className="col-md-9 paddleft">
                              <div className="jobcompanyy">
                                {item.salary_range ?
                                  <div>
                                    EXPERT: {item.skills}<br />
                                    AVAILABILITY: {item.job_type}<br />
                                    FUNCTION: {item.function}<br />
                                    LOCATION: {item.country}<br />
                                    PAY:{item.salary_range}<br />
                                  </div>
                                  : null}
                                {item.available_period ?
                                  <div>
                                    BATCH NAME: {item.batch_name}<br />
                                    AVAILABILITY: {item.available_period}<br />
                                    EXPIRY: {Moment(item.expiry_date).format('DD/MM/YYYY')}<br />

                                  </div>
                                  : null}

                                <span className="updatedon1">UPDATED ON:{Moment(item.updated_date).format("DD-MMM-YYYY HH:mm:ss")}</span>
                              </div>
                              <div className="iconstyles">
                                {item.available_period ?
                                  <span><img className="iconmarleft" onClick={() => this.FreelancerAndCampusHires(item._id)} src={call} /></span>
                                  : null
                                }

                                {item.status == 'empty' ?
                                  <span><img className="iconmarleft" onClick={() => this.ThumbClick(item)} src={thok} /></span>
                                  : null
                                }
                                {item.status == 'SENT INTEREST' ?
                                  <span>
                                    <img className="iconmarleft" src={thok} onClick={() => this.ThumbClickUsed()} />
                                  </span>
                                  : null
                                }

                                {item.status == 'REJECTED' ?
                                  <span className="iconmarleft">
                                    <i className="fa fa-thumbs-down"></i>
                                  </span>
                                  : null
                                }

                                {item.status == 'ACCEPTED' ?
                                  <span className="iconmarleft">
                                    <i className="fa fa-thumbs-up"></i>
                                  </span>
                                  : null
                                }
                                {/* <span><img className="iconmarleft" src={sharesmall} /></span> */}
                                <span><img className="iconmarleft" src={chatlight} /></span>


                                {item.available_period ?
                                    <span><img className="iconmarleft" onClick={() => this.scheduleInterview(item)} src={call} /></span>
                                  : null
                                }


                              </div>
                            </div>

                          </div>

                        )
                      })}

                    </div>
                    : null
                  }
                  {freelancerCampus.length == 0 ?
                    <div className="explorefreelance">

                      <div className="row martop1">

                        <div className="col-md-3">
                          <div className="ratingexplore">
                            &#9733;&#9733;&#9734;&#9734;&#9734;
                    </div>
                          <img src={lock} height='50px' />
                        </div>
                        <div className="col-md-9 paddleft">
                          <div className="jobcompanyy">
                            EXPERT: <br />
                            AVAILABILITY: <br />
                            FUNCTION: <br />
                            LOCATION: <br />
                            PAY:<br />
                            <span className="updatedon1">UPDATED ON:</span>
                          </div>
                          <div className="iconstyles">
                            <span><img className="iconmarleft" src={thok} /></span>
                            <span><img className="iconmarleft" src={sharesmall} /></span>
                            <span><img className="iconmarleft" src={chatlight} /></span>
                          </div>
                        </div>

                      </div>
                    </div>
                    : null
                  }

                </div>
                <div className="explorepagination">
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
            </div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-6 ">
                <div className="marcol1">
                  <div className="row">
                    <div className="col-md-9 autoalerts-title">
                      SET BOT AUTO-ALERTS:
                    </div>
                    <div className="col-md-3">
                      <img src={botscreenimg} width="40px" height="40px" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">SKILLS</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">LOCATION</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">
                      MINIMUM WORK TIME:
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">WORK PERIOD</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">TRAVEL</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">PAY RANGE</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">
                      JOINING AVAILABILITY BT DATE:
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">QUILIFICATION:</div>
                    <div className="col-md-4"></div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 autoalerts-style">PREFERENCES:</div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
                <div className="row marrow">
                  <div className="col-md-12 searchlabels">ADD KEYWORD SEARCH LABELS:<br></br></div>
                </div>
              </div>
              <div className="col-md-6">
                <img src={freelancer_campus} width="270px" height="250px" />
              </div>
            </div>

            <div className="row row-styles">
              <div className="col-md-6 chat-style">
                {/* <div className="row">
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
                </div> */}

                {/* <div className="row martopp">
                  <div className="col-md-10 text-center viewchat">
                    VIEW CHAT MESSAGES
                  </div>
                  <div className="col-md-2">
                    <img src={sharesmall} className="" />
                  </div>
                </div> */}

                {/* <div className="row">
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
                </div> */}
              </div>
              <div className="col-md-6">
                {this.state.scheduleInterview == true ?
                  // <img src={scheduleaninterview} width="270px" height="350px" />
                  <div>
                    {/* <DateTimePicker
                              onChange={this.onChange}
                              value={this.state.date}
                            /> */}
                    {/* <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      /> */}
                    <DatePicker
                      inline
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                    /><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    <strong className="timefont">START TIME</strong>&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      onChange={this.onChange}
                      value={this.state.time}
                    /><br></br>
                    <strong className="timefont">END TIME</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TimePicker
                      onChange={this.onChangeEndTime}
                      value={this.state.endtime}
                    />
                    <input type="text"
                      onChange={this.handleChangemessage}
                      name="message"
                      className="form-control candidatetext1"
                      value={this.state.message} />
                    <img src={send} onClick={() => this.scheduleInterviewClick()} className="sendstyles1" />
                  </div>
                  : null
                }
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
              {this.state.success ?
                <h4 className="text-center popmessage">{this.state.success}</h4>
                : null
              }
              {this.state.error ?
                <p className="text-center popmessagered">{this.state.error}</p>
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
  const { ExploreFreeLancer } = state.authentication;
  return {
    ExploreFreeLancer
  };
}

const connectedMyProfilePage = withRouter(
  connect(mapStateToProps)(ExploreFreelancersPage)
);
export { connectedMyProfilePage as ExploreFreelancersPage };