import { Component } from 'react';
import { debounce } from 'lodash';
import './search-movie-form.css';

export default class SearchMovieForm extends Component{    
    state = {
        title: '',
    };
    componentWillUnmount(){
        this.abort = true;
    }
    setTitleMovie = (e) => {
        const arr = e.target.value.split('');
        const title = e.target.value ? 
            arr.reduce((acc, cur) => (cur===' ' && acc.at(-1) === ' ') ? acc : acc+cur) : '';
        if(e.target.value === title) this.setState({ title });
        if(title.at(-1)!==' ') this.onLabelSubmitDebounce();    
    };
    onLabelSubmitDebounce = debounce(() => {
        if(this.abort) return;
        this.props.getMovies(this.state.title, 1, '', 'search');
    }, 1000);

    render(){
        return (
            <form className="header__search-form">
                <input className="header__search-field"
                    value={this.state.title}
                    placeholder="Type to search..."
                    onChange={this.setTitleMovie}>
                </input>
            </form>
        );
    }
}