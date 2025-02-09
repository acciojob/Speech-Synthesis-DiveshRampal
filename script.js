const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const rateSlider = document.querySelector('[name="rate"]');
const pitchSlider = document.querySelector('[name="pitch"]');
const textInput = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Function to populate the voice dropdown list
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = ''; // Clear existing options

  if (voices.length === 0) {
    voicesDropdown.innerHTML = "<option>No voices available</option>";
  } else {
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      voicesDropdown.appendChild(option);
    });
  }
}

// Set up the SpeechSynthesisUtterance properties when a new voice is selected
voicesDropdown.addEventListener('change', () => {
  const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
  if (selectedVoice) {
    msg.voice = selectedVoice;
  }
});

// Function to update rate and pitch dynamically
rateSlider.addEventListener('input', () => {
  msg.rate = rateSlider.value;
});

pitchSlider.addEventListener('input', () => {
  msg.pitch = pitchSlider.value;
});

// Speak the text input
speakButton.addEventListener('click', () => {
  if (textInput.value.trim() === "") {
    alert("Please enter some text to speak.");
    return;
  }

  msg.text = textInput.value;
  speechSynthesis.speak(msg);
});

// Stop the speech
stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});

// Initialize voic
