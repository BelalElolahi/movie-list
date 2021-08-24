

let gitForm = document.getElementById('movies');

let tBody = document.querySelector('tbody');

let btn = document.getElementById('btn');



function Movie (movieName , category , year ){
    this.movieName = movieName,
    this.category = category,
    this.year = year,
Movie.allMovies.push(this);


}
Movie.allMovies = [];



 Movie.prototype.saveInLocalStorage =function (){

    localStorage.setItem('movies', JSON.stringify(this.allMovies));
}


Movie.prototype.removeMovie = function(movie){

 Movie.allMovies.splice(movie,1);
}



// git data form local storage 
function gitData (){
    if (localStorage.movies){

        let data = JSON.parse(localStorage.getItem('movies'));
        for(let i =0; i< data.length ; i++)
        {
            new Movie(data[i].movieName , data[i].category   , data[i].year);
        }

    }
}

gitData();


// 

gitForm.addEventListener('submit',getNewMovie);
function getNewMovie (event){
    event.preventDefault();

    let movieName = event.target.fname.value;
    let category = event.target.img.value; 
    let year = event.target.release.value; 

    new Movie (movieName,category,year);
   console.log(Movie.allMovies);

   console.log(Movie.allMovies[0].category.toLowerCase());

// save to  local storage 
localStorage.setItem('movies', JSON.stringify(Movie.allMovies));
    //Movie.saveInLocalStorage();
render();

}

function ClearTable ()
{
    while(tBody.hasChildNodes())
    {
        tBody.removeChild(tBody.firstChild);
    }


}




// creat a list of Movie 

function render(){
    ClearTable();

    console.log(Movie.allMovies);


    for ( let i = 0 ; i < Movie.allMovies.length ; i ++ )
    {
        let trElement = document.createElement('tr');

        let removeElement = document.createElement('td');
        removeElement.textContent ='X';
        removeElement.setAttribute('id', Movie.allMovies[i].movieName);
        removeElement.addEventListener('click',removeMovie);
        trElement.appendChild(removeElement);


        let tdElement = document.createElement('img');
        tdElement.textContent = Movie.allMovies[i].category;
          tdElement.setAttribute('src', './img/'+Movie.allMovies[i].category.toLowerCase()+'.png');

        trElement.appendChild(tdElement);

        let tdElement1 = document.createElement('td');
        tdElement1.textContent = Movie.allMovies[i].movieName;
        trElement.appendChild(tdElement1);

        let tdElement2 = document.createElement('td');
        tdElement2.textContent = Movie.allMovies[i].year;
        trElement.appendChild(tdElement2);


        tBody.appendChild(trElement);
    }



}



 function removeMovie (event){
  let movie = event.target.id;
   console.log(movie);
     for(let i = 0 ; i < Movie.allMovies.length ; i ++ )
     {
         if (Movie.allMovies[i].movieName == movie)
         {
            Movie.allMovies.splice(i,1);
         }
     }

     //update Local Storage 
     localStorage.setItem('movies', JSON.stringify(Movie.allMovies));

     //Movie.saveInLocalStorage();

     render(); 

 }

 

 

render(); 




