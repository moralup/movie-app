/* eslint-disable default-case */
import Switch from '../switch';
import TrendSwitch from '../trend-switch';
import SearchMovieForm from '../search-movie-form';
import './header.css';

const Header = (props) => {
    const { getData, clearState, setSwitch, swch, setDayOrWeek } = props;
    let result;
    switch(swch){
    case 'search':
        result = <SearchMovieForm
            clearState={clearState} 
            getData={getData}/>;
        break;
    case 'trending':
        result = <TrendSwitch 
            setDayOrWeek={setDayOrWeek}/>
        break;
    case 'rated':
        result = null;
        break;
    } 
    
    return (
        <div className="header">
            <Switch setSwitch={setSwitch}/>
            { result }
        </div>
    );
};

export default Header;