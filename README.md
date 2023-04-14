# node-express-api-mongoDB-with-docker
## Technologies
### Node, Express, MongoDB,JWT, Docker
## Features
### Connect to database(MongoDB Compass)
### Create models(product, user)
### Create routes
### Build CRUD user (POST/GET-ALL/UPDATE/Get-ByID/DELETE)
### Build CRUD product (POST/GET-ALL/UPDATE/Get-ByID/DELETE)
### Upload files and images
### Add, create, account and crypte password
### Add login and jwt
### Create Dockerfile
## Docker
Write Dockerfile

Build docker image from dockerfile :
```
docker build -t node-app:1.0 .
```

List Docker Images :
```
docker images
```

Run docker container :
```
docker run -d -p 3000:3000 node-app:1.0
```

You will see the  output as below image:
http://localhost:3000/
