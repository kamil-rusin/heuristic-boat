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
  const {value} = document.getElementById(inputId);
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
    boatInitialAngleInRadians: parseInt(boatInitialAngle) * Math.PI / 180,
    boatSpeed: parseInt(boatSpeed),
    riverSpeed: parseInt(riverSpeed),
    riverWidth: parseInt(riverWidth),
    destinationLocation: parseInt(destinationLocation),
    iterations: parseInt(iterations),
    agents: parseInt(agents),
    neighborhoodFactor: parseFloat(neighborhoodFactor),
  });
};

updateInputLabels();
