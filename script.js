const card = document.querySelector('.card');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const foto = document.getElementById('popup-foto');
const closeBtn = document.querySelector('.close-btn');
const audio = document.getElementById('popup-audio');

// Fungsi fade-out musik
function fadeOutAudio() {
  let fade = setInterval(() => {
    if (audio.volume > 0.05) {
      audio.volume -= 0.05; // turunin volume pelan²
    } else {
      audio.volume = 1.0;   // reset biar normal lagi pas play
      audio.pause();
      audio.currentTime = 0; // balik ke awal
      clearInterval(fade);
    }
  }, 100); // tiap 100ms turunin volume
}

// klik card → buka popup + play musik
card.addEventListener('click', () => {
  foto.src = card.dataset.foto;
  overlay.classList.add('active');
  popup.classList.add('active');

  audio.volume = 1.0; // full volume saat mulai
  audio.currentTime = 0;
  audio.play();
});

// klik overlay → tutup popup + fade-out musik
overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  popup.classList.remove('active');
  fadeOutAudio();
});

// klik tombol close → tutup popup + fade-out musik
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
  popup.classList.remove('active');
  fadeOutAudio();
});