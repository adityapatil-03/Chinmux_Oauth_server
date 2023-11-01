const clientModel = require('../mongo/model/client')
const {v4:uuidv4} = require("uuid");
const path = require('path');
const bcrypt = require("bcrypt");

const clientRegister = async(req,res)=>{

    
 // Check if email already Exists in the Database -> If Exists then Display Already Exists

    // Else if email not registered; Store the data in the Database
    let { email, password } = req.body;

    // Create ClientId and Client Secret ID and also Store that in the Database
    const clientId = uuidv4();
    const sId = email.split("@")[0];
    const clientSecret = clientId + `-${sId}${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(clientId);
    console.log(clientSecret);

    // Hash the password before storing it into the Database
    try {
        password = await bcrypt.hash(password, 10); // Await the hash operation

        // Store ClientId, SecretId, email, password into the Database using 'create' method
      // await client1.save();
        const registeredUser = new clientModel({
          //  id: 'application',	// TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
            clientId: clientId,
            clientSecret: clientSecret,
            grants: [
                'password',
                'refresh_token'
            ],
            redirectUris: []
        });
        await registeredUser.save();
        console.log("User Registered: ",registeredUser);
        // Display Success Message [ClientID and Secret ID]
        return res.status(200).json({ clientId, clientSecret });
    } catch (error) {
        console.error('Failed to register user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const clientRegisterPage = async(req,res)=>{
    const publicPath = path.join(__dirname, '../public');
    return res.sendFile(path.join(publicPath, 'ClientRegister.html'));
}

module.exports = {
    clientRegister,clientRegisterPage
}