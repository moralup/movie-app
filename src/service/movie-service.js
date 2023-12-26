/* eslint-disable default-case */
/* eslint-disable indent */
 
class MovieService {
    
    _apiBase = 'https://api.themoviedb.org/3/';
    _apiKey = 'f567463f5d4fd0634a4c7d9d54f0f5a8';
    guestSessionId = null;    

    fullURL = (endPoint, params = '') => {
        return `${this._apiBase}${endPoint}?api_key=${this._apiKey}${params}`;
    };

    ask = async (url, method = 'get', value) => {
        const data = {
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        };
        switch(method){
            case 'post':
                data.method = 'POST';
                data.body = value;
                data.headers = {
                    ...data.headers,
                    Authorization: 'Bearer f567463f5d4fd0634a4c7d9d54f0f5a8',
                };
                break;
            case 'delete':
                data.method = 'DELETE';
                break;
            case 'get':
                data.method = 'GET';
                break;
        };
        return fetch(url, data).then(res => res.json());
    };
 
    getGenres = () => {
        const url = this.fullURL('genre/movie/list', '&language=en');
        return this.ask(url);
    };

    getGuestSessionId = async () => {
        const url = this.fullURL('authentication/guest_session/new');
        this.guestSessionId = (await this.ask(url)).guest_session_id;
    };
    
    getMovieByKeyword = (keyWord, page=1) => {
        const url = this.fullURL( 'search/movie', `&query=${keyWord}&page=${page}`);
        return this.ask(url);
    };

    getTrendingMovie = async (period) => {
        const url = this.fullURL(`trending/movie/${period}`, '&language=ru');
        return (await this.ask(url)).results; 
    };

    getRatedMovie = async () => {
        const url = this.fullURL(`guest_session/${this.guestSessionId}/rated/movies`,
        '&language=en-US&page=1&sort_by=created_at.asc&api_key=f567463f5d4fd0634a4c7d9d54f0f5a8',);
        return this.ask(url);
    };

    setMovieRating = async (movieId, rating = 5) => {
        const url = this.fullURL(`movie/${movieId}/rating`, `&guest_session_id=${this.guestSessionId}`);
        const response = await this.ask(url, 'post', `{"value":${rating}}`);
        return response;
    };
}

export default new MovieService();








// getToken = async () => {
//     console.log('start')
//     // const api = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=f567463f5d4fd0634a4c7d9d54f0f5a8')
//         // .then(response => response.json())
//         // .then(response => response.guest_session_id);
//     setTimeout(() => {
//         const api = 'ce7d2c9a5ff4dba5a5da46dcf9bfa266';
//         console.log('rate', api)
//         const options = {
//             method: 'POST',
//             headers: {
//                 accept: 'application/json',
//                 'Content-Type': 'application/json;charset=utf-8',
//                 Authorization: 'Bearer f567463f5d4fd0634a4c7d9d54f0f5a8',
//             },
//             body: '{"value":9.5}',
//         };  
//         fetch(`https://api.themoviedb.org/3/movie/1154598/rating?guest_session_id=${api}&api_key=f567463f5d4fd0634a4c7d9d54f0f5a8`, options)
//             .then(response => response.json())
//             .then(response => console.log(response))
//             .catch(err => console.error(err));
//     }, 10);

//     setTimeout(() => {
//         const api = 'ce7d2c9a5ff4dba5a5da46dcf9bfa266';
//         console.log('rated list movie', api);
//         const options = {
//             method: 'GET',
//             headers: {
//                 accept: 'application/json',
//                 Authorization: 'Bearer f567463f5d4fd0634a4c7d9d54f0f5a8',
//             },
//         };  
//         fetch(`https://api.themoviedb.org/3/guest_session/${api}/rated/movies?language=en-US&page=1&sort_by=created_at.asc&api_key=f567463f5d4fd0634a4c7d9d54f0f5a8`, options)
//             .then(response => response.json())
//             .then(response => console.log(response))
//             .catch(err => console.error(err));


//     }, 10000);

// }; 








