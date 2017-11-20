/* 
- listen for the keydown event 
- run a function which will find the audio element and play it
- add a class of playing so that the CSS works

*/ 

window.addEventListener('keydown', function(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
  // data selector syntax ^
  if (!audio) return
  audio.currentTime = 0; /* rewind to the start */ 
  audio.play()
  key.classList.add('playing');
})

function removeTransition(e) {
  (e.propertyName !== 'transform') ? return : console.log(e.propertyName)
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition))
