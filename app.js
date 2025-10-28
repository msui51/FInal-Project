// https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d

const movieListEl = document.querySelector('.movies')


// async function getMovies(){
//     const moviesData= await fetch('https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d&s=romance')
//     const movies = await moviesData.json();
   
//     if(movies.Search){
//         const movieList = movies.Search.map((movie) => movieHTML(movie))
//         movieList.length = 6;
//         for(let i = 0; i < movieList.length; i++){
//             movieListEl.innerHTML = movieList.join('');
//         }
//     }

// }

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

function onAlert(){
    alert("This feature is unavailable");
}





// getMovies();
