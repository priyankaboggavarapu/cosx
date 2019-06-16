import React, { Component } from "react";
import "./index";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import '../MyProfilePage/MyProfilePage.scss';
import textjd from '../images/textjd.PNG';
import videojd from '../images/videojd.PNG';
import uploadimg from "../images/upload-btn.PNG";
import botscreening from '../images/botscreening.PNG';
import viewjob from '../images/viewjob.PNG';
import jobdesc from '../images/jobdesc.PNG';
import editicon from '../images/edit-icon.png';
import righticon from '../images/right.PNG';
import helpicon from '../images/help.PNG';
import docproofs from '../images/docproofs.PNG';
import resume from '../images/resume.PNG';
import videojdd from '../images/videojdd.PNG';
import botsearchh from '../images/botsearch.PNG';
import download_btn from '../images/download_btn.PNG';
import shareimg from '../images/share.PNG';
import docproofss from '../images/docproofss.PNG';
import starright from '../images/starright.PNG';
import recycle from '../images/recycle.PNG';
import uploadbtn from '../images/uploadbtn.PNG';
import view_job_appliedfor from '../images/view_job_appliedfor.PNG';
import { userActions } from '../_actions';
import { Table } from "react-bootstrap";
import { Player } from "video-react";
import FilterResults from "react-filter-search";
import 'reactjs-toastr/lib/toast.css';
import FilePreview from 'react-preview-file';
import { history } from "../_helpers";
import Moment from 'moment';
import FileViewer from 'react-file-viewer';
import { common } from '../_constants/data';
import { ALLCOUNTRYLIST } from '../_constants/country';
import { CustomErrorComponent } from 'custom-error';
import toastr from 'reactjs-toastr';
import axios from 'axios';
import { APP_URLS } from '../_constants/application.url';
import Pagination from "../_constants/Pagination";
import NumberFormat from 'react-number-format';
import Modal from 'react-awesome-modal';
import { GoogleComponent } from 'react-google-location';
import Geosuggest from 'react-geosuggest';
import { Document, Page } from 'react-pdf';
import MyComponent from '../_constants/upload';
const API_KEY = "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4";
class MyProfilePage extends React.Component {
  successMeg = "";
  errorMeg;
  loading = false;
  comment = false;
  constructor(props) {
    super(props);
    console.log('profile:', this.props.route);
    this.state = {
      pageNumber: 1,
      pageNumber1: 1,
      userprofile: {
        email: "",
        data: "",
        user_Id: '',
        user_name: '',
        imagePreviewUrl: '',
        skills: '',
        country: '',
        tax_Id: '',
        location: null,
        mobile: '',
        job_type: '',
        isChecked: false,
        is_available_freelancer: true,
        function: '',
        salary_range: '',
        currency: "INR",
        image: '',
        text_resume: '',
        video_resume: '',
      },
      checkedBgv: false,
      checked: false,
      visible: false,
      sharevisible: false,
      submitted: false,
      disable: "",
      submittedDoc: false,
      staticImg: true,
      userDoc: {
        proof_type: "",
        proof_name: "",
        document: ""
      },
      Function: [],
      RequestBGVChecks: false,
      countryBasedSalary: [],
      Salary: [],
      JobType: [],
      prooftypes: [],
      Country: [],
      DocumentProofs: [],
      currentDocuments: [],
      AllCountryData: [],
      currentPage: null,
      totalPages: null,
      textResume: true,
      videoResume: false,
      botSearch: false,
      DocProofs: false,
      selectedDoc: false,
      SelectedDate: "",
      success: "",
      error: "",
      users: {},
      text: "PREVIEW-SAMPLE TEXT RESUME",
      videoJD: "PREVIEW-SAMPLE VIDEO RESUME",
      Bot: "BOT SEARCH",
      Doc: "PREVIEW-DOCUMENT PROOF",
      profileimage: "",
      profileDocument: "",
      profileVideo: "",
      countrycodes: [
        { 'code': '+91', value: 'IN' },
        { 'code': '+65', value: 'SG' },
        { 'code': '+1', value: 'US' },
        { 'code': '+44', value: 'UK' },

      ],
      format: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCountryCodeChange = this.handleCountryCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formData = new FormData();
    this.handleSubmitDoc = this.handleSubmitDoc.bind(this);
    this.search = this.search.bind(this);
    //this.EditProfile = this.EditProfile.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);
    this.selectProof = this.selectProof.bind(this);
    this.handleMultiSelect = this.handleMultiSelect.bind(this);
    this.GetAllDocuments = this.GetAllDocuments.bind(this);
    this.GetProfile = this.GetProfile.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleDocumentChecked = this.handleDocumentChecked.bind(this);
    this.OnHandleSubmitBGY = this.OnHandleSubmitBGY.bind(this);
    this.handleActiveClick = this.handleActiveClick.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    //  this.handleDelete=this.handleDelete.bind(this);
    let countryBasedSalary = common.salary;
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.formatMobile = this.formatMobile.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.bgvChecked = this.bgvChecked.bind(this)
    this.openShareModal = this.openShareModal.bind(this);
  }
  bgvChecked(e) {
    // this.setState({[e.target.name]:e.target.checked})
    this.setState({ checked: !this.state.checked });
  }
  documentSelected =(itemSelected)=>{
       itemSelected.isSelected = !itemSelected.isSelected;
       let {DocumentProofs} = this.state;
       this.setState({DocumentProofs})
  }
  openModal() {
    this.loading = false;
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  openShareModal() {
    this.loading = false;
    this.setState({
      sharevisible: true
    });
  }

  closeShareModal() {
    this.successMeg="Documents shared successfully"
    this.setState({
      sharevisible: false,
      
    });
    this.openModal();
  }
  onSuggestSelect(suggest) {
    console.log(suggest);
    if (suggest != undefined) {
      let currentState = this.state;
      currentState.userprofile.location = suggest.label.toUpperCase();
      this.setState(currentState);
    }
    else {
      let currentState = this.state;
      currentState.user.location = "";
    }
  }
  handleCountryChange(event) {
    let currentState = this.state;
    let countrySalary = event.target.value;
    currentState.userprofile.country = event.target.value;
    this.loadSalaryRange(countrySalary, currentState)
    currentState.userprofile.countrycodes = common.salary.filter(x => x.s_country == event.target.value)[0].countryCode;
    this.handleCountryCodeChange(currentState.userprofile.countrycodes);
  }
  loadSalaryRange(countrySalary, currentState) {
    var countryBasedSalary = this.state.Salary.filter(function (country) {
      return country.s_country == countrySalary;
    });
    if (countryBasedSalary) {
      currentState.countryBasedSalary = countryBasedSalary.map(x => {
        let salary_range = x.salary_range;
        console.log('console.log(salary_range)', salary_range)
        return salary_range;
      })[0]
    }
  }

  handleClicktextResume() {
    this.setState({ textResume: true, videoResume: false, botSearch: false, DocProofs: false, selectedDoc: false, text: "PREVIEW-SAMPLE TEXT RESUME" })
  }
  handleClickvideoResume() {
    this.setState({ textResume: false, videoResume: true, botSearch: false, DocProofs: false, selectedDoc: false, videoJD: "PREVIEW-SAMPLE VIDEO RESUME" })
  }
  handleClickBotsearch() {
    this.setState({ textResume: false, videoResume: false, botSearch: true, DocProofs: false, selectedDoc: false, Bot: "BOT SEARCH" })
  }
  handleClickDocProof() {
    this.loading = true;
    this.successMeg = "";
    this.errorMeg = "";
    if (this.state['selectedDocument']) {
      this.loading = false;
      let bgv = this.state['request_bgv_check'];
      this.setState({ textResume: false, videoResume: false, botSearch: false, DocProofs: true, selectedDoc: false, Doc: "PREVIEW-DOCUMENT PROOF" })
    } else {
      this.loading = false;
      this.errorMeg = 'Please try again later!';
      this.openModal();
    }

  }
  toggle = (userprofile) => {
    if (this.state.active === userprofile) {
      this.setState({ active: null })
    } else {
      this.setState({ active: userprofile })
    }
  };

  myColor = (userprofile) => {
    if (this.state.active === userprofile) {
      return "#caf6ec";
    }
    return "";
  };
  // get all docs
  componentDidMount() {
    this.GetAllDocuments();
    this.GetProfile();

    let x = this.state;
    this.setState({
      textJDfile: x.textJDfile
    })
  }
  GetProfile() {
    debugger
    var _this = this;
    //this.loading=true;
    axios.get(APP_URLS.getProfile, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {
        console.log(res)
        if (res.data.data != null) {
          this.loading = false;
          let currentState = this.state;
          //check this data with tehe userprofileobject that we defined
          currentState.userprofile = res.data.data;
          console.log('proofs data....', currentState.userprofile)
          currentState.userprofile.is_available_freelancer = currentState.userprofile.is_available_freelancer ? true : false;
          localStorage.setItem('userProfile', JSON.stringify(res.data.data));
          currentState.userprofile['salary_range'] = res.data.data.salary_range.from + '-' + res.data.data.salary_range.to;
          //currentState.userprofile['salary_range'] = res.data.data.salary_range;
          currentState.userprofile['location'] = res.data.data.location;
          if (res.data.data.country == "INDIA") {
            let mobiletrim = res.data.data.mobile.split("+91-");
            console.log("**********", mobiletrim[1])
            if (mobiletrim[1]) {
              currentState.userprofile['mobile'] = mobiletrim[1];
            }
            if (mobiletrim[0]) {
              currentState.userprofile['mobile'] = mobiletrim[0];
            }
          }
          if (res.data.data.country == "UNITED STATES") {
            let mobiletrim = res.data.data.mobile.split("+1-");
            console.log("**********", mobiletrim[1])
            currentState.userprofile['mobile'] = mobiletrim[1];
          }
          if (res.data.data.country == "SINGAPORE") {
            let mobiletrim = res.data.data.mobile.split("+65-");
            console.log("**********", mobiletrim[1])
            if (mobiletrim[1]) {
              currentState.userprofile['mobile'] = mobiletrim[1];
            }
            if (mobiletrim[0]) {
              currentState.userprofile['mobile'] = mobiletrim[0];
            }
          }
          // currentState.userprofile['mobile'] = res.data.data.mobile;
          currentState['gettingTextResume'] = res.data.data.text_resume;
          currentState['gettingVideoResume'] = res.data.data.video_resume;
          currentState['user_id'] = res.data.data.user_Id;
          this.setState({ ...currentState, disable: true });
          // this.loadSalaryRange(currentState.userprofile.country, currentState);
          this.setDefaultValues(currentState.userprofile.email, currentState.userprofile.mobile,
            currentState.userprofile.country);

        }
        else {
          //get data from local storage.
          let currentState = this.state;
          let dataFromStorage = JSON.parse(localStorage.getItem('user')).data;
          currentState.userprofile.email = dataFromStorage.email;
          //currentState.userprofile.mobile = dataFromStorage.mobile.substring(dataUpdated.userprofile.mobile.length - 10, dataUpdated.userprofile.mobile.length);
          currentState.userprofile.location = dataFromStorage.location;
          let dataUpdated = this.setDefaultValues(dataFromStorage.email, dataFromStorage.mobile, dataFromStorage.country);
          this.setState(dataUpdated);
          this.loading = false;
          //this.setState({})
        }
      })
      .catch((e) => {
        this.loading = false;
        console.log('ERROR ', e);
      })

    let Function = common.function;
    let Salary = common.salary;
    let JobType = common.jobType;
    let Country = common.country;
    let prooftypes = common.prooftypes;

    this.setState({
      Function: Function,
      Salary: Salary,
      JobType: JobType,
      Country: Country,
      prooftypes: prooftypes
    })
  }
  handleActiveClick() {

    let currentState = this.state;
    let user_id = currentState['user_id'];
    axios.post(APP_URLS.updateUserProfileStatus,
      { 'user_Id': user_id },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      }

    )
      .then((res) => {
        if (res) {
          this.successMeg = res.data;
          this.openModal();
        }

        console.log(res)

      },
      )
      .catch(function (e) {

        console.log('ERROR ', e);
        toastr.error(e);
      })

  }
  GetAllDocuments() {
    debugger
    this.loading = true;
    axios.get(APP_URLS.getAllDocuments, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {
        console.log('documents response...', res)
        if (res.data && res.data.data && res.data.data && res.data.data.length > 0) {
          const DocumentProofs = res.data.data.map(x => {
            let docmnet = x;
            return docmnet;
          })
          this.setState({ DocumentProofs });
          //    this.onPageChanged(data)
          this.loading = false;
        } else {
          this.loading = false;
        }

      }
      )
      .catch((e) => {
        console.log('ERROR ', e);
        toastr.error(e);

      })
  }

  handleKeypress(e) {
    let num = new RegExp(/^[a-zA-Z0-9]+$/);
    if (!num.test(e.key)) {
      e.preventDefault();
    }
  }
  onPageChanged = (data, docs) => {
    const { DocumentProofs } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentDocuments = this.state.DocumentProofs.slice(offset, offset + pageLimit);
    this.setState({ currentPage, currentDocuments, totalPages });
  };
  handleChange(event) {
    console.log('event:', event)
    const { name, value } = event.target;
    const { userprofile, userDoc } = this.state;
    this.setState({
      userprofile: {
        ...userprofile,
        [name]: value,
        //location: event
      },
      userDoc: {
        ...userDoc,
        [name]: value
      },
      //location: event
    });

    this.setState({ location: event })
    //  this.setState({ location: e })
    // this.formData.append(name,value);
  }
  handlePlaceChange(event) {
    let currentState = this.state;
    currentState.userprofile.location = event.place;
    this.setState(currentState)
  }
  handleCountryCodeChange(code) {
    let countryCode = '';
    if (code && code.target && code.target.value) {
      countryCode = code.target.value;
    }
    else {
      countryCode = code;
    }

    let format = this.formatMobile(countryCode);
    this.setState(format);
  }
  formatMobile(code) {
    if (code == '+91') {
      return { 'format': "+91 ##########" };
    }
    if (code == '+65') {
      return { 'format': "+65 #### ####" };
    }
    if (code == '+1') {
      return { 'format': "+1 ###-###-####" };
    }
    if (code == '+44') {
      return { 'format': "+44 #### ######" };
    }
  }
  handleChangeMobile(event) {
    const re = /^[0-9-+()]*$/;
    //const re =/^[-+]?\d*$/;

    if (event.target.value === '' || re.test(event.target.value)) {
      const { name, value } = event.target;
      const { userprofile } = this.state;
      this.setState({
        userprofile: {
          ...userprofile,
          [name]: value
        }
      });

    }
  }
  handleUpdate(event) {

    this.successMeg = "";
    this.errorMeg = "";
    event.preventDefault();
    const { dispatch } = this.props;
    let user_id = this.state.userprofile.user_Id;
    const { userprofile } = this.state;
    this.setState({ submitted: true });
    let formData = new FormData();

    if (this.state.textJDfile) {
      this.loading = true
      this.successMeg = "";
      this.errorMeg = "";
      this.formData.delete('user_Id');
      this.formData.delete('textJDfile');
      this.formData.append('user_Id', user_id);
      this.formData.append("textJDfile", this.state.textJDfile[0]);

      axios.post(APP_URLS.updateTextResume,
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
            this.successMeg = res.data.message;
            this.openModal();
          } else {
            this.loading = false;
            this.errorMeg = 'Please try again later!';
            this.openModal();
          }
        },
        )
        .catch((e) => {
          console.log('ERROR ', e);
          this.errorMeg = "File upload only supports the following filetypes - /pdf|doc|docx|rtf/"
          this.openModal();

          // toastr.error(e);
        })
    }
    if (this.video_resume && this.video_resume.length > 0) {
      this.loading = true;
      this.successMeg = "";
      this.errorMeg = "";
      this.formData.delete('user_Id');
      this.formData.delete('video_resume');
      this.formData.append('user_Id', user_id);
      this.formData.append("video_resume", this.video_resume[0]);
      // dispatch(userActions.ProfileVideoResumeUpdate(this.formData));

      axios.post(APP_URLS.updateVideoResume,
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
            this.successMeg = res.data.message;
            this.openModal();
          } else {
            this.loading = false;
            this.errorMeg = 'Please try again later!';
            this.openModal();
          }
        },
        )
        .catch(function (e) {
          this.loading = false;
          console.log('ERROR ', e);
          this.errorMeg = 'Please try again later!';
          this.openModal();
          // toastr.error(e);
        })
    }
    if (this.image && this.image.length > 0) {
      this.loading = true;
      this.successMeg = "";
      this.errorMeg = "";
      this.formData.delete('user_Id');
      this.formData.delete('image');
      this.formData.append('user_Id', user_id);
      this.formData.append("image", this.image[0]);
      for (let x in userprofile) {
        if (x != 'text_resume' && x != 'video_resume') {
          this.formData.append(x, userprofile[x]);
          console.log(this.formData.get(x));
        }
      }
      axios.post(APP_URLS.updateProfile,
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
            // this.props.updateProfileImage(res.data);
            this.successMeg = res.data.message;
            this.openModal();
          } else {
            this.loading = false;
            this.errorMeg = 'Please try again later!';
            this.openModal();
          }
        },
        )
        .catch(function (e) {
          console.log('ERROR ', e);
          this.loading = false;
          // toastr.error(e);
        })
    }

    if (!this.text_resume && !this.video_resume && !this.image) {
      this.loading = true;
      this.successMeg = "";
      this.errorMeg = "";
      for (let x in userprofile) {
        if (x != 'text_resume' && x != 'video_resume') {
          formData.append(x, userprofile[x]);
          console.log(formData.get(x));
        }
      }
      console.log(userprofile);
      // dispatch(userActions.ProfileUpdate(formData));
      axios.post(APP_URLS.updateProfile,
        formData,
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
            this.successMeg = res.data.message;
            this.openModal();
          } else {
            this.loading = false;
            this.errorMeg = 'Please try again later!';
            this.openModal();
          }
        },
        )
        .catch(function (e) {
          console.log('ERROR ', e);
          // toastr.error(e);
        })
    }
  }
  handleSubmit(event) {

    this.successMeg = "";
    this.errorMeg = "";
    event.preventDefault();
    const { userprofile } = this.state;
    this.setState({ submitted: true });
    for (let x in userprofile) {
      this.formData.append(x, userprofile[x])
    }
    const { dispatch } = this.props;
    if (userprofile.skills && userprofile.user_name && userprofile.mobile && userprofile.location
      && userprofile.salary_range) {
      this.loading = true;
      console.log("the userprofiledata is", this.formData);
      userprofile.image = new FormData();
      userprofile.text_resume = new FormData();
      userprofile.video_resume = new FormData();
      //user.image.append("image", this.image[0])
      if (this.text_resume && this.text_resume.length > 0) {
        userprofile.text_resume.append("text_resume", this.text_resume[0])
      }
      if (this.video_resume && this.video_resume.length > 0) {
        userprofile.video_resume.append("video_resume", this.video_resume[0])
      }
      if (this.text_resume) {
        this.successMeg = "";
        this.errorMeg = "";
        axios.post(APP_URLS.AddProfile,
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
              this.successMeg = res.data.message;
              this.openModal();
            } else {
              for (let x in userprofile) {
                this.formData.delete(x, userprofile[x])
              }
              this.errorMeg = 'Please upload text resume and video resume';
              this.openModal();

            }
          },
          )
          .catch(function (e) {
            console.log('ERROR ', e);
            // this.loading = false;
            // toastr.error(e);
          })
      } else {
        this.successMeg = "";
        this.errorMeg = "";
        for (let x in userprofile) {
          this.formData.delete(x, userprofile[x])
        }
        this.errorMeg = 'Please upload text resume and video resume';
        this.openModal();
      }
    }
  }
  // document click
  handleSubmitDoc(event) {
    this.loading = true;
    this.errorMeg = "";
    this.successMeg = "";
    event.preventDefault();
    const { userDoc } = this.state;
    for (let x in userDoc) {
      this.formData.append(x, userDoc[x])
    }
    if (userDoc.proof_type == "" || userDoc.proof_name == "") {
      this.loading = false;
      this.errorMeg = 'Please Enter Required Fields';
      this.openModal();
    }
    //  const { dispatch } = this.props;
    if (userDoc.proof_type && userDoc.proof_name) {
      this.loading = true;
      console.log(this.formData);
      userDoc.document = new FormData()
      if (this.document == undefined) {
        this.loading = false;
        this.errorMeg = 'Please Upload Your Document';
        this.openModal();
      } else {
        this.loading = true;
        userDoc.document.append("document", this.document[0])
        axios.post(APP_URLS.AddDocument,
          this.formData,
          {
            headers: {
              Authorization: JSON.parse(localStorage.getItem('user')).data.token
            }
          }
        )
          .then((res) => {
            console.log(res)
            if (res.data.status == 200 && res.data.message) {
              this.loading = false;
              this.successMeg = res.data.message;
              this.openModal();
              this.GetAllDocuments();
              this.forceUpdate();
              this.setState({
                userDoc: {
                  proof_type: "",
                  proof_name: "",
                  document: ""
                }
              })
            } else if (res.data.status == 205) {
              this.loading = false;
              this.errorMeg = 'User Profile not found, save the profile first';
              this.openModal();
            }
          },
          )
          .catch(function (e) {
            console.log('ERROR ', e);
            // toastr.error(e);
          })
      }
    }
    else {
      //dispatch(userActions.addDocumnet(toastr.error('Please update Proof and Name', { displayDuration: 3000, })));
    }

  }
  // image
  onChangeImg(e) {
    this.image = e.target.files;
    console.warn('data file:', this.image);
    this.setState({ 'profileimage': this.image[0].name })
    this.formData.append('image', e.target.files[0]);
    let reader = new FileReader();
    var url = reader.readAsDataURL(this.image[0]);
    reader.onload = (e) => {
      console.warn('img Date:', e.target.result);
    }
    reader.onloadend = function (e) {
      this.setState({
        imgSrc: [reader.result]
      })
    }.bind(this);
  }
  // document upload
  onChangeDoc(e) {
    this.document = e.target.files[0];
    var kbs = e.target.files[0].size / 1024;
    var mbs = kbs / 1024;
    console.warn('data file:', this.document);
    if (mbs <= 5) {
      this.formData.append('document', e.target.files[0]);
      let reader = new FileReader();
      // var url = this.document[0].name;

      reader.onload = (e) => {
        console.warn('img Date:', e.target.result);
      }
      this.setState({
        textResume: false,
        videoResume: false,
        botSearch: false,
        DocProofs: true,
        selectedDoc: false,
        Docfile: this.document,
        Doc: "PREVIEW-DOCUMENT PROOF"
      })
      // reader.onloadend = function (e) {
      //   this.setState({
      //   //  doc: url,
      //   //  Documentfile:this.document
      //   })
      // }.bind(this);
      reader.onloadend = () => {

      };
    } else {
      this.errorMeg = "It is too large.So please try again later!";
      this.openModal();
    }
  }
  // video
  onChangeVideoDoc(e) {
    debugger
    this.video_resume = e.target.files;
    var kbs = e.target.files[0].size / 1024;
    var mbs = kbs / 1024;
    console.log('mbs:', mbs);
    if (mbs <= 5) {
      console.warn('data video_resume:', this.video_resume);
      this.setState({ 'profileVideo': this.video_resume[0].name })
      this.formData.append('video_resume', e.target.files[0]);
      let reader = new FileReader();
      reader.readAsDataURL(this.video_resume[0]);
      reader.onload = () => {
        this.setState({
          file: this.video,
          videoPreviewUrl: reader.result
        });
        // console.warn('img Date:', e.target.result);
      }
    } else {
      this.errorMeg = "It is too large.So please try again later!";
      this.openModal();
    }
    this.setState({
      image: false,
      video: true,
      staticImg: false
    });

  }

  ActiveJobApplication(state) {
    history.push('/dashboard/ActiveJobApplicants', {
      userName: this.state.userprofile.user_name,
    })
  }
  // textDoc 
  onChangeTextDoc(e) {
    this.text_resume = e.target.files[0];
    //console.warn('data text_resume:', this.text_resume);
    // this.setState({ 'profileDocument': this.text_resume[0].name })
    this.formData.delete('text_resume');
    this.formData.append('text_resume', e.target.files[0]);
    let reader = new FileReader();
    // var url = reader.readAsDataURL(this.text_resume[0]);
    // reader.onload = (e) => {
    //   console.warn('TEXT DATA:', e.target.result);
    // }
    reader.onloadend = () => {
      this.setState({
        textJDfile: this.text_resume,
        image: true,
        video: false,
        staticImg: false,
        //profileDocument: this.text_resume[0].name
      });
    };
    reader.readAsDataURL(this.text_resume);
    reader.onload = e => {
      console.warn("text_resume:", e.target.result);
    };
  }
  _handleImageChange(e) {
    e.preventDefault();
    let readeer = new FileReader();
    let image = e.target.files[0];
    readeer.onloadend = () => {
      this.setState({
        image: image,
        imagePreviewUrl: readeer.result
      });
    }
    readeer.readAsDataURL(image)
  }
  search(event) {
    const { value } = event.target;
    let state = this.state;
    state['searchText'] = value;
    this.setState(state);
  };
  selectProof(proof) {
    this.loading = true;
    this.state.Docfile = "";
    if (proof.user_Id) {
      console.log('selectProof:', proof);
      let currentState = this.state
      currentState['selectedDocument'] = proof.proof_image;
      currentState['_id'] = proof._id;
      currentState['request_bgv_check'] = proof.request_bgv_check;
      currentState['SelectedDate'] = proof.created_date
      this.setState({
        'document_id': proof._id,
        'RequestBGVChecks': proof.request_bgv_check
      });
      this.setState(currentState);
      this.loading = false;
    } else {
      toastr.error('please select the document!');
      this.loading = false;
    }
    this.toggle(proof._id);
  }
  comment = () => {
    this.comment = true;
  }
  handleDelete = () => {
    this.loading = true;
    this.successMeg = "";
    this.errorMeg = "";
    axios.post(APP_URLS.deleteDocument,
      { 'document_id': this.state['_id'] },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      }
    )
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          this.GetAllDocuments();
          this.successMeg = res.data.message;
          this.openModal();
          this.GetAllDocuments()
          this.loading = false;
        } else {
          this.errorMeg = 'Please try again later!';
          this.openModal();
          this.loading = false;
        }
      },
      )
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e);
      })

  }
  OnHandleSubmitBGY() {
    this.loading = true;
    this.successMeg = "";
    this.errorMeg = "";
    axios.post(APP_URLS.requestBgvCheck,
      { 'document_id': this.state.document_id },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      }
    )
      .then((res) => {
        if (res.data.status == 200) {
          this.successMeg = res.data.message;
          this.openModal();
          this.GetAllDocuments()
          this.loading = false;
          //this.setState({checkedBgv:true})
        }
        else if (res.data.status == 205) {
          this.errorMeg = res.data.message;
          this.loading = false;
        }
        else {
          this.errorMeg = 'Please try again later!';
          this.openModal();
          this.loading = false;
        }
        console.log(res)
      },
      )
      .catch(function (e) {
        console.log('ERROR ', e);
        toastr.error(e);
        this.loading = false;
      })
  }
  handleMultiSelect(e) {
    let currentState = this.state;
    currentState.userprofile.is_available_freelancer = e.target.checked;
    this.setState(currentState);
  }

  handleDocumentChecked(e) {
    let currentState = this.state;
    currentState.userprofile.isChecked = e.target.checked;
    this.setState(currentState);
  }
  setDefaultValues(email, mobile, country) {
    let currentState = this.state;
    currentState.userprofile.email = email;
    currentState.userprofile.country = country;
    this.loadSalaryRange(currentState.userprofile.country, currentState);
    currentState.userprofile.countrycodes = common.salary.filter(x => x.s_country == currentState.userprofile.country)[0].countryCode;
    currentState.userprofile.mobile = mobile;
    currentState.format = this.formatMobile(currentState.userprofile.countrycodes);
    this.setState(currentState.format);
    return currentState;
  }
  
  shareDoc(){
    axios.post(APP_URLS.requestBgvCheck,
      { 'email': this.state.email },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      }
    )
      .then((res) => {
        if (res.data.status == 200) {
         
        }
       
        else {
          this.errorMeg = 'Please try again later!';
          this.openModal();
          this.loading = false;
        }
        console.log(res)
      },
      )
      .catch(function (e) {
        console.log('ERROR ', e);
        this.loading = false;
      })
  }

  render() {
    console.log(this.state);
    const { myprofile } = this.props;
    const { userprofile, submitted, submittedDoc, value, userDoc, Function, Salary, prooftypes,
      JobType, Country, DocumentProofs, currentPage,
      totalPages, currentDocuments, text, videoJD, Bot, Doc, profileimage, profileDocument,
      profileVideo, userData, format, countryBasedSalary, SelectedDate, pageNumber, pageNumber1 } = this.state;
    const totalDocuments = DocumentProofs.length;
    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();
    const file = this.image;
    const type = {}
    let iframeData = '';
    let filePath = '';
    let iframeDataResume = "";
    let iframeVideoResume = "";
    let Text = "";
    let VideoResume = "";
    let uploadDoc = "";

    if (this.state.doc) {
      // let filePath = APP_URLS.getUploadedFile + '/' + this.state['gettingTextResume'];
      uploadDoc = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + this.state.doc}
        className="file-view"></iframe>
      // uploadDoc=
    }
    if (this.state['gettingTextResume']) {
      Text = 'PREVIEW-MY TEXT-RESUME'
      let filePath = APP_URLS.getUploadedFile + '/' + this.state['gettingTextResume'];
      iframeDataResume = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath}
        className="file-view"></iframe>
    }

    if (this.state['gettingVideoResume']) {
      VideoResume = 'PREVIEW-MY VIDEO-RESUME'
      iframeVideoResume = <Player src={APP_URLS.getUploadedFile + '/' + this.state['gettingVideoResume']} playInline />;
    }

    if (this.state['selectedDocument']) {
      let filePath = APP_URLS.getUploadedFile + '/' + this.state['selectedDocument'];
      console.log('filepath:', filePath)
      iframeData = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath} className="profile-file-view"></iframe>
    }
    else {
      iframeData = <img src={jobdesc} className="img-styles" />
    }
    let { imagePreviewUrl, videoPreviewUrl } = this.state;
    let $imagePreview = null;
    let $videoPreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + imagePreviewUrl} />;
    }
    if (videoPreviewUrl) {
      $videoPreview = <Player src={videoPreviewUrl} playInline />;
    }
    let googlePlace = '';
    if (userprofile.location != '') {
      googlePlace = <input language={'en'} name="location"
        onChange={this.handlePlaceChange}
        className="form-control"
        value={userprofile.location}
        country={'country:in'} />
    }
    else {
      googlePlace = <GoogleComponent apiKey={API_KEY} language={'en'} name="location"
        onChange={this.handlePlaceChange}
        className="form-control"
        value={userprofile.location}
        country={'country:in'} />

    }

    return (
      <div>
        {this.loading == true ?
          <div>
            <div className="loading">Loading&#8230;</div>
          </div>
          : null
        }
        {/* this is My Profile
      </div> */}
        <div className="row" id="myprofile">
          <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <h3 className="title-name">
                      MY PROFILE
                      {this.state.imgSrc ?
                        <div>
                          <img width="70px" height="40px" className="logo-img-upload"
                            src={this.state.imgSrc} />
                        </div>
                        : null
                      }
                    </h3>
                  </div>
                  <div className="col-md-6 middle-row">
                    <div className="countrystyles">

                      <div className="float-left countrystyles1">COUNTRY: </div>

                      <div className="float-left ">
                        <div className={'form-group' + (submitted && !userprofile.location ? ' has-error' : '')}>
                          <select className="form-control selectwidth"
                            name="country"
                            value={userprofile.country}
                            onChange={this.handleCountryChange} placeholder="COUNTRY" id="country">
                            <option value="">COUNTRY</option>
                            <option value="INDIA">INDIA</option>
                            <option value="UNITED STATES">UNITED STATES</option>
                            <option value="SINGAPORE">SINGAPORE</option>
                            {/* {this.state.Country.map((team) =>
                            <option key={team.code} value={team.name}>{team.name.toUpperCase()}</option>
                          )} */}

                          </select>
                          {submitted && !userprofile.country &&
                            <div className="help-block">country is required</div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form name="form">
                  <div className="row">

                  </div>
                  <div className="row txtborder">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div onSubmit={this.onFormSubmit} className="image-upload  profilephoto">
                          <label className="profilephoto1">
                            {!profileimage ?
                              <span>PROFILE PHOTO</span>
                              : null
                            }
                            {profileimage.substring(0, 15)}
                            <img src={uploadimg} className="uploadadd uploadphoto" />

                          </label>

                          <input type="file" name='fileImg' id="file-input1"
                            className="fileUpload" onChange={(e) => this.onChangeImg(e)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.user_name ? ' has-error' : '')}>
                          <input type="text" autoComplete='off' className="form-control" name="user_name"
                            value={userprofile.user_name.toUpperCase()} onChange={this.handleChange} id="user_name" placeholder="USER NAME" />
                          {submitted && !userprofile.user_name &&
                            <div className="help-block">user_name is required</div>
                          }
                        </div>
                      </div>
                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.location ? ' has-error' : '')}>
                          <Geosuggest
                            ref={el => this._geoSuggest = el}
                            placeholder="Type your location"
                            initialValue={userprofile.location}
                            onSuggestSelect={this.onSuggestSelect}
                            onClick={() => this._geoSuggest.clear()}
                          />
                          {submitted && !userprofile.location &&
                            <div className="help-block location">location is required</div>
                          }
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-3 col-xs-9 padrightt padr">
                          <div className="form-group">
                            <select className="form-control countrycode" name="countrycodes"
                              onChange={this.handleCountryCodeChange}
                              value={userprofile.countrycodes}
                              placeholder="">
                              <option>Code</option>
                              {this.state.countrycodes.map((item, index) =>
                                <option value={item.code} key={index} >{item.value}</option>
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-9 col-sm-9 col-xs-9">
                          <div className="form-group">
                            <div className={'form-group' + (submitted && !userprofile.mobile ? ' has-error' : '')}>
                              <NumberFormat type="text" maxLength={20} format={format} mask="_" autoComplete='off' className="form-control"
                                name="mobile"
                                value={userprofile.mobile} onChange={this.handleChange} id="mobile" placeholder="MOBILE" />
                              {submitted && !userprofile.mobile &&
                                <div className="help-block">mobile is required</div>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.skills ? ' has-error' : '')}>

                          <input type="text" autoComplete='off' className="form-control" name="skills"

                            value={userprofile.skills.toUpperCase()} onChange={this.handleChange} id="skills" placeholder="SKILLS" />

                          {submitted && !userprofile.skills &&
                            <div className="help-block">skills is required</div>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        {/* <div className={'form-group' + (submitted && !user.tax_Id ? ' has-error' : '')}> */}

                        <input type="text" autoComplete='off' className="form-control" name="tax_Id" maxLength={10} onKeyPress={this.handleKeypress}
                          value={userprofile.tax_Id.toUpperCase()} onChange={this.handleChange} id="tax_Id" placeholder="TAX ID" />
                        {/* {submitted && !user.tax_Id &&
                            <div className="help-block">tax_Id is required</div>
                          } */}
                        {/* </div> */}
                      </div>
                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.function ? ' has-error' : '')}>
                          <select className="form-control " name="function" value={userprofile.function} onChange={this.handleChange} placeholder="function" id="function">
                            <option value="">FUNCTION</option>
                            {this.state.Function.map((team) =>

                              <option key={team.value} value={team.text}>{team.text.toUpperCase()}</option>
                            )}

                          </select>
                          {submitted && !userprofile.function &&
                            <div className="help-block">function is required</div>
                          }
                        </div>
                      </div>

                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.salary_range ? ' has-error' : '')}>
                          <select className="form-control " name="salary_range" value={userprofile.salary_range} onChange={this.handleChange} placeholder="salary_range" id="salary_range">
                            <option value="">SALARY RANGE</option>
                            {countryBasedSalary.map((team) =>
                              <option key={team.s_id} value={team.s_text}>{team.s_text}</option>
                            )}
                          </select>
                          {submitted && !userprofile.salary_range &&
                            <div className="help-block">salary_range is required</div>
                          }
                        </div>

                      </div>

                      <div className="form-group">
                        <div className={'form-group' + (submitted && !userprofile.job_type ? ' has-error' : '')}>
                          <select className="form-control " name="job_type" value={userprofile.job_type} onChange={this.handleChange} placeholder="JOB TYPE" id="job_type">
                            <option value="">JOB TYPE</option>
                            {this.state.JobType.map((team) =>
                              <option key={team.j_value} value={team.j_text}>{team.j_text.toUpperCase()}</option>
                            )}

                          </select>
                          {submitted && !userprofile.job_type &&
                            <div className="help-block">job_type is required</div>
                          }
                        </div>

                      </div>

                      <button className="btn btn-info float-right golive"
                        disabled={!this.state.disable} onClick={this.handleUpdate}>UPDATE</button>
                    </div>
                  </div>
                </form>
                <hr />

                <div>
                  <div className="row">
                    <div className="col-md-5">

                    </div>
                    <div className="col-md-7 txtborder">
                      <div className="input-group">
                        <input
                          value={value}
                          onChange={this.search}
                          type="text"
                          autoComplete='off'
                          value={this.state.search}

                          className="form-control"
                          placeholder="SEARCH FOR DOCUMENTS"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-secondary srchbtn" type="button">
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>


                  <b className="viewalljobposts">VIEW MY DOCUMENT PROOFS</b>

                  <div className="row txtborder">
                    <div className="col-md-12">
                      <form name="form">
                        <div className="row prooftype">
                          <div className="col-md-4">
                            <div className="form-group">

                              <select className="form-control " name="proof_type" value={userDoc.proof_type} onChange={this.handleChange.bind(this)} placeholder="PROOF TYPE" id="proof_type">
                                <option value="">PROOF TYPE</option>
                                {this.state.prooftypes.map((team) =>
                                  <option key={team.p_value} value={team.p_text}>{team.p_text.toUpperCase()}</option>
                                )}
                              </select>

                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <div className={'form-group' + (submittedDoc && !userDoc.proof_name ? ' has-error' : '')}>

                                <input type="text" autoComplete='off' className="form-control" name="proof_name"
                                  value={userDoc.proof_name.toUpperCase()} onChange={this.handleChange.bind(this)} id="proof_name" placeholder="PROOF NAME" />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-1">
                            <div className="form-group">
                              <div onSubmit={this.onFormSubmit} className="image-upload imgup imgupmedia">
                                <label>
                                  {/* <img src="http://goo.gl/pB9rpQ" /> */}
                                  <img src={uploadimg} className="uploadadd" />
                                </label>
                                <input type="file" name='fileDoc' id="file-input" className="fileUpload"
                                  onChange={(e) => this.onChangeDoc(e)} />
                              </div>

                            </div>

                          </div>
                          <div className="col-md-3">
                            <button type="submit" onClick={this.handleSubmitDoc} className="golive-doc golivedocmedia">ADD PROOF</button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                          </div>
                          <div className="col-md-4 padleftt">
                            <div className="pdfdocs">(PDF, DOC, DOCX)</div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <Table bordered hover responsive striped className="tablemain">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th><a href="javascript:void()"><img src={shareimg} className="editicon" onClick={this.openShareModal} /></a></th>
                        <th>DOCUMENT PROOF</th>
                        <th>SIZE</th>
                        <th>DATE</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DocumentProofs && DocumentProofs
                        .filter(x => {
                          console.log("x value is ", x)
                          if (this.state.searchText)
                            return (
                              x.proof_type
                                .toLowerCase()
                                .includes(
                                  this.state.searchText.toLowerCase()
                                ) ||
                              x.proof_name
                                .toLowerCase()
                                .includes(
                                  this.state.searchText.toLowerCase()
                                )
                            );

                          else
                            return x
                        }).map((userprofile, index) =>

                          <tr key={index} onClick={(e) => this.selectProof(userprofile)} className="tableheight"
                            style={{ background: this.myColor(userprofile._id) }}>
                            <td className="chkbx" >
                              <input type="checkbox" onChange={()=>this.documentSelected(userprofile)} name="checkedBgv"
                              />
                            </td>
                            {(userprofile.request_bgv_check == true) ?


                              <td className="tooltip">
                                <img src={righticon} className="editicon" />
                                <span className="tooltiptext">Verified</span>
                              </td>


                              : null
                            }
                            {(userprofile.request_bgv_check == false) ?

                              <td className="tooltip"><img src={helpicon} className="editicon" /><span className="tooltiptext">Not verified</span></td>

                              : null
                            }
                            <td className="docname">
                              {userprofile.proof_name.toUpperCase()}

                            </td>
                            <td>
                              {userprofile.image_size}
                            </td>

                            <td className="datename">
                              {Moment(userprofile.updated_date).format("DD-MM-YYYY HH:mm:ss")}


                            </td>
                            <td>
                            <a href="javascript:void()">
                              <img onClick={this.comment} src={editicon} className="editicon" />
                              </a>
                            </td>
                            <td>
                              {/* <img src={shareimg} className="editicon" /> */}
                              <a href="javascript:void()">
                                <img onClick={this.handleDelete} src={recycle} className="editicon" />
                              </a>
                            </td>
                            <td>

                              <a href={APP_URLS.getUploadedFile + '/' + userprofile.proof_image}>
                                <img src={download_btn} className="editicon" />
                              </a>


                              {/* <i className="fas fa-share-alt-square"></i> */}
                            </td>

                          </tr>
                        )}

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
                <div className="reqbgvchecks">
                  <button className="btn btn-primary float-left bgvchecks" onClick={this.OnHandleSubmitBGY}>
                    <span>REQUEST<br />BGV CHECKS</span>
                  </button>
                </div>
                <div className="page">
                  <div className="page__demo">
                    <div className="demo">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 col-xs-6">
            <div className="row">
              <div className="col-md-12">
                {this.state.textResume
                  ?
                  <div>
                    {!iframeDataResume ?
                      <h5 className="title-name title-name1">{text}</h5>
                      : null
                    }
                    {iframeDataResume ?
                      <h5 className="title-name title-name1">{Text}</h5>
                      : null
                    }

                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="resumetop">

                            {this.state.doc ?
                              { uploadDoc }
                              : null
                            }
                            {$imagePreview ?
                              <div>
                                {$imagePreview}
                              </div>
                              : null
                            }
                            {!iframeDataResume ?
                              <div>

                                <Document file={this.state.textJDfile}>
                                  <Page pageNumber={pageNumber} />
                                </Document>
                              </div>
                              : null
                            }
                            {iframeDataResume ?
                              <div>
                                {this.state.textJDfile ?
                                  <div>
                                    <Document file={this.state.textJDfile}>
                                      <Page pageNumber={pageNumber} />
                                    </Document>
                                  </div>
                                  : null
                                }
                                {iframeDataResume}
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

                              {!profileDocument ?
                                <div className="addmg1">UPLOAD RESUME</div>
                                : null
                              }
                              {profileDocument ?
                                <div className="addmg1">{profileDocument.substring(0, 10)}</div>
                                : null
                              }
                            </div>
                            <div className="2">
                              <div className="form-group">
                                <div onSubmit={this.onFormSubmit} className="image-upload5 imgup">
                                  <label>
                                    <img src={uploadimg} className="uploadadd upimg" />
                                  </label>
                                  <input type="file" name='file' id="file-input" className="fileUpload myjobupload1" onChange={(e) => this.onChangeTextDoc(e)} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-4 padleftt">
                              <div className="pdfdocs1">(PDF, DOC, DOCX)</div>
                            </div>
                            <div className="col-md-4 padleftt"></div>
                          </div>
                        </div>
                        <div className="col-md-6 marginleftright">
                          <div className="updatedon">UPDATED ON:  {Moment(userprofile.updated_date).format("DD-MM-YYYY HH:mm:ss")}</div>

                          <a href="#" className="activestyles" onClick={this.handleActiveClick}>{userprofile.status}</a>

                        </div>
                      </div>
                    </div>

                  </div>
                  : null
                }
                {this.state.videoResume
                  ?
                  <div>
                    {!iframeVideoResume ?
                      <h5 className="title-name title-name1">{videoJD}</h5>
                      : null
                    }
                    {iframeVideoResume ?
                      <h5 className="title-name title-name1">{VideoResume}</h5>
                      : null
                    }
                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="resumetop">
                            {$videoPreview ?
                              <div>
                                {$videoPreview}
                              </div>
                              : null
                            }
                            {!iframeVideoResume && !$videoPreview ?
                              <div className="iframeSampleVideo">
                                {/* <img src={videojdd} className="resume" /> */}
                                <iframe src="https://drive.google.com/file/d/1qPBjC4zX6d0PpdMBSuS_p772dhU8uBUW/preview"></iframe>
                              </div>
                              : null
                            }

                            {iframeVideoResume ?
                              <div>
                                {iframeVideoResume}
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
                              {!profileVideo ?
                                <div className="addmg1">UPLOAD RESUME</div>
                                : null
                              }
                              {profileVideo ?
                                <div className="addmg1">{profileVideo.substring(0, 10)}</div>
                                : null
                              }
                            </div>
                            <div className="2">
                              <div className="form-group">
                                <div onSubmit={this.onFormSubmit} className="image-upload5 imgup">
                                  <label>
                                    <img src={uploadimg} className="uploadadd upadd" />
                                  </label>
                                  <input type="file" name='file' id="file-input" className="fileUpload myjobupload1" onChange={(e) => this.onChangeVideoDoc(e)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 marginleftright">
                          <div className="updatedon">UPDATED ON:   {Moment(userprofile.updated_date).format("DD-MM-YYYY HH:mm:ss")}</div>
                          <a href="#" className="activestyles">ACTIVE</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
                }

                {this.state.botSearch
                  ? <div>
                    <h5 className="title-name title-name1">{Bot}</h5>
                    <div className="cardcrd1">
                      {/* {iframeData} */}
                      <div className="row marginleftright">
                        <div className="col-md-12">
                          <div className="resumetopbot">
                            <img src={botsearchh} className="resume bot" />
                          </div>
                        </div>
                      </div>
                      <div className="row padtop">
                        <div className="col-md-6">

                        </div>
                        <div className="col-md-6">
                          <div className="updatedon">UPDATED ON:   {Moment(userprofile.updated_date).format("DD-MM-YYYY HH:mm:ss")}</div>
                          <a href="#" className="activestyles">ACTIVE</a>
                        </div>
                      </div>

                    </div>
                  </div>
                  : null
                }
                {this.state.DocProofs
                  ?
                  <div>
                    <h5 className="title-name title-name1">{Doc}</h5>
                    <div className="cardcrd1">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="resumetopdoc">
                            {/* {iframeData ? */}
                            <div>
                              <div className="row">
                                <div className="col-md-8">
                                  <p className="educert">
                                    EDUCATION CERTIFICATE 2<br />
                                    DD/MM/YYYY HH:MM
                                    </p>
                                </div>
                                <div className="col-md-4">
                                  {this.state.request_bgv_check == true ?
                                    <div className="starclick">
                                      <div className="float-left">
                                        <img src={starright} className="starright" />
                                      </div>
                                      <div className="float-left">

                                        <p className="clicktoview">
                                          CLICK TO VIEW<br />
                                          AUTHENTICATION<br />
                                          DOCUMENT
                                          </p>
                                      </div>
                                      </div>
                                      : null
                                    }
                                  </div>
                                </div>
                                {this.comment == true ?
                                <div className="row">
                                <div className="col-md-8 paddbox">
                                  <div className="commentsbox">


                                  </div>
                                </div>
                                <div className="col-md-4">

                                </div>
                              </div>
                              :null
                                }
                                {/* <div className="row">
                                  <div className="col-md-8 paddbox">
                                    <div className="commentsbox">

                                  {this.state.request_bgv_check == false ?
                                    <div className="starclick">
                                      <div className="float-left">
                                        <img src={helpicon} className="starright" />
                                      </div>
                                      <div className="float-left">

                                        <p className="clicktoview">
                                          CLICK TO VIEW<br />
                                          AUTHENTICATION<br />
                                          DOCUMENT
                                          </p>
                                      </div>
                                    </div>
                                    : null
                                  }
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-8 paddbox">
                                  <div className="commentsbox">


                                  </div>
                                </div> */}
                                <div className="row padtopbottom">
                                  <div className="col-md-8">

                                </div>
                              </div>
                              <div className="row padtopbottom">
                                <div className="col-md-8">

                                </div>
                                <div className="col-md-4 text-right padrightt">
                                  <span >
                                    {/* <img onClick={this.handleDelete} src={recycle} className="recycle" /> */}
                                  </span>


                                </div>
                              </div>
                              {!this.state.Docfile && iframeData ?
                                <div>
                                  {iframeData}
                                </div>
                                : null

                              }
                              {this.state.Docfile && iframeData ?
                                // <img src={docproofss} className="resume doc" />
                                <div className="doc-pdf">
                                  <Document file={this.state.Docfile}>
                                    <Page pageNumber={pageNumber} />
                                  </Document>
                                </div>
                                : null
                              }

                              {this.state.Docfile ?
                                // <img src={docproofss} className="resume doc" />
                                <div className="doc-pdf">
                                  <Document file={this.state.Docfile}>
                                    <Page pageNumber={pageNumber} />
                                  </Document>
                                </div>
                                : null
                              }
                            </div>


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
                              <div className="addmg1">UPLOAD RESUME</div>
                            </div>
                            <div className="2">
                              <div className="form-group">
                                <div onSubmit={this.onFormSubmit} className="image-upload5 imgup">
                                  <label>
                                    <img src={uploadimg} className="uploadadd" />
                                  </label>
                                  <input type="file" name='file' id="file-input" className="fileUpload" onChange={(e) => this.onChangeTextDoc(e)} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 marginleftright">
                          <div className="updatedon">UPDATED ON: {Moment(SelectedDate).format("DD-MM-YYYY HH:mm:ss")}   </div>
                          <a href="#" className="activestyles">ACTIVE</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
                }
                <div className="myprofileboxleft">
                  <div className="mrleft">
                    <div className="grbox">

                      <Table>
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
                      </Table>
                    </div>
                  </div>
                  <div className="mrleft">
                    <div className="grbox">
                      <div className="image-upload">
                        <label>
                          <img src={videojd} className="video_resume imgst1" onClick={() => this.handleClickvideoResume()} />
                        </label>
                        {/* <input type="file" name='file' onChange={(e) => this.onChangeVideoDoc(e)} /> */}
                      </div>
                      <span>VIDEO RESUME</span>
                    </div>
                  </div>

                  <div className="mrleft">

                    <div className="grbox">
                      <Table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight marrght1">
                              <img src={botscreening} className="img-styles chatrm" onClick={() => this.handleClickBotsearch()} />
                            </td>
                          </tr>
                          <tr>
                            <td className="marrght1">
                              <span>BOT SEARCH</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                    </div>
                  </div>
                  <div className="mrleft">

                    <div className="grbox">
                      <Table className="tbmar">
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight marrght1">
                              <img src={docproofs} className="img-styles chatrm" onClick={() => this.handleClickDocProof()} />
                            </td>
                          </tr>
                          <tr>
                            <td className="marrght1">
                              <span>DOCUMENT PROOFS</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

                    </div>
                  </div>
                  <div className="mrleft">
                    <div className="grbox" onClick={((e) => this.ActiveJobApplication())}>
                      <Table>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className="tdheight marrght">
                              <img src={viewjob} className="img-styles chatrm6" />
                            </td>
                          </tr>
                          <tr>

                            <td className="marrght">
                              <span>VIEW JOBS APPLIED FOR</span>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>

                </div>

                <div>
                  <div className="float-left">

                  </div>
                  <div className="float-right ">
                  </div>
                </div>
              </div>
            </div>
            <div className="row freelancelist">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-1 padrightt">
                    <input
                      type="checkbox"

                      checked={this.state.userprofile.is_available_freelancer}
                      onChange={this.handleMultiSelect} />
                  </div>
                  <div className="col-md-11">
                    <div className="float-left dipslaytxt">DISPLAY MY AVAILABILITY IN FREELANCER LISTING</div>



                  </div>
                </div>
              </div>
              <div className="col-md-4 padrightt text-right">
                <button type="submit" disabled={this.state.disable} onClick={this.handleSubmit} className="btn btn-info golive">GO LIVE</button>
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


        {/* sharing modal */}

        <section>
          {/* <div onClick={() => this.openShareModal()} /> */}
          <Modal
            visible={this.state.sharevisible}
            width="700"
            height="150"
            effect="fadeInUp"
            onClickAway={() => this.closeShareModal()}
          >
            <div className="popheader text-center"><h4>SHARE</h4></div>
            <div>
              <h5 className="share-h5">ENTER EMAIL</h5>
              <input type="text" autoComplete='off' className="form-control share-text"
                onChange={(e)=>{
                    this.setState({emailToShare:e.target.value});
                }}
                id="skills" placeholder="Enter email" />

            </div>
            <div className="popfooter text-right">
              <button type="button" className="closebtn" onClick={() =>{
                const {DocumentProofs} = this.state;
                let payLoad = {
                  email: this.state.emailToShare,
                  document:DocumentProofs.filter(x=>x.isSelected).map(x=>x.proof_image)
                };
                axios.post(APP_URLS.shareDocuments,
                 payLoad,
                  {
                    headers: {
                      Authorization: JSON.parse(localStorage.getItem('user')).data.token
                    }
                  }
                )
                  .then((res) => {
                    this.closeShareModal();
                  
                  })
                  .catch(function (e) {
                    console.log('ERROR ', e);
                    toastr.error(e);
                    this.loading = false;
                  })

              
              }}>SHARE</button>
            </div>
          </Modal>
        </section>
      </div>



    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  //const { userItem } = authentication;
  return {
    authentication
  };
}

const connectedMyProfilePage = withRouter(
  connect(mapStateToProps)(MyProfilePage)
);
export { connectedMyProfilePage as MyProfilePage };
