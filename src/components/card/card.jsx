import { Component, createRef } from 'react';
import { throttle } from 'lodash';
import { format } from 'date-fns';
import { GenresConsumer } from '../../genres-context/genres-context';
import LoadingSnake from '../loading-snake';
import Close from '../../images/cross.svg';
import imageCryingGirl from '../../images/crying-anime-girl.jpg';
import './card.css';

class RatingStars extends Component{
    state = {
        rating: this.props.rating,
        loading: false,
        error: false,
    };
    ratWrap = createRef();
    getRatPos = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const rnr = Math.round((x/20.8) * 2) * 0.5; // rounding the rating number to 0.5        
        return [rnr, x];
    };

    setMovieRating = async (event) =>{
        if(this.state.error||this.props.notFound) return;
        const rating = this.getRatPos(event)[0];
        if(this.props.notRated){
            document.querySelector('.card__title').textContent = 'rated';
            document.querySelector('.card__descriptions').innerHTML = 'you havent rated any movie <b>except this one</b>';
            this.stopVoteMovie();
            this.setState({ error: true, rating });   
            return;         
        }
        this.setState({ loading: true, rating });
        this.props.setMovieRating(this.props.id, rating)
            .then(res => {
                if(res.status_code===1||res.status_code===12) this.setState({ loading: false });
                else this.setState({ loading: false, error: true, rating: 10 });
            });
    };

    voteMovie = throttle((event) => {
        if(this.state.error||this.props.notFound) return;
        const [rnr, x] = this.getRatPos(event);
        const [, stars, circle] = this.ratWrap.current.children;
        stars.style.width = `${rnr*21}px`;
        circle.style.opacity = 1;
        circle.textContent = rnr;
        circle.style.borderColor = this.props.defineColor(rnr);
        circle.style.transform = `translate(${x-15}px)`;
    }, 50, { trailing: false });
    
    stopVoteMovie = () => {
        const [, stars, circle] = this.ratWrap.current.children;
        circle.style.opacity = 0;
        circle.style.transform = `translate(${this.state.rating*21-15}px)`;
        circle.textContent = this.state.rating;
        stars.style.width = `${this.state.rating*21}px`;        
    };
    render(){
        return (
            this.state.loading ? 
                <LoadingSnake/> :
                <div
                    ref={this.ratWrap}
                    className="card__rating-wrap" 
                    onMouseMove={this.voteMovie}
                    onMouseLeave={this.stopVoteMovie}
                    onClick={this.setMovieRating}>
                    <div className="card__rating-background">
                        ★★★★★★★★★★
                    </div>
                    <div className="card__rating"
                        style={{
                            width: `${this.state.rating * 21}px`,
                            color: this.state.error ? 'red' : '#fadb14' }}>
                                ★★★★★★★★★★
                    </div>
                    <div className="card__rating-circle
                        card__rating-circle_select"/>
                </div> 
        );
    }

}

export default class Card extends Component{
    cardRef = createRef();
    cardImageRef = createRef();
    componentDidMount(){
        if(this.props.setObserve) this.props.setObserve(this.props.id);
    };
    shouldComponentUpdate(nextProps, nextState){                   
        return (nextProps.visible&&(this.props.event!==nextProps.event||(this.props.visible!==nextProps.visible&&((this.cardRef.current.style.opacity&&!nextProps.event)||(nextProps.event&&!this.cardRef.current.style.opacity&&!nextProps.active)))||this.props.active!==nextProps.active));
    };

    defineColor = (num) => {
        let color;
        switch(true){
        case num > 7: color='#66E900'; break;
        case num > 5: color='#E9D100'; break;
        case num > 3: color='#E97E00'; break;
        case num <= 3: color='#E90000'; break;
        default: color='#f7f7f7'; break;}
        return color;
    };
    
    getGenresList = (genresID, genresName) => {
        if(!Array.isArray(genresID)) return <p className="card__genre">no genres</p>;
        return genresID.map((id, i) => {
            const genre = genresName.genres.find(objGen => id === objGen.id);                
            return <li
                key={`g${id}`}
                className="card__genre">
                {genre.name}
            </li>;
        });
    };

