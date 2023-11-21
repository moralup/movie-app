import { Component } from 'react';
import { format } from 'date-fns';
import { GenresConsumer } from '../../genres-context/genres-context';
import { LoadingStar } from '../loading-star/loading-star';
import movieService from '../../service/movie-service';
import './card.css';
import Image from '../../images/crying-anime-girl.jpg';
import xzImage from '../../images/cross.svg'

class RatingStars extends Component{
    state = {
        width: '0px',
        rating: 0,
        loading: false,
    }

    wrap = null;
    
    componentDidMount(){
        if(!isNaN(this.props.rating)) this.setState({ rating: this.props.rating })
        // console.log('state rating: ',this.state.rating, 'props rating: ', this.props.rating);
        // this.wrap[1].style.width = `${this.state.rating*21}px`
    }
    getMovieRating = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; //x position within the element.
        const rnr = Math.round((x/20.8) * 2) * 0.5 // rounding the rating number to 0.5        
        return rnr;
    }

    setRatingMovie = async (event) =>{
        const rating = this.getMovieRating(event)
        this.setState({ loading: true, rating })
        movieService.setMovieRate(this.props.id, this.getMovieRating(event)).then(() => this.setState({ loading: false }));
        this.props.setStateFullApp(this.props.id, rating)
    }

    voteMovie = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left; // x position within the element.
        const rnr = this.getMovieRating(event)        
        console.log(rnr, x);
        this.wrap = event.currentTarget.children;
        this.wrap[1].style.width = `${rnr*21}px`
        this.wrap[2].textContent = rnr // rounding the rating number to 0.5
        this.wrap[2].style.left = `${x-15}px`;
        this.wrap[2].style.display = 'block';
        this.wrap[2].style.borderColor = this.props.defineColor(rnr);
    };
    
    sebalsa = () => {
        if(!this.wrap) return;
        this.wrap[2].style.display = 'none';
        this.wrap[1].style.width = this.state.rating ? `${this.state.rating*21}px` : '0px'
        // alert(this.state.rating)
    };
    render(){
        return (
            <>

                {this.state.loading ? 
                    <LoadingStar /> :
                    <div 
                        className="wrapper-movie-rating" 
                        onMouseMove={this.voteMovie}
                        onMouseLeave={this.sebalsa}
                        onClick={this.setRatingMovie}>
                        <div 
                            className="movie-rating-stars-background">
                            ★★★★★★★★★★
                        </div>
                        <div 
                            style={{ width: `${this.state.rating * 21}px` }}
                            className="movie-rating-stars">
                                    ★★★★★★★★★★
                        </div>
                        <div className="movie-rating-circle selected-rating"></div>
                    </div>} 
            </>
        );
    }

}

export default class Card extends Component{
    
    state = {
        prov: false,
        opacity: true,
    };

    
    componentWillUnmount(){
        document.body.style.backgroundImage = null;
    }
    
    componentDidMount(){
        const check = this.props.setObserve(this.props.id);
        // if(check) console.log(this.props.title)
    }
    
    shouldComponentUpdate(nextProps){
        if(nextProps.opacity) return true
        return false
    }

    componentDidUpdate(prevProps, prevState){
        // console.log(document.getElementById(this.props.id))
        // if(this.props.active) alert(this.props.title)
        // const check = this.props.setObserve(this.props.id);        
        // if(this.props.active){
            // if(!this.state.opacity) this.setState({ opacity: true })
            // const url = `https://image.tmdb.org/t/p/original${this.props.backgroundPath}`;
            // document.body.style.backgroundImage = `url(${url})`;    
            // console.log(this.props.title, 'active')
        // }
        // else {
            // console.log(this.props.title, 'no active')
            // if(this.state.opacity !== prevState.opacity || prevProps.active) return
            // this.setState(state => ({ opacity: !state.opacity }))
        // }
    }
    check;
    onLabelMouseover = () => {
        if(this.props.title.length < 20) return;
        this.setState({ prov: true });
    };

