import { Component } from 'react';
import './tab-switch.css';

export default class TabSwitch extends Component{
    state = {
        activeTab: 'search',
    };

    onLabelClick = (event) => {
        const activeTab = event.target.id
        if(this.props.loading||this.state.activeTab===activeTab) return;
        this.props.getMovies('', '', 'day', activeTab);
        this.setState({ activeTab });

    };
        
    render(){
        let indent; 
        switch(this.state.activeTab){
        case 'search': indent = '0px'; break;
        case 'trending': indent = '60px'; break;
        case 'rated': indent = '120px'; break;
        }
        return (
            <div className="tab-switch-wrap">
                <div className="tab-switch" 
                    onClick={this.onLabelClick}>
                    <button className="tab-switch__btn" id="search">Search</button>
                    <button className="tab-switch__btn" id="trending">Trending</button>
                    <button className="tab-switch__btn" id="rated">Rated</button>
                </div>
                <div className="tab-switch__stick" style={{ left: indent }}/>
            </div>
        );
    }
}