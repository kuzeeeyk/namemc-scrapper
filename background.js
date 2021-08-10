chrome.browserAction.onClicked.addListener(function (tab) {
    var result = [];
    var paginatedResult = [];
    var another = 1;
    const amount = 10;
    for (var i = 1; i <= amount; i++) {
        chrome.tabs.create({ url: "https://tr.namemc.com/minecraft-skins/trending/weekly?page=" + i }, tab => {
            chrome.tabs.executeScript(tab.id, {
                code: `[...document.getElementsByTagName("a")]
                .filter(el => el.href.includes("/skin/"))
                .map(a => {
                    const skinID = a.href.split("skin/")[1];
                    return "https://texture.namemc.com/" + skinID.slice(0, 2) + "/" + skinID.slice(2, 4) + "/" + skinID + ".png"
                });`
            }, function (response) {
                result = result.concat(response[0]);
                paginatedResult = paginatedResult.concat(response);
                console.log(`Scrapped ${response[0].length} skins from page ${another}. Total of ${response[0].length * another} skins scrapped`);
                another++;
                chrome.tabs.remove(tab.id);
                if (paginatedResult.length == amount) {
                    console.log("Finished scrapping successfuly!")
                    console.log(result);
                    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
                }
            })
        });
    }
});