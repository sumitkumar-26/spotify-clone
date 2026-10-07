
console.log("Welcome to Spotify");

// VARIABLES

let songIndex = 0;

const audioElement = new Audio();

const masterPlay =
    document.getElementById("master-play");

const progressBar =
    document.getElementById("progress-bar");

const playingGif =
    document.getElementById("playing-gif");

const masterSongName =
    document.getElementById("master-song-name");



// SONG DATA


const songs = [
    {
        songName: "Song 1",
        filePath: "Spotify Clone/songs/1.mp3",
        coverPath: "Spotify Clone/covers/1.jpg"
    },

    {
        songName: "Song 2",
        filePath: "Spotify Clone/songs/2.mp3",
        coverPath: "Spotify Clone/covers/2.jpg"
    },

    {
        songName: "Song 3",
        filePath: "Spotify Clone/songs/3.mp3",
        coverPath: "Spotify Clone/covers/3.jpg"
    },

    {
        songName: "Song 4",
        filePath: "Spotify Clone/songs/4.mp3",
        coverPath: "Spotify Clone/covers/4.jpg"
    },

    {
        songName: "Song 5",
        filePath: "Spotify Clone/songs/5.mp3",
        coverPath: "Spotify Clone/covers/5.jpg"
    },

    {
        songName: "Song 6",
        filePath: "Spotify Clone/songs/6.mp3",
        coverPath: "Spotify Clone/covers/6.jpg"
    },

    {
        songName: "Song 7",
        filePath: "Spotify Clone/songs/7.mp3",
        coverPath: "Spotify Clone/covers/7.jpg"
    },

    {
        songName: "Song 8",
        filePath: "Spotify Clone/songs/8.mp3",
        coverPath: "Spotify Clone/covers/8.jpg"
    },

    {
        songName: "Song 9",
        filePath: "Spotify Clone/songs/9.mp3",
        coverPath: "Spotify Clone/covers/9.jpg"
    },

    {
        songName: "Song 10",
        filePath: "Spotify Clone/songs/10.mp3",
        coverPath: "Spotify Clone/covers/10.jpg"
    }
];



// GENERATE SONG LIST


const songContainer =
    document.querySelector(".song-item-container");


songs.forEach((song, index) => {

    songContainer.innerHTML += `

        <div class="song-item">

            <img
                src="${song.coverPath}"
                alt="${song.songName} cover"
            >

            <span class="song-name">
                ${song.songName}
            </span>

            <span class="timestamp">

                05:34

                <button
                    class="song-item-play"
                    data-index="${index}"
                    aria-label="Play ${song.songName}"
                >
                    <i class="fa-solid fa-play"></i>
                </button>

            </span>

        </div>

    `;

});


// GET THE SONG TO PLAY 

const songPlayButtons =
    document.querySelectorAll(".song-item-play");


// RESET ALL SONG BUTTONS


function resetPlayButtons() {

    songPlayButtons.forEach((button) => {

        button.innerHTML =
            `<i class="fa-solid fa-play"></i>`;

    });

}



// PLAY SONG


function playSong(index) {

    const song = songs[index];

    // Store current song index
    songIndex = index;

    // Set audio source
    audioElement.src = song.filePath;

    // Start from beginning
    audioElement.currentTime = 0;

    // Play audio
    audioElement.play();

    // Update song name
    masterSongName.innerText =
        song.songName;

    // Show playing animation
    playingGif.style.opacity = 1;

    // Change master button to pause
    masterPlay.innerHTML =
        `<i class="fa-solid fa-pause"></i>`;

}


// PAUSE SONG


function pauseSong() {

    // Pause audio
    audioElement.pause();

    // Hide playing animation
    playingGif.style.opacity = 0;

    // Change master button to play
    masterPlay.innerHTML =
        `<i class="fa-solid fa-play"></i>`;

}

// INDIVIDUAL SONG PLAY BUTTONS

songPlayButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get index from data-index
        const index =
            Number(button.dataset.index);


        // If same song is currently playing
        if (
            songIndex === index &&
            !audioElement.paused
        ) {

            pauseSong();

            button.innerHTML =
                `<i class="fa-solid fa-play"></i>`;

            return;
        }


        // Reset all buttons
        resetPlayButtons();


        // Play selected song
        playSong(index);


        // Change selected button to pause
        button.innerHTML =
            `<i class="fa-solid fa-pause"></i>`;

    });

});


// MASTER PLAY / PAUSE BUTTON

masterPlay.addEventListener("click", () => {

    if (audioElement.paused) {

        playSong(songIndex);

        // Set correct button icon
        resetPlayButtons();

        songPlayButtons[songIndex].innerHTML =
            `<i class="fa-solid fa-pause"></i>`;

    } else {

        pauseSong();

        songPlayButtons[songIndex].innerHTML =
            `<i class="fa-solid fa-play"></i>`;

    }

});

// UPDATE PROGRESS BAR

audioElement.addEventListener(
    "timeupdate",
    () => {

        if (!audioElement.duration) {
            return;
        }

        const progress =
            (audioElement.currentTime /
            audioElement.duration) * 100;

        progressBar.value = progress;

    }
);

// SEEK / CHANGE SONG POSITION

progressBar.addEventListener(
    "input",
    () => {

        if (!audioElement.duration) {
            return;
        }

        audioElement.currentTime =
            (progressBar.value / 100) *
            audioElement.duration;

    }
);
// WHEN SONG ENDS

audioElement.addEventListener(
    "ended",
    () => {

        // Reset current button
        songPlayButtons[songIndex].innerHTML =
            `<i class="fa-solid fa-play"></i>`;

        // Move to next song
        songIndex++;

        // If last song finished, start from first
        if (songIndex >= songs.length) {
            songIndex = 0;
        }

        // Play next song
        playSong(songIndex);

        // Reset all buttons
        resetPlayButtons();

        // Set current button to pause
        songPlayButtons[songIndex].innerHTML =
            `<i class="fa-solid fa-pause"></i>`;

    }
);

// NEXT BUTTON

const nextButton =
    document.getElementById("next");


nextButton.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    resetPlayButtons();

    playSong(songIndex);

    songPlayButtons[songIndex].innerHTML =
        `<i class="fa-solid fa-pause"></i>`;

});
// PREVIOUS BUTTON


const previousButton =
    document.getElementById("previous");


previousButton.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    resetPlayButtons();

    playSong(songIndex);

    songPlayButtons[songIndex].innerHTML =
        `<i class="fa-solid fa-pause"></i>`;

});