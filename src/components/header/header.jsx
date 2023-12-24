/* eslint-disable default-case */
import TabSwitch from '../tab-switch';
import TrendSwitch from '../trend-switch';
import SearchMovieForm from '../search-movie-form';
import './header.css';

export default (props) => {
    const { getMovies, tab, loading } = props;
    let result = null;
    switch(tab){
    case 'search':
        result = <SearchMovieForm
            tab={tab}
            getMovies={getMovies}/>;
        break;
    case 'trending':
        result = <TrendSwitch 
            getMovies={getMovies}/>;
        break;
    } 
    
    return (
        <div className="header">
            <TabSwitch 
                loading={loading}
                getMovies={props.getMovies}/>
            { result }
        </div>
    );
};
