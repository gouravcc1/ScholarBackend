const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const AppError=require('./utils/AppError')
// const globleErrorHandler=require('./controllars/errorControllar')
// const TourRoute = require("./routes/tourroute");
// const userRoute = require("./routes/userroute");
dotenv.config({
  path: "./config.env",
});
const DB = process.env.DATA_BASE.replace(
  "PASSWORD",
  process.env.DATA_BASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("success conection");
  });

app.use(express.json());

// app.use("/api/v1/tours", TourRoute);
// app.use("/api/v1/user",  userRoute);
app.all('*',(req,res,next)=>{
//    next(new AppError(`can't find ${req.originalUrl} on the server`,404));
res.status(404).json({
    result:"fail",
    messege:`can't find ${req.originalUrl} on the server`
})
})
// app.use(globleErrorHandler)
module.exports = app;
//
