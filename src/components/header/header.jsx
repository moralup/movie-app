import Switch from '../switch';
import SearchMovieForm from '../search-movie-form';
import './header.css';

const Header = (props) => {
    return (
        <div className="header">
            <Switch/>
            <SearchMovieForm updateState={props.updateState}/>
        </div>
    );
};

export default Header;