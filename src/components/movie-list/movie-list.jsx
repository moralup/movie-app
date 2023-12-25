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
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    };
    componentWillUnmount(){
        this.offBackImg();
        window.removeEventListener('scroll', this.handleScroll);
    };
    handleScroll = () => {
        switch(true){
        case !this.scrollUpBtn: this.scrollUpBtn = document.querySelector('.scroll-up'); break;
        case !this.scrollUpBtn.classList.contains('opacity0')&&window.scrollY<=3000: this.scrollUpBtn.classList.add('opacity0'); break; 
        case this.scrollUpBtn.classList.contains('opacity0')&&window.scrollY>3000: this.scrollUpBtn.classList.remove('opacity0'); break;
        }
    };
    scrollUp = () =>window.scrollY>3000? window.scrollTo(0,0) : null;    
    stateList = (obj) => this.setState(obj);
    onBackImg = debounce((backgroundPath, id) => {         
        const url = backgroundPath ? 
            `https://image.tmdb.org/t/p/original${backgroundPath}` :
            ImageBkColor;
        if(!this.bkImg) this.bkImg = document.querySelector('.background-image');
        this.bkImg.src = url;
        this.bkImg.onload = () => {
            if(this.state.event) this.bkImg.style.opacity = 1;
        };
    }, 700);
    offBackImg = (event) => {
        if(!this.bkImg) this.bkImg = document.querySelector('.background-image');
        this.bkImg.style.opacity = 0;
        this.setState({ activeMovie: null, event: false });
    };

    getMovies = () => {
        const observe = this.setObserve();
        return this.props.movies.map(movie => {
            const { id, vote_average, title, overview, poster_path,
                release_date, genres, genre_ids, backdrop_path, notRated } = movie;
            const active = +this.state.activeMovie === +movie.id;
            const visible = this.state.intersecting.includes(movie.id.toString());
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
                    setObserve={observe}
                    stateList={this.stateList}
                    onBackImg={this.onBackImg}
                    offBackImg={this.offBackImg}
                    notRated={notRated}
                />
            );    
        });
    };



    setObserve = () => {
        if(window.innerWidth < 1024) return false
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
        const observer = new IntersectionObserver(callback, option);      
        return (id) => observer.observe(document.getElementById(id)) 
    };

    render(){
        return (
            <div className="movie-list" >
                {this.getMovies()}
                <div className="scroll-up opacity0" onClick={this.scrollUp}/>
            </div>
        );
    }
} 
