import { Component } from 'react';
import './pagination.css';

export default class Pagination extends Component{
    
    state = {
        activePage: 1,
        pages: [1, 2, 3, 4, 5],
    };

    onActive = (e) => {
        this.setState({ activePage: e.target.id });
        this.props.newPage(e.target.id);
    };

    onPrevPages = () => {
        if(this.state.pages[0] === 1) return;
        const newPages = this.state.pages.map(item => --item);
        this.setState({ pages: newPages });
    };
    
    onNextPages = () => {
        const newPages = this.state.pages.map(item => ++item);
        this.setState({ pages: newPages });
    };

    render(){
        this.list = this.state.pages.map(item => {
            return (
                <li key={item}
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
                    {this.list}
                </ul>
                <button onClick={this.onNextPages} 
                    className="pagination-arrow pagination-arrow-right"/>
            </div>
        );
    }
}




