
import Vue from 'vue'
import App from './App.vue'
import "./utils/eventBus"; //引入事件总线
// import lazy from './directive/lazy/lazy.js'
import lazy from './directive/lazy/lazyNew.js'
import './reset.styl'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(lazy)
Vue.use(elementUI)
new Vue({
  render:(h) => h(App)
}).$mount('#root')
// class Foo {
//   appMenuCode = undefined
//   appSystemCode = undefined
//   hotKeyList = []
//   notifyHotkeyListChangeMap = new Map()
// }
// const f1 = new Foo()
// console.log(f1);
// let arr = [1,3,4,2,5,6,2,4,1,3]
// let arr = [1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 7]
// function quchong(nums) {
//   let i = 0,
//       j = 1;
//   while(j < nums.length) {
//     if (nums[i] !== nums[j]) {
//       nums[++i] = nums[j]
//     }
//     j++
//   }
//   nums.length = i+1
// }
// const arr1 = arr.reduce((cur, next) => {
//   !cur.includes(next) ? cur.push(next) : cur;
//   return cur
// },[])
// console.log(arr1) 
// setInterval(() => {
//   let j = 0;
//   while(j++ < 1000000000) {
//   }


  
// }, 0);

// const interval = 1000
// let ms = 50000 // 从服务器和活动开始时间计算出的时间差，这里测试用 50000 ms
// let count = 0
// const startTime = new Date().getTime()
// let timeCounter;
// if (ms >= 0) {
//   timeCounter = setTimeout(countDownStart, interval)
// }

// function countDownStart() {
//   count++
//   const offset = new Date().getTime() - (startTime + count * interval)
//   console.log('offset', offset)

//   let nextTime = interval - offset
//   console.log(nextTime)
//   if (nextTime < 0) {
//     nextTime = 0
//   }
//   ms -= interval
//   console.log(`误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`)
//   if (ms <= 0) {
//     console.log('总误差', new Date().getTime() - startTime - ms)
//     clearTimeout(timeCounter)
//   } else {
//     timeCounter = setTimeout(countDownStart, nextTime)
//   }
// }
// const totalDuration = 10 * 1000
// let requestRef = null
// let startTime
// let prevEndTime
// let prevTime
// let currentCount = totalDuration
// let endTime
// let timeDifferance = 0 // 每1s倒计时偏差值，单位ms
// let interval = 1000
// let nextTime = interval

// setInterval(() => {
//   let n = 0
//   while (n++ < 1000000000);
// }, 0)
// const animate = (timestamp) => {
//   if (prevTime !== undefined) {
//     const deltaTime = timestamp - prevTime
//     if (deltaTime >= nextTime) {
//       console.log('deltaTime', deltaTime)
//       prevTime = timestamp
//       prevEndTime = endTime
//       endTime = new Date().getTime()
//       currentCount = currentCount - 1000
//       console.log('currentCount: ', currentCount / 1000)
//       timeDifferance = endTime - startTime - (totalDuration - currentCount)
//       console.log(timeDifferance)
//       nextTime = interval - timeDifferance
//       // 慢太多了，就立刻执行下一个循环
//       if (nextTime < 900) {
//         nextTime = 900
//       }
//       console.log(`执行下一次渲染的时间是：${nextTime}ms`)
//       if (currentCount <= 0) {
//         currentCount = 0
//         cancelAnimationFrame(requestRef)
//         console.log(`累计偏差值： ${endTime - startTime - totalDuration}ms`)
//         return
//       }
//     }
//   } else {
//     startTime = new Date().getTime()
//     prevTime = timestamp
//     endTime = new Date().getTime()
//   }
//   requestRef = requestAnimationFrame(animate)
// }
// requestRef = requestAnimationFrame(animate)


// import {Countdown} from './utils/ClassModel.js'

