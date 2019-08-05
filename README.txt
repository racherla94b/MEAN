MEAN stack project
Navigate into the ec-project folder in the command line

Run "npm install" to install all the required dependencies

Make sure to use the latest version of Angular CLI

Run "ng serve" to see the app in action (if that doesn't work run "npm start")

start mongo daemon in replica sets
mongod --replSet rs0

Open a new terminal in the project folder and run "node server.js" for the backend server to start

Then navigate into the msgs-kafka folder, run 2 python terminals python producer.py, python consumer.py