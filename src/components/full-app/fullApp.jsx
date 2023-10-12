import { Component } from 'react';
import Header from '../header';
import Main from '../main';

import './fullApp.css';

export default class FullApp extends Component{
    state = {
        data: [],
    };
    updateState = (newState) => {
        this.setState(newState);
    };

    render(){
        return (
            <div>
                <Header updateState={this.updateState}/>
                <Main data={this.state.data}/>
                {/* <img src='https://imgur.com/x0K3SKA'/> */}
                {/* <img src='https://i.imgur.com/x0K3SKA.jpeg'/> */}
            </div>
        );
    }
}