// new Countdown({
//   endTime: '2022-11-30 12:00',
// })
// import formatUtils from "./utils/formatUtils.js";
// console.log(formatUtils)
// var deepCopy = function (obj) {
//   if (typeof obj !== 'object') return
//   var newObj = obj instanceof Array ? [] : {}
//   for (var key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
//     }
//   }
//   return newObj
// }
// var obj = {a:1,b:2, c:{d: 3, e: 4}}
// obj.c.f = obj.c
// // 利用 WeakMap 解决循环引用
// let map = new WeakMap()
// function deepClone(obj) {
//   // debugger
//   if (obj instanceof Object) {
//     if (map.has(obj)) {
//       // return map.get(obj)
//       return obj
//     }
//     let newObj
//     if (obj instanceof Array) {
//       newObj = []     
//     } else if (obj instanceof Function) {
//       newObj = function() {
//         return obj.apply(this, arguments)
//       }
//     } else if (obj instanceof RegExp) {
//       // 拼接正则
//       newobj = new RegExp(obj.source, obj.flags)
//     } else if (obj instanceof Date) {
//       newobj = new Date(obj)
//     } else {
//       newObj = {}
//     }
//     // 克隆一份对象出来
//     // let desc = Object.getOwnPropertyDescriptors(obj)
//     // let clone = Object.create(Object.getPrototypeOf(obj), desc)
//     // let clone = new value.constructor()
//     map.set(obj, true)
//     for (let key in obj) {
//       if (obj.hasOwnProperty(key)) {
//         newObj[key] = deepClone(obj[key])
//       }
//     }
//     return newObj
//   }
//   return obj
// }
// var newObj = deepClone(obj)
// console.log(newObj)

// var twoSum = function (nums, target) {
//   const map = new Map()
//   for (let i = 0, len = nums.length; i < len; i++) {
//     // 一层遍历，用 target 减去每一项，在 map 的 key 中寻找
//     if (map.has(target - nums[i])) {
//       // 存在则返回结果
//       return [map.get(target - nums[i]), i]
//     }
//     // 不存在，则设置 map key 和 val
//     map.set(nums[i], i)
//   }
//   return []
// }
// console.log(twoSum([2, 7, 11, 15], 9)) 
// function cloneDeep5(x) {
//   const root = {}

//   // 栈
//   const loopList = [
//     {
//       parent: root,
//       key: undefined,
//       data: x,
//     },
//   ]

//   while (loopList.length) {
//     // 广度优先
//     const node = loopList.pop()
//     const parent = node.parent
//     const key = node.key
//     const data = node.data

//     // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
//     let res = parent
//     if (typeof key !== 'undefined') {
//       res = parent[key] = {}
//     }

//     for (let k in data) {
//       if (data.hasOwnProperty(k)) {
//         if (typeof data[k] === 'object') {
//           // 下一次循环
//           loopList.push({
//             parent: res,
//             key: k,
//             data: data[k],
//           })
//         } else {
//           res[k] = data[k]
//         }
//       }
//     }
//   }

//   return root
// }
// var obj = {
//   a: {name: 'a' , b: {name: 'b', c: {name: 'c'}}}
// }
// // var obj = {a: 1, b: 2}
// // obj.c = obj
// function cloneDeep5(x) {
//   let result = {}

//   let loop_list = [
//     {
//       result: result,
//       data: x,
//     },
//   ]

//   while (loop_list.length) {
//     let node = loop_list.pop()
//     let node_data = node['data']
//     let node_result = node['result']
//     for (let key in node_data) {
//       if (node_data.hasOwnProperty(key)) {
//         if (typeof node_data[key] === 'object') {
//           node_result[key] = {}
//           loop_list.push({
//             result: node_result[key],
//             data: node_data[key],
//           })
//         } else {
//           node_result[key] = node_data[key]
//         }
//       }
//     }
//   }

