const net = require('net')
const { match } = require('./KMP')
const { parserHTML } = require('./parser')

class Request {
  constructor(options) {
    this.host = options.host || '0.0.0.0'
    this.port = options.port || 80
    this.path = options.path || '/'
    this.method = options.method || 'GET'
    this.body = options.body || {}
    this.headers = options.headers || {}
    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    } else {
      this.bodyText = this.body.toString()
    }
    this.headers['Content-Length'] = this.bodyText.length
  }

  /**
   * @param {Socket} connection
   */
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()
      if (connection) {
        connection.write(this.toString())
      } else {
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          connection.write(this.toString())
        })
      }
  
      connection.on('data', (data) => {
        parser.receive(data.toString())
        if (parser.isFinished) {
          resolve(parser.response)
          connection.end()
        }
      }).on('error', (err) => {
        reject(err)
        connection.end()
      })
    })
  }

  toString() {
    const { method, path, headers, bodyText } = this
    return `${method} ${path} HTTP/1.1\r\n${Object.keys(headers).map(key => `${key}: ${headers[key]}`).join('\r\n')}\r\n
${bodyText}`
  }
}

class ResponseParser {
  constructor() {
    this.statusLine = ''
    this.headers = {}
    this.bodyParser = null
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }

  get response() {
    const { groups } = /.*\s(?<code>.*)\s(?<message>.*)/ig.exec(this.statusLine)
    return {
      statusCode: groups.code,
      statusMessage: groups.message,
      headers: this.headers,
      body: this.bodyParser.content
    }
  }

  /**
   * 利用KMP算法
   * @param {string} string
   */
  receive(string) {
    let state
    let response = []
    // 第一个/r/n: statusLine
    // 倒数第一个/r/n: headers结束标记，前面部分为header，后面为body
    while (state !== -1) {
      state = match('\r\n', string)
      if (state === -1) {
        response.push(string.substr(0))
      } else {
        response.push(string.substr(0, state))
      }
      string = string.slice(state + 2) // +2: /r/n
    }
    this.responseFomat(response)
  }

  /**
   *
   * @param {string[]} response
   */
  responseFomat(response) {
    this.statusLine = response[0]
    const boundary = response.findIndex(r => r === '')
    this.headers = response.slice(1, boundary).reduce((obj, h) => {
      const split = match(': ', h)
      Object.assign(obj, {
        [h.substr(0, split)]: h.substr(split + 2)
      })
      return obj
    }, {})
    if (this.headers['Transfer-Encoding'] && this.headers['Transfer-Encoding'] === 'chunked') {
      this.bodyParser = new TrunkedBodyParse()
      this.bodyParser.parse(response.slice(boundary + 1))
    }
  }
}

class TrunkedBodyParse {
  constructor() {
    this.length = 0
    this.isFinished = false
    this.content = []
  }

  /**
   *
   * @param {string[]} body
   */
  parse(body) {
    this.length = parseInt(body[0], 16)
    this.content = body[1]
    this.isFinished = true
  }
}

async function fetch() {
  const request = new Request({
    port: '3000',
    body: {
      name: 'Mack'
    },
    headers: {
      token: 'abdcd121asderea23'
    }
  })

  const response = await request.send()

  const DOM = parserHTML(response.body)
  // console.log(DOM)
}

fetch()
