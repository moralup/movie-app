import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import Header from '../header';
import Main from '../main';
import movieService from '../../service/movie-service'; 
import { GenresProvider } from '../../genres-context/genres-context';
import './/app.css';

export default class App extends Component{
    state = {
        genres: [],
        movies: [],
        ratedMovie: [],
        tab: 'search',
        title: null,
        page: 1,
        totalPages: 1,
        loading: false,
    };

    componentDidMount(){
        movieService.getGuestSessionId();
        movieService.getGenres().then(genres => this.setState({ genres }));   
    };

    getMovies = async (title, page, period, tab) => {
        try{
            this.setState({ loading: true, tab });
            const state = {
                movies: [],
                loading: false,
                title, 
                page,
            };
            switch(tab){
            case 'search':
                if(!title) break;
                const data = await movieService.getMovieByKeyword(title, page);
                state.movies = data.results;
                state.totalPages = data.total_pages || 1; 
                state.event = false;
                break;
            case 'trending':
                state.movies = await movieService.getTrendingMovie(period);
                break;
            case 'rated':
                state.movies = (await movieService.getRatedMovie()).results;
                break;
            } 
            this.setState(state);
        }
        catch(err){
            this.setState({ loading: false });
        }    
    };

    setMovieRating = (id, rating) => {
        this.setState(state => ({ ratedMovie: [...state.ratedMovie, { id, rating }] }));
        return movieService.setMovieRating(id, rating);
    };
    setStateForApp = (obj) => {
        this.setState(obj);
    }
    render(){
        const { loading, tab, genres, title, movies, page, totalPages, ratedMovie } = this.state;
        return (
            <div className="app">
                <Online>
                    <Header 
                        loading={loading}
                        getMovies={this.getMovies}
                        tab={tab}
                        setStateForApp={this.setStateForApp}/>
                    <GenresProvider value={genres}>
                        <Main 
                            movieTitle={title}
                            loading={loading}
                            movies={movies}
                            page={page}
                            ratedMovie={ratedMovie}
                            setMovieRating={this.setMovieRating}
                            tab={tab}
                            totalPages={totalPages}
                            getMovies={this.getMovies}/>
                    </GenresProvider>
                    <img className="background-image"/>
                </Online>
                <Offline>
                    <h1 style={{ margin: '100px auto', width: 'fit-content' }}>no internet connection</h1>
                </Offline>
            </div>
        );
    }
}

