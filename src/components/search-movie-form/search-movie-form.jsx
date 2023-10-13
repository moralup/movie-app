import { Component } from 'react';
import './search-movie-form.css';

export default class SearchMovieForm extends Component{    
    state = {
        name: '',
    };

    setNameMovie = (e) => {
        this.setState({ name: e.target.value });
        this.props.clearState();
    };

    onLabelSubmit = (e) => {
        e.preventDefault();
        this.props.getData(this.state.name);
    }

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