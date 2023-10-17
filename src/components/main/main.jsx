import MovieList from '../movie-list/movie-list';
import Pagination from '../pagination';

const Main = (props) => {
    const { data, loading, swch, found } = props;
    return (
        <div className="main">
            <MovieList 
                data={data}
                loading={loading}
                swch={swch}
            />
            {(swch === 'search' && found ) ? 
                <Pagination newPage={props.newPage}/> : 
                null}
        </div>
    );
};

export default Main;