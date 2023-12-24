import { Component, createRef, useCallback } from 'react';
import { debounce, throttle } from 'lodash';
import { format } from 'date-fns';
import { GenresConsumer } from '../../genres-context/genres-context';
import LoadingSnake from '../loading-snake';
import './card.css';
import ImageCryingGirl from '../../images/crying-anime-girl.jpg';
import ImageBkColor from '../../images/bk-color.jpg'
import Close from '../../images/cross.svg'

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
        if(this.state.error) return;
        const rating = this.getRatPos(event)[0];
        this.setState({ loading: true, rating });
        this.props.setMovieRating(this.props.id, rating)
            .then(res => {
                if(res.status_code===1 || res.status_code===12) this.setState({ loading: false });
                else this.setState({ loading: false, error: true, rating: 10 });
            });
    };

    voteMovie = throttle((event) => {
        if(this.state.error) return;
        const [rnr, x] = this.getRatPos(event);
        const [, stars, circle] = this.ratWrap.current.children;
        stars.style.width = `${rnr*21}px`;
        circle.style.opacity = 1;
        circle.textContent = rnr;
        circle.style.borderColor = this.props.defineColor(rnr);
        circle.style.transform = `translate(${x-15}px)`;
    }, 50, { trailing: false });
    
    stopVoteMovie = () => {
        if(this.state.error) return;
        const [, stars, circle] = this.ratWrap.current.children;
        circle.style.opacity = 0;
        stars.style.width = `${this.state.rating*21}px`;        
    };
    render(){
        return (
            <>
                {this.state.loading ? 
                    <LoadingSnake/> :
                    <div
                        ref={this.ratWrap}
                        className="card__rating-wrap" 
                        onMouseMove={this.voteMovie}
                        onMouseLeave={this.stopVoteMovie}
                        onClick={this.setMovieRating}>
                        <div 
                            className="card__rating-background">
                            ★★★★★★★★★★
                        </div>
                        <div 
                            className="card__rating"
                            style={{ width: `${this.state.rating * 21}px`,
                                color: this.state.error ? 'red' : '#fadb14' }}>
                                    ★★★★★★★★★★
                        </div>
                        <div className="card__rating-circle
                            card__rating-circle_select"/>
                    </div>} 
            </>
        );
    }

}

export default class Card extends Component{
    state = {
        prov: false,
    };
    cardRef = createRef();
    cardImageRef = createRef();
    componentDidMount(){
        this.props.setObserve(this.props.id);
    };
    shouldComponentUpdate(nextProps, nextState){                   
        // return nextProps.visible&&(this.props.event!==nextProps.event||(this.props.visible!==nextProps.visible&&((this.cardRef.current.style.opacity&&!nextProps.event)||(nextProps.event&&!this.cardRef.current.style.opacity)))||this.props.active!==nextProps.active)
    return nextState.prov!==this.state.prov||(nextProps.visible&&(this.props.event!==nextProps.event||(this.props.visible!==nextProps.visible&&((this.cardRef.current.style.opacity&&!nextProps.event)||(nextProps.event&&!this.cardRef.current.style.opacity&&!nextProps.active)))||this.props.active!==nextProps.active))
    };
    componentDidUpdate(){
        console.log('update card')
    }

    defineColor = (num) => {
        let color;
        switch(true){
        case num > 7:
            color = '#66E900';
            break;
        case num > 5:
            color = '#E9D100';
            break;
        case num > 3:
            color = '#E97E00';
            break;
        case num <= 3:
            color = '#E90000';
            break;
        default: 
            color = '#f7f7f7';
            break;
        }
        return color;
    };

    getGenresList = (genresID, genresName) => {
        try {
            return genresID.map((id, i) => {
                const genre = genresName.genres.find(objGen => id === objGen.id)                
                return <li
                    key={`g${id}`}
                    className="card__genre">
                    {genre.name}
                </li>;
            })
        } catch(err){
            return null;
        }
    };
    
