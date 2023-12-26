import { Component } from 'react';
import './trend-switch.css';

export default class TrendSwitch extends Component{    
    state = {
        period: 'day',
    };

    onLabelClick = (event) => {
        const period = event.target.id;
        if((period!=='day'&&period!=='week')||this.state.period===period) return;
        const stick = event.target.closest('.trend-switch').children[2];
        const stickText = stick.children[0];
        stick.style.transform = period==='day'? 'translateX(0)' : 'translateX(82%)';
        stickText.style.opacity = 0;
        setTimeout(() => {
            stickText.textContent = period;
            stickText.style.opacity = 1;
        }, 500);
        this.setState({ period });
        this.props.getMovies('','', period, 'trending');
    };

    render(){
        return (
            <div className="trend-switch"
                onClick={this.onLabelClick}>
                <button id="day" className="trend-switch__btn">Day</button>
                <button id="week" className="trend-switch__btn">Week</button>
                <div className="trend-switch__stick"><span className="trend-switch__stick-text">day</span></div>
            </div>
        );
    }
}