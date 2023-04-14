#FROM : build this image from the specified image
FROM node:19-alpine

#copies files or directories on our machine and adds them to the filesystem of the container at the path dest
COPY package.json /app/
COPY src /app/
#set the working directory for all following commands : like change our directory ->cd..
WORKDIR /app


#RUN : will execute any command in shell inside the container enviroment 
RUN npm install

#that executed when container starts
CMD ["node", "server.js"]

