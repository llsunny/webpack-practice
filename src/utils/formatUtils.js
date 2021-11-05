/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\src\utils\formatUtils.js
 * 
 */
export default {
  /**
   * @description: 节流
   * @param {*} func 函数
   * @param {*} delay 延迟执行毫秒数
   * @return {*}
   */
  throttle(func, delay) {
    let last, deferTimer
    return function () {
      let that = this
      let _args = arguments
      let now = +new Date()
      if (last && now < last + delay) {
        clearTimeout(deferTimer)
        deferTimer = setTimeout(() => {
          last = now
          func.apply(that, _args)
        }, delay)
      } else {
        last = now
        func.apply(that, _args)
      }
    }
  },
  /**
   * @description: 防抖
   * @param {*} func 函数
   * @param {*} delay 延迟执行毫秒数
   * @return {*}
   */
  debounce(func, delay) {
    let deferTimer
    return function () {
      let _args = arguments
      let that = this
      if (deferTimer) clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        func.apply(that, _args)
      }, delay)
    }
  },
  /**
   * @description: 有效的字母异位词,给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
      注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
   * @param {*} s
   * @param {*} t
   * @return {*}
   */
  isAnagram(s, t) {
    const sLen = s.length
    const tLen = t.length
    if (sLen !== tLen) {
      return false
    }
    const obj = {}
    for (let i = 0; i < sLen; i++) {
      const currentS = s[i]
      const currentT = t[i]
      obj[currentS] ? obj[currentS]++ : (obj[currentS] = 1)
      obj[currentT] ? obj[currentT]-- : (obj[currentT] = -1)
    }
    return Object.values(obj).every((v) => v === 0)
  },
  /**
   * @description: 多数元素
   * @param {*} nums
   * @return {*}
   */
  majorityElement(nums) {
    const map = {}
    const n = nums.length >> 1
    for (let i = 0; i < nums.length; i++) {
      map[nums[i]] = map[nums[i]] !== undefined ? map[nums[i]] + 1 : 1
      if (map[nums[i]] > n) return nums[i]
    }
  },
  /**
   * @description: 只出现一次的数字
   * @param {*} nums
   * @return {*}
   */
  singleNumber(nums) {
    let init = nums[0]
    for (let i = 1; i < nums.length; i++) {
      init = init ^ nums[i]
    }
    return init
  },
  /**
   * @description: 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
   * @param {*} n
   * @return {*}
   */
  hammingWeight(n) {
    let ret = 0
    while (n) {
      n &= n - 1
      ret++
    }
    return ret
  },
  /**
   * @description: 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
   * @param {*} nums
   * @param {*} target
   * @return {*}
   */
  twoSum(nums, target) {
    const map = new Map()
    for (let i = 0, len = nums.length; i < len; i++) {
      if (map.get(nums[i]) !== undefined) {
        return [map.get(nums[i]), i]
      } else {
        map.set(target - nums[i], i)
      }
    }
    return []
  },
  /**
   * @description: 给定两个数组，编写一个函数来计算它们的交集
   * @param {*} nums1
   * @param {*} nums2
   * @return {*}
   */
  intersection(nums1, nums2) {
    const map = {}
    const ret = []
    for (let i = 0; i < nums1.length; i++) {
      map[nums1[i]] = true
    }
    for (let i = 0; i < nums2.length; i++) {
      if (map[nums2[i]]) {
        ret.push(nums2[i])
        map[nums2[i]] = false
      }
    }
    return ret
  },
  /**
   * @description: 编写一个函数来查找字符串数组中的最长公共前缀
   * @param {*} strs
   * @return {*}
   */
  longestCommonPrefix(strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0]
    return strs.reduce(this.getSameStr, strs[0])
  },
  getSameStr(a, b) {
    let res = ''
    for (let j = 0; j < a.length; j++) {
      if (a[j] === b[j]) {
        res += a[j]
      } else {
        return res
      }
    }
    return res
  },
  /**
   * @description: 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回 -1
   * @param {*} haystack
   * @param {*} needle
   * @return {*}
   */
  strStr(haystack, needle) {
    if (needle === '') return 0
    for (let i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle[0]) {
        if (haystack.substring(i, i + needle.length) === needle) return i
      }
    }
    return -1
  },
  /**
   * @description: 杨辉三角，这个可是找规律的代表题，并且这道题可以训练一下你对二维数组 转化为 代码的能力
   * 给定一个非负整数 numRows， 生成杨辉三角的前 numRows 行
   * @param {*} numRows
   * @return {*}
   */
  generate(numRows) {
    if (numRows === 0) return []
    const result = Array.from(new Array(numRows), () => [])
    for (let i = 0; i < numRows; i++) {
      result[i][0] = 1
      result[i][i] = 1
      for (let j = 1; j < i; j++) {
        result[i][j] = result[i - 1][j - 1] + result[i - 1][j]
      }
    }
    return result
  },
  /**
   * @description: 买卖股票的最佳时机
   * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
   * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
   * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
   * @param {*} prices
   * @return {*}
   */
  maxProfit(prices, type) {
    let res = 0
    if (type === 1) {
      let min = prices[0]
      for (let i = 1; i < prices.length; i++) {
        if (prices[i] < min) {
          min = prices[i]
        } else {
          res = Math.max(res, prices[i] - min)
        }
      }
    } else {
      for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
          res += prices[i] - prices[i - 1]
        }
      }
    }
    console.log(res)
    return res
  },
  /**
   * @description: 给你一个有序数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。
   * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
   * @param {*} nums
   * @return {*}
   */
  removeDuplicates(nums) {
    let i = 0
    for (let j = 1; j < nums.length; j++) {
      if (nums[j] !== nums[i]) {
        nums[i + 1] = nums[j]
        i++
      }
    }
    return i + 1
  },
  /**
   * @description: 两个有序数组的交集
   * @param {*} nums1
   * @param {*} nums2
   * @return {*}
   */
  intersect(nums1, nums2) {
    nums1 = nums1.sort((a, b) => a - b)
    nums2 = nums2.sort((a, b) => a - b)
    let l1 = 0
    let l2 = 0
    const nums1Len = nums1.length
    const nums2Len = nums2.length
    const ret = []
    while (l1 < nums1Len && l2 < nums2Len) {
      if (nums1[l1] === nums2[l2]) {
        ret.push(nums1[l1])
        l1++
        l2++
      }
      if (nums1[l1] < nums2[l2]) {
        l1++
      }
      if (nums1[l1] > nums2[l2]) {
        l2++
      }
    }
    return ret
    // let a = []
    // let count = 0
    // const len = nums1.length < nums2.length ? nums1.length : nums2.length
    // if (nums1.length > nums2.length) {
    //   for (let i = 0; i < len; i++) {
    //     if (nums1.indexOf(nums2[i]) !== -1) {
    //       a.push(nums2[i])
    //       nums1.splice(nums1.indexOf(nums2[i]), 1)
    //     }
    //   }
    // } else {
    //   for (let i = 0; i < len; i++) {
    //     if (nums2.indexOf(nums1[i]) !== -1) {
    //       a.push(nums1[i])
    //       nums2.splice(nums2.indexOf(nums1[i]), 1)
    //     }
    //   }
    // }
    // return a
  },
  //反转字符串
  reverseString(s) {
    let l = 0
    let r = s.length - 1
    while (l < r) {
      ;[s[l], s[r]] = [s[r], s[l]]
      l++
      r--
    }
    return s
  },
  // 二分法查找
  search(nums, target) {
    // （版本一）左闭右闭区间
    // let l = 0,
    //   r = nums.length - 1
    // // 区间 [l, r]
    // while (l <= r) {
    //   let mid = (l + r) >> 1
    //   if (nums[mid] === target) return mid
    //   let isSmall = nums[mid] < target
    //   l = isSmall ? mid + 1 : l
    //   r = isSmall ? r : mid - 1
    // }
    // return -1
    // （版本二）左闭右开区间
    let l = 0,
      r = nums.length
    // 区间 [l, r)
    while(l < r) {
      let mid = (l + r) >> 1
      if (nums[mid] === target) return mid
      let isSmall = nums[mid] < target
      l = isSmall ? mid + 1 : l
      r = isSmall ? r : mid
    }
    return -1
  },
  // 移除数组中的元素
  removeElement(nums,val) {
    // const n = nums.length;
    // let left = 0;
    // for (let right = 0; right < n; right++) {
    //     if (nums[right] !== val) {
    //         nums[left] = nums[right];
    //         left++;
    //     }
    // }
    // return left;
    // let left = 0,
    //   right = nums.length
    // while(left < right) {
    //   if (nums[left] === val) {
    //     nums[left] = nums[right - 1]
    //     right--
    //   } else {
    //     left++
    //   }
    // }
    // return left

    let ans = 0;
    for(const num of nums) {
        if(num != val) {
            nums[ans] = num;
            ans++;
        }
    }
    console.log(nums);
    return ans;
  }
}