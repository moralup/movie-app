/* eslint-disable default-case */
import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import Header from '../header';
import Main from '../main';
import movieService from '../../service/movie-service'; 
import Error from '../error';
import { GenresProvider } from '../../genres-context/genres-context';
import './/app.css'

export default class FullApp extends Component{

    state = {
        data: [],
        ratedMovie: [],
        loading: false,
        found: true, 
        page: 1,
        name: null,
        switch: 'search',
        dayOrWeek: 'day',
        genres: [],
        totalPages: 1,
    };

    
    getData = async (name, page, trending) => {
        try{
            this.setState({ loading: true });
            let data;
            switch(this.state.switch){
            case 'search':
                // const ids = await movieService.getId(name, page);
                const dataObj = await movieService.getDataByKeyword(name, page);
                data = dataObj.results;
                this.setState({ totalPages: dataObj.total_pages })
                // console.log(data, ids, 'FullApp');
                break;
            case 'trending':
                data = await movieService.getDataTrending(trending);
                // console.log(data);
                break;
            case 'rated':
                data = (await movieService.getRatedMovie()).results;
                console.log(data);
                break;
            }  
            // console.log(data, 'hello')     
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

    setStateFullApp = (id, rating) => {
        const data = [...this.state.ratedMovie, { id, rating }]
        this.setState({ ratedMovie: data });
    }
    newPage = (page) => {
        this.setState({ page });
    };

    setSwitch = (swch) => {
        this.setState({ switch: swch });
    };

    setDayOrWeek = (a) => {
        this.setState({ dayOrWeek: a });
    };

    componentDidMount(){
        movieService.getGuestSessionId()
        movieService.getGenres().then(genres => this.setState({ genres }))
        
    }
    componentDidUpdate(prevProps, prevState){
        // console.log('ratedMovie fullApp' ,this.state.ratedMovie);
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
        if(prevState.switch !== this.state.switch && this.state.switch === 'rated'){
            this.setState({ data: [] });
        }
    }
    render(){
        let result;
        if(this.state.switch === 'rated' && !this.state.found){
            result = <h1>u not rate movie</h1>
        } else if(this.state.found){
            result = <Main newPage={this.newPage}
                loading={this.state.loading}
                data={this.state.data}
                ratedMovie={this.state.ratedMovie}
                setStateFullApp={this.setStateFullApp}
                page={this.state.page}
                swch={this.state.switch}
                found={!!this.state.data.length}
                totalPages={this.state.totalPages}/>;
        } else {
            result = <Error 
                problem="not-found"
                title="NOT FOUND" 
                descriptions="try searching with an another word"/>;
        }
        return (
            <div className="app">
                <Header 
                    clearState={this.clearState} 
                    getData={this.getData}
                    setSwitch={this.setSwitch}
                    swch={this.state.switch}
                    setDayOrWeek={this.setDayOrWeek}/>
                <Online>
                    <GenresProvider value={this.state.genres}>
                        {result}
                    </GenresProvider>
                </Online>
                <Offline>
                    <Error problem="not-internet" 
                        descriptions="connect to internet, please"/>
                </Offline>
            </div>
        );
    }
}
