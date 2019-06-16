import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { default as App } from './App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import * as serviceWorker from './serviceWorker';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));
serviceWorker.unregister();
