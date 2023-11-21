/* eslint-disable default-case */
import { Component } from 'react';
import './switch.css';

export default class Switch extends Component{
    state = {
        active: 'search',
    };

    onLabelClick = (event) => {
        switch (event.target.id){
        case 'search':
            this.setState({ active: 'search' });
            break;
        case 'trending':
            this.setState({ active: 'trending' });
            break;
        case 'rated':
            this.setState({ active: 'rated' });
            break;
        };
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.active === this.state.active) return;
        this.props.setSwitch(this.state.active);
    };

    render(){
        let indent; 
        switch(this.state.active){
        case 'search':
            indent = '0px';
            break;
        case 'trending':
            indent = '60px';
            break;
        case 'rated':
            indent = '120px';
            break;
        }
        
        return (
            <div className="wrap-switch">
                <div onClick={this.onLabelClick}
                    className="switch">
                    <button id="search" className="switch-btn">Search</button>
                    <button id="trending" className="switch-btn">Trending</button>
                    <button id="rated" className="switch-btn">Rated</button>
                </div>
                <div className="stick"
                    style={{ left: indent }}/>
            </div>
        );
    }
}