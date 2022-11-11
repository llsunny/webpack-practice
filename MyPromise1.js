/**
 * @file:
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-07-15 16:03:27
 */
class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(executor) {
    this.PromiseState = MyPromise.PENDING
    this.PromiseResult = null
    // .then 立即执行后 state为pengding  把.then保存起来
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    // 如果 执行器函数 执行报错，直接执行reject
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  // 把异步任务 把结果交给 resolve
  resolve(result) {
    if (this.PromiseState === MyPromise.PENDING) {
      setTimeout(() => {
        // resolve调用后，state转化为成功态
        this.PromiseState = MyPromise.FULFILLED
        this.PromiseResult = result
        // onFulfilled 要执行一次
        this.onFulfilledCallbacks.forEach((callback) => {
          callback(result)
        })
      })
    }
  }
  reject(reason) {
    if (this.PromiseState === MyPromise.PENDING) {
      setTimeout(() => {
        // reject调用后，state转化为失败态
        this.PromiseState = MyPromise.REJECTED
        // 储存失败的原因
        this.PromiseResult = reason
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason)
        })
      })
    }
  }
  // 一个promise解决了后（完成状态转移，把控制权交出来）
  then(onFulfilled, onRejected) {
    console.log('then');
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.PromiseState === MyPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.PromiseState === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e) // 捕获前面onFulfilled中抛出的异常
          }
        })
      } else if (this.PromiseState == MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.PromiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promise2
  }
}
/**
 * @description: 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param {*} promise2 promise1.then方法返回的新的promise对象
 * @param {*} x  promise1中onFulfilled或onRejected的返回值
 * @param {*} resolve  promise2的resolve方法
 * @param {*} reject promise2的reject方法
 * @return {*}
 **/
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 2.3.2 如果 x 为 Promise ，则使 promise2 接受 x 的状态
  if (x instanceof MyPromise) {
    if (x.PromiseState === MyPromise.PENDING) {
      /**
       * 2.3.2.1 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
       *         注意"直至 x 被执行或拒绝"这句话，
       *         这句话的意思是：x 被执行x，如果执行的时候拿到一个y，还要继续解析y
       */
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x.PromiseState === MyPromise.FULFILLED) {
      // 2.3.2.2 如果 x 处于执行态，用相同的值执行 promise
      resolve(x.PromiseResult)
    } else if (x.PromiseState === MyPromise.REJECTED) {
      // 2.3.2.3 如果 x 处于拒绝态，用相同的据因拒绝 promise
      reject(x.PromiseResult)
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 2.3.3 如果 x 为对象或函数
    try {
      // 2.3.3.1 把 x.then 赋值给 then
      var then = x.then
    } catch (e) {
      // 2.3.3.2 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(e)
    }
    /**
     * 2.3.3.3
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之。
     * 传递两个回调函数作为参数，
     * 第一个参数叫做 `resolvePromise` ，第二个参数叫做 `rejectPromise`
     */
    if (typeof then === 'function') {
      // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
      let called = false
      try {
        then.call(
          x,
          // 2.3.3.3.1 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        /**
         * 2.3.3.3.4 如果调用 then 方法抛出了异常 e
         * 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
         */
        if (called) return
        called = true
        /**
         * 2.3.3.3.4.2 否则以 e 为据因拒绝 promise
         */
        reject(e)
      }
    } else {
      // 2.3.3.4 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 2.3.4 如果 x 不为对象或者函数，以 x 为参数执行 promise
    return resolve(x)
  }
}

MyPromise.deferred = function () {
  let result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}
module.exports = MyPromise