/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-10-18 10:48:12
 */
let express = require('express')
let app = express()
let whiteList = ['http://localhost:8083']
const port = 4000
app.use(function(req, res, next) {
  let origin = req.headers.origin
  if (whiteList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 允许携带哪个头访问我
    res.setHeader('Access-control-Allow-Headers', 'name')
    // 允许哪个方法访问我
    res.setHeader('Access-control-Allow-Methods', 'PUT')
    // 允许携带cookie
    res.setHeader('Access-control-Allow-Credentials', true)
    // 预检的存活时间
    res.setHeader('Access-control--Max-Age', 6)
    //允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    if (req.method === 'OPTIONS') {
      return res.end() // OPTIONS请求不做任何处理
    }
  }
  next()
})
app.put('/getData', function(req, res) {
  console.log(req.headers);
  res.setHeader('name', 'jw')
  res.end('我不爱你')
})
app.get('/getData', function(req, res) {
  console.log(req.headers);
  res.end('我不爱你')
})
app.listen(port, () => {
  console.log(`listen on ${port}`)
})