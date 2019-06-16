import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
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
import { Editor } from '@tinymce/tinymce-react';
import chatt from '../images/chat.PNG';
import chatroom from '../images/chatroomm.PNG';
import letterpad from '../images/letterpad.PNG';
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { APP_URLS } from '../_constants/application.url';
import axios from 'axios';
import { Player } from "video-react";
//import DateTimePicker from 'react-datetime-picker';
import Pagination from "../_constants/Pagination";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import './FreelancersAndCampusHires.scss';
class FreelancersAndCampusHiresPage extends Component {
  successMeg="";
  errorMeg="";
  constructor(props){
    super(props);
    this.state={
      visible: false,
      candidateData:[],
      staticimg:true,
      textResume:false,
      videoResume:false,
      // date: new Date(),
     chatRoom:false,
     scheduleInterview:false,
     initialOffer:false,
     date: new Date(),
     time: '',
     message: '',
     letter:"",
     entity_logo:""


    }
    this.textResume=this.textResume.bind(this);
    this.videoResume=this.videoResume.bind(this);
    this.chatRoom=this.chatRoom.bind(this);
    this.scheduleInterview=this.scheduleInterview.bind(this);
    this.handleReviseOffer=this.handleReviseOffer.bind(this);
    
    //this.handleClick=this.handleClick.bind(this)
  }
  onChange = date => this.setState({ date })
  onChangeTime = time => this.setState({ time })
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
  // onChange = date => this.setState({ date })
componentDidMount(){
  this.getCandidatesByInstitutionId();
  

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
      // if(this.state.position===user.user)
      return "#7feeef";
  }
  return "";
};
handleEditorChange = (letter) => {
  // console.log('Content was updated:', e.target.getContent());
  this.setState({
      // 'letter':e.target.getContent()
      letter:letter
  })
}
handleReviseOffer(){
  axios.post(APP_URLS.initiateOfferForInstitutionCandidate,{
    "_id": this.state._id,
    "offer_letter": this.state.letter
}, {
    headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
    }
})
    .then((res) => {
        console.log('view job applicants data', res)
        if(res.data.code == 200){
          this.successMeg = res.data.data.status
          this.openModal()
        }
    })
    .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e);
    })
}
getCandidatesByInstitutionId() {
  let jobpostid=this.props.location.state.job_post_id;
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
        if(res.data.status==205){
          alert('no data found')
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
textResume(){
  if(this.state.text_resume){
    let filePath = APP_URLS.getUploadedFile + '/' + this.state.text_resume;
    console.log('filepath:', filePath)
    this.iframetext_resume = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath} className="job-instance-file-view"></iframe>
    this.setState({
      staticimg:false, textResume:true, videoResume:false, chatRoom:false, scheduleInterview:false,initialOffer:false,
    })
  }
  else{
    //alert('error')
    this.errorMeg="please select the candidate"
    this.openModal();
  }
}
videoResume(){
  if(this.state.video_resume){
    this.videoResumePreview = <Player src={APP_URLS.getUploadedFile + '/' + this.state.video_resume} playInline />;
    this.setState({
      staticimg:false, textResume:false, videoResume:true, chatRoom:false, scheduleInterview:false,initialOffer:false,
    })
  } 
  else{
    //alert('error')
    this.errorMeg="please select the candidate"
    this.openModal();
  }
}
chatRoom(){
  if(this.state.handleClick_id){
  this.setState({
    staticimg:false, textResume:false, videoResume:false, chatRoom:true, scheduleInterview:false,initialOffer:false,
  })
}
else{
  //alert('error')
  this.errorMeg="please select the candidate"
  this.openModal();
}
}
initialOffer(){
  
  if(this.state.handleClick_id ){
    if( this.state.interview_status == 'SELECTED'){
  this.setState({
    staticimg:false, textResume:false, videoResume:false, chatRoom:false, scheduleInterview:false,initialOffer:true,
  })
}
else{
  this.errorMeg="iNTERVIEW NOT SELECTED";
  this.openModal();
}
}
else{
  //alert('error')
  this.errorMeg="please select the candidate";
  this.openModal();
}
}

scheduleInterview(){
  if(this.state.handleClick_id  ){
    if(this.state.phase == 'INTERVIEW'){
  this.setState({
    staticimg:false, textResume:false, videoResume:false, chatRoom:false, scheduleInterview:true,initialOffer:false,
  })
}else{
  this.errorMeg='Interview is not scheduled';
  this.openModal();
}

}
else{
  //alert('error')
  this.errorMeg="please select the candidate";
  this.openModal();
}
}

handleClick(event, data) {
  console.log('freelancerGetData..',data)
  event.preventDefault();
  let currentState = this.state
  currentState['text_resume']=data.text_resume;
  currentState['video_resume']=data.video_resume;
  currentState['handleClick_id'] = data._id;
  currentState['candidate_name'] = data.candidate_name
  let filterData = data.Application.filter(x => x.job_Post_Id == this.props.location.state.job_post_id)[0];
  console.log('filterdats:',filterData);
  if(filterData && filterData!=undefined){
  currentState['_id']=filterData._id;
  }
  if(filterData && filterData!=undefined && filterData.interview_Details){
    currentState['date'] = filterData.interview_Details.interview_scheduled_date;
    currentState['time'] = filterData.interview_Details.interview_scheduled_time;
    currentState['message'] = filterData.interview_Details.message;
    currentState['phase'] = filterData.phase;
    currentState['interview_status'] = filterData.interview_Details.status;
  }
  if(filterData && filterData!=undefined && filterData.offer_Details){
    currentState['letter']=filterData.offer_Details.offer_letter;
    currentState['offer_status']=filterData.offer_Details.status;
    currentState['phase'] = filterData.phase;
  }
 
  currentState['name']=data.candidate_name
  this.toggle(data._id)
}
accept(status) {
  debugger
  let interview_status = status;
  if (status == 'SELECTED') {
      axios.post(APP_URLS.updateInterviewOrOfferStatus,
          {
              '_id': this.state._id, 'phase': this.state.phase, 'interview_status': status
          },

          {
              headers: {
                  Authorization: JSON.parse(localStorage.getItem('user')).data.token
              }
          })
          .then((res) => {
              console.log(res)
              if(res.data.code == 204){
                this.errorMeg=res.data.message
                this.openModal()
              }
              else if(res.data.code == 200){
                this.successMeg = res.data.message
                this.openModal()
              }
              // this.successMeg = res.data.data.status;
              // // this.setState({
              // //   success: successMeg
              // // })
              // this.openModal();
              



          })
          .catch(function (e) {
              console.log('ERROR ', e);
          })
  }

 
}
decline(status) {
  debugger
  let interview_status = status;
  if (status == 'REJECTED') {
  axios.post(APP_URLS.updateJobApplicationStatus, {

      '_id': this.state._id, 'phase': this.state.phase, 'interview_status': status
  }, {
          headers: {
              Authorization: JSON.parse(localStorage.getItem('user')).data.token
          }
      })
      .then((res) => {
          console.log(res)
          this.successMeg = res.data.data.status;
              // this.setState({
              //   success: successMeg
              // })
              this.openModal();


      })
      .catch(function (e) {
          console.log('ERROR ', e);
      })
  }
}



    render() {
        const { FreelancersAndCampus} = this.props;
       return (
          <div id="freelancercampus">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="title-name">
                      FREELANCER AND CAMPUS HIRES
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="row">
                    <div className="col-md-6">
    
                    </div>
                    <div className="col-md-6">
                      <div className="input-group srchbyname">
                        <input
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
                <div>
                {this.state.candidateData.map((item, index) => {
                        console.log('candidateData...', item)
                        return (
                        <div key={index+1} className="row martop"  onClick={((e) => this.handleClick(e, item))} style={{ background: this.myColor(item._id) }}>
                          <div className="col-md-3 col-sm-12">
                            {/* <img src={propic} className="img-styles" /> */}
                            <img className="img-styles" src={APP_URLS.getUploadedFile + '/' + this.state.entity_logo}></img>
                          </div>
                          <div className="col-md-9 col-sm-12">
    
                            <div className="jobcompany">
                              NAME:{item.candidate_name} <br />
                              MOBILE:{item.mobile}<br />
                              EMAIL ID:{item.email} <br />
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
                      })}                         
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
                    
                  {this.state.textResume  ?
                    <div className="row">
                      <div className="col-md-12">
                      <div className="col-md-12 selectrejmar">
                                            <a onClick={() => this.accept('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.decline('REJECTED')} className="select red">REJECT</a>
                                           
                                        </div>
                        <div className="resumetop">
                         
                          {this.iframetext_resume}
                        
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
                  {this.state.videoResume ?
                    <div className="row">
                      <div className="col-md-12">
                      <div className="col-md-12 selectrejmar">
                                            <a onClick={() => this.accept('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.decline('REJECTED')} className="select red">REJECT</a>
                                           
                                        </div>
                        <div className="resumetop">
                         
                          {this.videoResumePreview}
                         
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
    
                  {this.state.chatRoom  ?
                    <div className="row">
                      <div className="col-md-12">
                      <div className="col-md-12 selectrejmar">
                                            <a onClick={() => this.accept('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.decline('REJECTED')} className="select red">REJECT</a>
                                           
                                        </div>
                        <div className="resumetop">
                          <img src={chatroom} className="chatroombig" />
                        </div>
                      </div>
                    </div>
                    : null
                  }
                  {this.state.scheduleInterview  ?
                    <div className="row">
                      <div className="col-md-12">
                        {/* <div className="col-md-6">
                                            <a onClick={() => this.accept('SELECTED')} className="select green">SELECT</a>
                                            <a onClick={() => this.decline('REJECTED')} className="select red">REJECT</a>
                                           
                                        </div> */}
                        <div className="row">
                        <div className="col-md-3">

                        </div>
                          <div className="col-md-6 dt">
                            <div className="row">
                              <div className="col-md-10">
                                <div className="scheduleaninterview1">{this.state.interview_status}</div>
                              </div>
                              <div className="col-md-2">
                                <img src={botscreening} className="scheduleimg1" />
                              </div>
                            </div>
                            <div className="candidatetext1">{this.state.candidate_name}</div>
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
                          
                            <textarea type="text" name="message" 
                              className="form-control candidatetext1" value={this.state.message}
                              ></textarea>
                            <img src={send} className="sendstyles1" />
                          </div>
                           <div className="col-md-3">
                          
                          </div> 
                        </div>
    
                      </div>
                    </div>
                    : null
                  } 
    
    {this.state.initialOffer ?
                                <div>
                                    <div className="row">
                                </div>
                                    
                                    <div className="row postexpiry postexpiry1 paddrightt">
                                       
                                        <div className="col-md-10 padrightt">
                                            <Editor
                                            value={this.state.letter}
                                                onEditorChange={this.handleEditorChange}
                                            />
                                        </div>    
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 reviseoffer">
                                                <a className="select blue" href="javascript:void(0)" onClick={this.handleReviseOffer}>REVISE OFFER</a>
                                                <a className="select canceloffer">CANCEL OFFER</a>
                                            </div>
                                            </div>

                                    </div>
  : null}

                  
                </div>
    
                <div className="myprofileboxleft marbottom">
                  <div className="mrleft">
                    <div className="grbox">
    
                      <table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight">
                              <div className="image-upload" onClick={()=>this.textResume()}>
                                <label>
                                  <img src={textjd} className="text_resume imgst"  />
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
                      <div className="image-upload"  onClick={()=>this.videoResume()}>
                        <label>
                          <img src={videojd} className="video_resume imgst1" />
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
                        <tbody  onClick={()=>this.chatRoom()}>
                          <tr>
                            <td className="tdheight marrght1">
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
                        <tbody  onClick={()=>this.scheduleInterview()}>
                          <tr>
                            <td className="tdheight marrght1" >
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
                        <tbody onClick={()=>this.initialOffer()}>
                          <tr>
                            <td className="tdheight marrght">
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
    const { FreelancersAndCampus } = state.authentication;
    return {
        FreelancersAndCampus
    };
}

const connectedFreelancersAndCampus = withRouter(
    connect(mapStateToProps)(FreelancersAndCampusHiresPage)
);
export { connectedFreelancersAndCampus as FreelancersAndCampusHiresPage };
