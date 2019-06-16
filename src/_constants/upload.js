import React, { Component } from 'react';
//import logger from 'logging-library';
import FileViewer from 'react-file-viewer';

const file = 'http://example.com/image.png'
const type = 'png'

export default class MyComponent extends Component {
  render() {
    return (
      <FileViewer
        fileType={this.props.fileType}
        filePath={this.props.filePath}
       
        onError={this.onError}/>
    );
  }

  onError(e) {
    console.log(e, 'error in file-viewer');
  }
}