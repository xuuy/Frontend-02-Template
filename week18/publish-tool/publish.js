const http = require('http');
const path = require('path')
const archiver = require('archiver');
const child_process = require('child_process');
const querystring = require('querystring');

// 1. 打开 https://github.com/login/oauth/authorize
const client_id = "Iv1.31ae918f4b2a105e"
const redirect_uri = `https://github.com/login/oauth/authorize?client_id=${client_id}`
child_process.exec(`open ${redirect_uri}`)

//3.创建一个 server，接受token，后点击发布
http.createServer(function(request, response) {
  const query = querystring.parse(request.url.match(/^\/\?([\s\S]+)$/)[1]);
  publish(query.token);
  response.write('<div>publish success</div>')
  response.end()
}).listen(7071);



function publish(token) {
  const request = http.request({
    hostname: '127.0.0.1',
    port: 7070,
    method: 'POST',
    path: '/publish?token=' + token,
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });

  const archive = archiver('zip', {
    zlib: {
      level: 9
    },
  })
  archive.directory(path.join(__dirname + '/sample'), false);
  archive.finalize();
  archive.pipe(request)

  request.on('end', () => {
    console.log('Success End ')
  })

}