    onFullTitle = () => {
        if(this.props.title.length < 20 || window.innerWidth < 1024) return;
        this.cardImageRef.current.classList.add('opacity');
    };
    offFullTitle = () => {
        if(this.props.title.length < 20 || window.innerWidth < 1024) return;
        this.cardImageRef.current.classList.remove('opacity');
    };
    
    onFullImage = async (event) => {
        if(window.innerWidth >= 500) return;
        this.coordinates = window.scrollY;
        const hgt = window.innerHeight;
        const card = this.cardRef.current;
        const [imageWrap, description] = card.children;       
        const [close, image] = imageWrap.children;
        description.style.opacity = 0;
        imageWrap.style.opacity = 0;
        card.style.height = hgt >= 500 ? '500px' : '90vh'
        window.scrollTo({
            top: window.scrollY+card.getBoundingClientRect().y-20,
            behavior: 'smooth',
        });
        setTimeout(() => {
            const imgHgt = hgt >= 500 ? 480 : hgt*0.9-20;
            const imgScale = imgHgt/90;
            imageWrap.style.opacity = 1;
            image.style.transform = `scale(${imgScale})`;
            close.style.display = 'block';
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
        description.style.opacity = 0;
        setTimeout(() => {
            card.style.height = '245px';
            close.style.display = 'none';
            image.style.transform = 'scale(1)';
        }, 500);
        setTimeout(() => {
            imageWrap.style.opacity = 1;    
            description.style.opacity = 1;
            if(this.coordinates) window.scrollTo({ top: this.coordinates, behavior: 'smooth' });
        }, 1500);
    };

    onBackImg = ((event) => {         
        if(window.innerWidth < 1024 || this.props.active) return;
        // this.cardRef.current.style.transform = 'scale(1.02)';
        this.props.stateList({ activeMovie: this.props.id, event: true });

        this.props.onBackImg(this.props.backgroundPath, this.props.id);
    });
    offBackImg = (event) => {
        if(window.innerWidth < 1024) return;
        this.cardRef.current.style.transform = 'scale(1)';
        this.props.offBackImg(this.props.id);
    };
    render(){
        const { voteAverage, title, overview, img, id, date, rating, genreIds } = this.props;
        const style = !this.props.event ? null : this.props.active ?  
            { transform: 'scale(1.02)' } : { opacity: 0.2, transform: 'scale(0.98) ' };

        return (
            <div id={id}
                style={style}
                ref={this.cardRef}
                className="card"
                onMouseOver={this.onBackImg}
                onMouseLeave={this.offBackImg}>
                <div 
                    className="card__image-wrap"
                    onClick={this.onFullImage}>
                    <button 
                        onClick={this.offFullImage}
                        className="card__close-btn">
                        <img src={Close} alt="close"/>
                    </button>
                    <img 
                        ref={this.cardImageRef}
                        src={img ? `https://image.tmdb.org/t/p/original${img}` : ImageCryingGirl}
                        alt="to movie"
                    />
                    <h3 className="card__image-title">
                        {title.toLowerCase()}
                    </h3>
                </div>
                <div className="card__info">
                    <div className="card__header">
                        <h3 onMouseOver={this.onFullTitle}
                            onMouseOut={this.offFullTitle}
                            className="card__title">{title}
                        </h3>
                        <div 
                            style={{ borderColor: this.defineColor(+voteAverage) }}
                            className="card__rating-circle">
                            {voteAverage ? (+voteAverage).toFixed(1) : '?'}
                        </div>
                    </div>
                    <time className="card__date">
                        {date ? format(new Date(date), 'LLLL dd, yyyy') :
                            'no date'}
                    </time>
                    <ul className="card__genres">
                        <GenresConsumer>{ (objG) => this.getGenresList( genreIds, objG) }</GenresConsumer>
                    </ul>
                    <p 
                        className="card__descriptions">
                        {overview ? overview : 'No description found'}
                    </p>
                    <RatingStars 
                        defineColor={this.defineColor}
                        id={id}
                        rating={rating}
                        setMovieRating={this.props.setMovieRating}
                    />
                </div>    
            </div>
        );
    }
}
