/* eslint-disable default-case */
import { Component } from 'react';
import './tab-switch.css';

export default class TabSwitch extends Component{
    state = {
        activeTab: 'search',
    };

    shouldComponentUpdate(prevProps, presState){
        return presState.activeTab !== this.state.activeTab;
    };    
    componentDidUpdate(prevProps, prevState){
        this.props.getMovies('', '', 'day', this.state.activeTab)
    };

    onLabelClick = (event) => {
        if(this.props.loading) return
        this.setState({ activeTab: event.target.id });
    };
        
    render(){
        let indent; 
        switch(this.state.activeTab){
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
            <div className="tab-switch-wrap">
                <div onClick={this.onLabelClick}
                    className="tab-switch">
                    <button id="search" className="tab-switch__btn">Search</button>
                    <button id="trending" className="tab-switch__btn">Trending</button>
                    <button id="rated" className="tab-switch__btn">Rated</button>
                </div>
                <div className="tab-switch__stick"
                    style={{ left: indent }}/>
            </div>
        );
    }
}