//this will pull the timezone for current plus each city
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
  //posts to the HTML for all clocks
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
var ipDateEl=document.getElementById('ipDate');
var nameEl=document.getElementById('name');
var showName=document.getElementById('showName');
//API for Giphy image
var giphyRequestUrl="https://api.giphy.com/v1/gifs/random?api_key=jtstBKPePsw6EBHS3rBIUAGQqchRC2MJ&tag=confetti+celebration&rating=g"

var countDownDate=new Date("").getTime();
var myName='';


timeEl.innerText= Date()

fetch(giphyRequestUrl) 
  .then( (response) => {
    return(response.json());
  }).then((result) => {
    console.log(result.data.embed_url)
    giphyEl.src = result.data.embed_url
  });


fetch("http://worldtimeapi.org/api/ip")
  .then(function(data) {
    return data.json();
  })
  .then(function(response) {
    countDownDate=(Date(response.datetime));
    ipDateEl.innerText=countDownDate.toString();
  })

function userInput(){
  var dateTime= dateInputEl.value + " " + timeInputEl.value;
  
  var newGetTime = new Date(dateTime).getTime();
  countDownDate=newGetTime;
//storing and posting user name
  localStorage.setItem('name', nameEl.value)
  myName=localStorage.getItem('name')
  showName.innerText='Welcome '+myName
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
      
    
    // If the count down is over, write yay! and disply giphy image
    if (distance < 0) {
      // clearInterval(x);
      giphyEl.style.display="block";
    }

  }, 1000);
  

myName=localStorage.getItem('name')
showName.innerText='Welcome '+myName


