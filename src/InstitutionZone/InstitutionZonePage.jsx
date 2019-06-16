import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import 'reactjs-toastr/lib/toast.css';
import toastr from 'reactjs-toastr';
import { APP_URLS } from '../_constants/application.url';
import axios from 'axios';
import "./InstitutionZonePage.scss";
import Geosuggest from 'react-geosuggest';
import { history } from "../_helpers";
import Modal from 'react-awesome-modal';
import NumberFormat from 'react-number-format';
class InstitutionZonePage extends Component {
  loading=false;
  successMeg="";
  errorMeg=""
  constructor(props) {
    super(props);
    this.state = {
      institute: {
        institute_Id: "",
        institution_type: "",
        institution_name: "",
        institution_tax_id: "",
        email: "",
        mobile: "",
        authorised_representatives: "",
        business_registration_number: "",
        city: "",
        address: "",
        country: ""


      },
      institutePost:[],
      submitted: false,
      visible: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { institute } = this.state;
    this.setState({
      institute: {
        ...institute,
        [name]: value
      },

    });

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

  componentDidMount(){
    this.getInstitution()
   }
  getInstitution() {
    this.loading = true;
    axios.get(APP_URLS.getInstitutionAccount, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).data.token
      }
    })
      .then((res) => {
        this.loading = false;
        console.log(res)
        if(res.data.data){
        let currentState =this.state;
        currentState['institute']=res.data.data;
        this.setState({currentState});
        }
      
      })
      .catch(function (e) {
        console.log('ERROR ', e);
      })
  }

  handleSubmit(event) {
    this.loading = true;
    // this.submitted=true
    const { institute } = this.state;
    if (institute.institution_tax_id && institute.mobile && institute.business_registration_number &&
      institute.address
      && institute.institution_name
      && institute.email) {
      // console.log("the institute data is", this.formData);
    }
    if(this.state.institute._id){
      this.loading = false;
      history.push('/dashboard/InstitutionPosts', {
        id: this.state.institute._id
  
      })
    }else{
    axios.post(APP_URLS.addInstitutionAccount,
      {
        "institution_type": this.state.institute.institution_type,
        "institution_name": this.state.institute.institution_name,
        "institution_tax_id": this.state.institute.institution_tax_id,
        "email": this.state.institute.email,
        "mobile": this.state.institute.mobile,
        "authorised_representatives": this.state.institute.authorised_representatives,
        "business_registration_number": this.state.institute.business_registration_number,
        "city": this.state.institute.city,
        "address": this.state.institute.address,
        "country": this.state.institute.country
      }, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem('user')).data.token
        }
      })
    
      .then((res) => {
        console.log('institute Zone......:', res)

        if (res.data.status == '200') {
          this.loading = false;
          this.setState({
            'institution_id': res.data.data._id
          })
          history.push('/dashboard/InstitutionPosts', {
            id: this.state.institution_id
      
          })


         // toastr.success('Institution Account Created Sucessfully', { displayDuration: 1000000000000000000000, });
        }
        else {
          this.loading = false;
          this.setState({
            submitted:true
          })
                   if(res.data.status == 400){
          this.errorMeg= res.data.error
          this.openModal();
        }
        
         this.submitted=true;
         toastr.error('Try Again......', { displayDuration: 1000000000000000000000, });

        }
      })
      
      .catch((e)=> {
        this.loading = false;
        
        console.log('ERROR ', e);
      })
    }
  }
  institutionPost(){
    history.push('/dashboard/InstitutionPosts', {
      id: this.state.institute._id
    })
  }
  onSuggestSelect(suggest) {
    console.log(suggest);
    let currentState = this.state;
    currentState.institute.city = suggest.label.toUpperCase()
    this.setState(currentState);
    //currentState.userprofile.location= suggest.description;
    // this.setState(currentState);
  }
  render() {
   
    const { InstitutionZone } = this.props;
    const { submitted, institute } = this.state

  
    return (
      <div className="viewjobapp">
        <h3 className="title-name">
          INSTITUTION ACCOUNT CREATION
        </h3>
        <div className="details">"Please fill in all the details"</div>
        <br />

        <div className="row txtborder">
          <div className="col-md-5">
          <div className="form-group">
              <label className="inststyles">COUNTRY</label>
              <select className="form-control " value={institute.country.toUpperCase()}
                name="country" onChange={this.handleChange} id="country">
                 <option>SELECT COUNTRY</option>
                 <option>INDIA</option>
                <option>UNITED STATES</option>
                <option>SINGAPORE</option>
                <option>UNITED KINGDOM</option>
              </select>
            </div>
            <div className="form-group">

              <label className="inststyles">INSTITUTION TYPE</label>
              <select className="form-control "
                value={institute.institution_type.toUpperCase()} name="institution_type"
                onChange={this.handleChange} id="institution_type" >
               <option>SELECT INSTITUTION TYPE</option>
                <option>UNIVERSITY</option>
                <option>COLLEGE</option>

                <option>POLYTECHNIC</option>
                <option>PRIVATE INSTITUTE</option>

              </select>

            </div>

            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.institution_tax_id ? ' has-error' : '')}>
                  <label className="inststyles">INSTITUTION TAX IDENTITY NUMBER</label>
                  <input type="text" autoComplete='off' value={institute.institution_tax_id.toUpperCase()}
                    name="institution_tax_id" onChange={this.handleChange} id="institution_tax_id"
                    className="form-control " placeholder="TAX IDENTITY NUMBER" />
                  {submitted && !institute.institution_tax_id &&
                    <div className="help-block">institution_tax_id is required</div>
                  }
                </div>
              </div>
            </div>


            {/* <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.mobile ? ' has-error' : '')}>
                  <label className="inststyles">MOBILE CONTACT NUMBER</label>
                  <input type="text" className="form-control "
                    autoComplete='off' maxLength="10" value={institute.mobile}
                    name="mobile" onChange={this.handleChange} id="mobile"
                    placeholder="MOBILE NUMBER" />
                  {submitted && !institute.mobile &&
                    <div className="help-block">mobile is required</div>
                  }
                </div>
              </div>
            </div> */}
