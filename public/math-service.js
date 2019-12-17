const evaluateBoatInitialVector = () => {
  const {boatInitialAngle, boatSpeed} = getParams();
  const angleInRadians = boatInitialAngle * Math.PI / 180;
  return ({
    x: -boatSpeed * Math.cos(angleInRadians),
    y: boatSpeed * Math.sin(angleInRadians),
  });
};

const evaluateDestination = (angle) => {
  const {
    boatSpeed,
    riverSpeed,
    riverWidth,
    destinationLocation,
  } = getParams();

  // TODO: wyznaczanie celu łódki
  return Math.random() * 40 - 20;
};

const evaluateOptimalBoatAngle = () => {
  let m, n, o, p, q; // TODO: dodać suwaki na parametry algorytmu

  // TODO: algorytm heurystyczny

  return Math.random() * 180;
};
