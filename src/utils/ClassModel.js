/**
 * @file: 
 * @author: llsunny
 * @lastEditor: llsunny
 * @update: 2022-09-26 15:06:34
 */
class Countdown {
  constructor({ endTime }) {
    this.endTimetamp = new Date(endTime).getTime()
    console.log(endTime, this.endTimetamp)
    this.countDownDate = {}
    this.mySetInterval(this.countDown.bind(this), this.cancel.bind(this))
    // this.mySetInterval(this.countDown, this.cancel)
  }
  mySetInterval(cb, cancelCb) {
    let requestRef = null
    let prevTime
    let nextTime = 1000
    function animate(timestamp) {
      if (prevTime !== undefined) {
        const deltaTime = timestamp - prevTime
        if (deltaTime >= nextTime) {
          cb()
          prevTime = timestamp
          if (cancelCb && cancelCb()) {
            requestRef && cancelAnimationFrame(requestRef)
          }
        }
      } else {
        prevTime = timestamp
      }
      requestRef = requestAnimationFrame(animate)
    }
    requestRef = requestAnimationFrame(animate)
  }
  countDown() {
    console.log(this.endTimetamp)
    let dis = (this.endTimetamp - new Date().getTime()) / 1000
    this.countDownDate = this.calculator(dis)
    console.log('发送事件---->', this.countDownDate)
  }
  cancel() {
    return this.countDownDate && this.countDownDate.timetamp <= 0 ? true : false
  }
  calculator(second) {
    let sec = 1,
      min = 60 * sec,
      hour = 60 * min,
      day = 24 * hour
    return {
      day: parseInt(second / day),
      hour: parseInt((second % day) / hour),
      min: parseInt((second % hour) / min),
      second: parseInt(second % min),
      timetamp: second,
    }
  }
}

class Scheduler {
  constructor(max) {
    this.max = max
    this.count = 0
    this.queue = []
  }
  async add(fnx) {
    if (this.count >= this.max) {
      await new Promise((resolve, reject) => {
        this.queue.push(resolve)
      })
    }
    this.count++
    const res = await fnx()
    this.count--
    this.queue.length && this.queue.shift()()
    return res
  }
}

export { Countdown, Scheduler }