    onLabelMouseout = () => {
        if(this.props.title.length < 20) return;
        this.setState({ prov: false });
        
    };
    
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
            color = '#E90000';
            break;
        }
        return color;
    };
    
    getGenresList = (genresID, genresName) => {
        try {
            return genresID.map(id => {
                const genre = genresName.genres.find(objGen => id === objGen.id)
                return <li
                    key={`g${id}`}
                    className="genre">
                    {genre.name}
                </li>;
            })
        } catch(err){
            // console.log(genresID, genresName)
            return null
        }
    };


    fullImage = (event) => {
        const rect = event.target.getBoundingClientRect();        
        this.coordinates =  window.scrollY
        const card = event.target.closest('.card');
        const [image, description] = card.children        
        

        window.scrollTo({
            top: window.scrollY+card.getBoundingClientRect().y-20,
            behavior: 'smooth',
        });



        description.style.opacity = 0;
        image.style.opacity = 0;
  
        // card.style.transform = 'scaleY(2)'
        // const screenW = window.screen.availWidth;
        // const screenH = window.screen.availHeight;
        card.style.height = window.screen.availHeight >= 600 ? '600px' : '90vh'
         
        // card.style.transform = `scaleY(${x})`
        // image.style.backgroundColor = '#f7f7f7'
        // image.classList.add('full-image')
        setTimeout(() => {
            image.children[0].style.display = 'block'
            image.style.height = window.screen.availHeight >= 600 ? '580px' : '85vh'
            image.style.width = '365px'                
            image.style.opacity = 1
            image.children[0].style.opacity = 1

            const list = [...card.closest('.movie-list').children]; 
            if(list[list.length-1] === card || list[list.length-2] === card){
                console.log('last')
                window.scrollTo({
                    top: window.scrollY+card.getBoundingClientRect().y-20,
                    behavior: 'smooth',
                });    
            }
        }, 1000)
        // image.children[0].style.height = '85vh'
        // image.children[0].style.width = '95vw'






        // event.target.parentElement.style.width = '368px'
        // event.target.parentElement.style.height = '225px'
        // event.target.parentElement.style.transformOrigin = 'center left'        
        // event.target.parentElement.style.transform = 'scale(6, 6)'
        // document.body.style.backgroundImage = `url(${event.target.src})`
        // document.querySelector('.background').style.opacity = 0
        // event.target.parentElement.style.width = '80vw'
        // event.target.parentElement.style.height = '80vh'
        // this.onMouseOver(event.target.src)
    }


    minImage = (event) => {
        
        console.log(window.scrollY)
        event.stopPropagation()
        const card = event.target.closest('.card');
        const [image, description] = card.children
        description.style.opacity = 0;
        image.style.opacity = 0;
        setTimeout(() => {
            image.children[0].style.display = 'none'
            image.style.height = '90px';
            image.style.width = '60px';
            card.style.height = '245px'
        }, 500)

        setTimeout(() => {
            description.style.opacity = 1;
            image.style.opacity = 1;    
            console.log(this.coordinates)
            if(this.coordinates) window.scrollTo({ top: this.coordinates, behavior: 'smooth' })
        }, 1000)
    }

    onMouseOver = (urlka) => {
        return
        this.props.stateList({ activeMovie: this.props.id, event: true })
        const url = `https://image.tmdb.org/t/p/original${this.props.backgroundPath}`;
        if(urlka) document.body.style.backgroundImage = `url(${urlka})`
        else document.body.style.backgroundImage = this.props.backgroundPath ? `url(${url})` : null;
        const background = document.querySelector('.background');
        background.style.opacity = 0
    };

    onMouseLeave = () => {
        return
        this.props.stateList({ activeMovie: null, event: false })
        const background = document.querySelector('.background');
        background.style.opacity = '1'
        // if(!this.props.active) return         
        // alert(`leave ${this.props.title} ${this.state.opacity} ${this.props.active}`)
        // this.props.stateList({ activeMovie: null, event: false })
        // this.setState({ opacity: true })
        // document.body.style.backgroundImage = '';
        // this.setState({ active: true })
    }

    render(){
        const { voteAverage, title, overview, img, id, date, rating, swch, genreIds } = this.props;
        // let genresRender;
        let miniTitle = title;
        if(miniTitle.split('').length >= 20){
            miniTitle = miniTitle.split('');
            miniTitle.length = 20;
            miniTitle = miniTitle.join('');
            miniTitle += '...';
        }
        const style = (this.props.opacity && !this.props.active && this.props.event) 
            ? { opacity: 0.1 } : {} 
            return (
            <div id={id}
                style={style}
                className="card"
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}>
                
                <div 
                    className="card-image-wrapper"
                    onClick={this.fullImage}>
                    <button 
                        onClick={this.minImage}
                        className="close-btn">
                        <img id="close-img" className="close-img" src={xzImage} alt="close"/>
                    </button>
                    <img 
                        src={img ? `https://image.tmdb.org/t/p/original${img}` : Image}
                        className={this.state.prov ? 'card-image opacity' : 'card-image anti-opacity'}
                        alt="to movie"
                    />
                </div>
                <div className="movie-descriptions">
                    <div className="card-header">
                    
                        <h3 className={this.state.prov ? 
                            'movie-full-title anti-opacity' : 
                            'movie-full-title'}>
                            {title.toLowerCase()}
                        </h3>
                        <h3 onMouseOver={this.onLabelMouseover}
                            onMouseOut={this.onLabelMouseout}
                            className="card-title">{miniTitle}
                        </h3>
                        <div 
                            style={{ borderColor: this.defineColor(+voteAverage) }}
                            className="movie-rating-circle">
                            {voteAverage ? (+voteAverage).toFixed(1) : '?'}
                        </div>
                    </div>
                    <time className="card-date">
                        {date ? format(new Date(date), 'LLLL dd, yyyy') :
                            'no date'}
                    </time>
                    <ul className="genres">
                        <GenresConsumer>{ (objG) => this.getGenresList( genreIds, objG) }</GenresConsumer>
                    </ul>
                    <p 
                        className="movie-main-content">
                        {overview ? overview : 'No description found'}
                    </p>
                    <RatingStars 
                        defineColor={this.defineColor}
                        id={id}
                        rating={rating}
                        setStateFullApp={this.props.setStateFullApp}
                    />
                </div>    
            </div>
        );
    }
}
