import { Component } from 'react';
import './trend-switch.css';
export default class TrendSwitch extends Component{
    
    state = {
        active: 'day',
    };

    onLabelClick = (event) => {
        const trendName = event.target.id;
        if(trendName !== 'day' && trendName !== 'week') return;
        const parent = event.target.closest('.trend-switch');
        const stick = parent.children[2];
        const stickText = stick.children[0];
        stick.style.transform = trendName === 'day' ? 'translateX(0)' : 'translateX(82%)';
        stickText.style.opacity = 0;
        setTimeout(() => {
            stickText.textContent = trendName;
            stickText.style.opacity = 1;
        }, 500);
        this.setState({ active: trendName });
    };

    componentDidUpdate(pp, ps){
        if(ps.active === this.state.active) return;
        this.props.getMovies('','', this.state.active, 'trending');
    }

    render(){
        return (
            <div 
                onClick={this.onLabelClick}
                className="trend-switch">
                <button id="day" className="trend-switch__btn">Day</button>
                <button id="week" className="trend-switch__btn">Week</button>
                <div className="trend-switch__stick"><span className="trend-switch__stick-text">day</span></div>
            </div>
        );
    }
}