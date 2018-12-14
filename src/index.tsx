import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, Store} from 'redux'
import App from './App';
import reducer from './redux/reducers'
//import "bootstrap/scss/bootstrap.scss"

import registerServiceWorker from './registerServiceWorker';

const store:Store = createStore(reducer);

if (process.env.NODE_ENV !== 'production') {
    localStorage.setItem('debug', 'rm-react-site:*');
}

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
