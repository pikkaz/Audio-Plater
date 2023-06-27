let fwd_btn = document.getElementById('fwd_btn');
let rwd_btn = document.getElementById('rwd_btn');
let audio = document.getElementById('audio');
let album_cover = document.querySelector('.album-cover');
let song_name = document.querySelector('.song-name');
let artist = document.querySelector('.artist');


let audioCtx = 0;
const canvas = document.querySelector('canvas');
const canvasCtx = canvas.getContext('2d');
let source = 0;
let analyser = 0;
let bufferLength = 0;
let dataArray = 0;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

var i = 0;

fwd_btn.addEventListener('click', function (e) {
    i = (i + 1) % 3;
    audio.src = `audio/${i}.mp3`;
    album_cover.src = `img/${i}.png`;
    if (i==0) {
        song_name.innerHTML = 'Nightcall';
        artist.innerHTML = 'by Kavinsky';
    } else if (i==1) {
        song_name.innerHTML = 'Kaer Morhen';
        artist.innerHTML = 'by Mikolai Stroinski and Marcin Przybylowicz';
    } else {
        song_name.innerHTML = 'На Заре';
        artist.innerHTML = 'by Альянс';
    }
    audio.play();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        draw();
})

rwd_btn.addEventListener('click', function (e) {
    i = (i - 1 + 3) % 3;
    audio.src = `audio/${i}.mp3`;
    album_cover.src = `img/${i}.png`;
    if (i==0) {
        song_name.innerHTML = 'Nightcall';
        artist.innerHTML = 'by Kavinsky';
    } else if (i==1) {
        song_name.innerHTML = 'Kaer Morhen';
        artist.innerHTML = 'by Mikolai Stroinski and Marcin Przybylowicz';
    } else {
        song_name.innerHTML = 'На Заре';
        artist.innerHTML = 'by Альянс';
    }
    audio.play();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 4096;
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        draw();
})

function draw() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const barWidth = ((WIDTH / 2) / bufferLength);
    let barHeight;
    let x = 0;

    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = `white`;
        canvasCtx.fillRect(WIDTH / 2 - x, HEIGHT / 2 - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = `white`;
        canvasCtx.fillRect(x, HEIGHT / 2 - barHeight, barWidth, barHeight);
        x += barWidth;
    }
    x = 0;
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = `white`;
        canvasCtx.fillRect(WIDTH / 2 - x, HEIGHT / 2, barWidth, barHeight);
        x += barWidth;
    }
    for(let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        canvasCtx.fillStyle = `white`;
        canvasCtx.fillRect(x, HEIGHT / 2, barWidth, barHeight);
        x += barWidth;
    }
    requestAnimationFrame(draw);
}


