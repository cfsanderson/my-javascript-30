/* Get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
const togglePlay = () => {
  console.log("togglePlay");
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  /* OR....
  if (video.paused) {
    video.play();
  } else {
    video.paused();
  }
  */

  // change the play button...
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  console.log(this);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // update for when/if mousedown && mousemove
  video[this.name] = this.value;

  // Or...
  //  if (this.name === 'playbackRate') {
  //   video.playbackRate = this.value
  // } else {
  //   video.volume = this.value
  // }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

let mouseDown = false;

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up event listeners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(input => input.addEventListener('change', handleRangeUpdate));
ranges.forEach(input => input.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); /*short-circuit eval*/

// add fullscreen button
// if playbackRate > 1x, display a button to return playbackRate to normal
// names for sliders (volume + speed)
// when -10 or +25 button is clicked it changes color to yellow
// if video is past 0 time, display currentTime in lower left of video
// when you scrub video, the currentTime updates
// if playbackRate is > 1, playbackRate displays in lower right
