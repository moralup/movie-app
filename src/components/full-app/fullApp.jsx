import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import Header from '../header';
import Main from '../main';
import MovieService from '../../service/movie-service'; 
import Error from '../error';

export default class FullApp extends Component{

    state = {
        data: [],
        loading: false,
        found: true, 
        page: 1,
        name: null,
        switch: 'search',
        dayOrWeek: 'day',
    };

    movieService = new MovieService();
    
    getData = async (name, page, trending) => {
        try{
            this.setState({ loading: true });
            let data;
            if(this.state.switch === 'search'){
                const ids = await this.movieService.getId(name, page);
                data = await this.movieService.getDataById(ids);
            } else if(this.state.switch === 'trending'){
                const dataObj = await this.movieService.getDateTrending(trending);
                data = dataObj.results;
            }            
            this.setState({ data, loading: false, found: true, name });
            if(!data.length) this.setState({ found: false });
        }
        catch(err){
            this.setState({ loading: false, found: false });
        }
    }; 

    clearState = () => {
        this.setState({ loading: false, found: true });
    };

    newPage = (page) => {
        this.setState({ page });
    };

    setSwitch = (swch) => {
        this.setState({ switch: swch });
    };

    setDayOrWeek = (a) => {
        this.setState({ dayOrWeek: a });
    };

    componentDidUpdate(prevProps, prevState){
        if(this.state.switch === 'trending' && this.state.dayOrWeek !== prevState.dayOrWeek){
            this.setState({ page: 1 });
            this.getData(this.state.name, this.state.page, this.state.dayOrWeek);
            return;   
        }
        if(prevState.switch !== this.state.switch && this.state.switch === 'search'){
            this.setState({ data: [], dayOrWeek: 'day' });   
            return;
        }
        if(prevState.switch !== this.state.switch || +this.state.page !== +prevState.page){
            this.getData(this.state.name, this.state.page, this.state.dayOrWeek);    
            return;
        }
    }
    render(){
        return (
            <>
                <Header 
                    clearState={this.clearState} 
                    getData={this.getData}
                    setSwitch={this.setSwitch}
                    swch={this.state.switch}
                    setDayOrWeek={this.setDayOrWeek}/>
                <Online>
                    {this.state.found ?
                        <Main newPage={this.newPage}
                            loading={this.state.loading}
                            data={this.state.data}
                            page={this.state.page}
                            swch={this.state.switch}
                            found={!!this.state.data.length}/> :
                        <Error title="NOT FOUND" descriptions="try searching with an another word"/>
                    }
                </Online>
                <Offline><Error descriptions="connect to internet, please"/></Offline>
            </>
        );
    }
}
