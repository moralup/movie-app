export default class MovieService {
    _apiBase = 'https://api.themoviedb.org/';

    getDataById = async (id) => {
        let data;
        if (!Array.isArray(id)){
            data = await fetch(`${this._apiBase}/3/movie/${id}?api_key=f567463f5d4fd0634a4c7d9d54f0f5a8`); 
            const dataJSON = await data.json();
            return dataJSON;
        } else {
            data = await Promise.all(id.map(async item => {
                const movie = await fetch(`${this._apiBase}/3/movie/${item}?api_key=f567463f5d4fd0634a4c7d9d54f0f5a8`);
                const movieJSON = await movie.json();
                return movieJSON;
            }));
            // console.log(data)
            return data;
        }
    };
    
    getDataByKeyword = async (keyWord, page) => {
        const data = await fetch(`
        ${this._apiBase}/3/search/movie?query=${keyWord}&api_key=f567463f5d4fd0634a4c7d9d54f0f5a8&page=${page}`);
        const dataJSON = await data.json();
        
        return dataJSON;
    };
    
    getId = async (keyWord, page=1) => {
        const dataJSON = await this.getDataByKeyword(keyWord, page); 
        const result = dataJSON.results.map(item => item.id); 
        return result;
    };

    getDateTrending = async (trending) => {
        // console.log(trending, 212112)
        const data = await fetch(`${this._apiBase}/3/trending/movie/${trending}?api_key=f567463f5d4fd0634a4c7d9d54f0f5a8`); 
        const dataJSON = await data.json();
        return dataJSON;
    };

}