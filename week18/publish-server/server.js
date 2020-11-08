const http = require('http');
const https = require('https');
const path = require('path')
const unzipper = require('unzipper');
const querystring = require('querystring');


const userAuth = {
  clientId: 'Iv1.31ae918f4b2a105e',
  clientSecret: 'e2aac01ba8744422bd6a3f698ceab000b8c37427'
}

// 2. auth 路由：接受code，用code + client_id + client_secret 换 token
function auth(request, response) {
  const query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, (user) => {
    response.write(`<a href="http://localhost:7071?token=${user.access_token}">publish</a>`)
    response.end();
  });
}

// 4. publish路由：用token获取用户信息，检查权限，接受发布
function publish(request, response) {
  const query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  getUser(query.token, user => {
    if (user.login === 'xuuy') {
      request.pipe(unzipper.Extract({
        path: path.resolve(__dirname, '../server/public')
      }));
      request.on('end', () => {
        response.end("Deploy Success!")
      })
    }
  })


}

function getUser(token, callback) {
  const request = https.request({
    hostname: 'api.github.com',
    path: `/user`,
    port: 443,
    method: "GET",
    headers: {
      Authorization: `token ${token}`,
      "User-Agent": 'mack-toy-publish',
    }
  }, function(response) {
    let body = "";
    response.on('data', chunk => {
      console.log(chunk.toString());
      body += (chunk.toString());
    })
    response.on('end', () => {
      callback(JSON.parse(body));
    })
  });

  request.end();
}

function getToken(code, callback) {
  const request = https.request({
    hostname: 'github.com',
    path: `/login/oauth/access_token?code=${code}&client_id=${userAuth.clientId}&client_secret=${userAuth.clientSecret}`,
    port: 443,
    method: "POST",
  }, function(response) {
    let body = "";
    response.on('data', chunk => {
      body += (chunk.toString());
    })
    response.on('end', () => {
      callback(querystring.parse(body));
    })
  });

  request.end();

}


http.createServer(function(request, response) {
  if (request.url.match(/^\/auth\?/)) {
    return auth(request, response);
  }
  if (request.url.match(/^\/publish\?/)) {
    return publish(request, response);
  }

}).listen(7070);