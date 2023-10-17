import { Component } from 'react';
import './day-or-week.css';

export default class DayOrWeek extends Component{
    
    state = {
        active: 'day',
    };

    onLabelClick = (event) => {
        event.target.id === 'day' ? 
            this.setState({ active: 'day' }) :
            this.setState({ active: 'week' });
    };

    componentDidUpdate(prevProps, prevState){
        if(prevState.active === this.state.active) return;
        this.props.setDayOrWeek(this.state.active);
    };

    render(){
        let classDay = 'day-or-week-btn'; 
        let classWeek = 'day-or-week-btn';
        this.state.active === 'day' ? 
            classDay += ' day-or-week-btn-active' :
            classWeek += ' day-or-week-btn-active';
        return (
            <div onClick={this.onLabelClick}
                className="day-or-week">
                <button id="day" className={classDay}>Day</button>
                <button id="week" className={classWeek}>Week</button>
            </div>
        );
    }
}