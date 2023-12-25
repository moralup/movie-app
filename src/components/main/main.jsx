import MovieList from '../movie-list/movie-list';
import Pagination from '../pagination';
import LoadingCircle from '../loading-circle';
import './main.css';

const Main = (props) => {
    const { movies=[], loading, tab, ratedMovie,
        setMovieRating, totalPages, movieTitle, getMovies } = props;
        console.log(movies)
        const mainContent = () => {
        switch(true){
        case loading:
            return <LoadingCircle/>;
        case !movies.length&&tab==='rated':
            return (
                <MovieList 
                    movies={[{
                        id: '0000000011111111000000001111231232131231231232132132131',
                        overview: 'you havent rated any movie',
                        release_date: new Date(),
                        title: 'not rated',
                        vote_average: null,
                        notRated: true, 
                    }]}
                    ratedMovie={ratedMovie}
                    setMovieRating={setMovieRating}/>

            )
            return <h1>you haven't rated a single movie</h1>;
        case !movies.length&&!!movieTitle&&tab==='search':
            return (
                <MovieList 
                    movies={[{
                        id: '0000000011111111000000001111231232131231231232132132131',
                        overview: `not found for "${movieTitle}". its not real movie`,
                        release_date: new Date(),
                        title: movieTitle,
                        vote_average: null,
                    }]}
                    ratedMovie={ratedMovie}
                    setMovieRating={setMovieRating}/>

            )
            return <h1>{`not found for "${movieTitle}"`}</h1>;        default: 
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