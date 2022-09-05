const fs = require("fs");
const path = require("path");
const quizDir = "./quiz_data";

const walk = (p, callback) => {
  const results = [];

  fs.readdir(p, (err, files) => {
    if (err) {
      throw err;
    }

    let pending = files.length;
    if (!pending) {
      return callback(null, results);
    }

    files
      .map((file) => {
        return path.join(p, file);
      })
      .filter((file) => {
        if (fs.statSync(file).isDirectory())
          walk(file, function (err, res) {
            results.push({ name: path.basename(file), children: res });
            if (!--pending) {
              callback(null, results);
            }
          });
        return fs.statSync(file).isFile();
      })
      .forEach((file) => {
        const fileName = path.basename(file);
        results.push({ file, name: getNameWithoutExt(fileName) });
        if (!--pending) {
          callback(null, results);
        }
      });
  });
};

// does not expect the name to have multiple dots
const getNameWithoutExt = (file) => {
  return file.split(".")[0];
};

walk(quizDir, function (err, results) {
  if (err) {
    throw err;
  }
  var data = { name: "root", children: results };
  console.log(JSON.stringify(data));
});
