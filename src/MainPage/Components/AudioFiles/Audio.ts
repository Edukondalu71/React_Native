import Sound from "react-native-sound";

// Enable playback in silence mode
Sound.setCategory('Playback');

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
export const sent = new Sound('send.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    //console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  //console.log('duration in seconds: ' + sent.getDuration() + 'number of channels: ' + sent.getNumberOfChannels());
});

export const recive = new Sound('recive.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      //console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    //console.log('duration in seconds: ' + sent.getDuration() + 'number of channels: ' + sent.getNumberOfChannels());
  });