// https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d

const movieListEl = document.querySelector('.movies')


async function getMovies(filter){
    const moviesData= await fetch('https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d&s=all')
    const moviesResponse = await moviesData.json();
    if(moviesResponse && Array.isArray(moviesResponse.Search)){
        let movies = moviesResponse.Search;
        
        if(filter === "RECENT_TO_OLDER"){
        movies.sort((a,b) => a.Year - b.Year)
        }else if(filter === "FROM_A_TO_Z"){
            console.log(movies.sort((a,b)=> a.Title > b.Title))
        }
    }

    
   
        const movieList = moviesResponse.Search.map((movie) => movieHTML(movie))
        movieList.length = 6;
        for(let i = 0; i < movieList.length; i++){
            movieListEl.innerHTML = movieList.join('');
        }

}

function movieHTML(movie){
    return `<div class="movie">
                        <div class="movie__top">
                                <img src="${movie.Poster}" alt="" class="movie__img">
                                <div class="movie__slide--wrapper"></div>
                                <div class="movie__slide">Show Time
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                        </div>
                        <div class="movie__bottom">
                            <p class="movie__title">${movie.Title}</p>
                            <p class="movie__type">${movie.Type}</p>
                            <p class="movie__year">${movie.Year}</p>
                        </div>
                    </div>`
}



async function onSearch(event){
    const searchStrEl = document.querySelector('.search__specific')

    const moviesWrapper = document.querySelector('.movies');
    moviesWrapper.classList += ' movies__loading'
    
    const value = event.target.value;
    
    const moviesData= await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d&s=${value}`)
    movies = await moviesData.json();

    moviesWrapper.classList.remove('movies__loading');

    searchStrEl.innerHTML = ' ' + value
    
    if(movies.Search){
        const movieList = movies.Search.map((movie) => movieHTML(movie))
        movieList.length = 6;
        for(let i = 0; i < movieList.length; i++){
            movieListEl.innerHTML = movieList.join('');
        }
    }


}

function filterBooks(event){
    getMovies(event.target.value);
}
   



function onAlert(){
    alert("This feature is unavailable");
}





getMovies();
