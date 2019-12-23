// wyznacza wektor łodzi bez uwzględnienia prądu rzeki:
//   współrzędną X
//   współrzędną Y
const evaluateBoatDesireVector = (initialAngle) => {
  const {boatSpeed} = getParams();
  return ({
    x: -boatSpeed * Math.cos(initialAngle),
    y: boatSpeed * Math.sin(initialAngle),
  });
};

// wyznacza wynikowy wektor łodzi, uwzględniając prąd rzeki:
//   współrzędną X
//   współrzędną Y
//   kąt, pod jakim popłynie łódź
//   długość wektora, czyli wynikową prędkość łódki
const evaluateBoatResultVector = (initialAngle) => {
  const {x, y} = evaluateBoatDesireVector(initialAngle);
  const {riverSpeed} = getParams();
  const resultX = -riverSpeed + x;
  return ({
    x: resultX,
    y,
    angle: Math.atan(-y / x),
    length: Math.sqrt(x * x + y * y),
  });
};

// wyznacza rezultat podróży łódki:
//   współrzędną punktu, do którego dopłynie łódź
//   czas trwania podróży (docelowo w sekundach)
//   odległość od punktu celu
const evaluateBoatTripResults = (initialAngle) => {
  const {angle, length} = evaluateBoatResultVector(initialAngle);
  const betaAngle = Math.abs((Math.PI / 2) - angle);
  const {destinationLocation, riverWidth} = getParams();

  let resultLocation = riverWidth * Math.tan(betaAngle);
  if (angle < Math.PI / 2) {
    resultLocation = -resultLocation;
  }

  const tripLength = riverWidth / Math.cos(betaAngle);

  return ({
    location: resultLocation,
    duration: Math.abs(tripLength / length),
    distance: Math.abs(resultLocation - destinationLocation),
  });
};

// funkcja celu w uproszczonej postaci
const objectiveFunction = (initialAngle) => {
  return evaluateBoatTripResults(initialAngle).distance;
};

// metoda algorytmu heurystycznego
const evaluateOptimalBoatAngle = () => {
  let m, n, o, p, q; // TODO: dodać suwaki na parametry algorytmu

  // TODO: algorytm heurystyczny

  return Math.random() * 180;
};
