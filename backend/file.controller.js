const uploadFolder = __basedir + '/uploads/';
const galleryFolder = __basedir + '/gallery/';
const fs = require('fs');
const readline = require('readline');
const async = require('async');
const mkdirp = require('mkdirp');
const datetime = require('node-datetime');
const { imgDiff } = require('img-diff-js');
const jimp = require('jimp');
const imageSizeOf = require('image-size');


exports.readyUpload = (req, res) => {
  var dt = datetime.create(Date.now(), 'YmdHMS');
  var path = uploadFolder + req.params.group + '/' + req.params.testcase + '/' + dt.format();
  mkdirp(path);
  console.log("---------------------------------------------------------------------------");
  console.log("Uploading path : " + path);
  res.send(dt.format());
}

exports.uploadSingleFile = (req, res) => {
  console.log("file path : /" + req.params.group + "/" + req.params.testcase + "/" + req.params.seq + "/" + req.file.filename);
  res.send('Success file uploading');
}

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}

exports.uploadMultiFiles = (req, res) => {
  let parent_path = uploadFolder + req.params.group + '/' + req.params.testcase + '/';
  let seq = req.params.seq;
  let path = uploadFolder + req.params.group + '/' + req.params.testcase + '/' + req.params.seq + '/';
  let task = [];

  try {
    for (let index = 0; index < req.files.length; index+=2) {
      let pad = (index/2).pad(3);
      task.push(function (callback) {
        imgDiff({
          actualFilename: path + req.files[index].filename,
          expectedFilename: path + req.files[index + 1].filename,
          diffFilename: path + pad + "_diff.png",
        }).then(result => callback(null, result) );
      });
    }

    let passgate = 90;
    let passcount = 0;
    let failcount = 0;
    if (fs.existsSync(parent_path + 'passcount.txt')) {
      let lines = fs.readFileSync(parent_path + 'passcount.txt', 'utf8').split('\n').filter(Boolean);
      passgate = parseInt(lines[0].split(':')[1]);
    }
    else {
      fs.appendFile(parent_path + 'passcount.txt', 'passgate:' + passgate + '\n', (err) => {
        if (err) console.log(err);
      });
    }

    async.parallel(task,
      function (err, results) {
        if (err) console.log(err);
        else {
          let avg = 0;
          let saveData = '';
          let prevWidth = 0;
          let prevHeight = 0;
          for (let index = 0; index < results.length; index++) {
            let pad = index.pad(3);
            console.log("file path : " + path + pad + "_org.jpg");
            console.log("file path : " + path + pad + "_cap.jpg");
            console.log("file path : " + path + pad + "_diff.png");
            let passrate = parseInt(100 - (results[index].diffCount * 100) / (results[index].width * results[index].height));
            avg += passrate;
            console.log("Pate Rate : " + passrate + "%");
            fs.appendFile(path + 'passrate.txt', pad + ':' + passrate + '\n', (err) => {
              if (err) console.log(err);
            });

            if (passrate >= passgate) {
              passcount++;
            }
            else {
              failcount++;
            }

            let dimensions = imageSizeOf(path + pad + "_org.jpg");
            if (dimensions.width > dimensions.height) {
              prevWidth = 300;
              prevHeight = Math.floor(dimensions.height * prevWidth / dimensions.width);
            }
            else {
              prevHeight = 300;
              prevWidth = Math.floor(dimensions.width * prevHeight / dimensions.height);
            }

            if (index == 0) {
              saveData += '[';
            }
            else {
              saveData += ',';
            }
            saveData += `
              {
                  "rate": ${passrate},
                  "preview": {
                    "path": "/api/file/${req.params.group}/${req.params.testcase}/${req.params.seq}/${pad}_prev.jpg",
                    "width": ${prevWidth},
                    "height": ${prevHeight}
                  },
                  "origin": {
                    "path": "/api/file/${req.params.group}/${req.params.testcase}/${req.params.seq}/${pad}_org.jpg",
                    "width": ${dimensions.width},
                    "height": ${dimensions.height}
                  },
                  "captured": {
                    "path": "/api/file/${req.params.group}/${req.params.testcase}/${req.params.seq}/${pad}_cap.jpg",
                    "width": ${dimensions.width},
                    "height": ${dimensions.height}
                  },
                  "diff": {
                    "path": "/api/file/${req.params.group}/${req.params.testcase}/${req.params.seq}/${pad}_diff.png",
                    "width": ${dimensions.width},
                    "height": ${dimensions.height}
                  }
              }`;

            jimp.read(path + pad + "_diff.png", (err, img) => {
              if (err) throw err;
              img
                .resize(prevWidth, prevHeight) // resize
                .quality(60) // set JPEG quality
                .write(path + pad + "_prev.jpg"); // save
            });
          }
          saveData += ']';
          fs.appendFile(path + 'data.json', saveData, (err) => { if (err) console.log(err); });

          avg = parseInt(avg / results.length);
          console.log("Average Pate Rate : " + avg + "%");
          fs.appendFile(path + 'passrate.txt', 'avg:' + avg + '\n', (err) => {
            if (err) console.log(err);
          });
          fs.appendFile(parent_path + 'passrate.txt', seq + ':' + avg + '\n', (err) => {
            if (err) console.log(err);
          });
          fs.appendFile(parent_path + 'passcount.txt', seq + ':' + passcount + ',' + failcount + '\n', (err) => {
            if (err) console.log(err);
          });
        }
      }
    );
  }
  catch (err) {
    console.log(err);
  }

  res.send({ 'message': 'Success file uploading' });
}

