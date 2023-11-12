// Set the countdown date const 
countdownDate = new Date('November 29, 2023'); // Update the countdown every second  
setInterval(function() { 
// Get the current time 
 const now = new Date();
  // Calculate the time remaining until the countdown date 
  const timeRemaining = countdownDate.getTime() - now.getTime(); 
  // Convert the time remaining to days, hours, minutes, and seconds 
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); const secondsRemaining = Math.floor((timeRemaining % (1000 * 60)) / 1000); 
  // Update the countdown elements 
  document.getElementById('countdown-days').textContent = daysRemaining; document.getElementById('countdown-hours').textContent = hoursRemaining; document.getElementById('countdown-minutes').textContent = minutesRemaining; document.getElementById('countdown-seconds').textContent = secondsRemaining; }, 1000); 
 //music player code from here bts
 const playPauseIcon = document.querySelector('#play-pause-icon');
let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.dslider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name : 'Reminds me of you',
        artist : 'Juice wrld ft Laroi..',
        music : 'Reminds me of you.mp3'
    },
    {
    
        name : 'UyangiJabulisa',
        artist : 'Nomfundo moh...',
        music : 'UyangiJabulisa.m4a'
    },
    {
        
        name : 'Be without you',
        artist : 'Mary J. blige..',
        music : 'Be without you.mp3'
    },
    {
        
        name : 'Without me',
        artist : 'Halsey. ',
        music : 'Without me.mp3'
    },
      {
        name : 'Girls need love to',
        artist : 'Summer walker ft drake..',
        music : 'Girls need love to.m4a'
    },
      {
        name : 'Stay',
        artist : 'Gen neo..',
        music : 'stay.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

   
    
    now_playing.textContent = music_list[track_index].artist +  " "+ music_list[track_index].name;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    
}


function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playPauseIcon.className = 'ph-bold ph-pause';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playPauseIcon.className = 'ph-bold ph-play';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//slider
var firstIndex=0;
function automaticslide(){
    setTimeout(automaticslide,2000);
    var pics;
    const img=document.querySelectorAll('img');
    for(pics=0; pics<img.length;  pics++){
        img[pics].style.display="none";
           }
           firstIndex++;
           if(firstIndex > img.length){
               firstIndex =1;
           }
           img[firstIndex -1].style.display="block";
}
automaticslide();
