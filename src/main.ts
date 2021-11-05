/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\src\main.ts
 * 
 */
type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'Head'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  [propName: string]: any
}

const config1: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    "common": {
        "Accept": "application/json, text/plain, */*",
        "test2": 123
    },
    "delete": {},
    "get": {},
    "head": {},
    "options": {},
    "post": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "put": {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    "patch": {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}
}

const config2: AxiosRequestConfig = {
  
  method: 'post',
  timeout:1,
  data: {
    a: 1
  },
  headers: {
    test: {
      a: '222'
    }
  }
}
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      const val = obj[key]
      if (isPlainObject(val)) {
        if (isPlainObject(result[key])) {
          result[key] = deepMerge( result[key], val)
        } else {
          result[key] = deepMerge(val)
        }
      } else {
        result[key] = val
      }
    })
  })
console.log(result);
  return result
}
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== undefined) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== undefined) {
    return val1
  }
}
const stratKeysFromVal2 = ['url', 'params', 'data']
const strats = Object.create(null)
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})
function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
console.log(config);
  return config
}
console.log(mergeConfig(config1, config2));