    onFullTitle = () => {
        if(this.props.title.length < 20 || window.innerWidth < 1024) return;
        this.cardImageRef.current.classList.add('opacity02');
    };
    offFullTitle = () => {
        if(this.props.title.length < 20 || window.innerWidth < 1024) return;
        this.cardImageRef.current.classList.remove('opacity02');
    };
    
    onFullImage = async () => {
        if(window.innerWidth >= 500) return;
        this.coordinates = window.scrollY;
        const wdt = window.innerWidth;
        const cardWidth = wdt<350 ? wdt : 0.9*wdt;
        const card = this.cardRef.current;
        const [imageWrap, description] = card.children;       
        const [closeImgBtn, image] = imageWrap.children;
        description.style.opacity = imageWrap.style.opacity = 0; 
        card.style.height = `${cardWidth*1.5}px`;
        window.scrollTo({
            top: window.scrollY+card.getBoundingClientRect().y-20,
            behavior: 'smooth',
        });
        setTimeout(() => {
            const height = cardWidth*1.5-20;
            const width = cardWidth-20;
            imageWrap.style.opacity = 1;
            image.style.transform = `scale(${width/60}, ${height/90})`;
            closeImgBtn.style.display = 'block';
            window.scrollTo({
                top: window.scrollY+card.getBoundingClientRect().y-20,
                behavior: 'smooth',
            });    
        }, 900);
    };
    offFullImage = (event) => {
        event.stopPropagation();
        if(window.innerWidth >= 500) return;
        const card = event.target.closest('.card');
        const [imageWrap, description] = card.children;
        const [close, image] = imageWrap.children;
        imageWrap.style.opacity = 0;
        close.style.display = 'none';
        setTimeout(() => {
            card.style.height = '245px';
            image.style.transform = 'scale(1)';
        }, 500);
        setTimeout(() => {
            description.style.opacity = imageWrap.style.opacity = 1; 
            if(this.coordinates) window.scrollTo({ top: this.coordinates, behavior: 'smooth' });
        }, 1200);
    };

    onBackImg = () => {         
        if(window.innerWidth < 1024 || this.props.active) return;
        this.props.setStateForMovieList({ activeMovie: this.props.id, event: true });
        this.props.onBackImg(this.props.backgroundPath, this.props.id);
    };
    offBackImg = () => {
        if(window.innerWidth < 1024) return;
        this.props.offBackImg(this.props.id);
    };

    render(){
        const { title, voteAverage, overview, posterPath, id, date, rating, genreIds, notRated, notFound } = this.props;
        const style = !this.props.event ? null : this.props.active ?  
            { transform: 'scale(1.02)' } : { opacity: 0.2, transform: 'scale(0.98) ' };

        return (
            <div className="card" 
                ref={this.cardRef}
                id={id}
                style={style}
                onMouseOver={this.onBackImg}
                onMouseLeave={this.offBackImg}>
                <div className="card__image-wrap"
                    onClick={this.onFullImage}>
                    <button className="card__close-btn"
                        onClick={this.offFullImage}>
                        <img src={Close} alt="close"/>
                    </button>
                    <img ref={this.cardImageRef}
                        src={posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : imageCryingGirl}
                        alt="to movie"/>
                    <h3 className="card__image-title">{title.toLowerCase()}</h3>
                </div>
                <div className="card__info">
                    <div className="card__header">
                        <h3 className="card__title"
                            onMouseOver={this.onFullTitle}
                            onMouseOut={this.offFullTitle}>
                            {title}
                        </h3>
                        <div className="card__rating-circle"
                            style={{ borderColor: this.defineColor(+voteAverage) }}>
                            {voteAverage? (+voteAverage).toFixed(1) : '?'}
                        </div>
                    </div>
                    <time className="card__date">
                        {date? format(new Date(date), 'LLLL dd, yyyy') : 'no date'}
                    </time>
                    <ul className="card__genres">
                        <GenresConsumer>{ (objG) => this.getGenresList( genreIds, objG) }</GenresConsumer>
                    </ul>
                    <p className="card__descriptions">
                        {overview || 'No description found'}
                    </p>
                    <RatingStars 
                        defineColor={this.defineColor}
                        id={id}
                        rating={rating}
                        setMovieRating={this.props.setMovieRating}
                        notRated={notRated}
                        notFound={notFound}
                    />
                </div>    
            </div>
        );
    }
}
