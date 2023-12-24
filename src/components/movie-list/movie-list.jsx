import { Component } from 'react';
import { debounce, throttle } from 'lodash';
import Card from '../card';
import './movie-list.css';
import ImageBkColor from '../../images/bk-color.jpg'


export default class MovieList extends Component{
    state = {
        activeMovie: null,
        event: false,
        intersecting: [],
        scrollUp: false,
    };
    componentWillUnmount(){
        this.offBackImg()
    }
    componentDidUpdate(){
        // console.log('update movie-list')
    }

    scrollUp = () => window.scrollTo(0,0);    
    stateList = (obj) => {
        this.setState(obj)
    }; 
    bkImg;
    onBackImg = debounce((backgroundPath, id) => {         
        clearTimeout(this.timer)
        const url = backgroundPath ? 
            `https://image.tmdb.org/t/p/original${backgroundPath}` :
            ImageBkColor;
        if(!this.bkImg) this.bkImg = document.querySelector('.background-image')
        this.bkImg.src = url;
        this.bkImg.onload = () => {
            if(this.state.event) this.bkImg.style.opacity = 1
        };
    }, 700);
    offBackImg = (event) => {
        if(!this.bkImg) this.bkImg = document.querySelector('.background-image')
        this.bkImg.style.opacity = 0;
        this.setState({ activeMovie: null, event: false });

    };

    getMovies = () => {
        return this.props.movies.map(movie => {
            const { id, vote_average, title, overview, poster_path,
                release_date, genres, genre_ids, backdrop_path } = movie;
            const active = +this.state.activeMovie === +movie.id;
            const visible = this.state.intersecting.includes(movie.id.toString())
            const isRated = (this.props.ratedMovie.find(({ id }) => +id === +movie.id));
            const rating = isRated ? +isRated.rating : 0;
            return (
                <Card
                    key={id}
                    id={id}
                    voteAverage={vote_average} 
                    title={title}
                    overview={overview}
                    img={poster_path}
                    date={release_date}
                    genres={genres}
                    rating={rating}
                    genreIds={genre_ids}
                    setMovieRating={this.props.setMovieRating}
                    backgroundPath={backdrop_path}
                    active={active}
                    visible={visible}
                    event={this.state.event}
                    setObserve={this.setObserve}
                    stateList={this.stateList}
                    onBackImg={this.onBackImg}
                    offBackImg={this.offBackImg}
                />
            );    
        })
    }
    setObserve = (id) => {
        const option = {
            root: null,
            rootMargin: '5px',
        };
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(this.state.intersecting.includes(entry.target.id)) return;
                    this.setState(state => ({ intersecting: [...state.intersecting, entry.target.id] }))
                } else {
                    if(!this.state.intersecting.includes(entry.target.id)) return;
                    this.setState(state => {
                        return { intersecting: state.intersecting.filter(id => id != entry.target.id) }
                    })
                }
            });
        };
        const observer = new IntersectionObserver(callback, option)        
        observer.observe(document.getElementById(id)); 
    }

    render(){
        return (
            <div className="movie-list">
                {this.getMovies()}
                {this.state.scrollUp && window.innerWidth < 700 ? <div className="scroll-up" onClick={this.scrollUp}/> : null}
            </div>
        );
    }
} 
