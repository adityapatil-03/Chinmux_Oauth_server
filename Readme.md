# Install required dependices
## Install npm Packages;
```bash
npm i
```

## Install faceoauth
```bash
npm i faceoauth
```

# Running application

## In the root directory(Chinmux_oauth_server) run
```bash
node app.js
```

## and
```bash
python3 model.py;
```

# Creating a Client 
## Click on this to [Register](http://localhost:3003/client/register) client.

### Create a base64 of client id and Client Secret in this way clientId:clientSecret on [this](https://base64.guru/converter/decode) website.

### Change client id in Mylib.config.clientID to your generated id.

### And add pass email id as parameter to Mylib.startverification in faceauth and you are done.

### if user is not verifed this json is recieved 

``` { "statusCode": 503, "status": 503, "code": 503, "message": { "error": "not verified" }, "name": "server_error" } ```

### If user is verified 
```
{ "accessToken": "a0c9cc6cba0468e653cd090993cba0dce2eb5866", "accessTokenExpiresAt": "2023-11-01T15:29:37.168Z", "refreshToken": "ca8ca208983cba43cadf27cbd14fcf40affb2b07", "refreshTokenExpiresAt": "2023-11-15T14:29:37.168Z", "client": { "id": "application" }, "user": { "username": "adityapatil942328@gmail.com" } }
```


# Creating Users.

### Use this Route to create [users](http://localhost:3003/user/register).




