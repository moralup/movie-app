import Switch from '../switch';
import DayOrWeek from '../day-or-week/day-or-week';
import SearchMovieForm from '../search-movie-form';
import './header.css';

const Header = (props) => {
    const { getData, clearState, setSwitch, swch, setDayOrWeek } = props;
    return (
        <div className="header">
            <Switch setSwitch={setSwitch}/>
            {swch === 'search' ? 
                <SearchMovieForm 
                    clearState={clearState} 
                    getData={getData}/> : 
                <DayOrWeek 
                    setDayOrWeek={setDayOrWeek}/>
            }
        </div>
    );
};

export default Header;