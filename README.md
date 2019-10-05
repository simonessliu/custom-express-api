# custom-express-api

1. To create this custom api, firstly I create an express file and fill up with basic configuration and use mongoose to connect to cloud mongodb sandbox. mongoose.connection.on() will provide the necessary info when mongodb is successfully connected or not

![](img/howitworks.png)

2. The package I have used include mongoose, body-parser and jwt and bcrypt, the explanation of jwt can be found in install bcrypt.txt file.

3. I create 2 different schemes which are user and track. Each of these schemes mentioned the necessary info that is needed. For example, in userscheme. we have a email and password attri in order to accomplish the logging functionalities. and for tracks it also has the necessary info as well. in userscheme, we used bcrypt to hash and salt the password. the detailed explanation is userscheme file in model

4. after setting up the scheme, I create 2 different routes, these routes is actually where the api functions created. in this file we use express.Router() to create api functions. in trackrouters we use requireauth to ensure that in order to use track router user has to log in first
![](img/trackroute.png)

5. in requireauth file, we set req.user = user that exactly match the userId we are looking for, as a result in track router file as we require auth, we can use req.user as the current authenticated user