<div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.mobile ? ' has-error' : '')}></div>
                <label className="inststyles">MOBILE CONTACT NUMBER</label>
<NumberFormat
                              type="text"
                              className="form-control"
                              name="mobile"
                             
                              maxLength="10"
                              autoComplete='off'
                              value={institute.mobile}
                              onChange={this.handleChange}
                              id="mobile" placeholder="MOBILE NUMBER"
                            />
                            {submitted && !institute.mobile &&
                    <div className="help-block">mobile is required</div>
                  }
</div>
</div>
            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.business_registration_number ? ' has-error' : '')}>
                  <label className="inststyles">BUSINESS REGISTRATION NUMBER</label>
                  <input type="text" className="form-control "
                    autoComplete='off' value={institute.business_registration_number.toUpperCase()}
                    name="business_registration_number" onChange={this.handleChange} id="business_registration_number"
                    placeholder="BUSINESS IDENTITY NUMBER" />
                  {submitted && !institute.business_registration_number &&
                    <div className="help-block"> business_registration_number is required</div>
                  }
                </div>
              </div>
            </div>

            
          </div>
          <div className="col-md-1 universitypad">
            {/* UNIVERSITY
            COLLEGE
            POLYTECHNIC
            PRIVATE INSTITUE */}
          </div>
          <div className="col-md-5">
            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.institution_name ? ' has-error' : '')}>
                  <label className="inststyles">INSTITUTE NAME</label>
                  <input type="text" className="form-control "
                    autoComplete='off' value={institute.institution_name.toUpperCase()}
                    name="institution_name" onChange={this.handleChange} id="institution_name"
                    placeholder="INSTITUTION NAME" />
                  {submitted && !institute.institution_name &&
                    <div className="help-block"> institution_name is required</div>
                  }
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.authorised_representatives ? ' has-error' : '')}>
                  <label className="inststyles">INSTITUTE-ATUTHORISED REPRESENTATIVE</label>
                  <input type="text" className="form-control "
                    autoComplete='off' value={institute.authorised_representatives}
                    name="authorised_representatives" onChange={this.handleChange} id="authorised_representatives"
                    placeholder="INSTITUTION-AUTHORISED REPRESENTATIVE" />
                  {submitted && !institute.authorised_representatives &&
                    <div className="help-block"> authorised_representatives is required</div>
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.email ? ' has-error' : '')}>
                  <label className="inststyles">EMAIL ID</label>
                  <input type="text" className="form-control "
                    autoComplete='off' value={institute.email.toUpperCase()}
                    name="email" onChange={this.handleChange} id="email"
                    placeholder="EMAIL ID" />
                  {submitted && !institute.email &&
                    <div className="help-block"> email is required</div>
                  }
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="inststyles">CITY</label>
              <Geosuggest
                          ref={el => this._geoSuggest = el}
                          placeholder="Type your location"
                          initialValue={institute.city.toUpperCase()}
                          onSuggestSelect={this.onSuggestSelect}
                          onClick={() => this._geoSuggest.clear()}
                        />
              {/* <select className="form-control " value={institute.city.toUpperCase()}
                name="city" onChange={this.handleChange} id="city">
                <option>SELECT LOCATION</option>
                <option>HYDERABAD</option>
                <option>BANGALORE</option>
                <option>PUNE</option>
                <option>CHENNAI</option>
              </select> */}
            </div>
            <div className="form-group">
              <div className="form-group">
                <div className={'form-group' + (submitted && !institute.address ? ' has-error' : '')}>
                  <label className="inststyles">COMPLETE ADDRESS WITH PINCODE</label>

                  <textarea className="form-control "
                    autoComplete='off' value={institute.address.toUpperCase()}
                    name="address" onChange={this.handleChange} id="address"
                    rows="3"></textarea>
                  {submitted && !institute.address &&
                    <div className="help-block"> address is required</div>
                  }
                </div>
              </div>
            </div>
            
            {!this.state.institute._id ?
            <button className="btnstyle " onClick={() => this.handleSubmit()}>SUBMIT</button> 
            :null 
            }
            {/* <br/> */}
            {this.state.institute._id ?
            <div>
            
            <button className="btnstyle " onClick={() => this.institutionPost()}>NEXT</button>
            <button className="btnstyle ">UPDATE</button>
            </div>
            :null 
            }
          </div>
          <div className="col-md-1"></div>
        </div>
        <Modal
            visible={this.state.visible}
            width="400"
            height="350"
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


      </div >
    );
  }
}

function mapStateToProps(state) {
  const { InstitutionZone } = state.authentication;
  return {
    InstitutionZone
  };
}

const connectedInstitutionZone = withRouter(
  connect(mapStateToProps)(InstitutionZonePage)
);
export { connectedInstitutionZone as InstitutionZonePage };
