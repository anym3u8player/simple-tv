/* eslint-disable   */
const now = Date.now

export function throttle(
  func: Function,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let timeout: string | number | NodeJS.Timeout | null | undefined
  let context: null = null
  let args: IArguments | null = null
  let result: any
  let previous = 0
  if (!options) options = {}

  let later = function () {
    previous = options.leading === false ? 0 : now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  let throttled: any = function (this: any) {
    let _now = now()
    if (!previous && options.leading === false) previous = _now
    let remaining = wait - (_now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = _now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }

  throttled.cancel = function () {
    timeout && clearTimeout(timeout)
    previous = 0
    timeout = context = args = null
  }

  return throttled
}

export function debounce(func: Function, wait = 500, immediate = true) {
  let timeout: string | number | NodeJS.Timeout | null | undefined
  let result: any

  const debounced = function (this: any) {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        result = func.apply(context, args)
      }, wait)
    }
    return result
  }

  // @ts-ignore
  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced
}
