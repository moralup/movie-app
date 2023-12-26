/* eslint-disable default-case */
import MovieList from '../movie-list/movie-list';
import Pagination from '../pagination';
import LoadingCircle from '../loading-circle';

const Main = (props) => {
    let { movies=[], loading, tab, ratedMovie,
        setMovieRating, totalPages, movieTitle, getMovies } = props;
    const mainContent = () => {
        if(loading) return <LoadingCircle/>; 
        const unrealMovie = {
            title: movieTitle,            
            id: '9876542342',
            overview: `not found for "${movieTitle}". its not real movie`,            
            release_date: new Date(),
            vote_average: null,
            notFound: true,
        };
        switch(true){
        case !movies.length&&tab==='rated':
            movies=[{ ...unrealMovie, overview: 'you havent rated any movie', title: 'not rated', notRated: true, notFound: false }];
            break;
        case !movies.length&&!!movieTitle&&tab==='search':
            movies=[unrealMovie];
            break;
        }
        return (
            <MovieList 
                movies={movies}
                ratedMovie={ratedMovie}
                setMovieRating={setMovieRating}/>
        );
    };
    
    return (
        <div className="main">
            {mainContent()}
            {(tab==='search'&&totalPages>1) ? 
                <Pagination 
                    getMovies={getMovies}
                    movieTitle={movieTitle}
                    totalPages={totalPages}/> : 
                null}
        </div>
    );
};

export default Main;