const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const trackTitle = document.getElementById('track-title');
const artistEl = document.getElementById('artist');
const albumCover = document.getElementById('album-cover');
const songList = document.getElementById('song-list');

let currentSongIndex = 0;
let isShuffled = false;
let originalPlaylist = [];

// Playlist with your song
const playlist = [
    {
        title: "Your Song Title",
        artist: "ASHE",
        src: "C:\\users\\91836\\Downloads\\Ashe - Moral of the Story (Official Audio).mp3",  // Path to your file
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"  // URL or local path to image
    },
    // Add more songs here:
    {
        title: "Another Song",
        artist: "Sheera Jatt",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Sheera Jasvir Jatt Sikka Full Song _ Chhad Dila _ Latest Punjabi Song.mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "Third Song",
        artist: "XXXTENTION",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\XXXTENTACION - Depression _ Obsession (Audio)(MP3_128K).mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
     {
        title: "Fourth Song",
        artist: "Snoop DoGg",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Still D.R.E(MP3_128K).mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "5 Song",
        artist: "Karan Aujla",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Winning Speech (Music Video) Karan Aujla _ Mxrci _ Latest Punjabi Songs 2024.mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "6 Song",
        artist: "Tushar Nagar",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\GTA LIFE SONG __ Tushar Nagar __ Official Music Video __ New Hindi Rap Song __ Rap Song 2024.mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "7 Song",
        artist: "Mohit chauhan",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Full Video_ Tum Se Hi _ Jab We Met _ Kareena Kapoor, Shahid Kapoor _ Mohit Chauhan _ Pritam.mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "8 Song",
        artist: "Talha ustaad",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\GUMAAN - Young Stunners _ Talha Anjum _ Talhah Yunus _ Prod. By Jokhay (Official Music Video).mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "9 Song",
        artist: "Honey Paaji",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Haye Mera DIL (Full Video) _ Alfaaz Feat Yo Yo Honey Singh _ Latest Punjabi Song 2024.mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    },
    {
        title: "10 Song",
        artist: "Imran shaab",
        src: "C:\\MOVIES\\BREAKING BAD S-1\\Imran Khan - Pata Chalgea (Un-Official Video).mp3",
        cover: "C:\\Users\\91836\\Downloads\\Capa SINGLE.jpg"
    }
];


// Initialize playlist
function loadPlaylist() {
    originalPlaylist = [...playlist];
    songList.innerHTML = '';
    playlist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => loadSong(index));
        songList.appendChild(li);
    });
    loadSong(0);
}

// Load a song
function loadSong(index) {
    currentSongIndex = index;
    const song = playlist[index];
    audio.src = song.src;
    trackTitle.textContent = song.title;
    artistEl.textContent = song.artist;
    albumCover.src = song.cover;
    updateActiveSong();
}

// Update active song in list
function updateActiveSong() {
    document.querySelectorAll('#song-list li').forEach((li, index) => {
        li.classList.toggle('active', index === currentSongIndex);
    });
}

// Play/Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
        playPauseBtn.classList.add('playing');
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
        playPauseBtn.classList.remove('playing');
    }
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (!audio.paused) audio.play();
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (!audio.paused) audio.play();
});

// Shuffle
shuffleBtn.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleBtn.style.opacity = isShuffled ? 1 : 0.5;
    if (isShuffled) {
        playlist.sort(() => Math.random() - 0.5);  // Shuffle array
    } else {
        playlist.splice(0, playlist.length, ...originalPlaylist);  // Restore original
    }
    loadPlaylist();
    loadSong(0);
});

// Progress bar
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Volume
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value / 100;
});

// Auto-play next on end
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Format time (MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Initialize
loadPlaylist();