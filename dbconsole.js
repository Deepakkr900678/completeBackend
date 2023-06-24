require("dotenv").config();
const {userModel} = require("./db/db"); // Replace with your actual model
const repl = require('repl');
const replServer = repl.start('> ');

replServer.context.userModel = userModel;