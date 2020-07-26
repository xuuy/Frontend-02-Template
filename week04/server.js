const http = require('http')

http.createServer((req, res) => {
  const body = []
  req.on('error', (err) => {
    console.log(err)
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    const data = Buffer.concat(body).toString('utf-8')
    console.log('from client: \r')
    console.log(data)
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    res.end(`<!DOCTYPE html>
<html   lang="en" id='xy'>
<head>
  <meta />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #fff;
    }

    #root {
      font-size: 20px;
    }

    .header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      background: #fee;
      box-shadow: 0 1px 17px rgba(0,0,0,0.17);
    }

    .content {
      padding-top: 50px;
    }
  </style>
</head>
<body>
  <div id="root">
    <p class="header">hello</p>
    <div class="content">
      <img src="#" alt="pic" />
    </div>
  </div>
</body>
</html>`)
  })
}).listen(3000, () => {
  console.log('server is started at localhost:3000')
})