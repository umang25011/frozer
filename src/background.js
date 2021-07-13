const callback = function (details) {
  console.log(details)
}
window.alert("Hello Test")
const filter = { urls: ["<all_urls>"] }
const opt_extraInfoSpec = ["blocking", "requestHeaders", "requestBody", "extraHeader"]
 
chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec)

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    //console.log(JSON.stringify(details));
    var headers = details.requestHeaders,
      blockingResponse = {}

    // Each header parameter is stored in an array. Since Chrome
    // makes no guarantee about the contents/order of this array,
    // you'll have to iterate through it to find for the
    // 'User-Agent' element
    for (var i = 0, l = headers.length; i < l; ++i) {
      if (headers[i].name == "User-Agent") {
        headers[i].value = ">>> Your new user agent string here <<<"
        console.log(headers[i].value)
        break
      }
      // If you want to modify other headers, this is the place to
      // do it. Either remove the 'break;' statement and add in more
      // conditionals or use a 'switch' statement on 'headers[i].name'
    }
    console.log("Testing Request")
    blockingResponse.requestHeaders = headers
    return blockingResponse
  },
  filter,
  opt_extraInfoSpec
)

const functionToCallOnEveryRequest = (details) => {
	backgroundPage.console.log(details.requestHeaders)
}
chrome.webRequest.onBeforeRequest.addListener(functionToCallOnEveryRequest, filter, opt_extraInfoSpec)
