import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
class FooterFixedPage extends Component {
   
    render() { 
        const { footerfixed } = this.props;
        return ( 
            <div className="footerbg">
                 <div className="gigxinnerfooter">
                                    GIG-X &copy; 2019
                </div>
            </div>
        );
    }
}
 
function mapStateToProps(state) {
    const { footerfixed } = state.authentication;
    return {
        footerfixed
    };
  }
  
  const connectedfooter = withRouter(
    connect(mapStateToProps)(FooterFixedPage)
  );
  export { connectedfooter as FooterFixedPage };
  