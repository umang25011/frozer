const callback = function (details) {
    console.log(details)
}
const filter = { urls: ["<all_urls>"] }
const opt_extraInfoSpec = ["blocking"]

chrome.webRequest.onBeforeRequest.addListener(callback, filter, opt_extraInfoSpec)
