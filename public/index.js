let wasAlgorithmFired = false;

const updateInputLabels = () => {
  onInputChange('input-boat-initial-angle');
  onInputChange('input-boat-speed');
  onInputChange('input-river-speed');
  onInputChange('input-river-width');
  onInputChange('input-destination-location');
  onInputChange('input-iterations');
  onInputChange('input-agents');
  onInputChange('input-neighborhood-factor');
};

const onInputChange = (inputId) => {
  const { value } = document.getElementById(inputId);
  const spanId = `span${inputId.substring(5, inputId.length)}`;
  document.getElementById(spanId).innerText = value.toString();
};

const getParams = () => {
  const boatInitialAngle = document.getElementById('input-boat-initial-angle').value;
  const boatSpeed = document.getElementById('input-boat-speed').value;
  const riverSpeed = document.getElementById('input-river-speed').value;
  const riverWidth = document.getElementById('input-river-width').value;
  const destinationLocation = document.getElementById('input-destination-location').value;
  const iterations = document.getElementById('input-iterations').value;
  const agents = document.getElementById('input-agents').value;
  const neighborhoodFactor = document.getElementById('input-neighborhood-factor').value;
  return ({
    boatInitialAngleInRadians: parseFloat(boatInitialAngle) * Math.PI / 180,
    boatSpeed: parseFloat(boatSpeed),
    riverSpeed: parseFloat(riverSpeed),
    riverWidth: parseFloat(riverWidth),
    destinationLocation: parseFloat(destinationLocation),
    iterations: parseFloat(iterations),
    agents: parseFloat(agents),
    neighborhoodFactor: parseFloat(neighborhoodFactor),
  });
};

updateInputLabels();

//visualisation

const drawRiver = (riverWidth) => {
  const river = document.querySelector('.river');
  let initialWaveColorR = 106;
  let initialWaveColorG = 166;
  let initialWaveColorB = 255;
  river.innerHTML = null;

  const riverFragment = document.createDocumentFragment();

  let waveOffsetTop = 0;
  for (let i = 0; i < riverWidth; i++) {
    let wave = document.createElement('div');
    wave.classList.add('wave');
    wave.style.top = waveOffsetTop + "px";
    let newWaveColor = "rgb(" + initialWaveColorR + ", " + initialWaveColorG + ", " + initialWaveColorB + ")";
    wave.style.backgroundColor = newWaveColor;
    wave.style.boxShadow = `0px 0px ${newWaveColor}, 40px 0px ${newWaveColor}, 80px 0px ${newWaveColor}, 120px 0px ${newWaveColor},
     160px 0px ${newWaveColor}, 200px 0px ${newWaveColor}, 240px 0px ${newWaveColor}, 280px 0px ${newWaveColor}, 320px 0px ${newWaveColor},
      360px 0px ${newWaveColor}, 400px 0px ${newWaveColor}, 440px 0px ${newWaveColor}, 480px 0px ${newWaveColor}, 520px 0px ${newWaveColor},
       560px 0px ${newWaveColor}, 600px 0px ${newWaveColor}, 640px 0px ${newWaveColor}, 680px 0px ${newWaveColor}, 720px 0px ${newWaveColor}, 760px 0px ${newWaveColor},
        800px 0px ${newWaveColor}, 840px 0px ${newWaveColor}, 880px 0px ${newWaveColor}, 920px 0px ${newWaveColor}, 960px 0px ${newWaveColor}, 1000px 0px ${newWaveColor}, 1040px 0px ${newWaveColor},
         1080px 0px ${newWaveColor}, 1120px 0px ${newWaveColor}, 1160px 0px ${newWaveColor}, 1200px 0px ${newWaveColor}, 1240px 0px ${newWaveColor}, 1280px 0px ${newWaveColor}, 1320px 0px ${newWaveColor},
          1360px 0px ${newWaveColor}, 1400px 0px ${newWaveColor}, 1440px 0px ${newWaveColor}, 1480px 0px ${newWaveColor}, 1520px 0px ${newWaveColor}, 1560px 0px ${newWaveColor}, 1600px 0px ${newWaveColor},
           1640px 0px ${newWaveColor}, 1680px 0px ${newWaveColor}, 1720px 0px ${newWaveColor}, 1760px 0px ${newWaveColor}, 1800px 0px ${newWaveColor}, 1840px 0px ${newWaveColor}, 1880px 0px ${newWaveColor},
            1920px 0px ${newWaveColor}, 1960px 0px ${newWaveColor}, 2000px 0px ${newWaveColor}, 2040px 0px ${newWaveColor}, 2080px 0px ${newWaveColor}, 2120px 0px ${newWaveColor}, 2160px 0px ${newWaveColor},
             2200px 0px ${newWaveColor}, 2240px 0px ${newWaveColor}, 2280px 0px ${newWaveColor}, 2320px 0px ${newWaveColor}, 2360px 0px ${newWaveColor}, 2400px 0px ${newWaveColor}, 2440px 0px ${newWaveColor},
              2480px 0px ${newWaveColor}, 2520px 0px ${newWaveColor}, 2560px 0px ${newWaveColor}, 2600px 0px ${newWaveColor}, 2640px 0px ${newWaveColor}, 2680px 0px ${newWaveColor}, 2720px 0px ${newWaveColor},
               2760px 0px ${newWaveColor}, 2800px 0px ${newWaveColor}, 2840px 0px ${newWaveColor}, 2880px 0px ${newWaveColor}, 2920px 0px ${newWaveColor}, 2960px 0px ${newWaveColor}, 3000px 0px ${newWaveColor},
                3040px 0px ${newWaveColor}, 3080px 0px ${newWaveColor}, 3120px 0px ${newWaveColor}, 3160px 0px ${newWaveColor}, 3200px 0px ${newWaveColor}, 3240px 0px ${newWaveColor}, 3280px 0px ${newWaveColor},
                 3320px 0px ${newWaveColor}, 3360px 0px ${newWaveColor}, 3400px 0px ${newWaveColor}, 3440px 0px ${newWaveColor}, 3480px 0px ${newWaveColor}, 3520px 0px ${newWaveColor}, 3560px 0px ${newWaveColor},
                  3600px 0px ${newWaveColor}, 3640px 0px ${newWaveColor}, 3680px 0px ${newWaveColor}, 3720px 0px ${newWaveColor}, 3760px 0px ${newWaveColor}, 3800px 0px ${newWaveColor}, 3840px 0px ${newWaveColor},
                   3880px 0px ${newWaveColor}, 3920px 0px ${newWaveColor}, 3960px 0px ${newWaveColor}, 4000px 0px ${newWaveColor}`;

    initialWaveColorR -= 5;
    initialWaveColorG -= 5;
    initialWaveColorB -= 5;
    waveOffsetTop -= 20;
    riverFragment.appendChild(wave);

  }
  river.style.height = (50 + 30 * (riverWidth - 1)) + 'px';
  river.appendChild(riverFragment);
  drawBoat();
  drawDestinationPoint();
  updateRiverSpeedAnimation();
}

