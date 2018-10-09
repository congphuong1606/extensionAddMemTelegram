/*
let sellPrices = [];
let buyPrices = [];

let autoMuaBanMore = "off";
let stampCanSell = 24000;
let stampCanBuy = 21000;
localStorage.setItem('autoMuaBanMore', 'off');
localStorage.setItem('stampCanSell', stampCanSell + '');
localStorage.setItem('stampCanBuy', stampCanBuy + '');

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "canbuySell") {
        autoMuaBanMore = request.autoMuaBanMore;
        stampCanSell = request.stampCanSell;
        stampCanBuy = request.stampCanBuy;
        localStorage.setItem('autoMuaBanMore', autoMuaBanMore + '');
        localStorage.setItem('stampCanSell', stampCanSell + '');
        localStorage.setItem('stampCanBuy', stampCanBuy + '');
        refresh();
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleepT(number) {
    await sleep(number);
}

function clickMuaBan(codeScript, maxPrice, ban,tabs) {
    chrome.tabs.executeScript(tabs[2].id, { "code":codeScript},
        function (result) {
            console.log("click nut mua||ban");
            sleepT(500);
            const scriptCode = "var element = document.getElementById('amount');var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = "+maxPrice+";element.defaultValue  = "+maxPrice+";element.dispatchEvent(ev);";
            console.log(scriptCode);
            chrome.tabs.query({}, function (tabs) {
                chrome.tabs.executeScript(tabs[2].id, {"code": scriptCode},
                    function (result) {
                        console.log("set xong Số lượng ETH");
                        sleepT(100);
                        chrome.tabs.executeScript(tabs[2].id, {"code": "document.getElementsByClassName('btn btn-lg btn-block btn-open-trade btn-primary btn-mode-specific')[0].click()"},
                            function (result) {
                                console.log("Hoan thanh");
                                sleepT(1000);
                                refresh();
                            }
                        );
                    }
                );

            });
        });
}

function getData(tabs) {
    chrome.tabs.executeScript(tabs[2].id, {
        "code":
        "function getData(){" +
        "             var res=[];" +
        "                var bodyDatas= document.getElementsByClassName('offer-body-meta');" +
        "                var users= document.getElementsByClassName('offer-item-username');" +
        "                 for(var i=0; i< bodyDatas.length ;i++){" +
        "           var data={" +
        "               numberPrice: bodyDatas[i].firstChild.innerText.split(' ')[0]," +
        "               maxPrice: bodyDatas[i].lastChild.innerText.split(' ')[2]," +
        "               userName: users[i].innerText," +
        "               positon: i," +
        "               };" +
        "                     res.push(data);" +
        "                    }" +
        "                return res;" +
        "            }" +
        "getData();"
    }, function (result) {

        let data = result[0];
        let flag=true;
        for (let i = 0; i < 10; i++) {
            if(flag){
                let curentNumberPrice = data[i].numberPrice.replace(",", "");
                let positon = data[i].positon;
                let maxPrice = data[i].maxPrice;
                let codeScript=  "document.getElementsByClassName('col-sm-3 text-right hidden-xs')["+positon+"].firstChild.click()";
                if (i < 5) {
                    if(curentNumberPrice<=stampCanBuy&&stampCanBuy.length===5){
                        clickMuaBan(codeScript,maxPrice,"buy",tabs);
                        flag=false;
                        console.log("Mua number:"+curentNumberPrice);
                    }else {
                        console.log("Khong mua number: "+curentNumberPrice);
                    }
                } else {
                    if(curentNumberPrice>=stampCanSell&&stampCanSell.length===5){
                        clickMuaBan(codeScript,maxPrice,"ban",tabs);
                        flag=false;
                        console.log("Ban number: "+curentNumberPrice);
                    }else {
                        console.log("Khong ban number: "+curentNumberPrice);
                    }
                }
            }
        }
        if(flag){
            refresh();
        }


    });

}

function convertUsd(tabs) {
    chrome.tabs.executeScript(tabs[2].id, {
            "code":
                "document.getElementsByClassName('text-btc-color')[0].click()"
        },
        function (result) {
            console.log("offer-price clicked");
            getData(tabs);
        });
}

function refreshTab3() {
    chrome.tabs.query({}, function (tabs) {
        console.log("A: " + Date.now());
        chrome.tabs.update(tabs[2].id, {url: 'https://remitano.com/eth/vn', active: false}, function (tab1) {
            let listener = function (tabId, changeInfo, tab) {
                if (tabId === tab1.id && changeInfo.status === 'complete') {
                    console.log("B: " + Date.now());
                    chrome.tabs.onUpdated.removeListener(listener);
                    convertUsd(tabs);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });

    });
}


function refresh() {
    console.log("refresh: " + Date.now());
    if (autoMuaBanMore === "on") {
        refreshTab3();
    }
}*/
