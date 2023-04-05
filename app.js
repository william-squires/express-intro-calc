/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");
const { findMode, findMean, findMedian } = require("./stats");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */

app.get("/mean/:nums", function (req, res) {
  let nums = req.params.nums;
  nums = nums.split(",");
  nums = convertStrNums(nums);

  const mean = findMean(nums);

  return res.json({ response: { operation: "mean", value: mean } });

});

/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median/:nums", function (req, res) {
  let nums = req.params.nums;
  nums = nums.split(",");
  nums = convertStrNums(nums);

  const median = findMedian(nums);

  return res.json({ response: { operation: "median", value: median } });

});

/** Finds mode of nums in qs: returns {operation: "mode", result } */

app.get("/mode/:nums", function (req, res) {
  let nums = req.params.nums;
  nums = nums.split(",");
  nums = convertStrNums(nums);

  const mode = findMode(nums);
  
  return res.json({ response: { operation: "mode", value: mode } });

});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;