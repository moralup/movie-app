/* eslint-disable default-case */
import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { debounce, throttle } from 'lodash';
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
        title: null,
        totalPages: 1,
        page: 1,
        loading: false,
        tab: 'search',
    };

    componentDidMount(){
        movieService.getGuestSessionId();
        movieService.getGenres().then(genres => this.setState({ genres }));   
    };

    getMovies = async (title, page, trending, tab) => {
        if(this.state.event&&tab!=='search') return
        this.tab = tab
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
                state.event = false
                break;
            case 'trending':
                state.movies = await movieService.getTrendingMovie(trending);
                break;
            case 'rated':
                state.movies  = (await movieService.getRatedMovie()).results;
                break;
            } 
            this.setState(state);
            console.log(tab, this.tab)
        }
        catch(err){
            this.setState({ loading: false });
        }    
    };
        
    setMovieRating = (id, rating) => {
        const ratedMovie = [...this.state.ratedMovie, { id, rating }];
        this.setState({ ratedMovie });
        return movieService.setMovieRating(id, rating);
    };
    setStateForApp = (obj) => {
        this.setState(obj)
    }
    render(){
        return (
            <>    
                <div className="app">
                    <Header 
                        loading={this.state.loading}
                        getMovies={this.getMovies}
                        tab={this.state.tab}
                        setStateForApp={this.setStateForApp}/>
                    <Online>
                        <GenresProvider value={this.state.genres}>
                            <Main 
                                movieTitle={this.state.title}
                                loading={this.state.loading}
                                movies={this.state.movies}
                                page={this.state.page}
                                ratedMovie={this.state.ratedMovie}
                                setMovieRating={this.setMovieRating}
                                tab={this.state.tab}
                                totalPages={this.state.totalPages}
                                getMovies={this.getMovies}/>
                        </GenresProvider>
                    </Online>
                    <Offline>
                        <h1>not internet</h1>
                    </Offline>
                </div>
                {/* <div className="background-color"></div> */}
                <img className="background-image"/>

            </>
        );
    }
}

