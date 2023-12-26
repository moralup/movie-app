import { Component } from 'react';
import './pagination.css';

export default class Pagination extends Component{
    state = {
        activePage: 1,
        pageNums: [],
    };

    componentDidMount(){
        let list = [];
        const { totalPages } = this.props;
        if(totalPages<=5){
            for(let i = 1; i<=totalPages; i++){
                list.push(i)
            }
        } else{
            list = [1, 2, 3];
        } 
        this.setState({ pageNums: list });
    }
    componentDidUpdate(prevProps, prevState){
        if(+prevState.activePage === +this.state.activePage) return;
        this.props.getMovies(this.props.movieTitle, this.state.activePage,'','search');
    }
    onActive = (e) => {
        if(isNaN(e.target.id) || +e.target.id === +this.state.activePage) return;
        const gap = e.target.id - this.state.pageNums[2];
        const activePage = e.target.id;
        if(!(gap <= 2)){
            this.setState({ activePage, pageNums: [activePage-4, activePage-3, activePage-2] });
            return;
        }
        this.setState({ activePage });
    };

    onPrevPages = () => {
        if(this.state.pageNums[0] === 1 ) return;
        const pageNums = this.state.pageNums.map(item => --item);
        if(+this.state.activePage === +this.state.pageNums[0]) this.setState({ pageNums })
        else this.setState({ pageNums, activePage: pageNums[2] });
    };
    
    onNextPages = () => {
        const { totalPages } = this.props;
        if(totalPages <= 5 || totalPages-this.state.pageNums.at(-1)===2) return;
        const pageNums = this.state.pageNums.map(item => ++item);
        if(+this.state.activePage === +this.state.pageNums[2]) this.setState({ pageNums })
        else this.setState({ pageNums, activePage: pageNums[0] });
    };

    createList = () => {
        const { totalPages } = this.props;
        const fourthNum = totalPages-this.state.pageNums.at(-1)===2 ? totalPages-1 : '...'
        const list = totalPages <= 5 ? this.state.pageNums : [...this.state.pageNums, fourthNum, totalPages]
        return list.map(item => {
            return (
                <li key={item}
                    id={item}
                    className={+this.state.activePage === item ?
                        'pagination__num-page pagination__num-page_active' : 
                        'pagination__num-page'}>{item}</li>
            );
        });
    }

    render(){
        return (
            <div className="pagination">
                <button onClick={this.onPrevPages}
                    className="pagination__arrow"/>
                <ul onClick={this.onActive} className="pagination__list">
                    {this.createList()}
                </ul>
                <button onClick={this.onNextPages} 
                    className="pagination__arrow pagination__arrow_right"/>
            </div>
        );
    }
}




