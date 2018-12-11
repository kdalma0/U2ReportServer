let express = require('express');
let router = express.Router();
let upload = require('./multer.config.js');
let fileWorker = require('./file.controller.js');

router.get('/uploadfile/:group/:testcase/ready', fileWorker.readyUpload);
router.post('/uploadfile/:group/:testcase/:seq', upload.array("capturefile"), fileWorker.uploadMultiFiles);
router.get('/file/dashboard', fileWorker.dashboard);
router.get('/file/all', fileWorker.listGroup);
router.get('/file/:group/all', fileWorker.listTestcase);
router.get('/file/:group/:testcase/all', fileWorker.listSeq);
router.get('/file/:group/:testcase/passrate', fileWorker.tcPassRate);
router.get('/file/:group/:testcase/history', fileWorker.history);
router.get('/file/:group/:testcase/:passgate/generate', fileWorker.generatePassCount);
router.get('/file/:group/:testcase/:seq/all', fileWorker.listImages);
router.get('/file/:group/:testcase/:seq/url', fileWorker.listUrls);
router.get('/file/:group/:testcase/:seq/passrate', fileWorker.seqPassRate);
router.get('/file/:group/:testcase/:seq/:filename', fileWorker.downloadFile);
router.get('/gallery/:filename', fileWorker.downloadGallery1);
router.get('/gallery/:folder/:filename', fileWorker.downloadGallery2);

module.exports = router;
