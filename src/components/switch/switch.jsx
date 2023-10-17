import { Component } from 'react';
import './switch.css';

export default class Switch extends Component{
    
    state = {
        active: 'search',
    };

    onLabelClick = (event) => {
        event.target.id === 'search' ? 
            this.setState({ active: 'search' }) :
            this.setState({ active: 'trending' });
    };

    componentDidUpdate(prevProps, prevState){
        if(prevState.active === this.state.active) return;
        this.props.setSwitch(this.state.active);
    };

    render(){
        let classSearch = 'switch-btn'; 
        let classTrending = 'switch-btn';
        this.state.active === 'search' ? 
            classSearch += ' active' :
            classTrending += ' active';
        return (
            <div onClick={this.onLabelClick}
                className="switch"
            >
                <button id="search" className={classSearch}>Search</button>
                <button id="rated" className={classTrending}>Trending</button>
            </div>
        );
    }
}