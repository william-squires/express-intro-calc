const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  for (let i in strNums) {
      n = Number(strNums[i])
      if (isNaN(n)) {
        throw BadRequestError()
      }
      strNums[i] = n;
  }
  return strNums;
}


module.exports = { convertStrNums };