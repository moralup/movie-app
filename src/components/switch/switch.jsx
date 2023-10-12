import { Component } from 'react';
import './switch.css';

export default class Switch extends Component{
    
    state = {
        active: 'search',
    };

    onLabelClick = (event) => {
        event.target.id === 'search' ? 
            this.setState({ active: 'search' }) :
            this.setState({ active: 'rated' });
    };

    render(){
        let classSearch = 'switch-btn'; 
        let classRated = 'switch-btn';
        this.state.active === 'search' ? 
            classSearch += ' active' :
            classRated += ' active';
        return (
            <div onClick={this.onLabelClick}
                className="switch"
            >
                <button id="search" className={classSearch}>Search</button>
                <button id="rated" className={classRated}>Rated</button>
            </div>
        );
    }
}