import { Component } from 'react';
import './trend-switch.css';
// DayOrWeek
export default class TrendSwitch extends Component{
    state = {
        active: 'day',
    };

    onLabelClick = (event) => {
        const trend = event.target.id;
        const stickStyle = this.wrap.children[2].style;
        const origin = trend === 'day' ? 'top right' : 'top left';
        const originAfter = trend === 'day' ? 'top left' : 'top right';
        const left = trend === 'day' ? '-10px' : '470px' 
        this.wrap.children[2].textContent = ''
        stickStyle.transformOrigin = origin;
        stickStyle.transform = 'scaleX(2)';
        stickStyle.borderRadius = trend === 'day' ? '50px 20px 20px 50px' : '20px 50px 50px 20px'
        setTimeout(() => {
            stickStyle.borderRadius = trend === 'day' ? '20px 50px 50px 20px' : '50px 20px 20px 50px' 
        }, 800)
        setTimeout(() => {
            stickStyle.left = left
            stickStyle.transformOrigin = originAfter;
            stickStyle.transform = 'scaleX(1)';
            this.wrap.children[2].textContent = trend
        }, 1000)
        setTimeout(() => {
            // this.wrap.children[2].textContent = trend
        }, 1500)
        this.setState({ active: trend });
    };
    
    stretchStick = (event) => {
        this.wrap = event.target.parentElement;
        // if(this.wrap.className !== 'trend') return
        // const rect = this.wrap.getBoundingClientRect();
        // const x = event.clientX - rect.left;
        // if(x < 470) return
        // this.wrap.children[2].style.width = x > 500 ? '500px' : `${x}px`
    };

    compressStick = () => {
        // this.wrap.children[2].style.width = '470px'
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.active === this.state.active) return;
        this.props.setDayOrWeek(this.state.active);
    };

    render(){
        let classDay = 'trend-btn'; 
        let classWeek = 'trend-btn';
        // this.state.active === 'day' ? 
            // classDay += ' trend-btn-active' :
            // classWeek += ' trend-btn-active';
        return (
            <div 
                onClick={this.onLabelClick}
                onMouseMove={this.stretchStick}
                onMouseLeave={this.compressStick}
                className="trend">
                <button id="day" className={classDay}>Day</button>
                <button id="week" className={classWeek}>Week</button>
                {/* <div className="trend-stick"><span>Day</span></div> */}
                <div className="trend-stick">Day</div>
            </div>
        );
    }
}