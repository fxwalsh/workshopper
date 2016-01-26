
'use strict';

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

exports.postProgress = function(progress,host,port) {
  // Build the post string from an object
  var post_data =
      JSON.stringify(progress);

  // An object of options to indicate where to post to
  var post_options = {
      host: host,
      port: port,
      path: '/api/progress',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };
 
  // Set up the request
  var post_req = http.request(post_options, function(res,err) {

      if (err) {console.log("ERROR")}
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });
 
  
  post_req.on('error', function(e) {
  console.log("Couldn't post progress to " +host+ ":"+post_options.port);
});

  // post the data
  post_req.write(post_data);
  post_req.end();

};
