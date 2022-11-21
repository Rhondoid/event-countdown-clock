// var moment = require('moment');
// moment().format();
class TimeDistance{
  constructor(distance, offSetHour, customEl){
    distance += offSetHour *1000 * 60 * 60;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    customEl.innerHTML = this.createInnerHTML()
    if (distance <= 0 && this.days <= 0  && this.hours <= 0) {
      // clearInterval(x);
      customEl.innerHTML= "Yay!";
    }
  }
  createInnerHTML(){
    return this.days + "d " + this.hours + "h "
    + this.minutes + "m " + this.seconds + "s ";
    
  }
}

var timeEl=document.getElementById('time');
var giphyEl=document.getElementById('giphy');
var newYorkEl=document.getElementById('newyork');
var parisEl=document.getElementById('paris');
var sydneyEl=document.getElementById('sydney');
var countDownEl=document.getElementById("countdown");
var dateInputEl=document.getElementById('date');
var timeInputEl=document.getElementById('time');

var giphyRequestUrl="https://api.giphy.com/v1/gifs/random?api_key=jtstBKPePsw6EBHS3rBIUAGQqchRC2MJ&tag=confetti+celebration&rating=g"

var countDownDate=new Date("").getTime();
var dateNewYork=new Date("").getTime();
var dateParis=new Date("").getTime();
var dateSydney=new Date("").getTime();




// console.log("hi")
timeEl.innerText= Date()
//var responseStuff = {};
fetch(giphyRequestUrl) 
  .then( (response) => {
    return(response.json());
  }).then((result) => {
    console.log(result.data.embed_url)
    giphyEl.src = result.data.embed_url
  });


fetch("http://worldtimeapi.org/api/timezone/Australia/Sydney")
  .then(function(data) {
    return data.json();
  })
  .then(function(response) {
    console.log(Date(Date.parse(response.datetime)));

console.log(calcTime(response.utc_offset))
    
  })

function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    // return time as a string
    return nd.toString();
}



  
  function userInput(){
    var dateTime= dateInputEl.value + " " + timeInputEl.value;
    
    var newGetTime = new Date(dateTime).getTime();
    countDownDate=newGetTime;
    
  }



  // Update the count down every 1 second
  var x = setInterval(function() {
    
  
  
   // Get today's date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    var distanceNewYork = countDownDate - now;
    var distanceParis = countDownDate - now;
    var distanceSydney = countDownDate - now;
      
    // Time calculations for days, hours, minutes and seconds
    var timeDistance= new TimeDistance(distance, 0,countDownEl)
    var timeDistanceNewYork= new TimeDistance(distanceNewYork,3, newYorkEl)
    var timeDistanceParis= new TimeDistance(distanceParis,10, parisEl)
    var timeDistanceSydney= new TimeDistance(distanceSydney,15, sydneyEl)
      
    // Output the result in an element with id="demo"
    // countDownEl.innerHTML = timeDistance.createInnerHTML()
    // newYorkEl.innerHTML = timeDistanceNewYork.createInnerHTML()
    // parisEl.innerHTML = timeDistanceParis.createInnerHTML()
    // sydneyEl.innerHTML = timeDistanceSydney.createInnerHTML()
    
    
      
    // If the count down is over, write some text
    if (distance < 0) {
      // clearInterval(x);
      giphyEl.style.display="block";
    }

  }, 1000);
  
// localStorage setItem()
// localStorage getItem()