const drawBoat = () => {
  const river = document.querySelector('.river');
  const riverWidth = river.clientWidth;
  const boat = document.createElement('div');
  boat.id = "boat"

  boat.style.height = 32 + "px";
  boat.style.width = 32 + "px";
  boat.style.backgroundImage = 'url("assets/sailboat32.png")';
  boat.style.position = "absolute";
  boat.style.left = (riverWidth / 2) - 16 + "px";
  boat.style.bottom = 0;
  river.appendChild(boat);
  updateBoatAngle();
}

const drawDestinationPoint = point => {
  if (!point) {
    const { destinationLocation } = getParams();
    point = destinationLocation;
  }
  const flagSize = 32;
  const river = document.querySelector('.river');
  const riverWidth = river.clientWidth;
  const destinationPoint = document.createElement('div');
  destinationPoint.id = "destinationPoint";
  const existingDestinationPoint = document.getElementById('destinationPoint');

  if (existingDestinationPoint) {
    existingDestinationPoint.remove();
  }
  existingDestinationPoint ? existingDestinationPoint.remove : null;

  const destinationLocationRange = 40;
  const oneDestinationStepInPx = riverWidth / destinationLocationRange;
  const stepsMap = new Map();
  let nextStepInPx = 0;
  const lowerDestinationRange = -20;
  const upperDestinationRange = 20;

  for (let i = lowerDestinationRange; i <= upperDestinationRange; i++) {
    let key = i.toString();
    stepsMap.set(key, nextStepInPx.toFixed(2) - flagSize / 2);
    nextStepInPx += oneDestinationStepInPx;
  }

  const flagOffsetLeft = stepsMap.get(point.toString());

  destinationPoint.style.height = flagSize + "px";
  destinationPoint.style.width = flagSize + "px";
  destinationPoint.style.position = "absolute";
  destinationPoint.style.backgroundImage = 'url("assets/flag.png")';
  destinationPoint.style.left = flagOffsetLeft + "px";

  const flagContainer = document.getElementById('flag-container');
  flagContainer.appendChild(destinationPoint);
}

const updateRiverSpeedAnimation = value => {
  if (!value) {
    const { riverSpeed } = getParams();
    value = riverSpeed.toFixed(1);
  }
  const waves = document.querySelectorAll('.wave');
  const animationDurationSpeedMap = new Map();
  let theSlowestDuration = 21;

  for (let i = 0; i <= 5; i += 0.1) {
    let key = i.toFixed(1);

    if (i === 0) {
      animationDurationSpeedMap.set(key, "0s");
    }
    else {
      animationDurationSpeedMap.set(key, theSlowestDuration.toFixed(1) + "s");
    }
    theSlowestDuration -= .4;
    theSlowestDuration.toFixed(1);
  }
  const speed = parseFloat(value).toFixed(1);
  const speedToAnimationDuration = animationDurationSpeedMap.get(speed);

  waves.forEach(wave => {
    wave.style.animationDuration = speedToAnimationDuration;
  });
  updateRiverSpeedArrowWidth();
}

