// --- POPUP FOTO + TEKS ---
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const foto = document.getElementById('popup-foto');
const kata = document.getElementById('popup-kata');
const closeBtn = document.querySelector('.close-btn');
const cards = document.querySelectorAll('.card');

// Klik card → tampilkan popup
cards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector("img");
    foto.src = img.src;
    kata.textContent = img.alt;

    overlay.classList.add('active');
    popup.classList.add('active');
  });
});

// Klik overlay → tutup popup
overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  popup.classList.remove('active');
});

// Klik tombol close → tutup popup
closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
  popup.classList.remove('active');
});

//Music Play
const autoplay = document.getElementById("autoplayMusic");
const buttons = document.querySelectorAll(".play-btn");
const mainAudios = document.querySelectorAll(".main-audio");

let autoplayDone = false;
let pausedByUser = false; // bedain pause manual dari user vs next otomatis

// Autoplay klik sembarang
document.body.addEventListener("click", () => {
  if (autoplay && autoplay.paused && !autoplayDone) {
    autoplay.play();
  }
}, { once: true });

// Kalau autoplay selesai 
autoplay.addEventListener("ended", () => {
  autoplayDone = true;
});

// --- MAIN MUSIC BEHAVIOR ---
buttons.forEach((btn, index) => {
  const audio = mainAudios[index];

  // Play/pause toggle
  btn.addEventListener("click", () => {
    // pause autoplay kalo masih nyala
    if (!autoplay.paused && !autoplayDone) {
      autoplay.pause();
    }

    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸";
      pausedByUser = false; // lagi main, jadi reset
    } else {
      audio.pause();
      btn.textContent = "▶";
      pausedByUser = true; // user emang pause manual
    }
  });

  // Kalau musik selesai → otomatis ke lagu berikutnya
  audio.addEventListener("ended", () => {
    btn.textContent = "▶";
    pausedByUser = false; // karena selesai, bukan user pause

    if (index + 1 < mainAudios.length) {
      const nextAudio = mainAudios[index + 1];
      const nextBtn = buttons[index + 1];

      nextAudio.play();
      nextBtn.textContent = "⏸";
    } else {
      console.log("Playlist selesai.");
    }
  });

  // Kalau ada pause, cek apakah semua audio berhenti
  audio.addEventListener("pause", () => {
    const semuaPause = Array.from(mainAudios).every(a => a.paused);

    if (semuaPause && !autoplayDone && pausedByUser) {
      autoplay.play(); // autoplay lanjut cuma kalau user yang pause
    }
  });
});

//SEEK BAR (Progress Lagu)
const seekBars = document.querySelectorAll(".seek-bar");

buttons.forEach((btn, index) => {
  const audio = mainAudios[index];
  const seekBar = seekBars[index];

  // Update slider setiap lagu jalan
  audio.addEventListener("timeupdate", () => {
    if (!isNaN(audio.duration)) {
      const progress = (audio.currentTime / audio.duration) * 100;
      seekBar.value = progress;
    }
  });

  // Kalau user geser slider → update posisi audio
  seekBar.addEventListener("input", () => {
    if (!isNaN(audio.duration)) {
      const newTime = (seekBar.value / 100) * audio.duration;
      audio.currentTime = newTime;
    }
  });
}); 