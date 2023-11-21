import { Component } from 'react';
import './pagination.css';



export default class Pagination extends Component{
    
    state = {
        activePage: 1,
        pageNum: [],
    };
    componentDidMount(){
        let list = [];
        const { totalPages } = this.props
        if(totalPages<=5){
            for(let i = 1; i<=totalPages; i++){
                list.push(i)
            }
        } else{
            list = [1, 2, 3]
        } 
        this.setState({ pageNum: list })
    }
    componentDidUpdate(prevProps, prevState){
        if(+prevState.activePage !== +this.state.activePage) this.props.newPage(this.state.activePage);
    }
    onActive = (e) => {
        if(isNaN(e.target.id) || +e.target.id === +this.state.activePage) return
        this.setState({ activePage: e.target.id });
        // console.log(e.target.id, this.state.activePage, +e.target.id === this.state.activePage)
    };

    onPrevPages = () => {
        if(this.state.pageNum[0] === 1 ) return;
        const newPages = this.state.pageNum.map(item => --item);
        if(+this.state.activePage === +this.state.pageNum[0]) this.setState({ pageNum: newPages })
        else this.setState(state => ({ pageNum: newPages, activePage: newPages[2] }));
    };
    
    onNextPages = () => {
        const { totalPages } = this.props;
        if(totalPages <= 5 || totalPages-this.state.pageNum.at(-1)===2) return;
        const newPages = this.state.pageNum.map(item => ++item);
        if(+this.state.activePage === +this.state.pageNum[2]) this.setState({ pageNum: newPages })
        else this.setState(state => ({ pageNum: newPages, activePage: newPages[0] }));
    };

    render(){
        const { totalPages } = this.props;
        const ell = totalPages-this.state.pageNum.at(-1)===2 ? totalPages-1 : '...'
        const list = totalPages <= 5 ? this.state.pageNum : [...this.state.pageNum, ell, totalPages]
        this.renderList = list.map(item => {
            return (
                <li key={item*Math.random()}
                    id={item}
                    className={+this.state.activePage === item ?
                        'pagination-item pagination-item-active' : 
                        'pagination-item'}>{item}</li>
            );
        });

        return (
            <div className="pagination">
                <button onClick={this.onPrevPages}
                    className="pagination-arrow pagination-arrow-left"/>
                <ul onClick={this.onActive} className="pagination-list">
                    {this.renderList}
                </ul>
                <button onClick={this.onNextPages} 
                    className="pagination-arrow pagination-arrow-right"/>
            </div>
        );
    }
}




