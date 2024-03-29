import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import App from './components/App';

const logger = createLogger();
export const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
const host ='http://localhost:3000/';

function loadItems() {
    return fetch(host + 'items').then(
        data =>
            ({
                type: "LOAD",
                payload: data.json()
            }),

        error => console.log(error)
    );
}
function loadAdminUser() {
    return fetch(host + 'Orders').then(
        data =>
            ({
                type: "LOAD_ADMIN_ORDER",
                payload: data.json()
            }),

        error => console.log(error)
    );
}
function AddAdminUser() {
    return fetch( host + 'items').then(
        data =>
            ({
                type: "LOAD_ITEM",
                payload: data.json()
            }),

        error => console.log(error)
    );
}
store.dispatch(
    loadItems()
);
store.dispatch(
    loadAdminUser()
);
store.dispatch(
    AddAdminUser()
);

    
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
