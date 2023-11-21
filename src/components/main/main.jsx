import MovieList from '../movie-list/movie-list';
import Pagination from '../pagination';

const Main = (props) => {
    const { data, loading, swch, found, ratedMovie, setStateFullApp, totalPages, newPage } = props;
    // alert(props.newPage)
    return (
        <div className="main">
            <MovieList 
                data={data}
                loading={loading}
                swch={swch}
                ratedMovie={ratedMovie}
                setStateFullApp={setStateFullApp}
            />
            {(swch === 'search' && found ) ? 
                <Pagination newPage={newPage}
                    totalPages={totalPages}/> : 
                null}
        </div>
    );
};

export default Main;