//   return result
// }
// console.log(cloneDeep5(obj))
// import * as math from './module/circleplus'
// import exp from './module/circleplus'
// // console.log(exp(math.e))
// var x = 1
// function foo(x=x) {
//   console.log(x);
// }
// foo()
// 非原题 非原题 非原题
// const o1 = {
//     text: 'o1',
//     fn: function() {
//       console.log(this);
//         return this.text;
//     }
// }
// const o2 = {
//     text: 'o2',
//     fn: o1.fn
// }
// // console.log(o1.fn());
// console.log(o2.fn())
// import {Scheduler} from './utils/ClassModel.js'
// const sleep = time => new Promise(resolve => setTimeout(resolve, time))
// const scheduler = new Scheduler(2)
// const addTask = (time, val) => {
//   scheduler.add(() => {
//     return sleep(time).then(() => {
//       console.log(val)
//     })
//   })
// }
// addTask(5000, '1')
// addTask(4000, '2')
// addTask(1000, '3')
// addTask(1000, '4')
// 异步调度器
// class Scheduler {
//     maxCount = 0
//     tasks = []
//     working = []
//     constructor(count) {
//         this.maxCount = count;
//     }
//     addTask = (timer, content) => {
//         // 控制函数
//         const target = () => {
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     console.log(content);
//                     resolve();
//                 }, 1000 * timer);
//             })
//         }
//         // 入队列
//         this.tasks.push({ fn: target, id: content })
//     }
//     continueWork = (fn) => {
//         // 递归终点（执行完成)
//         if (this.tasks.length > 0) {
//             // 将后面的拿进来继续执行
//             // 先确定下标
//             let idx = -1;
//             for (let i = 0; i < this.working.length; i++) {
//                 if (fn === this.working[i].fn) {
//                     // 将其替换并执行
//                     idx = i;
//                     break;
//                 }
//             }
//             // 调用并运行
//             const next = this.tasks.shift();
//             next.fn().then(() => {
//                 this.continueWork(next.fn)
//             })
//             this.working[idx] = next;
//         }
//     }
//     start = () => {
//         let len = this.tasks.length;
//         if (len >= this.maxCount) {
//             // 否则就将其加入工作队列并执行
//             this.working = this.tasks.splice(0, this.maxCount);
//             console.log(this.working.length)
//             this.working.map(item => {
//                 item.fn().then(() => {
//                     // 完成后再回调
//                     // 当前执行完毕
//                     console.log(this.working)
//                     this.continueWork(item.fn)
//                 })
//             })
//         } else {
//             //小于调度范围： 直接全部执行
//             this.tasks.map(item => item.fn())
//         }
//     }
// }

// class Scheduler {
//   constructor(limit) {
//     this.limit = limit
//     this.number = 0
//     this.queue = []
//   }
//   addTask(timeout, str) {
//     this.queue.push([timeout, str])
//   }
//   start() {
//     if (this.number < this.limit && this.queue.length) {
//       var [timeout, str] = this.queue.shift()
//       this.number++
//       setTimeout(() => {
//         console.log(str)
//         this.number--
//         this.start()
//       }, timeout * 1000)
//       this.start()
//     }
//   }
// }

