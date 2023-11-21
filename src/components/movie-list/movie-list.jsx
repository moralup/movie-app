import { Component } from 'react';
import Card from '../card';
import Loading from '../loading';
import './movie-list.css';


export default class MovieList extends Component{
    state = {
        activeMovie: null,
        event: false,
        intersecting: [],
    };

    componentDidMount(){
        console.log('AAAAAAAA')
        // setTimeout(() => this.setObserve(), 4000 )
    }
    componentDidUpdate(prevProps, prevState){
        // console.log('..........')
        // console.log(this.state.intersecting)
        // console.log('update')
        if(prevProps.data !== this.props.data){
            // console.log('vizivaem', prevProps, this.props)
            this.setObserve()
    
        }

    }
    
    stateList = (obj) => {
        this.setState(obj)
    } 

    getMovies = () => {
        return this.props.data.map(movie => {
            const active = +this.state.activeMovie === +movie.id;
            const opacity = this.state.intersecting.includes(movie.id.toString())
            return (
                <Card
                    key={movie.id}
                    id={movie.id}
                    voteAverage={movie.vote_average} 
                    title={movie.title}
                    overview={movie.overview}
                    img={movie.poster_path}
                    date={movie.release_date}
                    genres={movie.genres}
                    swch={this.props.swch}
                    rating={this.props.rating}
                    genreIds={movie.genre_ids}
                    setStateFullApp={this.props.setStateFullApp}
                    backgroundPath={movie.backdrop_path}
                    active={active}
                    opacity={opacity}
                    event={this.state.event}
                    setObserve={this.setObserve}
                    stateList={this.stateList}
                />
            );    
        })
    }

    setObserve = (id) => {
        const option = {
            root: null,
            rootMargin: '5px',
            // threshold: 0.5,
        };

        const callback = (entries, observer) => {
            let result = [...this.state.intersecting];
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(this.state.intersecting.includes(entry.target.id)) return;
                    result.push(entry.target.id)
                } else {
                    if(!this.state.intersecting.includes(entry.target.id)) return
                    result = result.filter(div => div != entry.target.id)    
                }
            });
            // console.log(result)
            this.setState({ intersecting: result })
        };

        const observer = new IntersectionObserver(callback, option)        
        // observer.observe(document.getElementById(id)); 
        document.querySelectorAll('.card').forEach(card => observer.observe(card)); 
    }

    render(){

        return (
            <>
                <div className="background"/>
                <div className="movie-list">
                    {this.props.lading ? <Loading/> : this.getMovies()}
                </div>
            </>
        );
    }
} 
