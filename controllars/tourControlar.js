const { Query } = require("mongoose");
const { dirname } = require("path");
// const { features } = require("process");
const ApiFeatures = require("./../utils/ApiFeatures");
const Tour = require("./../modals/Scholarshipmodal");
const { match } = require("assert");
// exports.aliastoptours = (req, res, next) => {
//   req.query.sort = "-ratingsAverage price";
//   req.query.limit = "5";
//   req.query.fields = "name,price,ratingsAverage,summary,difficulty";
//   next();
// };
exports.PostAScholarship = async (req, res) => {
  try {
    const newtour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newtour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      messege: err,
    });
  }
};

exports.GetAllScholarshipparsed = async (req, res) => {
  try {
    // // build the query
    // console.log(req.query);
    // // filtering
    // const qb={...req.query};
    // const exclude=['sort','page','limit','fields'];
    // exclude.forEach(el => delete qb[el]);
    // let queryst=JSON.stringify(qb);
    // queryst= queryst.replace(/\b(gt|lt|gte|lte)\b/g,m=>('$'+m)); // excluding some terms
    // const sqb=JSON.parse(queryst);
    // // console.log(req.query.fields);
    //  let query=Tour.find(sqb);
    // // sorting
    // if(req.query.sort){
    //   const sortby=req.query.sort.split(',').join(' ');
    //  query= query.sort(sortby);
    // }else{
    //   query= query.sort('-createdAt');
    // }

    // // fielding
    // if(req.query.fields){

    //   const field=req.query.fields.split(',').join(' ');
    //   // console.log(field);
    //     query=query.select(field);
    //   }else{
    //   query=query.select('-__v');
    // }

    // // pagination
    // // 4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page-1) * limit;
    // query = query.skip (skip).limit(limit);
    // if(req.query.page){
    //   const numofdoc= await tour.countDocuments();
    //   if(skip>numofdoc) throw new Error('this page does not exist') ;
    // }
    const Features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .limilfields()
      .pagination();
    const tour = await Features.query;
    res.status(200).json({
       tour: tour,
  });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: err,
    });
  }
};
exports.GetAllScholarship = async (req, res) => {
  try {
    // // build the query
    // console.log(req.query);
    // // filtering
    // const qb={...req.query};
    // const exclude=['sort','page','limit','fields'];
    // exclude.forEach(el => delete qb[el]);
    // let queryst=JSON.stringify(qb);
    // queryst= queryst.replace(/\b(gt|lt|gte|lte)\b/g,m=>('$'+m)); // excluding some terms
    // const sqb=JSON.parse(queryst);
    // // console.log(req.query.fields);
    //  let query=Tour.find(sqb);
    // // sorting
    // if(req.query.sort){
    //   const sortby=req.query.sort.split(',').join(' ');
    //  query= query.sort(sortby);
    // }else{
    //   query= query.sort('-createdAt');
    // }

    // // fielding
    // if(req.query.fields){

    //   const field=req.query.fields.split(',').join(' ');
    //   // console.log(field);
    //     query=query.select(field);
    //   }else{
    //   query=query.select('-__v');
    // }

    // // pagination
    // // 4) Pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page-1) * limit;
    // query = query.skip (skip).limit(limit);
    // if(req.query.page){
    //   const numofdoc= await tour.countDocuments();
    //   if(skip>numofdoc) throw new Error('this page does not exist') ;
    // }
    const Features = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sorting()
      .limilfields()
      .pagination();
    const tour = await Features.query;
    res.status(200).json({
      status: "success",
      results: tour.length,
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: err,
    });
  }
};
exports.GetAScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: "data not found",
    });
  }
};
exports.DeleteAScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: "delete failed",
    });
  }
};

exports.PutScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOneAndReplace(id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
    res.send("done");
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: err,
    });
  }
};
exports.UpdateScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: "update failed not found",
    });
  }
};
exports.GetScholarshipStates = async (req, res) => {
  try {
    // console.log("success");
    const states = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: null,
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        states,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      messege: err,
    });
  }
};
