import { Component } from 'react';
import { debounce } from 'lodash';
import './search-movie-form.css';

export default class SearchMovieForm extends Component{    
    state = {
        title: '',
    };
    componentWillUnmount(){
        this.check = true
    }
    setTitleMovie = (e) => {
        const arr = e.target.value.split('');
        const title = e.target.value ? 
            arr.reduce((acc, cur) => (cur===' ' && acc.at(-1) === ' ') ? acc : acc+cur) : '';
        if(e.target.value === title) this.setState({ title });
        if(title.at(-1) !== ' ' || this.state.title.at(-1) !== ' ') this.onLabelSubmitDebounce();    
    };
    onLabelSubmitDebounce = debounce(() => {
        if(this.check) return
        this.props.getMovies(this.state.title, 1, '', 'search');
    }, 1000);

    render(){
        return (
            <form
                className="header__search-form">
                <input 
                    value={this.state.title}
                    onChange={this.setTitleMovie}
                    className="header__search-field"
                    placeholder="Type to search...">
                </input>
            </form>
        );
    }
}