const updateBoatAngle = angle => {
  if (!angle) {
    angle = document.getElementById('input-boat-initial-angle').value;
  }
  const boat = document.getElementById('boat');
  parseInt(angle) < 90 ?
    boat.style.transform = "scale(-1, 1) " + `rotate(-${angle}deg)` : boat.style.transform = "scale(-1, -1) " + `rotate(${angle}deg)`;
}

const updateRiverSpeedArrowWidth = speed => {
  if (!speed) {
    const { riverSpeed } = getParams();
    speed = riverSpeed;
  }
  const arrow = document.getElementById('river-speed-vector');
  let minWidth = 24;
  let newWidth = minWidth + (+speed * 60) + "px"
  if (newWidth === "24px") {
    newWidth = 0;
  }
  arrow.style.width = newWidth;
}

const initRiver = () => {
  const params = getParams();
  const riverWidth = params.riverWidth;
  drawRiver(riverWidth);
}

window.addEventListener('load', () => {
  initRiver();
  document.getElementById('input-river-speed').addEventListener('input', (event) => {
    updateRiverSpeedAnimation(event.target.value);
    updateRiverSpeedArrowWidth(event.target.value);
  });

  document.getElementById('input-river-width').addEventListener('input', (event) => {
    drawRiver(event.target.value);
  });
  document.getElementById('input-destination-location').addEventListener('input', (event) => {
    drawDestinationPoint(event.target.value);
  });
  document.getElementById('input-boat-initial-angle').addEventListener('input', (event) => {
    updateBoatAngle(event.target.value);
  });
  document.getElementById('run-algorithm-button').addEventListener('click', () => {
    startBoatAnimations();
  });
});

const startBoatAnimations = () => {
  wasAlgorithmFired = true;

  const previousDestinationPoints = document.querySelectorAll('.destination-point-of-iteration');
  if (previousDestinationPoints.length) {
    previousDestinationPoints.forEach(element => {
      element.remove()
    })
  }
  let boatFinalDestinations = mapAnglesToDestinations(evaluateOptimalBoatAngle().historyAngles);
  const { historyAngles } = evaluateOptimalBoatAngle();
  console.log(historyAngles)
  console.log(boatFinalDestinations);
  const boat = document.getElementById('boat');

  const numberOfIterations = getParams().iterations;

  let i = 0;
  let nextTimeout = 500 // 0.5s
  const riverMiddlePoint = document.querySelector('.river').clientWidth / 2;
  let destinationPointOffsetLeft = document.getElementById("destinationPoint").style.left;
  destinationPointOffsetLeft = parseFloat(destinationPointOffsetLeft.slice(0, destinationPointOffsetLeft.length - 2));
  console.log(destinationPointOffsetLeft);
  const destinationLocationRange = 40;
  const riverWidth = document.querySelector('.river').clientWidth;
  const oneDestinationStepInPx = riverWidth / destinationLocationRange;

  function runBoatAnimations() {
    setTimeout(() => {
      let animationDuration = parseFloat(boatFinalDestinations[i].duration.toFixed(2));
      let boatEndPointOffset = boatFinalDestinations[i].location * oneDestinationStepInPx;
      let boatEndPoint
      if (boatFinalDestinations[i].location < 0) {
        boatEndPoint = riverMiddlePoint - destinationPointOffsetLeft - 16 //// - 16 to include the half of boat width
        boatEndPoint = -boatEndPoint;
      }
      else {
        boatEndPoint = destinationPointOffsetLeft - riverMiddlePoint + 16; // + 16 to include the half of boat width
      }
      boatEndPoint += boatEndPointOffset;

      let angle = parseFloat(historyAngles[i]);
      let roateBoat;
      parseInt(angle) < 90 ?
      roateBoat = "scale(-1, 1) " + `rotate(-${angle}deg)` : roateBoat = "scale(-1, -1) " + `rotate(${angle}deg)`;

      console.log(boatEndPoint)
      boat.animate([
        { transform: 'translate3d(0,0,0) ' + roateBoat },
        { transform: `translate3d(${boatEndPoint.toFixed(2)}px, -288px, 0)` + roateBoat }
      ], {
        duration: animationDuration * 1000,
        iterations: 1
      })
      nextTimeout = animationDuration * 1000;
      drawBoatEndPoint(boatEndPoint, i);
      i++;
      if (i < numberOfIterations) {
        runBoatAnimations();
      }
    }, nextTimeout)
  }
  runBoatAnimations();
}

const drawBoatEndPoint = (point, i) => {


  const riverMiddlePoint = document.querySelector('.river').clientWidth / 2;
  const flagContainer = document.getElementById('flag-container');
  const destinationPointOfIteration = document.createElement('div');
  destinationPointOfIteration.classList.add('destination-point-of-iteration');
  destinationPointOfIteration.style.left = riverMiddlePoint + point - 16 + "px";
  destinationPointOfIteration.innerHTML = ++i;
  flagContainer.appendChild(destinationPointOfIteration);
}

window.addEventListener('resize', () => {
  initRiver();
});
