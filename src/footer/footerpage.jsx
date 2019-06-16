import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";







class FooterPage extends Component {
   
    render() { 
        const { footer } = this.props;
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
    const { footer } = state.authentication;
    return {
        footer
    };
  }
  
  const connectedfooter = withRouter(
    connect(mapStateToProps)(FooterPage)
  );
  export { connectedfooter as FooterPage };
  