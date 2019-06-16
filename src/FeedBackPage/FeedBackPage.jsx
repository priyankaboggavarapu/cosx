import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import '../FeedBackPage/FeedBackPage.scss';
import feedback from '../images/feedback.png';
class FeedBackPage extends Component {

  render() {
    const { FeedBack } = this.props;
    return (
      <div className="brd">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div  className="starstyles">
                <h4>PLEASE RATE YOUR EXPERIENCE ON GIG X</h4>
                  <div className="starsymbol">
                    <div className="float-left"><i class="fas fa-star"></i></div>
                    <div className="float-left"><i class="fas fa-star"></i></div>
                    <div className="float-left"><i class="fas fa-star"></i></div>
                    <div className="float-left"><i class="fas fa-star"></i></div>
                    <div className="float-left"><i class="fas fa-star"></i></div>
                  </div>                  
              </div>
              <div  className="sharecomments">
                <h4 className="sharecommentstext">SHARE YOUR COMMENTS ON HOW WE CAN IMPROVE YOUR USER EXPERIENCE</h4>
              </div>
            </div>
          </div>
        </div>
        {/* <img className="feedback" src={feedback} /> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { FeedBack } = state.authentication;
  return {
    FeedBack
  };
}

const connectedFeedBackPage = withRouter(
  connect(mapStateToProps)(FeedBackPage)
);

export { connectedFeedBackPage as FeedBackPage };