exports.dashboard = (req, res) => {
  let result = [];
  let groups = fs.readdirSync(uploadFolder).sort();
  for (let index1 = 0; index1 < groups.length; index1++) {
    let group = { groupName: groups[index1], testcases: []};
    let testcases = fs.readdirSync(uploadFolder + groups[index1] + '/').sort();
    for (let index2 = 0; index2 < testcases.length; index2++) {
      let testdate="20180101010101";
      let passgate = 90;
      let passcount = 0;
      let failcount = 0;
      let avgrate = 0;
      let counts;

      let lines = fs.readFileSync(uploadFolder + groups[index1] + '/' + testcases[index2] + "/passcount.txt", 'utf8').split('\n').filter(Boolean);
      for (let index3 = 0; index3 < lines.length; index3++) {
        if (lines[index3].length <= 8) continue;
        if (lines[index3].startsWith("passgate:")) {
          passgate = parseInt(lines[index3].substring(9));
        }
        else {
          testdate = lines[index3].substring(0, 14);
          counts = lines[index3].substring(15).split(',');
          passcount = parseInt(counts[0]);
          failcount = parseInt(counts[1]);
        }
      }

      lines = fs.readFileSync(uploadFolder + groups[index1] + '/' + testcases[index2] + "/passrate.txt", 'utf8').split('\n').filter(Boolean);
      for (let index3 = 0; index3 < lines.length; index3++) {
        if (lines[index3].length <= 14) continue;
        avgrate = parseInt(lines[index3].substring(15));
      }

      group.testcases.push({
        testName: testcases[index2],
        testDate: testdate.substring(0, 4) + '-' + testdate.substring(4, 6) + '-' + testdate.substring(6, 8),
        testTime: testdate.substring(8, 10) + ':' + testdate.substring(10, 12) + ':' + testdate.substring(12),
        passGate: passgate,
        passCount: passcount,
        failCount: failcount,
        avgRate: avgrate
      });
    }

    result.push(group);
  }

  res.send(result);
}

exports.history = (req, res) => {
  let result = {passgate: 0, datas: []};

  let testdate = "20180101010101";
  let passcount = 0;
  let failcount = 0;
  let avgrate = 0;
  let counts;

  let lines1 = fs.readFileSync(uploadFolder + req.params.group + '/' + req.params.testcase + "/passcount.txt", 'utf8').split('\n').filter(Boolean);
  let lines2 = fs.readFileSync(uploadFolder + req.params.group + '/' + req.params.testcase + "/passrate.txt", 'utf8').split('\n').filter(Boolean);
  for (let index = 0; index < lines1.length; index++) {
    if (lines1[index].length <= 8) continue;
    if (lines1[index].startsWith("passgate:")) {
      result.passgate = parseInt(lines1[index].substring(9));
    }
    else {
      testdate = lines1[index].substring(0, 14);
      counts = lines1[index].substring(15).split(',');
      passcount = parseInt(counts[0]);
      failcount = parseInt(counts[1]);
      avgrate = lines2[index - 1].substring(15);

      result.datas.push({
        id: testdate,
        testDate: testdate.substring(0, 4) + '-' + testdate.substring(4, 6) + '-' + testdate.substring(6, 8),
        testTime: testdate.substring(8, 10) + ':' + testdate.substring(10, 12) + ':' + testdate.substring(12),
        passCount: passcount,
        failCount: failcount,
        passRate: parseInt(((passcount * 100) / (passcount + failcount)).toFixed(0)),
        avgRate: avgrate
      });
    }
  }

  res.send(result);
}

exports.listGroup = (req, res) => {
  fs.readdir(uploadFolder, (err, groups) => {
    res.send(groups);
  })
}

exports.listTestcase = (req, res) => {
  fs.readdir(uploadFolder + req.params.group + '/', (err, testcases) => {
    res.send(testcases);
  })
}

exports.listSeq = (req, res) => {
  fs.readdir(uploadFolder + req.params.group + '/' + req.params.testcase + "/", (err, seq) => {
    res.send(seq);
  })
}

