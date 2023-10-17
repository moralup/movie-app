import { Component } from 'react';
import { debounce } from 'lodash';
import './search-movie-form.css';

export default class SearchMovieForm extends Component{    
    state = {
        name: '',
    };

    setNameMovie = (e) => {
        this.setState({ name: e.target.value });
        this.props.clearState();
    };

    onLabelSubmitDebounce = debounce(() => {
        this.props.getData(this.state.name);
    }, 500);

    onLabelSubmit = (e) => {
        e.preventDefault();
        this.props.getData(this.state.name);
    };

    onChange = (e) => {
        this.setNameMovie(e);
        this.onLabelSubmitDebounce();
    };
    render(){
        return (
            <form onSubmit={this.onLabelSubmit}>
                <input 
                    value={this.state.name}
                    onChange={this.onChange}
                    className="search-form"
                    placeholder="Type to search...">
                </input>
            </form>
        );
    }
}