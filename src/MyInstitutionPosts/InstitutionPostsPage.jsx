import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../MyInstitutionPosts/InstitutionPostsPage.scss";
import Download from '../images/download.png';
import { Table } from "react-bootstrap";
import Moment from 'moment';
import uploadimg from "../images/upload-btn.PNG";
import textjd from '../images/textjd.PNG';
import videojd from '../images/videojd.PNG';
import table1 from '../images/table1.PNG';
import uploadbtn from '../images/uploadbtn.PNG';
import companiesinterest from '../images/companiesinterest.PNG';
import { history } from "../_helpers";
import botscreening from '../images/botscreening.PNG';
import viewjob from '../images/viewjob.PNG';
import FilterResults from "react-filter-search";
import jobdesc from '../images/jobdesc.PNG';
import { APP_URLS } from '../_constants/application.url';
import Modal from 'react-awesome-modal';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../_constants/Pagination";

class InstitutionPostsPage extends Component {
    
    
    successMeg="";
    errorMeg="";
  constructor(props){
   
    super(props)
    this.state = {
      InstitutionPost: {
        batch_name: "",
        bulk_data_file: "",
        institution_id:"",
        from:new Date(),
        to:new Date(),
        success:"",
        error:""
      },
      submitted: false,
      visible:false,
      filepreview:false,
      staticImg:true,
      bot:false,
      institutionData:[],
            currentInstitutionPostData: [],
            currentPage: null,
            totalPages: null,
       startDate: new Date(),
    //   endDate: new Date(),
      
      id:"",
      batchName:"",
      bulk_data:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formData = new FormData();
    this.getInstitutionPosts =this.getInstitutionPosts.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.search = this.search.bind(this);
    this.filepreview = this.filepreview.bind(this);
    this.bot= this.bot.bind(this);
  }
  onChange = date => this.setState({ date })
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
  onPageChanged = data => 
  {
    const { institutionData } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentInstitutionPostData = institutionData.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentInstitutionPostData, totalPages });
};

  filepreview(){
      
    let filePath = '';
        if(this.state['bulk_data_file']){
       
        if (this.state['bulk_data_file']) {
          let filePath = APP_URLS.getUploadedFile + '/' + this.state['bulk_data_file'];
          console.log('filePath:',filePath)
          this.iframeExcel = <iframe src={"http://view.officeapps.live.com/op/view.aspx?src=" + filePath}
            className="file-view"></iframe>
        }else{
            this.errorMeg = 'Please Select Institution Post ID';
            this.openModal();
        }
      this.setState({
filepreview:true,bot:false,staticImg:false
      })
    }
    else{
        this.errorMeg = 'Please Select Institution Post ID';
            this.openModal();
    }

  }
  bot(){

    this.setState({
        filepreview:false,bot:true,staticImg:false
              })    
  }
  handleChangeFromDate(date) {

    this.setState({
        from: date,
     
    });
  }
  handleChangeToDate(date) {
    this.setState({
        to:date
    });
  }
  search(event) {
    const { value } = event.target;
    let state = this.state;
    state['searchText'] = value;
    this.setState(state);
  };
  selectInstitution(data){
      debugger
      this.staticImg=false;
      console.log('mydata....',data)
      let currentState=this.state;
      currentState['InstitutionPost'] = data;
      currentState['from'] = data.available_period.from;
      currentState['to'] = data.available_period.to;
      currentState['_id']=data._id;
      currentState['bulk_data_file']=data.bulk_data_file;
      currentState['post_on']=data.created_date;
      currentState['expiry_on']=data.expiry_date;
      this.setState({currentState,id:data._id,batchName:data.batch_name,
        Institution_post_id:data.Institution_post_id})
      this.toggle(data._id)
      currentState['institute_id']= data._id;
  
  }
  myColor = (selectedinstitution) => {
    if (this.state.active === selectedinstitution) {
      // if(this.state.position===user.user)
      return "#caf6ec";
    }
    return "";
  };
  toggle = (selectedinstitution) => {
    if (this.state.active === selectedinstitution) {
      this.setState({ active: null })
    } else {
      this.setState({ active: selectedinstitution })
    }
  };

  viewposts(){
  
      if(this.state.institute_id){
      history.push('/dashboard/cadidatedata',{
          candidate_id:this.state.id,
          batchName:this.state.batchName,
          job_post_id:this.state.job_post_id
      })
    }else{
        this.errorMeg = 'Please Select Institution Post ID';
            this.openModal();
    }
  }
  // document upload
  onChangeBulkdata(e) {
      debugger
    this.bulk_data_file = e.target.files;
    console.warn('data file:', this.bulk_data_file);
    this.formData.append('bulk_data_file', e.target.files[0]);
    let reader = new FileReader();
    let bulakData=this.bulk_data_file[0].name;
    this.setState({
        'bulk_data':bulakData
    })
    reader.onload = (e) => {
      console.warn('img Date:', e.target.result);
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { InstitutionPost } = this.state;
    this.setState({
      InstitutionPost: {
        ...InstitutionPost,
        [name]: value,
        
      },
  //    from:this.state.InstitutionPost.form

    });

  };

  componentDidMount(){
     
   this.getInstitutionPosts()

  }

 

  getInstitutionPosts(){
      debugger
    axios.get(APP_URLS.getAllInstitutionPosts, {
      headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
  })
      .then((res) => {
          console.log(res)
            let currentState=this.state;
          if (res.data.data && res.data.data.length>0 ) {
              currentState.institutionData = res.data.data.map(x => {
                   let institution = x
                  return institution;
              })

              this.setState(currentState);;
          }
      })
      .catch(function (e) {
          console.log('ERROR ', e);
      })
  }

  handleSubmit(){
      debugger
      this.setState({ submitted: true });
   const { InstitutionPost } = this.state;
    this.formData.append('available_period',JSON.stringify({'from':this.state.InstitutionPost.from , 'to':this.state.InstitutionPost.to}));
    this.formData.append('batch_name',this.state.InstitutionPost.batch_name);
     this.formData.append('institution_id',this.props.location.state.id,);
    this.formData.forEach(x=>{
      console.log(x);
    })
if(InstitutionPost.batch_name && InstitutionPost.from && InstitutionPost.to){
        axios.post(APP_URLS.addInstitutionPost, this.formData, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('user')).data.token
            }
        })
            .then((res) => {
                console.log('initial offer:', res)
                if (res.data.status == 200 ) {
                    this.getInstitutionPosts()
                    this.successMeg = res.data.message;
                    this.openModal();
                  } else if(res.data.status == 400){
                    this.errorMeg =res.data.error;
                    this.openModal();
                  }
            })
            .catch((e)=>{
                console.log('ERROR ', e);
                this. errorMeg = 'Internal Server Error'
                this.openModal();
           
                
            })
        }
        else{
            this.errorMeg = 'please fill the details';
            this.openModal(); 
        }
  }

  companyinterest(){
    if(this.state.institute_id){
      history.push('/dashboard/companyintrested',{
          'institution_post_id':this.state._id
      })
    }else{
        this.errorMeg = 'Please Select Institution Post Id';
        this.openModal();
    }
  }
    render() {
        const { InstitutionPosts } = this.props;
        const { submitted, InstitutionPost,institutionData,currentPage,currentInstitutionPostData} = this.state;
        const totalDocuments = institutionData.length;
        
        return (
          <div id="institutionposts">
          <h3 className="title-name">
                          MY INSTITUTION POSTS
                      </h3>
          <form name="form">
              <div className="row paddingleftzero">
                  <div className="col-md-6">
                      <div className="row ">
                          <div className="col-md-10">
      
                              <div className="form-group">
                              <div className={'form-group' + (submitted && !InstitutionPost.batch_name ? ' has-error' : '')}>
                                  <label className="graycolor">BATCH NAME</label>
                                  <input type="text"  autoComplete='off' value={InstitutionPost.batch_name.toUpperCase()} name="batch_name" onChange={this.handleChange} className="form-control inputstyle1" placeholder="NAME" />
                                  {submitted && !InstitutionPost.batch_name &&
                            <div className="help-block">batch_name is required</div>
                          }
                                </div>
                              </div>
      
                          </div>
                          <div className="col-md-2">
      
                          </div>
                      </div>
      
                      <div className="row">
                          <div className="col-md-10 posrelative">
      
                              <div className="form-group">
                              
                                  <label className="graycolor">Candidate Availability Period</label>
      
                                  <div className="input-group-append1">
                                      <button className="btn btn-secondary calendarstyles" type="button">
                                          {/* <i className="fa fa-calendar" aria-hidden="true"></i> */}
                                      </button>
                                  </div>
                              </div>
      
                          </div>
                          <div className="col-md-2">
      
                          </div>
                      </div>
                      <div className="row">
      
                          <div className="col-md-4">
                            <div className={'form-group' + (submitted && !InstitutionPost.from ? ' has-error' : '')}>
                              {/* <input type="date" name='from' value={InstitutionPost.from} name="from" onChange={this.handleChange} className="form-control" placeholder="From DD/MM/YYYY" /> */}
                        

                            <DatePicker
                            value={InstitutionPost.from}
                            selected={this.state.from}
                            onChange={this.handleChangeFromDate}
                            placeholder="From date"
                            minDate={new Date()}
                          />
                                {submitted && !InstitutionPost.from &&
                            <div className="help-block">From date is required</div>
                          }
                          </div>
                          </div>
                          <div className="col-md-4">
                            <div className={'form-group' + (submitted && !InstitutionPost.to ? ' has-error' : '')}>
                          <DatePicker
                            value={InstitutionPost.to}
                            selected={this.state.to}
                            onChange={this.handleChangeToDate}
                            placeholder="To date"
                            minDate={new Date()}
                          />
                              
                              </div>
                              {submitted && !InstitutionPost.to &&
                            <div className="help-block">To date is required</div>
                          }
                          </div>
      
                      </div>
                      <br/>
                      {this.state.bulk_data_file ?
                      <div className="row">
                          <div className="col-md-6">
                              <div className="form-group">
                                  <div className="form-group">
                                      <button className="btnExcel" type="button">DOWNLOAD STD EXCEL FORMAT FOR BULK DATA
      
                                      </button>
      
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-2">
                         
                          <a href={APP_URLS.getUploadedFile + '/' + this.state.bulk_data_file}>
                          <img className="download" height="30px" width="30px" src={Download}></img>
                              </a>
                          </div>
                          <div className="col-md-4">
      
                          </div>
                      </div>
        :null
    }
                      <div className="row">
                          <div className="col-md-6">
                              <div className="form-group">
                                  <div className="form-group">
                                      <button className="btnExcel1" type="button">UPLOAD EXCEL WITH CANDIDATE BULK DATA
      
                                      </button>

                                      {this.state.bulk_data}
      
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-2">
                         
                              <div onSubmit={this.onFormSubmit} className="image-upload imgup">
                                  <label>
                                      {/* <img src="http://goo.gl/pB9rpQ" /> */}
                                      <img className="download" height="30px" width="30px" src={uploadimg} className="uploadadd" />
                                  </label>
                                 
                                  <input type="file" name='fileDoc' id="file-input" className="fileUpload" onChange={(e)=> this.onChangeBulkdata(e)} />
                                 
                              </div>
                              {/* <img className="download" height="30px" width="30px" src={uploadimg}></img> */}
                          </div>
                          <div className="col-md-4 text-right">
      
                              <button type="button" className="btn btn-primary golive2" onClick={()=> this.handleSubmit()}>GOLIVE
      
                              </button>
      
                          </div>
                      </div>
      
                      <hr></hr>
                      <div className="row">
                          <div className="col-md-6">
                              <b className="viewalljobposts">VIEW ALL  POSTS</b>
                          </div>
                          <div className="col-md-6">
                              <div className="input-group">
                                  <input 
                                //   value={value}
                                  onChange={this.search}
                                  type="text"
                                  autoComplete='off'
                                  value={this.state.search}
                                  type="text" className="form-control" placeholder="Search this blog" />
                                  <div className="input-group-append">
                                      <button className="btn btn-secondary" type="button">
                                          <i className="fa fa-search" />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <Table bordered hover responsive striped className="tablemain">
                          <thead>
      
                              <tr>
                                  <th>DATE</th>
                                  <th>INSTITUTION POST ID</th>
                                  <th>BATCH NAME</th>
                                  <th>&nbsp;</th>
      
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.currentInstitutionPostData
                               .filter(x => {
                                console.log("x value is ", x)
                                if (this.state.searchText)
                                    return (
                                        x._id
                                            .toLowerCase()
                                            .includes(
                                                this.state.searchText.toLowerCase()
                                            ) ||
                                        x.batch_name
                                            .toLowerCase()
                                            .includes(
                                                this.state.searchText.toLowerCase()
                                            ) ||
                                            x.institution_id
                                            .toLowerCase()
                                            .includes(
                                                this.state.searchText.toLowerCase()
                                            ) 
                                        
                                    );

                                else
                                    return x
                            })
                              .map((item, index) => { console.log('institution....', item) 
                              return (
                              <tr onClick={(e)=>this.selectInstitution(item)} style={{ background: this.myColor(item._id) }}>
                                  <td>{Moment(item.created_date).format("DD-MM-YYYY HH:mm:ss")}</td>
                                 
                                  <td>{item._id}</td>
                                  <td>{item.batch_name.toUpperCase()}</td>
                                  <td>&nbsp;</td>
                              </tr>
      
                              ) } )}
                              
                              
                          </tbody>
                          
                         
                      </Table>
                      {totalDocuments != 0 ?
                                        <Pagination
                                            totalRecords={totalDocuments}
                                            pageLimit={2}
                                            pageNeighbours={1}
                                            onPageChanged={this.onPageChanged}
                                        />
                                        : null
                                    }
                  </div>
                  
                  <div className="col-md-6">
                  <div className="row mt">
                      <div className="col-md-12 ">
                          <h5 className="title-name title-name1">PREVIEW-CANDIDATE DATA</h5>
  
                          <div className="card-body ">
  
                              <div className="cardcrd1">
                                  <div className="tableoverflow">
                                  {this.state.staticImg ?
                                      <img src={table1} className="table1" />
                                    
                                      :null
                                  }
                                  {this.state.filepreview ?
                                <div>{this.iframeExcel} </div>
                                  :null
                                  }
                                  {this.state.bot ?
                                  <img src= {botscreening}/>
                                  :null
                                  }  
                                      <div className="row">
                                          <div className="col-md-12">
                                              <div className="edityourfeedbtm">
                                                  ADD KEYWORD SEARCH LABELS
                                              </div>
                                          </div>
                                          {/* <div className="col-md-2">
  
                                          </div> */}
                                      </div>
  
                                      <table width="100%">
                                      <thead></thead>
                                      <tbody>
                                          <tr>
                                              <td className="editstyles">
                                                  EDIT
                                              </td>
                                              <td>
                                                  <div className="addamessage1 float-left">UPLOAD REVISED EXCEL</div>
                                                  <div className="float-left"><img className="uploadbtnstyles" src={uploadbtn} /></div>
                                              </td>
                                              <td className="text-right">
                                                  <div className="addamessage2">
                                                      <div>POSTED ON:{Moment(this.state.post_on).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                      <div>POSTED ON: {Moment(this.state.expiry_on).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                  </div>
                                                  <div className="repostadd"><a href="#" className="repostad">REPOST AD</a></div>
                                              </td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
  
                              </div>
  
                          </div>
  
                          {/*
                          <div>
                              <img src={jobdesc} className="img-styles" />
                          </div> */}
                          <div className="boxleft">
                              <div className="mrleft">
                                  <div className="grbox">
                                      <table>
                                      <thead></thead>
                                      <tbody>
                                          <tr>
                                              <td className="tdheight" >
                                                  <div className="">
                                                      <label>
                                                          <img  src={videojd} onClick={()=>this.filepreview()}className="video_resume imgst1" />
                                                      </label>
                                                      {/* <input type="file" name='file' /> */}
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
  
                                              <td>
                                                  <span>FILE PREVIEW</span>
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
                                              <td className="tdheight marrght2 botscrmar">
                                                  <img src={botscreening} onClick={()=>this.bot()} className="img-styles chatrm " />
                                              </td>
                                          </tr>
                                          <tr>
  
                                              <td className="marrght2 marrght3">
                                                  <span>BOT SUPPORT</span>
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
                                              <td className="tdheight">
                                                  <img src={viewjob} onClick={(e)=>this.viewposts()} className="video_resume imgstt" />
                                              </td>
                                          </tr>
                                          <tr>
  
                                              <td>
                                                  <span>VIEW POSTS</span>
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
                                              <td className="tdheight">
                                                  <div onSubmit={this.onFormSubmit} className="">
                                                      <label>
                                                          <img src={companiesinterest} className=" " onClick={()=>this.companyinterest()} />
  
                                                      </label>
                                                   
                                                  </div>
                                              </td>
                                          </tr>
                                          <tr>
  
                                              <td>
                                                  <span className="companiesfontsize">COMPANIES INTRESTED</span>
                                              </td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                          </div>
                          <div className="text-center golivebtnn">
                              <button type="submit" disabled className="golive1">GO LIVE</button>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
      
          </form>
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
    const { InstitutionPosts } = state.authentication;
    return {
        InstitutionPosts
    };
}

const connectedInstitutionPosts = withRouter(
    connect(mapStateToProps)(InstitutionPostsPage)
);
export { connectedInstitutionPosts as InstitutionPostsPage }