import Card from '../card';
import Loading from '../loading';
import './movie-list.css';


export default (props) => {

    const { data, loading, swch } = props;

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
                swch={swch}
            />
        );
    });

    let render;

    if(loading) render = <Loading/>;
    else render = dataArr;
    
    return (
        <div className="movie-list">
            {render}
        </div>
    );
};