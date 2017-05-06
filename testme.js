var request = require('request');

const b = new Buffer([13, 37, 42])

request.post(
  'http://localhost:4040/api/users/signup',
  { json: {
    username: "JAMES2",
    fileMap: b
  } },
  (err, res, body) => {
  if (!err) {
    // console.log(res);
    console.log(body);
  }
})
