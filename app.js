const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    OAuth2Server = require('oauth2-server'),
    Request = OAuth2Server.Request,
    Response = OAuth2Server.Response;
const cors = require('cors'); // Import the cors middleware

// Import connectDB function to connect Database
const {connectDb} = require("./connectDB");
const clientRoute = require("./routes/ClientRoute.js");

const app = express();
//sudo service mongod start
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.bodyParser({limit: '50mb'}));


// Use cors middleware for the /oauth/token endpoint
app.use('/oauth/token', cors());

// Replace with the Actual URI for the Database
// const  mongoUri = 'mongodb://localhost:27017/oauth';
const mongoUri = 'mongodb://127.0.0.1:27017/oauth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1'

connectDb(mongoUri)
    .then(()=>{
        console.log("Database Connected");
    })
    .catch((err)=>{
        console.log("Database Not Connected: ",err);
    })



mongoose.connect(mongoUri, {
    useNewUrlParser: true
});

app.oauth = new OAuth2Server({
    model: require('./model.js'),
    accessTokenLifetime: 60 * 60,
    allowBearerTokensInQueryString: true
});

// App Routes
app.all('/oauth/token', obtainToken);



app.get("/",(req,res)=>{
    return res.json({"message":"Default Page"});
});

app.use("/client",clientRoute);







app.listen(3003, function() {
    console.log("Server started on port 3003");
});

// Functions
function obtainToken(req, res) {
    console.log("request came");
    var request = new Request(req);
    var response = new Response(res);

    return app.oauth.token(request, response)
        .then(function(token) {
            // Set CORS headers for the response
            res.header('Access-Control-Allow-Origin', '*');
            
            res.json(token);
        }).catch(function(err) {
            res.status(err.code || 500).json(err);
        });
}

function authenticateRequest(req, res, next) {
    var request = new Request(req);
    var response = new Response(res);

    return app.oauth.authenticate(request, response)
        .then(function(token) {
            next();
            
        }).catch(function(err) {
            res.status(err.code || 500).json(err);
        });
}


