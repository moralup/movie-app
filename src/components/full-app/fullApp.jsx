import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline'
import Header from '../header';
import Main from '../main';
import MovieService from '../../service/movie-service'; 
import Error from '../error';
import './fullApp.css';

export default class FullApp extends Component{

    state = {
        data: [],
        loading: false,
        found: true, 
    };

    movieService = new MovieService();

    getData = async (name) => {
        try{
            this.setState({ loading: true });
            const ids = await this.movieService.getId(name);
            const data = await this.movieService.getDataById(ids);
            this.setState({ data, loading: false, found: true });
            if(!data.length) this.setState({ found: false });
        }
        catch(err){
            this.setState({ loading: false, found: false });
        }
    }; 

    clearState = () => {
        this.setState({ loading: false, found: true })
    }
    render(){
        return (
            <>
                <Header clearState={this.clearState} getData={this.getData}/>
                <Online>
                    {this.state.found ?
                        <Main loading={this.state.loading} data={this.state.data}/> :
                        <Error title="NOT FOUND" descriptions="try searching with an another word"/>
                    }
                </Online>
                <Offline><Error descriptions="connect to internet, please"/></Offline>
            </>
        );
    }
}
