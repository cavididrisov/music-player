const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar=document.querySelector("#progress-bar")
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);
window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
})

function displayMusic(music) {
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}
play.addEventListener("click", () => {
    if (play.className == "fa-solid fa-play") {
        playMusic()
    }
    else {
        pauseMusic()
    }
});
function playMusic() {
    audio.play();
    play.className = "fa-solid fa-pause"
}
function pauseMusic() {
    audio.pause();
    play.className = "fa-solid fa-play"
}
const nextMusic=() => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
const prevMusic= () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();

};
next.addEventListener("click", () => {
    nextMusic();
})
prev.addEventListener("click", () => {
prevMusic()
});
function calculate(time){
    const min=Math.floor(time/60);
    const sec=Math.floor(time%60);
    const updateSec=sec<10? `0${sec}`:`${sec}`
    const res=`${min}:${updateSec}`
    return res;
}
audio.addEventListener("loadedmetadata",()=>{

    duration.innerText=calculate(audio.duration);
    progressBar.max=Math.floor(audio.duration);
})
audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.innerText=calculate(progressBar.value);
})
progressBar.addEventListener("input",()=>{
    currentTime.innerText=calculate(progressBar.value);
    audio.currentTime=progressBar.value
});
volumeBar.addEventListener("input",(e)=>{
    audio.volume=e.target.value/100
    if(e.target.value==0){
    volume.className="fa-solid fa-volume-xmark"
    }
    else{
    volume.className="fa-solid fa-volume-high"

    }
});
volume.addEventListener("click",()=>{
  if(  volume.className=="fa-solid fa-volume-xmark"){
    volume.className="fa-solid fa-volume-high"
    volumeBar.value=20
    audio.volume=0.5
  }
  else{
    volume.className="fa-solid fa-volume-xmark"
    volumeBar.value=0
    audio.volume=0
  }
});

const displayMusicList=(list)=>{
    for (let i = 0; i < list.length; i++) {
       let liTag=`
       <li li-index="${i}" onclick="selectMusic(this)" class="list-group-item d-flex justify-content-between aligns-items-center">
    <span>${list[i].getName()}</span>
    <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
      <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
    </li>
       `
       ul.insertAdjacentHTML("beforeend",liTag);

       let liAudioDuration=ul.querySelector(`#music-${i}`);
       let liAudiotag=ul.querySelector(`.music-${i}`);
        liAudiotag.addEventListener("loadeddata",()=>{
            liAudioDuration.innerText=calculate(liAudiotag.duration)
        })
    }
}


const selectMusic=(li)=>{
player.index=li.getAttribute('li-index')
displayMusic(player.getMusic())
playMusic()
isPlayingNow()
}
const isPlayingNow=()=>{
  for (let li of ul.querySelectorAll("li")) {
    if(li.classList.contains("playing")){
        li.classList.remove("playing")
    }
    if(li.getAttribute("li-index")==player.index){
        li.classList.add("playing")
    }
  }
    };
    audio.addEventListener("ended",()=>{
   nextMusic()
    })