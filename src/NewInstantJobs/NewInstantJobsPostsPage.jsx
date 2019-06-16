import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import './NewInstantJobsPosts.scss';
import textjd from '../images/textjd.PNG';
import zynga from '../images/zynga.PNG';
import amazoncom from '../images/amazoncom.PNG';
import foldericon from '../images/foldericon.PNG';
import videojd from '../images/videojd.PNG';
// import botscreening from '../images/botscreening.PNG';
import viewjob from '../images/viewjob.PNG';
import { connect } from "react-redux";
class NewInstantJobsPostsPage extends Component {

  constructor(props) {
    super(props);
      this.search = this.search.bind(this);
   
  }

  search(event) {
    const { value } = event.target;
    let state = this.state;
    state['searchText'] = value;
    this.setState(state);
  };


  render() {
    const { NewInstantJobs } = this.props;
    const {value } = this.state;
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="title-name">
                    <b>NEW INSTANT JOBS</b>
                  </h5>
                </div>
                <div className="col-md-6 input">
                  <div className="input-group ">
                    <input
                      value={value}
                      onChange={this.search}
                      type="text"
                      value={this.state.search}
                      className="form-control"
                      placeholder="BOT ENABLED SEARCH"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        <i className="fa fa-search" />
                      </button>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              <div className="row martop">
                    <div className="col-md-6">
                    <div className="rating">&#9733;&#9733;&#9734;&#9734;&#9734;</div>
                     <img src={zynga}></img>
                     
                     </div>
                     <div className="col-md-6">
                          <span class="jobcompany">
                              JOB:<br></br>
                              COMPANY:<br></br>
                              LOCATION:<br></br>
                              SALARY:
                          </span>
                      </div>
                  </div>

                  <div className="row martop">
                    <div className="col-md-6">
                    <div className="rating">&#9733;&#9733;&#9734;&#9734;&#9734;</div>
                     <img src={amazoncom}></img>
                     </div>
                     <div className="col-md-6">
                          <span class="jobcompany">
                              JOB:<br></br>
                              COMPANY:<br></br>
                              LOCATION:<br></br>
                              SALARY:
                          </span>
                      </div>
                  </div>

                  <div className="row martop">
                    <div className="col-md-6">
                    <div className="rating">&#9733;&#9733;&#9734;&#9734;&#9734;</div>
                     <img src={foldericon}></img>
                     </div>
                     <div className="col-md-6">
                          <span class="jobcompany">
                              JOB:<br></br>
                              COMPANY:<br></br>
                              LOCATION:<br></br>
                              SALARY:
                          </span>
                      </div>
                  </div>

                  <div className="row martop">
                    <div className="col-md-6">
                    <div className="rating">&#9733;&#9733;&#9734;&#9734;&#9734;</div>
                     <img src={foldericon}></img>
                     </div>
                     <div className="col-md-6">
                          <span class="jobcompany">
                              JOB: <br></br>
                              COMPANY: <br></br>
                              LOCATION:<br></br>
                              SALARY:
                          </span>
                      </div>
                  </div>
            </div>

          </div>
        </div>
        <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h5 className="title-name"><b>PREVIEW-JOB DESCRIPTION</b></h5>
                <div className="card-body ">
                {/* <img height="500px" width="500px" src={textjd}></img> */}
                <div class="cardcrd">
                  <h2>JOB DESCRIPTION</h2>
                  <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                  
                </div>
                <div className="postexpiry">
                    <table>
                      <tr>
                        <td>
                        <div className="addamessage1">ADD A MESSAGE TO HIRING MANAGER</div>
                        </td>
                        <td>
                        <div className="addamessage2">
                      <div>POSTED ON: 16 JAN 2019 23:00</div>
                      <div>POSTED ON: 16 JAN 2019 23:00</div>
                    </div>
                        </td>
                      </tr>
                    </table>
                    
                    
                  </div>
                </div>
                <div className="row mrrght">
                <div className="col-md-2"></div>
                  <div className="col-md-3 col-sm-6">

                    <div className="grbox">
                      <img src={textjd} className="img-styles" />
                      <div onSubmit={this.onFormSubmit}>
                        <input className="choosefile" type="file" name='file' onChange={(e) => this.onChangeTextDoc(e)} />
                      </div>
                      <span>TEXT JD</span>

                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="grbox">
                      <img src={videojd} className="img-styles" />
                      <span>VIDEO JD</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="grbox">
                      <img src={viewjob} className="img-styles" />
                      <span>RESPOND TO BOT</span>
                    </div>
                  </div>
                  <div className="col-md-1"></div>
                </div>
                <div className="text-center">
                  <button type="submit" onClick={this.handleSubmit} className="golive">APPLY FOR THE JOB</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

function mapStateToProps(state) {
  const { NewInstantJobs } = state.authentication;
  return {
    NewInstantJobs
  };
}

const connectedMyProfilePage = withRouter(
  connect(mapStateToProps)(NewInstantJobsPostsPage)
);
export { connectedMyProfilePage as NewInstantJobsPostsPage }