const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  const convertedNums = []
  for (const num of strNums) {
      n = Number(num)//const

      if (isNaN(n)) {
        throw new BadRequestError(`${num} is not a number`);
      }
      convertedNums.push(n);
  }
  return convertedNums;
}


module.exports = { convertStrNums };