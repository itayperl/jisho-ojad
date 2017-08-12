chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    $.ajax('http://www.gavo.t.u-tokyo.ac.jp/ojad/search/index/display:print/sortprefix:accent/narabi1:kata_asc/narabi2:accent_asc/narabi3:mola_asc/yure:visible/curve:invisible/details:invisible/limit:20/word:' + encodeURIComponent(request.words.join(','))).done(function(data) {
        var result = parseOJAD(data);
        sendResponse(result);
    });

    return true;
});