exports.tcPassRate = (req, res) => {

  let passrate_file = uploadFolder + req.params.group + '/' + req.params.testcase + '/passrate.txt';
  try {
    if (fs.existsSync(passrate_file)) {

      let lines = fs.readFileSync(passrate_file, 'utf8').split('\n').filter(Boolean);
      let avg = 0;
      let result = { avg: 0, datas: [] };
      let index = 0;
      for (; index < lines.length; index++) {
        console.log(lines[index]);
        if (lines[index].length > 15) {
          result.datas.push({
            key: lines[index].substring(0, 14),
            passrate: parseInt(lines[index].substring(15)),
            date: lines[index].substring(0, 4) + "/" + lines[index].substring(4, 6) + "/" + lines[index].substring(6, 8) + " " + lines[index].substring(8, 10) + ":" + lines[index].substring(10, 12) + ":" + lines[index].substring(12, 14),
            index: index+1,
          });
          avg += parseInt(parseInt(lines[index].substring(15)));
        }
      }
      result.avg = parseInt(avg / index);

      console.log(result);
      res.send(result);
    }
    else {
      res.send({ 'message': 'file not found : ' + passrate_file });
    }
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.listImages = (req, res) => {
  fs.readdir(uploadFolder + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + "/", (err, images) => {
    res.send(images);
  })
}

exports.listUrls = (req, res) => {
  fs.readdir(uploadFolder + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + "/", (err, images) => {
    for (let index = 0; index < images.length; index++) {
      images[index] = "/api/file/" + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + "/" + images[index];
    }

    res.send(images);
  })
}

exports.seqPassRate = (req, res) => {

  let passrate_file = uploadFolder + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + '/passrate.txt';
  try {
    if (fs.existsSync(passrate_file)) {

      let lines = fs.readFileSync(passrate_file, 'utf8').split('\n').filter(Boolean);
      let url = "/api/file/" + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + "/";
      let result = { avg: 0, files: [] };
      for (let index = 0; index < lines.length; index++) {
        if (lines[index].length > 4) {
          if (lines[index].startsWith("avg:")) {
            result.avg = parseInt(lines[index].substring(4));
          }
          else {
            result.files.push({
              key: lines[index].substring(0, 3),
              passrate: parseInt(lines[index].substring(4)),
              org_file: lines[index].substring(0, 3) + "_org.jpg",
              cap_file: lines[index].substring(0, 3) + "_cap.jpg",
              diff_file: lines[index].substring(0, 3) + "_diff.png",
              org_url: url + lines[index].substring(0, 3) + "_org.jpg",
              cap_url: url + lines[index].substring(0, 3) + "_cap.jpg",
              diff_url: url + lines[index].substring(0, 3) + "_diff.png",
            });
          }
        }
      }

      console.log(result);
      res.send(result);
    }
    else {
      res.send({'message': 'file not found : ' + passrate_file});
    }
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.generatePassCount = (req, res) => {

  let passgate = parseInt(req.params.passgate);
  let tc_folder = uploadFolder + req.params.group + '/' + req.params.testcase + '/';
  let passcount_file = uploadFolder + req.params.group + '/' + req.params.testcase + '/passcount.txt';
  try {
    fs.readdir(tc_folder, (err1, seqArray) => {
      if (fs.existsSync(passcount_file)) {
        fs.unlinkSync(passcount_file, function (err2) {
          console.log(err2);
        });
      }
      fs.appendFile(passcount_file, 'passgate:' + passgate + '\n', (err) => {
        if (err) console.log(err);
      });
      for (let index = 0; index < seqArray.length; index++) {
        if (seqArray[index].length != 14) {
          continue;
        }
        let passrate_file = tc_folder + '/' + seqArray[index] + '/passrate.txt'
        let lines = fs.readFileSync(passrate_file, 'utf8').split('\n').filter(Boolean);
        let pass = 0;
        let fail = 0;
        for (let iLine = 0; iLine < lines.length; iLine++) {
          if (lines[iLine].length > 4) {
            if (lines[iLine].startsWith("avg:")) {
              continue;
            }
            else {
              if (passgate <= parseInt(lines[iLine].substring(4))) {
                pass++;
              }
              else {
                fail++;
              }
            }
          }
        }

        fs.appendFile(passcount_file, seqArray[index] + ':' + pass + ',' + fail + '\n', (err) => {
          if (err) console.log(err);
        });
      }

      res.send({ 'message': 'complete' });
    })
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.downloadFile = (req, res) => {
  try {
    res.download(uploadFolder + req.params.group + '/' + req.params.testcase + "/" + req.params.seq + "/" + req.params.filename);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.downloadGallery1 = (req, res) => {
  try {
    res.download(galleryFolder + req.params.filename);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}

exports.downloadGallery2 = (req, res) => {
  try {
    res.download(galleryFolder + req.params.folder + '/' + req.params.filename);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
}