// // 支持并发的调度器， 最多允许2两任务进行处理
// const scheduler = new Scheduler(2)
// scheduler.addTask(5, '1');   // 1s后输出’1'
// scheduler.addTask(4, '2');  // 2s后输出’2'
// scheduler.addTask(1, '3');  // 2s后输出’3'
// scheduler.addTask(1, '4');  // 3s后输出’4'
// scheduler.start();
// const twoSum = (arr, target) => {
//   const obj = {}
//   for (let i = 0; i < arr.length; i++) {
//     if (obj[arr[i]] != null) {
//       return [obj[arr[i]], i]
//     } else {
//       obj[target - arr[i]] = i
//     }
//   }
//   return []
// }
// console.log(twoSum([2, 7, 9, 11], 9)) 
// import {jsonp} from './utils/Jsonp.js'
// jsonp({
//   url: 'http://localhost:3000/say',
//   params: { wd: 'Iloveyou' },
//   callback: 'show'
// }).then(data => {
//   console.log(data)
// })
// import {_new} from './utils/handwritten'
// function Person(name, age) {
//   this.name = name
//   this.age = age
//   return this.name + ':' + this.age
// }
// // 定义原型方法
//   Person.prototype.say = function () {
//     console.log("你好：", this.name)
//   }
// const p = _new(Person, 'jack', 18)
// console.log(p);
// p.say()
import * as shouxie from './utils/handwritten'
// var name = '一尾流莺'
// var obj = {
//   name: 'warbler',
// }
// function foo() {
//   console.dir(this)
//   return 'success'
// }
// foo._call(undefined) // window
// foo._call(null) // window
// foo._call(1) // Number
// foo._call('11') // String
// foo._call(true) // Boolean
// foo._call(obj) // {name: 'warbler'}
// console.log(foo._call(obj)); // success
// var age = 10
// var obj = {
//   age: 20
// }
// function foo(a, b) {
//   // console.log(this.age)
//   console.dir(this.age + a + b)
// }
// foo._apply(obj, [3,4])

// var name = '一尾流莺'
// var obj = {
//   name: 'warbler',
// }

// this 指向调用者document
// document.onclick = function () {
//   console.dir(this) // => #document
// }

// this 指向 obj
// document.onclick = function () {
//   console.dir(this) // => #Object{name:'warbler}
// }._bind(obj)
// function Foo() {

// }
// let foo1 = new Foo()
// console.log(shouxie._instanceof(foo1, Foo)) 
// let xhr = new XMLHttpRequest()
// document.cookie = 'name=xiamen'
// xhr.withCredentials = true
// xhr.open('PUT', 'http://localhost:4000/getData', true)
// xhr.setRequestHeader('name', 'xiamen')
// xhr.onreadystatechange = function() {
//   if (xhr.readyState === 4) {
//     if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
//       console.log(xhr.response);
//       console.log(xhr.getResponseHeader('name'));
//     }
//   }
// }
// xhr.send()
// let {EventEmitter} = shouxie
// let eventBus = new EventEmitter()
// let fn1 = function(name, age) {
//   console.log(`${name} ${age}`);
// }

// let fn2 = function (name, age) {
//   console.log(`Hello, ${name} ${age}`)
// }
// eventBus.on('aaa', fn1)
// eventBus.on('aaa', fn2)
// eventBus.emit('aaa', false, '布兰', 12)
// import './index.scss'
// let { LazyLoad } = shouxie
// const fragment = document.createDocumentFragment()
// const ul = document.createElement('ul')
// for (let index = 0; index < 100; index++) {
//   const li = document.createElement('li')  
//   const imgele = document.createElement('img')
//   // imgele.src = require('../src/assets/images/reserve_query_bg.png')
//   imgele.className = 'lazyload'
//   imgele.src = require('../src/assets/images/loading.gif')
//   let dataSrc = require('../src/assets/images/reserve_query_bg.png')
//   imgele.setAttribute('data-src', dataSrc)
//   // imgele['data-src'] = require('../src/assets/images/reserve_query_bg.png')
//   li.appendChild(imgele)
//   ul.appendChild(li)
//   fragment.append(ul)
// }

// document.body.appendChild(fragment)
// setTimeout(() => {
//   let lazyObj = new LazyLoad('img')
// }, 1000);
// const url = 'http://localhost:8081/web-peis/#/summary?a=1&a=2&b=3&c='
// console.log(shouxie.parseParam(url))

let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
]
function getChildren(data, result, pid) {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = {...item, children: []}
      result.push(newItem)
      getChildren(data, newItem.children, item.id)
    }
  }
}

function normalizeTree(data, pid) {
  let result = []
  getChildren(data, result, pid)
  return result
}
console.log(normalizeTree(arr, 0))