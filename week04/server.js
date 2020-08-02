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
<html meta=a lang="en" id='xy'>
<head>
  <title>body</title>
  <meta />
  <style>
    p ~ h1 {
      font-size: 50px;
    }
    p + img {
      width: 200px;
    }
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
    
    #root::before {
      content: "before";
    }
    
    #root img#one.content.two:first-child,
    .content {
      border-width: 1px;
    }

    #root .header {
      border: none;
    }

    .header {
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      background: #fee;
      box-shadow: 0 1px 17px rgba(0,0,0,0.17);
    }

    div[class=two] {
      padding-top: 50px;
    }
  </style>
</head>
<body>
  <div id="root">
    <p class="header">hello</p>
    <img id="one" class="content two" alt="ia" src="#"/>
    <h1 class="content">1</h1>
    <h2 class="content">2</h2>
  </div>
</body>
</html>`)
  })
}).listen(3000, () => {
  console.log('server is started at localhost:3000')
})
