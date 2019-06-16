import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import textjd from "../images/textjd.PNG";
import videojd from "../images/videojd.PNG";
import botscreening from "../images/botscreening.PNG";
import viewjob from "../images/viewjob.PNG";
import uploadimg from "../images/upload-btn.PNG";
import jobdesc from '../images/jobdesc.PNG';
import spinner from '../images/spinner.gif';
import resume from '../images/resume.PNG';
import uploadbtn from '../images/uploadbtn.PNG';
import maxupto from '../images/maxupto.PNG';
import videojdd from '../images/videojdd.PNG';
import botscreenjob from '../images/botscreenjob.PNG';
import freelance from '../images/freelance.PNG';
import { userActions } from "../_actions";
import { Player } from "video-react";
import Iframe from 'react-iframe'
import FileViewer from "react-file-viewer";
import FilterResults from "react-filter-search";
import { push } from "react-router-redux";
import { Table } from "react-bootstrap";
import toastr from 'reactjs-toastr';
import 'reactjs-toastr/lib/toast.css';
import { history } from "../_helpers";
import Modal from 'react-awesome-modal';
import { SubscriptionPage } from '../SubscriptionPage/SubscriptionPage';
import Moment from 'moment';
import axios from 'axios';
import '../MyJobPostsPage/MyJobPosts.scss';
import { common } from '../_constants/data';
import FilePreview from 'react-preview-file';
import { APP_URLS } from '../_constants/application.url';
import Pagination from "../_constants/Pagination";
import NumberFormat from 'react-number-format';
import { GoogleComponent } from 'react-google-location';
import Geosuggest from 'react-geosuggest';
import { Document, Page } from 'react-pdf';
import MyComponent from '../_constants/upload';
const API_KEY = "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4";

