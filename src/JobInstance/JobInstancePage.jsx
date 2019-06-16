import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from '../_actions';
import img from '../images/img.png';
import { history } from "../_helpers";
import './JobInstancePage.scss';
import textjd from '../images/textjd.PNG';
import zynga from '../images/zynga.PNG';
import amazoncom from '../images/amazoncom.PNG';
import foldericon from '../images/foldericon.PNG';
import instantjob from '../images/instantjob.PNG';
import botscreening from '../images/botscreening.PNG';
import videojd from '../images/videojd.PNG';
import { Player } from "video-react";
import 'reactjs-toastr/lib/toast.css';
import 'reactjs-toastr/lib/toast.css';
import toastr from 'reactjs-toastr';
import Modal from 'react-awesome-modal';
// import botscreening from '../images/botscreening.PNG';
import viewjob from '../images/viewjob.PNG';
import call from '../images/call.PNG';
import { Table } from "react-bootstrap";
import axios from 'axios';
import Moment from 'moment';
import Nodatafoundbanner from '../images/No-data-found-banner.png';
import Pagination from "../_constants/Pagination";

import { APP_URLS } from '../_constants/application.url';
class JobInstancePage extends Component {
    submitted = false;
    loading = false;
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickText = this.handleClickText.bind(this);
        this.handleClickVideo = this.handleClickVideo.bind(this);
        this.search = this.search.bind(this);
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.ActiveJobApplication = this.ActiveJobApplication.bind(this);
        this.formData = new FormData();
        this.state = {
            active: null,
            textJD: false,
            videoJD: false,
            staticImg: true,
            JobPostData: [],
            currentJobPostData: [],
            currentPage: null,
            totalPages: null,
            JobInstanceData: [],
            currentJobInstanceData: [],
            currentPage: null,
            totalPages: null,
            createdDate: '',
            success: "",
            error: "",

            expireDate: ""
        }
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
    componentDidMount() {
        this.getAllJobPosts()
    }
    getAllJobPosts() {
        this.loading = true;

        axios.get(APP_URLS.getAllJobPosts, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('user')).data.token
            }
        })
            .then((res) => {
                console.log('thisis jobpost data......', res)
                //let currentState = this.state;
                if (res.data && res.data.data && res.data.data && res.data.data.length > 0) {
                    this.loading = false;
                    const JobInstanceData = res.data.data.map(x => {
                        let jobdata = x;
                        return jobdata;
                    })
                    this.setState({ JobInstanceData });

                }
            }
            )
            .catch((e) => {
                console.log('ERROR ', e);
                toastr.error(e);
                this.loading = false;
            })
    }
    onPageChanged = data => {
        const { JobInstanceData } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentJobInstanceData = JobInstanceData.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentJobInstanceData, totalPages });
    };
    handleOptionsChange = (event) => {
        this.setState({
            option: event.target.value
        });
    }
    search(event) {
        const { value } = event.target;
        let state = this.state;
        state['searchText'] = value;
        this.setState(state);
    };
    ActiveJobApplication() {
        history.push('/dashboard/ActiveJobApplicants', {

        })
    }
    handleClick(event, data) {
        this.loading = true;
        event.preventDefault();
        this.setState({
            submitted: true, 'textId': data.text_JD,
            'videoJd': data.video_JD, 'job_Post_Id': data.job_Post_Id, "data": data
        });
        let currentState = data
        //    currentState['selectedDocument'] =this.state.data.text_JD
        if (currentState.text_JD) {
            this.loading = false;
            currentState['selectedDocument'] = data.text_JD
            console.log(currentState['selectedDocument'])
            this.setState(currentState);
            this.setState({ textJD: true, videoJD: false, staticImg: false, createdDate: currentState.created_date, expireDate: currentState.expiry_date })
        }
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


    handleSubmit(event) {
        this.loading = true;
        axios.post(APP_URLS.applyForJob,
            { 'job_Post_Id': this.state.job_Post_Id },
            {
                headers: {
                    Authorization: JSON.parse(localStorage.getItem('user')).data.token
                }
            }

        )
            .then((res) => {
                console.log(res)

                if (res.data.code == 200) {
                    this.loading = false;
                    var successMeg = res.data.message;
                    this.setState({
                        success: successMeg,
                        error: ""
                    })
                    this.openModal();
                }
                if (res.data.status == 205) {
                    this.loading = false;
                    var errorMeg = res.data.message;
                    this.setState({
                        error: errorMeg,
                        success: ""
                    })
                    this.openModal();
                }
                else if (res.data.code == 400) {
                    this.loading = false;
                    var errorMeg = res.data.message;
                    // var errorMeg = 'Please Select JobPost '
                    this.setState({
                        error: errorMeg,
                        success: ""
                    })
                    this.openModal();
                }
            },
            )
            .catch(function (e) {
                console.log('ERROR ', e);
                toastr.error(e);
                this.loading = false;
            })
    }

    handleClickText() {
        let currentState = this.state
        if (currentState.textId) {
            currentState['selectedDocument'] = this.state.data.text_JD
            console.log(currentState['selectedDocument'])
            this.setState(currentState);
            this.setState({ textJD: true, videoJD: false, staticImg: false })
        }
        else {
            this.setState({
                staticImg: true
            })
            toastr.error('select the job', { displayDuration: 1000000000000000000000, });
        }
    }
    handleClickVideo() {
        let currentState = this.state
        if (currentState.videoJd || currentState.videoJD == undefined || currentState.videoJD == false) {
            currentState['selectedDocumentVideo'] = this.state.data.video_JD;
            this.setState(currentState);
            this.setState({ textJD: false, videoJD: true, staticImg: false });
        }
        else {
            this.setState({
                staticImg: true,
               
            })
            toastr.error('select the job', { displayDuration: 1000000000000000000000, });
        }
    }
    search(event) {
        const { value } = event.target;
        let state = this.state;
        state['searchText'] = value;
        this.setState(state);
    };
    render() {
        const { jobinstance, users, userItem } = this.props;
        const { user, value, submitted, bgColor, JobInstanceData, expireDate, currentJobInstanceData, currentPage, createdDate } = this.state;
        let iframeData = '';
        const totalDocuments = JobInstanceData.length;
        //  if (totalDocuments === 0) return null;
        const headerClass = [
            "text-dark py-2 pr-4 m-0",
            currentPage ? "border-gray border-right" : ""
        ]
            .join(" ")
            .trim();
        let filePath = '';
        let videoPreview = '';
        let imgUrls=APP_URLS.getUploadedFile;
        console.log('url:',imgUrls);
        if (this.state['selectedDocument']) {
            let filePath = APP_URLS.getUploadedFile + '/' + this.state['selectedDocument'];
            console.log('filepath:', filePath)
            iframeData = <iframe src={"https://docs.google.com/viewer?embedded=true&url=" + filePath} className="job-instance-file-view"></iframe>

        }
        if (this.state['selectedDocumentVideo']) {
            videoPreview = <Player src={APP_URLS.getUploadedFile + '/' + this.state['selectedDocumentVideo']} playInline />;
        }
        else {

        }
        console.log("the job instance data is", users);
        return (
            <div id="jobinstance">
                {this.loading == true ?
                    <div>
                        <div class="loading">Loading&#8230;</div>
                    </div>
                    : null
                }
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">

                                <div className="row">
                                    <div className="col-md-8">
                                        <h3 className="title-name">
                                            NEW INSTANT JOBS
                                        </h3>
                                    </div>
                                    <div className="col-md-4">

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">

                                    </div>
                                    <div className="col-md-6 input">
                                        <img src={call} className="callstyles" />
                                        <div className="input-group ">
                                            <input
                                                value={value}
                                                onChange={this.search}
                                                type="text"
                                                value={this.state.search}

                                                placeholder="BOT ENABLED SEARCH" className="searchbyname"
                                            />
                                            <div className="input-group-append">
                                                <button className="btn btn-secondary botbtn" type="button">
                                                    <i className="fa fa-search" />
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="martopbox">

                                    {currentJobInstanceData
                                        .filter(x => {
                                            console.log("x value is ", x)
                                            if (this.state.searchText)
                                                return (
                                                    x.job_title
                                                        .toLowerCase()
                                                        .includes(
                                                            this.state.searchText.toLowerCase()
                                                        ) ||
                                                    x.entity_name
                                                        .toLowerCase()
                                                        .includes(
                                                            this.state.searchText.toLowerCase()
                                                        ) ||
                                                    x.country
                                                        .toLowerCase()
                                                        .includes(
                                                            this.state.searchText.toLowerCase()
                                                        ) ||
                                                    x.salary
                                                        .toString()
                                                        .includes(
                                                            this.state.searchText
                                                        )
                                                );

                                            else
                                                return x
                                        })
                                        .map((user, index) =>

                                            <div key={index} onClick={((e) => this.toggle(user._id))} >

                                                <div className="row martop "
                                                    style={{ background: this.myColor(user._id) }}
                                                    onClick={((e) => this.handleClick(e, user))}   >


                                                    <div className="col-md-3 col-sm-3">
                                                        <div className="rating">&#9733;&#9733;&#9734;&#9734;&#9734;</div>
                                                        <img className="jobinstanceimg" src={imgUrls + '/' + user.entity_logo} ></img>

                                                    </div>
                                                    <div className="col-md-3 col-sm-3"></div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="jobcompany">
                                                            JOB: {user.job_title}<br></br>
                                                            COMPANY: {user.entity_name}<br></br>
                                                            LOCATION: {user.country}<br></br>
                                                            SALARY: {user.salary}<br></br>
                                                            <span className="postedon">POSTED ON: {Moment(user.created_date).format("DD-MM-YYYY HH:mm:ss")}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>






                                        )}

                                </div>
                            </div>

                            <div className="paginationalign">
                                {totalDocuments != 0 ?
                                    <Pagination
                                        totalRecords={totalDocuments}
                                        pageLimit={4}
                                        pageNeighbours={1}
                                        onPageChanged={this.onPageChanged}
                                    />
                                    : null
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="title-name title-name1">PREVIEW-JOB DESCRIPTION</h5>
                                <div className="card-body ">

                                    <div className="cardcrd1 jobdesc">
                                        {
                                            this.state.staticImg
                                                ? <div>

                                                    <div className="instantjobstyles">
                                                        <img src={instantjob} />
                                                    </div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="addamessage1">ADD A MESSAGE TO HIRING MANAGER</div>
                                                                </td>
                                                                <td className="text-right">
                                                                    <div className="addamessage2 addamessage3">
                                                                        <div>POSTED ON: 16 JAN 2019 23:00</div>
                                                                        <div>EXPIRY ON: 16 JAN 2019 23:00</div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                : null
                                        }
                                        {
                                            this.state.textJD ?
                                                <div>
                                                    < div className="instantjobstyles">
                                                        {iframeData}
                                                    </ div>
                                                    <table>

                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="addamessage1">ADD A MESSAGE TO HIRING MANAGER</div>
                                                                </td>
                                                                <td className="text-right">
                                                                    <div className="addamessage2 addamessage3">
                                                                        <div>POSTED ON:{Moment(createdDate).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                                        <div>EXPIRY ON: {Moment(expireDate).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>


                                                : null
                                        }

                                        {
                                            this.state.videoJD

                                                ? <div>
                                                    {videoPreview ? 
                                                    < div className="instantjobstyles">

                                                        {videoPreview}
                                                    </div>
                                                    :null
                                                    }
                                                     {!videoPreview ? 
                                                    < div className="instantjobstyles">
  <iframe width="400" height="200"
                                 src="https://drive.google.com/file/d/1qPBjC4zX6d0PpdMBSuS_p772dhU8uBUW/preview"></iframe>
                                                        
                                                    </div>
                                                    :null
                                                    }
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="addamessage1">ADD A MESSAGE TO HIRING MANAGER</div>
                                                                </td>
                                                                <td className="text-right">
                                                                    <div className="addamessage2 addamessage3">
                                                                        <div>POSTED ON: {Moment(createdDate).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                                        <div>EXPIRY ON:  {Moment(expireDate).format("DD-MM-YYYY HH:mm:ss")}</div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>


                                                </div>
                                                : null
                                        }
                                    </div>





                                </div>
                                <div className="boxleft">
                                    <div className="mrleft">
                                        <div className="grbox">
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className="tdheight">


                                                            <div onSubmit={this.onFormSubmit} className="image-upload1"
                                                             onClick={((e) => this.handleClickText(e, user))}>
                                                                <label >
                                                                    <img src={textjd} className="img-styles" />
                                                                </label>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td>
                                                            <span>VIEW TEXT JD</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="mrleft">
                                        <div className="grbox">
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className="tdheight">
                                                            <div onSubmit={this.onFormSubmit} 
                                                            className="image-upload1" 
                                                            onClick={((e) => this.handleClickVideo(e, user))}>
                                                                <label >
                                                                    <img src={videojd} className="img-styles" />
                                                                </label>
                                                                <input type="text" />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td>
                                                            <span>VIEW VIDEO JD</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="mrleft">

                                        <div className="grbox">
                                            <Table>
                                                <tbody>
                                                    <tr>
                                                        <td className="tdheight marrght2">
                                                            <img src={botscreening} className="img-styles chatrm" />
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td className="marrght2 marrght3">
                                                            <span>RESPOND TO BOT</span>
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
                                                        <td className="tdheight marrght ">
                                                            <img src={viewjob} className="img-styles chatrm1" />
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                        <td className="marrght">
                                                            <span>VIEW JOB APPLIED FOR</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>

                                </div>

                                <div className="myjobboxleft">
                                    <div className="golivebtn">
                                        <button type="submit" onClick={this.handleSubmit} className="golive">APPLY FOR THE JOB</button>
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
                        <div className="popheader text-center">Alert</div>
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
function mapStateToProps(state) {
    const { jobinstance } = state.authentication;
    const { users, authentication } = state;
    const { userItem } = authentication;
    return {
        jobinstance, users, userItem
    };
}
const connectedJobInstancePage = withRouter(
    connect(mapStateToProps)(JobInstancePage)
);
export { connectedJobInstancePage as JobInstancePage };