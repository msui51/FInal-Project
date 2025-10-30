// https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d

const movieListEl = document.querySelector('.movies')
let currentMovies = [];


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
    moviesWrapper.classList.add('movies__loading');
    
    const value = event.target.value;
    
    const moviesData= await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=b11a6a7d&s=${encodeURIComponent(value)}`)
    const moviesResponse = await moviesData.json();

    moviesWrapper.classList.remove('movies__loading');

    searchStrEl.innerHTML = ' ' + value
    
    currentMovies = Array.isArray(moviesResponse.Search) ? moviesResponse.Search : [];

    const selectedFilter = document.querySelector('#filter').value;
    if(selectedFilter){
        currentMovies = sortMovies(currentMovies, selectedFilter)
    }
    renderMovies(currentMovies);
}

function renderMovies(list){
    const movieList = (list).map((movie) => movieHTML(movie));
    movieList.length = Math.min(movieList.length, 6);
    movieListEl.innerHTML = movieList.join('');
}

function sortMovies(list, filter){
    if(filter === 'RECENT_TO_OLDER'){
        return [...list].sort((a,b) => (parseInt(b.Year) || 0) - (parseInt(a.Year) || 0))
    }else if(filter === 'FROM_A_TO_Z'){
        return [...list].sort((a,b) => (a.Title || '').localeCompare(b.Title || ''))
    }
    return list;
}


function filterMovies(event){
    const filter = event.target.value;
    currentMovies = sortMovies(currentMovies, filter);
    renderMovies(currentMovies);
}
   



function onAlert(){
    alert("This feature is unavailable");
}





