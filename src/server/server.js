/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-10-12 14:24:26
 */
const express = require('express')
const moment = require('moment')
const app = express()
const port = 8080
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        Http Cache Demo
        <script src="/demo.js"></script>
    </body>
    </html>`)
})

app.get('/demo.js', (req, res) => {
  let jsPath = path.resolve(__dirname, './demo.js')
  let cont = fs.readFileSync(jsPath)
  // res.setHeader('Expires', getGLNZ())
  // res.setHeader('Cache-Control', 'public,max-age=120')
  // let status = fs.statSync(jsPath)
  // let lastModifed = status.mtime.toUTCString()
  // if (lastModifed ===req.headers['if-modified-since']) {
  //   res.writeHead(304, 'Not Modified')
  //   res.end()
  // } else {
  //   res.setHeader('Cache-Control', 'public,max-age=5')
  //   res.setHeader('Last-Modified', lastModifed)
  //   res.writeHead(200, 'OK')
  //   res.end(cont)
  // }
  let etag = md5(cont)
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, 'Not Modified')
    res.end()
  } else {
    res.setHeader('ETag', etag)
    res.writeHead(200, 'OK')
    res.end(cont)
  }
})
function getGLNZ() {
  return moment().utc().add(2, 'm').format('ddd, DD MM YYYY HH:mm:ss')+' GMT'
}
app.listen(port, () => {
  console.log(`listen on ${port}`)
})