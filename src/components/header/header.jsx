import Switch from '../switch';
import SearchMovieForm from '../search-movie-form';
import './header.css';

const Header = (props) => {
    const { getData, clearState } = props
    return (
        <div className="header">
            <Switch/>
            <SearchMovieForm clearState={clearState} getData={getData}/>
        </div>
    );
};

export default Header;