class MyJobPostsPage extends Component {
  userData = [];
  employer = true;
  changeFlag = false;
  jobseeker = true;
  loading = false;
  companyname = "";
  updateButton = true;
  goliveButton = false;
  constructor(props, match) {
    super(props);
    this.state = {
      image: true,
      video: false,
      staticImg: false,
      bot: false,
      profileCountry: "",
      active: null,
      countryData: false,
      pageNumber: 1,
      user: {
        entity_name: "",
        skills: " ",
        country: "",
        job_title: "",
        mobile: "",
        job_type: "",
        function: "",
        salary: "",
        location: null,
        currency: "",
        image: "",
        document: "",
        video: "",
        job_openings: ""

      },

      submitted: false,
      submittedDoc: false,
      Country: [],
      success: "",
      error: "",
      items: {
        data: {}
      },
      userDoc: {
        proof_type: "",
        proof_name: ""
        //        document: ""
      },
      Function: [],
      companyLogo: "",
      Salary: [],
      countryBasedSalary: [],
      JobType: [],
      JobPostData: [],
      currentJobPostData: [],
      currentPage: null,
      totalPages: null,
      JobPostLatestData :[],
      id: 'SL10101353',
      text: "PREVIEW-SAMPLE TEXT JD",
      videoJD: "PREVIEW-SAMPLE VIDEO JD",
      Bot: "PREVIEW-BOT",
      imgSrc: "",
      imgSrcName: "",
      companyVideoResume: "",
      companyTextResume: "",
      countrycodes: [
        { 'code': '+91', value: 'IN' },
        { 'code': '+65', value: 'SG' },
        { 'code': '+1', value: 'US' },
        { 'code': '+44', value: 'UK' },
      ],
      format: "",
      formatlength: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.formData = new FormData();
    //this.handleClick = this.handleClick.bind(this);
    this.search = this.search.bind(this);
    this.changePage = this.changePage.bind(this);
    this.viewJobApplication = this.viewJobApplication.bind(this);
    this.gotoFreelancer = this.gotoFreelancer.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.formatMobile = this.formatMobile.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    let countryBasedSalary = common.salary;
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    //this.componentDidUpdate = this.componentDidUpdate;
  }
  onSuggestSelect(suggest) {
    console.log(suggest);
    if (suggest != undefined) {
      let currentState = this.state;
      currentState.user.location = suggest.label.toUpperCase()
      this.setState(currentState);
    } else {
      let currentState = this.state;
      currentState.user.location = "";
    }
  }

  handleCountryChange(event) {
    debugger
    if (event.target.value) {
      let currentState = this.state;
      let countrySalary = event.target.value;
      currentState.user.country = event.target.value;
      this.loadSalaryRange(countrySalary, currentState);
      currentState.user.countrycodes = common.salary.filter(x => x.s_country == currentState.user.country)[0].countryCode;
      currentState.format = this.formatMobile(currentState.user.countrycodes).format;
      this.setState(currentState);
    }

  }
  loadSalaryRange(countrySalary, currentState) {
    debugger
    var countryBasedSalary = this.state.Salary.filter(function (country) {
      return country.s_country == countrySalary;
    });
    if (countryBasedSalary) {
      currentState.countryBasedSalary = countryBasedSalary.map(x => {
        let salary_range = x.salary_range;
        console.log('console.log(salary)', salary_range)
        return salary_range;
      })[0]
    }
  }

  setDefaultValues(country, mobile) {
    debugger
    let currentState = this.state;
    currentState.user.country = country;
    if (!currentState.user.mobile) {
      currentState.user.mobile = mobile;
    }
    this.loadSalaryRange(currentState.user.country, currentState);
    currentState.user.countrycodes = common.salary.filter(x => x.s_country == currentState.user.country)[0].countryCode;
    currentState.format = this.formatMobile(currentState.user.countrycodes).format;
    this.setState(currentState);
    return currentState;

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


  handleClicktextJd() {
    let currentState = this.state;
    this.setState({ image: true, video: false, bot: false, text: 'PREVIEW-SAMPEL TEXT-JD', file: currentState.textJDfile })

  }
  handleClickVideoJd() {
    this.setState({ image: false, video: true, bot: false, videoJD: 'PREVIEW-SAMPEL VIDEO-JD' })
  }
  handleClickBot() {
    this.setState({ image: false, video: false, bot: true, Bot: "PREVIEW-BOT" })
  }

  handleCountryCodeChange(code) {
    let countryCode = code.target.value;
    let format = this.formatMobile(countryCode);
    this.setState(format);

  }
  formatMobile(code) {
    if (code == '+91') {
      return { 'format': "+91 ##########" };
    }
    if (code == '+65') {
      return { 'format': "+65 ####-####" };
    }
    if (code == '+1') {
      return { 'format': "+1 ###-###-####" };
    }
    if (code == '+44') {
      return { 'format': "+44 #### ######" };
    }
  }

  handleClick = (event, data) => {
    debugger
    this.changeFlag = false;
    this.state.textJDfile = "";
    this.goliveButton = true;
    this.updateButton = false;
    console.log('jobpost selected data....', data);
    event.preventDefault();
    let x = this.state;
    x['job_Post_ID'] = data.job_Post_Id;
    x['job_title'] = data.job_title;
    x['submitted'] = true;
    x['user'] = data;
    x['updateTextResume'] = data.text_JD;
    x['updateVideoResume'] = data.video_JD;
    x['entity_logo'] = data.entity_logo;
    x['salary'] = data.salary;
    x['salary'] = data.salary.from + "-" + data.salary.to
    x['mobile'] = data.mobile;
    x['imgSrcName'] = data.entity_logo;
    x['_id'] = data._id;
    this.setState({ ...x, data, id: data.job_Post_Id, disable: true });
    let newState = this.setDefaultValues(x.user.country);
    this.setState(newState);
    this.toggle(data.job_Post_Id);
  }
  gotoFreelancer() {
    if (this.state.job_Post_ID) {
      history.push('/dashboard/explorefreelancer', {
        'job_post_id': this.state.job_Post_ID, 'entity_logo': this.state.entity_logo
      })
    }
    else {
      let errormsg = "Please Select JobPost"
      this.setState({
        error: errormsg
      })

      this.openModal();
    }
  }
  viewJobApplication(state) {
    if (this.state.job_Post_ID) {
      history.push('/dashboard/viewjobapplicants', {
        val3: this.state.job_Post_ID,
        job_title: this.state.job_title
      })
    } else {
      let errormsg = "Please Select JobPost"
      this.setState({
        error: errormsg
      })

      this.openModal();
    }
  }

  onPageChanged = data => {
    const { JobPostLatestData } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentJobPostData = JobPostLatestData.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentJobPostData, totalPages });
  };
  handleUpdate(event) {
    this.loading = true;
    event.preventDefault();
    let job_Post_ID = this.state.user.job_Post_Id
    const { user } = this.state;
    this.setState({ submitted: true });
    let formData = new FormData();
    if (this.document) {
      // this.formData.delete("document");
      this.formData.append("document", this.document);
      this.formData.append("job_Post_Id", job_Post_ID);
      axios.post(APP_URLS.updateTextJD,
        this.formData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
          }
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.status == 200 && res.data.message) {
            var successMeg = res.data.message;
            this.loading = false;
            this.setState({
              success: successMeg
            })
            this.openModal();
          } else {

            var errorMeg = 'Please try again later!';
            this.loading = false;
            this.setState({
              error: errorMeg
            })
            this.openModal();
          }

        },
        )
        .catch((e) => {
          this.errorMeg = "File upload only supports the following filetypes - /pdf|doc|docx|rtf/"
          this.openModal();

          this.loading = false;
          console.log('ERROR ', e);

        })
    }
    if (this.video) {
      this.formData.append('video', this.video)
      this.formData.append("job_Post_Id", job_Post_ID);
      axios.post(APP_URLS.updateVideoJD,
        this.formData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
          }
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.status == 200 && res.data.message) {
            this.loading = false;
            var successMeg = res.data.message;


            this.setState({
              success: successMeg
            })
            this.openModal();
          } else {
            this.loading = false;
            var errorMeg = 'Please try again later!';
            this.setState({
              error: errorMeg
            })
            this.openModal();
          }
        },
        )
        .catch((e) => {
          this.loading = false;
          console.log('ERROR ', e);

        })
    }

    if (this.document == undefined && this.video == undefined) {
      for (let x in user) {
        if (x != 'document' && x != 'video' && !this.image) {
          this.formData.append(x, user[x]);
          console.log(this.formData.get(x));
        }
        if (x != 'document' && x != 'video' && this.image) {
          this.formData.append(x, user[x]);
        }
      }
      axios.post(APP_URLS.updateJobPost,
        this.formData,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem('user')).data.token
          }
        }
      )
        .then((res) => {
          console.log(res);
          if (res.data.code == 200 && res.data.message) {
            this.loading = false;
            var successMeg = res.data.message;
            this.setState({
              success: successMeg
            })
            this.openModal();
          } else {
            this.loading = false;
            var errorMeg = 'Please try again later!';
            this.setState({
              error: errorMeg
            })
            this.openModal();
          }
          this.formData = new FormData();
        },
        )
        .catch((e) => {
          this.loading = false;
          console.log('ERROR ', e);
          this.formData = new FormData();

        })
    }
  }
  // get all docs
  componentDidMount() {
    // this.setState({
    //   JobPostData:this.state.JobPostData
    // })
    let currentState = this.state
    this.getAllJobs();
    let Function = common.function;
    let Salary = common.salary;
    let JobType = common.jobType;
    this.setState({
      Function: Function,
      Salary: Salary,
      JobType: JobType,
      JobPostLatestData:currentState.JobPostData
    })
  }
  // componentDidUpdate() {
  //   this.getAllJobs();
  // }
  

  getAllJobs() {
    // this.loading=true;
    axios.get(APP_URLS.getJobPostsByUserId, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then(
        (res) => {
          this.loading = false
          console.log('thisis jobpost data......', res)

          if (res.data && res.data.data && res.data.data && res.data.data.length > 0) {
            this.forceUpdate();
            this.loading = false;
            const JobPostData = res.data.data.map(x => {
              let jobdata = x;
              return jobdata;
            })

            this.setState({ JobPostData,
              JobPostLatestData:JobPostData });
          } else {
            this.loading = false;
          }
        }
      )
      .catch(function (e) {

        console.log('ERROR ', e);
        toastr.error(e);
      })

  }
  handleChange(event) {
    const { name, value } = event.target;
    const { user, userDoc } = this.state;
    if (user.entity_name != "" && user.skills != "" && user.country != "" && user.job_title != "" && user.mobile != ""
      && user.job_type != "" && user.function != "" && user.salary != "" && user.currency != "INR" && user.image != ""
      && user.job_openings != "") {
      this.disabled = false;
    }
    this.setState({
      user: {
        ...user,
        [name]: value
      },
      userDoc: {
        ...userDoc,
        [name]: value
      }
    });
    // this.formData.append(name,value);
  }
  handlePlaceChange(event) {
    let currentState = this.state;
    currentState.user.location = event.place;
    this.setState(currentState)
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
  handleSubmit(event) {
    // this.loading = true;
    event.preventDefault();
    const { user } = this.state;
    this.setState({ submitted: true });
    for (let x in user) {
      this.formData.append(x, user[x]);
    }
    const { dispatch } = this.props;
    if (
      user.country &&
      user.job_title &&
      user.entity_name &&
      user.mobile &&
      user.salary &&
      user.skills &&
      user.location
      // user.image
    ) {
      user.image = new FormData();
      user.document = new FormData();
      user.video = new FormData();
      //user.image.append("image", this.image[0])
      if (this.document && this.document.length > 0) {
        user.document.append("document", this.document[0])
      }

      // if (this.video && this.video.length > 0) {
      //   user.video.append("video", this.video[0])
      // }

      if (this.document) {
        axios.post(APP_URLS.addJobPost,
          this.formData,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('user')).data.token
            }
          })
          .then((res) => {
            console.log('add job post data....', res)
            if (res.data.status == 200 && res.data.message) {
              var successMeg = res.data.message;
              this.getAllJobs();
              this.forceUpdate();
              this.loading = false;
              this.setState({
                success: successMeg
              })
              this.openModal();
            }
            else {
              for (let x in user) {
                this.formData.delete(x, user[x])
              }
              //this.loading = false;
              var errorMeg = 'Please try again later!';
              this.setState({
                error: errorMeg
              })
              this.openModal();

            }
            this.getAllJobs();
          })
          .catch((e) => {
            var errorMeg = "File upload only supports the following filetypes - /pdf|doc|docx|rtf/"
            this.setState({
              error: errorMeg
            })
            this.openModal();

            //this.loading = false;
            console.log('ERROR ', e);
          })
      } else {
        for (let x in user) {
          this.formData.delete(x, user[x])
        }
        var errorMeg = 'Please upload text JD and video JD';
        this.setState({
          error: errorMeg
        })
        this.openModal();
      }
    } else {
      this.loading = false;
    }
    this.getAllJobs();

  }

  changePage(page) {
    this.props.dispatch(push('/?page=' + page));
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
      return "#caf6ec";
    }
    return "";
  };

  onChange(e) {
    debugger
    this.changeFlag = true;
    this.state.imgSrc = "";
    this.image = e.target.files;
    //console.warn("data file:", this.image);
    this.setState({ 'imgSrcName': this.image[0].name.substring(0, 15) })
    this.formData.delete('image');
    this.formData.append("image", e.target.files[0]);
    let reader = new FileReader();
    var url = reader.readAsDataURL(this.image[0]);
    this.setState({
      imgSrc: url

    })
    reader.onload = e => {
      this.setState({
        imgSrc: [reader.result]

      })
      // console.warn("img Date:", e.target.result);
    };
    // reader.onloadend = function (e) {
    //   this.setState({
    //     imgSrc: [reader.result]

    //   })

    //}.bind(this);
    this.formData.forEach(x => {
      console.log(x);
    })
  }

  // textDoc
  onChangeTextDoc(e) {
    this.iframeUpdateTextResume = ""
    this.document = e.target.files[0];
    var kbs = e.target.files[0].size / 1024;
    var mbs = kbs / 1024;
    console.warn("data document:", this.document);
    if (mbs <= 5) {
      this.setState({ 'companyTextResume': this.document.name })
      this.formData.delete('text_jd');
      this.formData.append("text_jd", e.target.files[0]);
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          textJDfile: this.document,
          imagePreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(this.document);
      reader.onload = e => {
        console.warn("img Date:", e.target.result);
      };
    }
    else {
      this.errorMeg = "It is too large.So please try again later!";
      this.openModal();
    }

    this.setState({
      image: true,
      video: false,
      staticImg: false
    });
    this.formData.forEach(x => {
      console.log(x);
    })
  }
  // video upload
  onChangeVideoDoc(e) {
    debugger
    this.video = e.target.files;
    console.warn("data video_resume:", this.video);
    var kbs = e.target.files[0].size / 1024;
    var mbs = kbs / 1024;
    if (mbs <= 5) {
      this.setState({ 'companyVideoResume': this.video[0].name })
      this.formData.delete('video_jd');
      this.formData.append("video_jd", e.target.files[0]);
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          file: this.video,
          videoPreviewUrl: reader.result
        });
      };
      reader.readAsDataURL(this.video[0]);
      reader.onload = e => {
        console.warn("img Date:", e.target.result);
      };
    }
    else {
      var errorMeg = 'It is too large.So please try again later!';
      this.setState({
        error: errorMeg
      })
      this.openModal();
    }

    this.setState({
      image: false,
      video: true,
      staticImg: false
    });
  }
  search(event) {
    const { value } = event.target;
    let state = this.state;
    state['searchText'] = value;
    this.setState(state);
  };

  render() {
    const { data, value, pageNumber } = this.state;
    let { imagePreviewUrl, videoPreviewUrl, currentPage, countryData, profileCountry,
      JobPostData, currentJobPostData, Function, Salary, id, JobType, countryBasedSalary,
      text, videoJD, Bot, format, companylog, companyVideoResume, companyTextResume, getcountry, imgSrc } = this.state;

    let $imagePreview = null;
    let $videoPreview = null;
    const file = imagePreviewUrl;
    const type = "doc";
    const totalDocuments = JobPostData.length;
    let filePath = '';
    let Textflag = '';
    let Videoflag = '';
    let Text = "";
    let VideoJDS = "";
    let iframeUpdateTextResume = "";
    let iframeUpdateVideoResume = "";
    let companyLogo = "";
    if (this.state['entity_logo']) {
      companyLogo = APP_URLS.getUploadedFile + '/' + this.state['entity_logo'];
    }
    if (this.state['updateTextResume']) {
      Text = 'PREVIEW-MY TEXT-JD'
      let filePath = APP_URLS.getUploadedFile + '/' + this.state['updateTextResume'];
      iframeUpdateTextResume = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath}
        className="file-view"></iframe>
    }
    if (this.state['updateVideoResume']) {
      VideoJDS = 'PREVIEW-MY VIDEO-JD'
      iframeUpdateVideoResume = <Player src={APP_URLS.getUploadedFile + '/' + this.state['updateVideoResume']} playInline />;
    }
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    if (imagePreviewUrl) {
      console.log('imagePreviewUrl:', imagePreviewUrl)
      $imagePreview = <img src={imagePreviewUrl} />;
    }
    if (videoPreviewUrl) {
      $videoPreview = <Player src={videoPreviewUrl} playInline />;
    }
    const { myjobpost, users, userItem, page } = this.props;
    const { user, submitted } = this.state;
    const per_page = 1;
    const pages = Math.ceil(1 / per_page);
    const start_offset = (page - 1) * per_page;
    let start_count = 0;

    return (
      <div id="myjobposts">
        {this.loading == true ?
          <div>
            <div className="loading">Loading&#8230;</div>
          </div>
          : null
        }
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="title-name">
                      MY JOB POSTS
                    </h3>
                    {this.state.imgSrc && this.changeFlag == true ?
                      //(this.state.imgSrc && !companyLogo) || this.state.imgSrc ?
                      <div>
                        <img width="70px" height="40px"
                          className="postpage-logo-img-upload"
                          src={this.state.imgSrc} />
                      </div>
                      : null
                    }
                    {companyLogo && this.changeFlag == false ?
                      //companyLogo || (companyLogo && !this.state.imgSrc) || (this.state.imgSrc && companyLogo)?
                      <img width="70px" height="40px" className="postpage-logo-img-upload"
                        src={companyLogo} />
                      : null
                    }
                  </div>
                  <div className="col-md-6 middle-row">
                    <div className="countrystyles">
                      <div className="float-left countrystyles1">COUNTRY: </div>

                      <div className="float-left ">

                        <select className="form-control selectwidth"
                          name="country"
                          value={user.country}
                          onChange={this.handleCountryChange} placeholder="COUNTRY" id="country">
                          <option value="">COUNTRY</option>
                          <option value="INDIA">INDIA</option>
                          <option value="UNITED STATES">UNITED STATES</option>
                          <option value="SINGAPORE">SINGAPORE</option>
                          {/* {this.state.Country.map((team) =>
                            <option key={team.code} value={team.name}>{team.name.toUpperCase()}</option>
                          )} */}

                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="job-post">JOB POST ID:{this.state.job_Post_ID}</p>
                </div>
                <div className="row">
                  <div className="col-md-5 paddingleftzero">
                    <div className="form-group">
                      <div onSubmit={this.onFormSubmit} >
                        <div className="form-group ">
                          <div onSubmit={this.onFormSubmit} className="image-upload  profilephoto">
                            <label className="profilephoto1">
                              {!this.state.imgSrcName ?
                                <span>UPLOAD LOGO</span>
                                : null
                              }
                              {this.state.imgSrcName}

                              <img src={uploadimg} className="uploadadd uploadphoto upphoto" />
                            </label>
                            <input type="file" name='logo' id="file-input1"
                              className="fileUpload" onChange={e => this.onChange(e)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2"></div>
                  <div className="col-md-5 paddingrightzero">
                    <div className="row">
                      <div className="col-md-4">
                        <select className="form-control jobopen" name="job_openings"
                          value={user.job_openings}
                          placeholder="job_openings"
                          onChange={this.handleChange}
                          id="job_openings">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>
                      <div className="col-md-2">
                        <div className="jobopenings">JOB OPENINGS</div>
                      </div>
                      <div className="col-md-6">
                        <button type="submit" className="btn btn-primary float-right updatebtn"
                          disabled={this.updateButton} onClick={(e) => this.handleUpdate(e)}>UPDATE</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="col-md-5 paddingleftzero">
                    <div className="form-group">
                      <div
                        className={
                          "form-group" +
                          (submitted && !user.entity_name ? " has-error" : "")
                        }
                      >

                        <input
                          type="text"
                          className="form-control"
                          name="entity_name"
                          value={user.entity_name.toUpperCase()}
                          onChange={this.handleChange}
                          id="entity_name"
                          autoComplete='off' placeholder="ENTITY NAME"
                        />
                        {submitted && !user.entity_name && (
                          <div className="help-block">
                            Entity Name is required
                            </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <div className={'form-group' + (submitted && !user.location ? ' has-error' : '')}>
                        <Geosuggest
                          ref={el => this._geoSuggest = el}
                          placeholder="TYPE YOUR LOCATION"
                          initialValue={user.location}
                          onSuggestSelect={this.onSuggestSelect}
                          onClick={() => this._geoSuggest.clear()}
                        />
                        {submitted && !user.location &&
                          <div className="help-block location">location is required</div>
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 padrightt">
                        <div className="form-group">
                          <select className="form-control countrycode" name="country" disabled
                            onChange={this.handleCountryCodeChange}
                            value={user.countrycodes} placeholder="">
                            <option>Code</option>
                            {this.state.countrycodes.map((item, index) =>

                              <option value={item.code} key={index} >{item.value.toUpperCase()}</option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group">
                          <div
                            className={
                              "form-group" +
                              (submitted && !user.mobile ? " has-error" : "")
                            } >

                            <NumberFormat
                              type="text"
                              className="form-control"
                              name="mobile"
                              format={format} mask="_"
                              maxLength={this.state.formatlength}
                              autoComplete='off'
                              value={user.mobile}
                              onChange={this.handleChange}
                              id="mobile" placeholder="MOBILE NUMBER"
                            />
                            {submitted && !user.mobile && (
                              <div className="help-block">
                                Mobile Number is required
                            </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div
                        className={
                          "form-group" +
                          (submitted && !user.skills ? " has-error" : "")
                        }
                      >
                        <input
                          type="email"
                          className="form-control"
                          name="skills"
                          autoComplete='off'
                          value={user.skills.toUpperCase()}
                          onChange={this.handleChange}
                          id="skills" placeholder="SKILLS"
                          required />
                        {submitted && !user.skills && (
                          <div className="help-block">
                            skills is required
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 additionemail">
                    <div className="additionemailbottom">
                    </div>
                  </div>
                  <div className="col-md-5 paddingrightzero">
                    <div className="form-group">
                      <div
                        className={
                          "form-group" +
                          (submitted && !user.job_title ? " has-error" : "")
                        }
                      >

                        <input
                          type="text"
                          className="form-control"
                          name="job_title"
                          value={user.job_title.toUpperCase()}
                          autoComplete='off'
                          onChange={this.handleChange}
                          id="job_title" placeholder="JOB TITLE"
                        />
                        {submitted && !user.job_title && (
                          <div className="help-block">
                            Job_Title is required
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      {/* <div
                        className={
                          "form-group" +
                          (submitted && !user.function ? " has-error" : "")
                        }
                      > */}
                      <div className={'form-group' + (submitted && !user.function ? ' has-error' : '')}></div>
                      <select className="form-control " name="function" value={user.function} onChange={this.handleChange} placeholder="function" id="function">
                        <option value="">FUNCTION</option>
                        {this.state.Function.map((functionItem) =>

                          <option key={functionItem.value} value={functionItem.text}>{functionItem.text.toUpperCase()}</option>
                        )}
                      </select>
                      {submitted && !user.function &&
                        <div className="help-block">function is required</div>
                      }
                    </div>

                    <div className="form-group">
                      <div className={'form-group' + (submitted && !user.salary ? ' has-error' : '')}></div>
                      <select className="form-control " name="salary" value={user.salary} onChange={this.handleChange} placeholder="salary" id="salary">
                        <option value="">SALARY RANGE</option>
                        {countryBasedSalary.map((team) =>
                          <option key={team.s_id} value={team.s_text}>{team.s_text.toUpperCase()}</option>
                        )}
                      </select>
                      {submitted && !user.salary &&
                        <div className="help-block">salary is required</div>
                      }
                    </div>
                    <div className="form-group">
                      <div className={'form-group' + (submitted && !user.job_type ? ' has-error' : '')}></div>
                      <select className="form-control " name="job_type" value={user.job_type} onChange={this.handleChange} placeholder="function" id="function">
                        <option value="">JOB TYPE</option>
                        {this.state.JobType.map((item) =>
                          <option key={item.j_value} value={item.j_text}>{item.j_text.toUpperCase()}</option>
                        )}

                      </select>
                      {submitted && !user.job_type &&
                        <div className="help-block">job_type is required</div>
                      }
                    </div>

                  </div>

                </div>

                <hr />
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <b className="viewalljobposts">VIEW ALL JOB POSTS</b>
                    </div>
                    <div className="col-md-6 txtborder">
                      <div className="input-group">
                        {/* //search functionality */}
                        <input
                          value={value}
                          onChange={this.search}
                          type="text"
                          autoComplete='off'
                          value={this.state.search}

                          className="form-control"
                          placeholder="JOB POSTS"
                        />

                        <div className="input-group-append">
                          <button className="btn btn-secondary srchbtn" type="button">
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
                        <th>JOB POST ID</th>
                        <th>JOB TITTLE</th>
                        <th>FUNCTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentJobPostData
                        .filter(x => {
                          console.log("x value is ", x)
                          if (this.state.searchText)
                            return (
                              x.job_title
                                .toLowerCase()
                                .includes(
                                  this.state.searchText.toLowerCase()
                                ) ||
                              x.function
                                .toLowerCase()
                                .includes(
                                  this.state.searchText.toLowerCase()
                                ) ||
                              x.created_date
                                .toString()
                                .includes(this.state.searchText)
                              ||
                              x.job_Post_Id
                                .toString()
                                .includes(this.state.searchText)
                            );
                          else
                            return (
                              x
                            );
                        })

                        .map((user, index) => {


                          if (index >= start_offset && start_count < per_page) {
                            start_count++;
                          }

                          return (
                            <tr key={index + 1} style={{ background: this.myColor(user.job_Post_Id) }}
                              onClick={((e) => this.handleClick(e, user))}>
                              <td width="25%" height="36px">{Moment(user.created_date).format("DD-MM-YYYY")}</td>
                              <td width="25%" height="36px">{user.job_Post_Id}</td>
                              <td width="25%" height="36px">{user.job_title.toUpperCase()}</td>
                              <td width="25%" height="36px">{user.function.toUpperCase()}</td>
                            </tr>
                          )
                        })

                      }

                    </tbody>

                  </Table>
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
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">

                {this.state.image ?
                  <div>
                    {!iframeUpdateTextResume ?
                      <h5 className="title-name title-name1">{text}</h5>
                      : null
                    }
                    {iframeUpdateTextResume ?
                      <h5 className="title-name title-name1">{Text}</h5>
                      : null
                    }
                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="resumetop">
                            {iframeUpdateTextResume && !this.state.textJDfile ?
                              <div>
                                {iframeUpdateTextResume}
                              </div>
                              : null
                            }

                            {!iframeUpdateTextResume || (iframeUpdateTextResume && this.state.textJDfile) ?
                              <div>
                                <Document file={this.state.textJDfile}>
                                  <Page pageNumber={pageNumber} />
                                </Document>
                              </div>
                              : null
                            }
                            {/* <img src={resume} className="resume" /> */}
                          </div>
                        </div>
                      </div>
                      <div className="row padtop">
                        <div className="col-md-6">
                          <div className="row marginleftright">
                            <div className="2">
                              <div className="viewalljobposts viewedit">EDIT</div>
                            </div>
                            <div className="2">
                              {!companyTextResume ?
                                <div className="addmg1">write/paste/upload JD</div>
                                : null
                              }
                              {companyTextResume ?
                                <div className="addmg1">{companyTextResume.substring(0, 10)}</div>
                                : null
                              }
                            </div>
                            <div className="2">
                              <div className="form-group">
                                <div onSubmit={this.onFormSubmit} className="image-upload5 imgup">
                                  <label>
                                    <img src={uploadimg} className="uploadadd" />
                                  </label>
                                  <input type="file" name='file' id="file-input" className="fileUpload myjobupload" onChange={e => this.onChangeTextDoc(e)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 text-right">
                          <div className="updatedon">POSTED ON:{Moment(user.created_date).format("DD-MMM-YYYY HH:mm:ss")}<br />
                            EXPIRY ON: {Moment(user.expiry_date).format("DD-MM-YYYY HH:mm:ss")}</div>
                          <a href="#" className="activestyles">REPOST AD</a>
                        </div>

                      </div>
                    </div>

                    {/* <iframe src={'https://docs.google.com/gview?url=http://localhost:5000/gigx/api/getUploadedFile/' + $imagePreview + '&embedded=true'}></iframe> */}
                    {/* <iframe width='95%' height='620px'
                            src={'https://view.officeapps.live.com/op/embed.aspx?src=https://localhost:5000/gigx/api/getUploadedFile/' + $imagePreview}></iframe> */}
                  </div> : null}

                {this.state.video ?
                  <div>
                    {!iframeUpdateVideoResume ?
                      <h5 className="title-name title-name1"><b>{videoJD}</b></h5>
                      : null
                    }
                    {iframeUpdateVideoResume ?
                      <h5 className="title-name title-name1"><b>{VideoJDS}</b></h5>
                      : null
                    }
                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="resumetop">
                            {/* <img src={videojdd} className="resume" /> */}
                            {!iframeUpdateVideoResume && !$videoPreview ?
                              <div className="iframeSampleVideo">
                                {/* <img src={videojdd} className="resume" /> */}

                                <iframe width="400" height="200"
                                 src="https://drive.google.com/file/d/1qPBjC4zX6d0PpdMBSuS_p772dhU8uBUW/preview"></iframe>
                              </div>
                              : null
                            }
                            {iframeUpdateVideoResume && !$videoPreview ?
                              <div>
                                {iframeUpdateVideoResume}
                              </div>
                              : null
                            }
                            {/* {iframeUpdateVideoResume} */}
                            {$videoPreview ?
                              <div>
                                {$videoPreview}
                              </div>
                              : null
                            }
                          </div>
                        </div>
                      </div>
                      <div className="row padtop">
                        <div className="col-md-6">
                          <div className="row marginleftright">
                            <div className="2">
                              <div className="viewalljobposts viewedit">EDIT</div>
                            </div>
                            <div className="2">
                              {!companyVideoResume ?
                                <div className="addmg1">UPLOAD JD</div>
                                : null
                              }
                              {companyVideoResume ?
                                <div className="addmg1">{companyVideoResume.substring(0, 10)}</div>
                                : null
                              }
                            </div>
                            <div className="2">
                              <div className="form-group">
                                <div onSubmit={this.onFormSubmit} className="image-upload5 imgup">
                                  <label>
                                    <img src={uploadimg} className="uploadadd" />
                                  </label>
                                  <input type="file" name='file' id="file-input" className="fileUpload myjobupload" onChange={e => this.onChangeVideoDoc(e)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="updatedon">POSTED ON:{Moment(user.created_date).format("DD-MM-YYYY HH:mm:ss")}<br />
                            EXPIRY ON:{Moment(user.expiry_date).format("DD-MM-YYYY HH:mm:ss")}</div>
                          <a href="#" className="activestyles">REPOST AD</a>
                        </div>
                      </div>

                    </div>
                    {/* {$videoPreview} */}
                  </div>
                  : null}

                {this.state.bot ?
                  <div>

                    <h5 className="title-name title-name1"><b>{Bot}</b></h5>

                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="botjobb">
                            <img src={botscreenjob} className="resume botjob" />
                          </div>
                        </div>
                      </div>
                      <div className="row padtop">
                        <div className="col-md-6">

                        </div>
                        <div className="col-md-6">
                          <div className="updatedon">POSTED ON: <br />
                            EXPIRY ON: </div>
                          <a href="#" className="activestyles">REPOST AD</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null}


                <div className="myprofileboxleft">
                  <div className="mrleft">
                    <div className="grbox">
                      <Table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight">
                              <div onSubmit={this.onFormSubmit} className="image-upload">
                                <label>
                                  <img src={textjd} className="img-styles" onClick={() => this.handleClicktextJd()} />
                                </label>
                                {/* <input type="file" name='file' onChange={e => this.onChangeTextDoc(e)} /> */}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>

                              <span>TEXT JD</span>
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
                            <td className="tdheight">
                              <div onSubmit={this.onFormSubmit} className="image-upload">
                                <label>
                                  <img src={videojd} className="img-styles" onClick={() => this.handleClickVideoJd()} />
                                </label>
                                {/* <input type="file" name='file' onChange={e => this.onChangeVideoDoc(e)} /> */}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span>VIDEO JD</span>
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
                            <td className="tdheight marrght3">
                              <img src={botscreening} className="img-styles" onClick={() => this.handleClickBot()} />
                            </td>
                          </tr>
                          <tr>

                            <td className="marrght3">
                              <span>BOT SCREENING</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="mrleft">
                    <div className="grbox" onClick={((e) => this.viewJobApplication())}>
                      <Table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight">
                              <img src={viewjob} className="img-styles chatrm1" />
                            </td>
                          </tr>
                          <tr>

                            <td className="tdheight">
                              <span>VIEW JOB APPLICANTS</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                  </div>
                  <div className="mrleft">
                    <div className="grbox" onClick={((e) => this.gotoFreelancer())}>
                      <Table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight">
                              <img src={freelance} className="img-styles chatrm1" />
                            </td>
                          </tr>
                          <tr>

                            <td className="frelancerspad">
                              <span>FREELANCERS & CAMPUS HIRES</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

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
                      GO LIVE
                    </button>
                  </div>

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
              {this.state.success ?
                <h4 className="text-center popmessage">{this.state.success}</h4>
                : null
              }
              {this.state.error ?
                <p className="text-center popmessagered">{this.state.error}</p>
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

function mapStateToProps(state, match) {
  const { myjobpost } = state.dashboard;
  const { users, authentication } = state;
  const { userItem } = authentication;
  return {
    myjobpost,
    users,
    userItem
  };
}

const connectedMyJobPostsPage = withRouter(
  connect(mapStateToProps)(MyJobPostsPage)
);
export { connectedMyJobPostsPage as MyJobPostsPage };
