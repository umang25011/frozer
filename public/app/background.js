const URLS = ["<all_urls>"]

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    console.log("onBeforeSendHeaders", details)
  },
  { urls: URLS },
  ["blocking", "requestHeaders", "extraHeaders"]
)

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const postedString = decodeURIComponent(
      String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw[0].bytes))
    )
    console.log("onBeforeRequest", postedString)
  },
  { urls: URLS },
  ["blocking", "requestBody"]
)
