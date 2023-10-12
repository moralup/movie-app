import Card from '../card';
import './main.css';

const Main = (props) => {
    return (
        <div className="main">
            {props.data.map(item => {
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
            })}
        </div>
    );
};

export default Main;