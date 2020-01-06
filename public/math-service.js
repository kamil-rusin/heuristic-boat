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
    angle: Math.atan(-y / resultX),
    length: Math.sqrt(resultX * resultX + y * y),
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

//metoda na losowanie z przedziału(min= -factor, max = factor)
const generateRandomNumber = (factor) => {
    return (Math.random() * (Number(factor) + Number(factor)) - Number(factor));
};

// metoda algorytmu heurystycznego
const evaluateOptimalBoatAngle = () => {
    const {iterations, agents, boatInitialAngleInRadians, neighborhoodFactor} = getParams();
    let bestDistance, historyAngles = [], historyDistance = [], iter = 0, tempAngle, tempAgent,
        tempDistance, forValue, tempValue,
        factorInRadians = neighborhoodFactor*Math.PI/180;


    let bestAngle = boatInitialAngleInRadians;

    while (iter < iterations) {
        bestDistance = objectiveFunction(bestAngle);

        for (let i = 0; i < agents; i++) {
            tempAgent = Number(bestAngle) + Number(generateRandomNumber(factorInRadians));

            //granice: 0 - 179 stopni
            if (tempAgent > 3.12413936) {
                tempAgent = 3.12413936;
            } else if (tempAgent < 0) {
                tempAgent = 0;
            }

            if (i === 0) {
                forValue = objectiveFunction(tempAgent);
            } else {
                tempValue = objectiveFunction(tempAgent);
                if (tempValue < forValue) {
                    tempDistance = tempValue;
                    tempAngle = tempAgent;
                }
            }
        }

        if (tempDistance < bestDistance) {
            bestAngle = tempAngle;
        }

        historyAngles.push(parseFloat((bestAngle*180/Math.PI).toFixed(2)));
        historyDistance.push(parseFloat(bestDistance.toFixed(2)));
        iter++;
    }

    return ({
        historyDistance: historyDistance,
        historyAngles: historyAngles,
        optimalAngle: historyAngles[iterations-1],
        optimalDistance: historyDistance[iterations-1],
    });
};
