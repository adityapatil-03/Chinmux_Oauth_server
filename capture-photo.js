const NodeWebcam = require('node-webcam');
const fs = require('path');

// Create a new NodeWebcam object
const webcam = new NodeWebcam();

// Set the options for the webcam
webcam.setOptions({
  width: 1280,
  height: 720,
  quality: 100,
  delay: 1,
  saveShots: true,
  output: "jpeg",
  device: false,
  callbackReturn: "location"
});

// Capture and save a photo when the user requests it
app.get('/capture-photo', async (req, res) => {
  // Capture the photo
  await webcam.capture('live_photo.jpg');

  // Save the photo to disk
  const uniqueValue = Date.now();
  const fileName = `${uniqueValue}.jpg`;
  const filePath = path.join(__dirname, 'public/images', fileName);

  // Use the fs.promises.writeFile() method to save the photo to disk asynchronously
  await fs.promises.writeFile(filePath, webcam.getImage());

  // Send the photo to the client
  res.sendFile(filePath);
});