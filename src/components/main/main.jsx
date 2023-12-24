import MovieList from '../movie-list/movie-list';
import Pagination from '../pagination';
import LoadingCircle from '../loading-circle';
import './main.css';

const Main = (props) => {
    const { movies, loading, tab, ratedMovie,
        setMovieRating, totalPages, movieTitle, getMovies } = props;
        const mainContent = () => {
        switch(true){
        case loading:
            // console.log('loading')
            return <LoadingCircle/>;
        case !movies.length&&tab==='rated':
            // console.log('rated')
            return <h1>you haven't rated a single movie</h1>;
        case !movies.length&&!!movieTitle&&tab==='search':
            // console.log('not found')
            return <h1>{`not found for "${movieTitle}"`}</h1>;
        default: 
            return (
                <MovieList 
                    movies={movies}
                    ratedMovie={ratedMovie}
                    setMovieRating={setMovieRating}/>
            );
        }           
    };
    return (
        <div className="main">
            {mainContent()}
            {(tab === 'search' && movies.length) ? 
                <Pagination 
                    getMovies={getMovies}
                    movieTitle={movieTitle}
                    totalPages={totalPages}/> : 
                null}
        </div>
    );
};

export default Main;