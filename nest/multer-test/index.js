const express = require('express')
const multer  = require('multer')
const cors = require('cors');
const { MulterError } = require('multer');

const app = express()
app.use(cors());

const upload = multer({ dest: 'uploads/' })

app.post('/aaa', upload.single('aaa'), function (req, res, next) {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
})

app.post('/bbb', upload.array('bbb', 2), function (req, res, next) {
  console.log('req.files', req.files);
  console.log('req.body', req.body);
}, function(err, req, res, next) {
  if(err instanceof MulterError && err.code === 'LIMIT_UNEXPECTED_FILE') {
      res.status(400).end('Too many files uploaded');
  }
})


app.listen(3333);
