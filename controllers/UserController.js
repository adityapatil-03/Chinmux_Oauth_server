const path = require("path");
const fs = require("fs");

const publicPath = path.join(__dirname, '../public');

// Rendering of User Registration HTML Page
const userRegistration = async (req, res) => {
  return res.sendFile(path.join(publicPath, 'UserRegistration.html'));
}

const handleUserRegistration = (req, res) => {
  console.log(__dirname);
  const email = req.body.email;
  const name = req.body.name;
  let image_data = req.body.image_data; // Use 'let' for reassignment
  console.log("Name: ", name);
  console.log("Email: ", email);

  // Remove the data URL prefix
  image_data = image_data.replace(/^data:image\/jpeg;base64,/, '');

   // Change the file path as needed
  const filePath = path.join(publicPath, 'images', `${name}.jpg`);

  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  
  const buffer = Buffer.from(image_data, 'base64');
  fs.writeFileSync(filePath, buffer);

  return res.status(200).json({ message: "Data Received" });
};

module.exports = {
  userRegistration,
  handleUserRegistration
}
