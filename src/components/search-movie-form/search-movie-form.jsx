import { Component } from 'react';
import MovieService from '../../service/movie-service'; 
import './search-movie-form.css';

export default class SearchMovieForm extends Component{    
    state = {
        name: '',
    };

    movieService = new MovieService();

    onLabelSubmit = async (e) => {
        e.preventDefault();
        // this.movieService.getDataById(id).then(a => this.props.updateState({data: a}))
        const ids = await this.movieService.getId(this.state.name);
        const data = await this.movieService.getDataById(ids);
        this.props.updateState({ data: data });
    }; 

    setNameMovie = (e) => {
        this.setState({ name: e.target.value });
    };


    render(){
        return (
            <form onSubmit={this.onLabelSubmit}>
                <input 
                    value={this.state.name}
                    onChange={this.setNameMovie}
                    className="search-form"
                    placeholder="Type to search...">
                </input>
            </form>
        );
    }
}