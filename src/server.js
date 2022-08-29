require("express-async-errors")

const database = require("./database/sqlite");

const express = require("express");

const routes = require("./routes");

const app = express();

const appError = require("./utils/appError");

database();
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if(error instanceof appError){
    return response.status(error.statusCode).json({
      status: "Invalid entry",
      message: error.message
    });
  }
  
  console.log(error.message);
  
  return response.status(500).json({
    status: "Server Error",
    message: "Internal error"
  });
});

const PORT = 3333;
app.listen(PORT, () => `server is running on port ${PORT}`);