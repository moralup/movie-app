import Card from '../card';
import './main.css';
import Loading from '../loading';

const Main = (props) => {
    const { data, loading, found } = props;
    let render;
    const dataArr = data.map(item => {
        return (
            <Card
                key={item.id}
                voteAverage={item.vote_average} 
                title={item.title}
                overview={item.overview}
                img={item.poster_path}
                date={item.release_date}
                genres={item.genres}
            />
        );
    });

    if(loading) render = <Loading/>
    else render = dataArr;
    return (
        <div className="main">
            {render}
        </div>
    );
};

export default Main;