const addmovieBtn = document.getElementById('add-movie-btn')
const searchBtn = document.getElementById('search-btn')


const movies = []//....array holds movie


const renderMovies = (filter = '') => {//...assign default value(empty string) for search function
    const movieList = document.getElementById('movie-list')//..called in indexHTML

if(movies.length === 0){
    movieList.classList.remove('visible');
    return;
}else{//....render all movies into movie list in innerHTML
    movieList.classList.add('visible')
}
movieList.innerHTML = '' //....clear current content

//.....if filter is not true, use all movies, if movie includeds filtered term add to movies
const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter))         

filteredMovies.forEach(movie =>{//....for each movie in array create list entry on front page

    const movieEl =document.createElement('li');
    
    const {  info } = movie;//...object desructuring

    let {getFormattedTitle} = movie
    
    let text = movie.getFormattedTitle.call(movie) + '-';//..initialize new variable containing key values and getFormattedTitle function
    for(const key in info){//......for in loop which loops through all key value pairs in the object

        if(key !=='title' && key !== '_title'){//..if key is not title
            text = text + `${key}; ${info[key]}`//...return ??
        }
    }
    movieEl.textContent = text
    movieList.append(movieEl)
});
};

const addMovieHandler = () => {
    //..create const for each value recieved from input(front-end)
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    //...check/validate input are empty then return
    if(
        title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
    ){
        return;
    }
    const newMovie = {//....create new movie object
        info:{
            
            set title(val){
                if(val.trim() === ''){
                    this._title = 'DEFAULT';
                    return;
                }
                this._title = val
            },
            get title(){
                return this._title
            },
            [extraName]:extraValue
            //...use sqaure brackets to assign dynamic value
        },
        id: Math.random().toString(),//...math.random to generate random id
        getFormattedTitle(){
            //.....this key word used to apply conversion logic to code (uppercase letter)
            return this.info.title.toUpperCase()
        }
    };

    newMovie.info.title = title
    movies.push(newMovie);//....push input/data onto movie array

    console.log(newMovie);
    renderMovies();
};

//.....search function
const searchMovieHandler = () => {
    const filterTerm = document.getElementById('filter-title').value;//called in indexHTML
    renderMovies(filterTerm)
}

addmovieBtn.addEventListener('click', addMovieHandler)
searchBtn.addEventListener('click', searchMovieHandler)



