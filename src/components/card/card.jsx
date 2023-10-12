import { Component } from 'react';
import { format } from 'date-fns';
import './card.css';
import Image from '../../images/crying-anime-girl.jpg';

export default class Card extends Component{
    
    state = {
        prov: false,
    };
    
    check;
    onLabelMouseover = () => {
        if(this.props.title.length < 20) return;
        this.setState({ prov: true });
    };

    onLabelMouseout = () => {
        if(this.props.title.length < 20) return;
        this.setState({ prov: false });
    };
    
    render(){
        const { voteAverage, title, overview, img, date, genres } = this.props;
        let miniTitle = title;
        if(miniTitle.split('').length >= 20){
            miniTitle = miniTitle.split('');
            miniTitle.length = 20;
            miniTitle = miniTitle.join('');
            miniTitle += '...';
        }
        return (
            <div className="card">
                <div className="card-image-wrapper">
                    <img 
                        src={img ? `https://image.tmdb.org/t/p/original${img}` : Image}
                        className={this.state.prov ? 'card-image opacity' : 'card-image anti-opacity'}
                        alt="to movie"
                    />
                </div>
                <div className="movie-descriptions">
                    <div className="container">
                    
                        <h3 className={this.state.prov ? 
                            'movie-full-title anti-opacity' : 
                            'movie-full-title'}>
                            {title.toLowerCase()}
                        </h3>
                        <h3 onMouseOver={this.onLabelMouseover}
                            onMouseOut={this.onLabelMouseout}
                            className="movie-title">{miniTitle}
                        </h3>
                        <div className="movie-rating-circle">{voteAverage ? (+voteAverage).toFixed(1) : '?'}</div>
                    </div>
                    <p className="movie-production-date">
                        {date ? format(new Date(date), 'LLLL dd, yyyy') :
                            'no date'}</p>
                    <ul className="genres">
                        {genres.length ?
                            genres.map(genre => {
                                return (
                                    <li id={genre.id}
                                        key={genre.id}
                                        className="genre">{genre.name}
                                    </li>
                                );}) :
                            'no genres'
                        }
                    </ul>
                    <p className="movie-main-content">{overview ? overview : 'No description found'}</p>
                    <div  className="movie-rating-stars">★★★★★★★★★★</div>
                </div>    
            </div>
        );
    }
}


























// <div className='card'>
// <div className="card-image-wrapper">
// anti-opacity
// {this.state.imgOrTitle || <img 
//     src={img ? `https://image.tmdb.org/t/p/original${img}` : Image}
//     className='card-image'
//     alt='to movie'
// />}
// </div>
// <div className='movie-descriptions'>
//     <div className='container'>
//         {!this.state.imgOrTitle || <h3 className="movie-full-title">{title.toLowerCase()}</h3>}
//         <h3 onMouseOver={this.onLabelMouseover}
//             onMouseOut={this.onLabelMouseout}
//             className='movie-title'>{miniTitle}
//         </h3>
//         <div className='movie-rating-circle'>{(+voteAverage).toFixed(1)}</div>
//     </div>
//     <p className='movie-production-date'>March 5, 2020</p>
//     <div className='movie-tags'>
//         <button className='movie-tag'>Action</button>
//         <button className='movie-tag'>Drama</button>
//     </div>
//     <p className='movie-main-content'>{overview}</p>
//     <div  className='movie-rating-stars'>★★★★★★★★★★</div>
// </div>    
// </div>


















// onLabelMouseover = () => {
//     if(this.props.title.length < 20) return
//     this.check = setTimeout(() => {
//         this.setState({imgOrTitle: true})
//     }, 1000)
// }

// onLabelMouseout = () => {
//     if(this.props.title.length < 20) return
//     clearTimeout(this.check)
//     if(this.state.imgOrTitle){
//         this.setState({
//             imgOrTitle: false
//         })
//     }
// }