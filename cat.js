

'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
   
    let currentPosition = startPos;
    img.style.left = currentPosition + 'px';

    
    const intervalId = setInterval(() => {
     
      currentPosition += STEP_SIZE_PX;
      img.style.left = currentPosition + 'px';

     
      if (currentPosition >= stopPos) {
        clearInterval(intervalId);
        resolve(); 
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
  
    const originalSrc = img.src;

   
    img.src = DANCING_CAT_URL;

  
    setTimeout(() => {
      img.src = originalSrc;
      resolve(); 
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  
  function performSequence() {
    walk(img, startPos, centerPos)
      .then(() => dance(img))
      .then(() => walk(img, centerPos, stopPos))
      .then(performSequence); 
  }

  performSequence();
}

window.addEventListener('load', catWalk);