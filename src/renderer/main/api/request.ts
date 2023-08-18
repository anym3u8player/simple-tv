// https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch

const BASE_URL = 'https://jyzyapi.com/provide/vod/at/json'

const timestamp = Date.now().toString()

export default function request(params?: Record<string, any>) {
  const searchParams = new URLSearchParams(params)
  searchParams.append('timestamp', timestamp)
  return fetch(BASE_URL + '?' + searchParams.toString(), {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      // TODO
      console.error(error)
    })
}

// method: "POST", // *GET, POST, PUT, DELETE, etc.
// mode: "cors", // no-cors, *cors, same-origin
// cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// credentials: "same-origin", // include, *same-origin, omit
// headers: {
//   "Content-Type": "application/json",
//   // 'Content-Type': 'application/x-www-form-urlencoded',
// },
// redirect: "follow", // manual, *follow, error
// referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// body: JSON.stringify(data), // body data type must match "Content-Type" header
