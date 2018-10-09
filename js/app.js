/*
let sellOffersPrice = [];
let buyOffersPrice = [];

let isAutoBuy = 1;
let isAutoSell = 2;
let isOff = 3;
let ACTION = 3;
let ID = "";
let infoAdURL = "";
let MAX = 21000;
let MIN = 24000;
let NUMBER_STAMP = 0;
let userFolow = '';
let scriptCodeInput = ''
let isloaded1 = true;
let isloaded2 = true;
let isSuccess = true;
let getDataSuccess = true;

let araybuyTam = [];
let araySellTam = [];
let timeDUR = 7;


let timeUpdate = Date.now();

localStorage.setItem('ACTIONgetSource1212', '3');
localStorage.setItem('MAX', 21000 + '');
localStorage.setItem('MIN', 24000 + '');
localStorage.setItem('NUMBER_STAMP', 0 + '');
localStorage.setItem('userFolow', '');
localStorage.setItem('infoAdURL', '');
localStorage.setItem('timeDUR', '7');
let urlTab1 = '';
let flag = 0;
let valueTam = 0;
chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "getSource") {
        ACTION = parseInt(request.source.split(".")[0]);
        console.log(ACTION);
        MAX = request.max;
        MIN = request.min;
        NUMBER_STAMP = request.NUMBER_STAMP;
        userFolow = request.userFolow;
        infoAdURL = request.infoAdURL;
        timeDUR = request.timeDUR;
        console.log(timeDUR);
        flag = 0;
        urlTab1 = 'https://remitano.com/' + infoAdURL.split('/')[3] + '/vn';
        ID = request.source.split(".")[1];
        localStorage.setItem('ACTIONgetSource1212', ACTION + '');
        localStorage.setItem('timeDUR', timeDUR + '');
        localStorage.setItem('infoAdURL', infoAdURL + '');
        localStorage.setItem('MAX', MAX + '');
        localStorage.setItem('MIN', MIN + '');
        localStorage.setItem('NUMBER_STAMP', NUMBER_STAMP + '');
        localStorage.setItem('userFolow', userFolow + '');
        localStorage.setItem('IDgetSource1212', ID + '');
        chrome.runtime.sendMessage({
            action: "close",
            source: ACTION
        });
        if(ACTION===isAutoSell){
            valueTam= MIN;
        }
        if(ACTION===isAutoSell){
            valueTam= MAX;
        }


    }
});


function clickPage2p(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
            "code":
            "document.getElementsByClassName('pagination-next')[0].firstChild.click();" +
            "document.getElementsByClassName('pagination-next')[1].firstChild.click();"
        },
        function (result) {
            console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 2");
            getDataFirstPagep(tabs, 2);
        });
}

async function getDataTabb(tabs, index) {
    await sleep(3000);
    chrome.tabs.executeScript(tabs[0].id, {
        "code":
        "function getData(){\n" +
        "     let array =[];\n" +
        "        var sell = document.getElementsByClassName('sell-offer');\n" +
        "        if(sell.length>0){\n" +
        "              \n" +
        "             for(var i=0;i<sell.length;i++){\n" +
        "                var text =sell[i].innerText;\n" +
        "                   array.push({\n" +
        "                       type: 'sell',\n" +
        "                        numberPrice: parseFloat(text.split(' ')[0].replace(',','.')),\n" +
        "                       maxPrice: parseFloat(text.split('Tối đa: ')[1].split(' ')[0].replace(',','.')),\n" +
        "                       userName: text.split('\\n')[2].split(' ')[0],\n" +
        "\n" +
        "                       \n" +
        "                   });\n" +
        "             }\n" +
        "        }\n" +
        "var buy = document.getElementsByClassName('buy-offer');\n" +
        "        if(buy.length>0){\n" +
        "              \n" +
        "             for(var i=0;i<buy.length;i++){\n" +
        "                var text =buy[i].innerText;\n" +
        "                   array.push({\n" +
        "                       type: 'buy',\n" +
        "                       numberPrice: parseFloat(text.split(' ')[0].replace(',','.')),\n" +
        "                       maxPrice: parseFloat(text.split('Tối đa: ')[1].split(' ')[0].replace(',','.')),\n" +
        "                       userName: text.split('\\n')[2].split(' ')[0],\n" +
        "\n" +
        "                       \n" +
        "                   });\n" +
        "             }\n" +
        "        }\n" +
        "return array;\n" +
        "};getData();"
    }, function (result) {
        let data = result[0];
        if (data.length < 10) {
            console.log("data.length");
            chrome.tabs.update(tabs[0].id, {url: urlTab1, active: false}, function (tab1) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === tab1.id && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        getDataFirstPagep(tabs, index);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {

            if (index === 1) {
                araybuyTam = [];
                araySellTam = [];
            }
            data.forEach(item => {
                if (item.type === 'buy') {
                    araybuyTam.push(item);
                }
                if (item.type === 'sell') {
                    araySellTam.push(item);
                }

            });

            if (index === 2) {
                sellOffersPrice = araySellTam;
                buyOffersPrice = araybuyTam;
                if (ACTION === isAutoSell) {
                    console.log("10 ACC ĐẶT QUẢNG CÁO BÁN Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(sellOffersPrice));
                } else {
                    console.log("10 ACC ĐẶT QUẢNG CÁO MUA Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(buyOffersPrice));
                }
                getDataSuccess = true;
            } else {
                clickPage2p(tabs);
            }
        }
    });

}

function getDataFirstPagep(tabs, index) {
    chrome.tabs.executeScript(tabs[0].id, {
            "code":
            "function clickbtnColor(){\n" +
            "var el= document.getElementsByClassName('text-btc-color');\n" +
            "if(el[0]!=undefined){\n" +
            "el[0].click();\n" +
            "}\n" +
            "};clickbtnColor();"
        },
        function (result) {
            console.log("ĐANG CHUYỂN CHẾ ĐỘ XEM -> VND/ethUSDT");

        });
    getDataTabb(tabs, index);

}

function getDataTabb1(tabs) {
    if (tabs[0].url !== urlTab1 || flag === 0) {
        flag = 1;
        chrome.tabs.update(tabs[0].id, {url: urlTab1, active: false}, function (tab1) {
            let listener = function (tabId, changeInfo, tab) {
                if (tabId === tab1.id && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    getDataFirstPagep(tabs, 1);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    } else {
        chrome.tabs.executeScript(tabs[0].id, {
                "code": "document.getElementsByClassName('pagination-prev')[0].firstChild.click();" +
                "document.getElementsByClassName('pagination-prev')[1].firstChild.click();"
            },
            function (result) {
                console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 1");
                getDataFirstPagep(tabs, 1);
            });
    }
}


function start() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccess) {
            getDataSuccess = false;
            console.log("LUOT MOI");
            getDataTabb1(tabs);
        }
    });
}

let getDataSuccess2 = true;

function getDataTabb2(tabs) {
    if (tabs[1].url !== infoAdURL) {
        chrome.tabs.update(tabs[1].id, {url: infoAdURL, active: false}, function (tab2) {
            let listener = function (tabId, changeInfo, tab) {
                if (tabId === tab2.id && changeInfo.status === 'complete') {
                    setupTab2(tabs, tab2);
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    } else {
        setupTab2(tabs);
    }
}

function start2() {
    chrome.tabs.query({}, function (tabs) {
        if (getDataSuccess2) {
            getDataSuccess2 = false;
            console.log("LUOT MOI");
            getDataTabb2(tabs);
        }
    });
}


setInterval(function () {
    if (ACTION !== isOff) {
        start();
    }
}, 1000);

setInterval(function () {
    if (ACTION !== isOff) {
        start2();
    }
}, 1000);


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function setupTab2(tabs, tab2) {
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
            "function settup(){\n" +
            "        var element =document.getElementsByClassName('btn btn-default btn-edit');\n" +
            "\t\tif(element[0]!=undefined){\n" +
            "               element[0].click();\n" +
            "               return \"OK\"\n" +
            "\t\t}else{\n" +
            "\t\t\t\treturn \"FAIL\"\n" +
            "        }\n" +
            "};settup();"
        },

        function (result) {
            console.log("NHẤN VÀO NÚT [Chỉnh sửa]");
        });
    await sleep(4000);
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
            "function clickChange(){\n" +
            "        var btnChange =document.getElementsByClassName('btn-change');\n" +
            "\t\tif(btnChange.length>0){\n" +
            "            for(var i=0;i<btnChange.length;i++){\n" +
            "                            btnChange[0].click();\n" +
            "            };\n" +
            "               return \"OK\"\n" +
            "\t\t}else{\n" +
            "\t\t\t  return \"FAIL\"\n" +
            "        }\n" +
            "};clickChange();"
        },
        function (result) {
            console.log("NHẤN VÀO NÚT [Thay đổi]");
            directInput(tabs);


        });
}

async function directInput(tabs) {

    if (parseInt((Date.now() - timeUpdate)) >= ((timeDUR - 3) * 1000)) {
        console.log("ĐÃ ĐỦ THỜI GIAN NHẬP GIÁ MỚI " + parseInt((((Date.now() - timeUpdate)) / 1000) + 3));
        inputData(tabs);
    } else {
        await sleep(1000);
        console.log("ĐANG CHỜ ĐẾN GIÂY THỨ " + parseInt((((Date.now() - timeUpdate)) / 1000) + 3));
        directInput(tabs);
    }
}


async function inputData(tabs) {
    if (sellOffersPrice.length === 10 && buyOffersPrice.length === 10) {
        let valueInput = ACTION === isAutoSell ? getNumberInput(sellOffersPrice) : getNumberInput(buyOffersPrice);
		valueInput = parseInt(valueInput);
        scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
        chrome.tabs.executeScript(tabs[1].id, {"code": scriptCodeInput},
            function (result) {
                console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
                clickSave(tabs);
            }
        );
    } else {
        getDataSuccess2 = true;
    }

}


async function aWait() {
    await sleep(2000);
    getDataSuccess2 = true;
}

async function clickSave(tabs) {
    await sleep(500);
    chrome.tabs.executeScript(tabs[1].id, {
            "code":
                "document.getElementsByClassName('btn-save-offer')[0].click()"
        },
        function (result) {
            console.log("NHẤN SAVE");
        });
    await sleep(1000);
    chrome.tabs.query({}, function (tabs) {
        if (tabs[1].url !== infoAdURL) {
            clickSave(tabs)
        } else {
            timeUpdate = Date.now();
            aWait();

            console.log("ĐÃ LƯU LẠI QUẢNG CÁO");
            console.log("____ĐANG_____________________");
            console.log("________CHỜ________________");
            console.log("____________LƯỢT___________");
            console.log("_ _ _ _ _ _ _ _ __MỚI__ ___");
            console.log(" ");
            console.log(" ");
        }
    });

}


function getValue(offersPrice) {
    let array1 = [];
    let array = [];
    offersPrice.forEach(item => {
        if (item !== null) {
            let v = item.numberPrice*1000;
            if (ACTION === isAutoSell) {
                v = v - (v * 0.01);
            }
            if (ACTION === isAutoBuy) {
                v = v + (v * 0.01);
            }
         
            array.push(v);
            if (item.maxPrice >= NUMBER_STAMP) {
                array1.push(v);
            }
        }

    });

    if (ACTION === isAutoBuy) {
        array1.sort((a, b) => b - a);
    }
    if (ACTION === isAutoSell) {
        array1.sort((a, b) => a - b);
    }
    console.log(array1);
    let flag = true;
    let value = Math.max(...array1);
    array1.forEach(item => {
        if (flag && item !== null) {
            if (ACTION === isAutoSell) {
                if (item >= MIN) {
                  
					value = item -1;
						if(value<MIN){
							value=MIN;
						}
                    flag = false;
                }
            }else if (ACTION === isAutoBuy) {
                if (item <= MAX) {
					value = item + 4;
						if(value>MAX){
							value=MAX;
						}
                    flag = false;
                }
            }else {
                value="Đã tắt tool";
            }
        }
    });
    if (flag) {
        if (array1.length > 0) {
            if(ACTION === isAutoBuy ){
                value=MAX;
            }else if(ACTION === isAutoSell ) {
                value=MIN;
            }else {
                value="Đã tắt tool";
            }
        } else {
            if(ACTION === isAutoBuy ){
                value=Math.min(...array);
            }else if(ACTION === isAutoSell ) {
                value=Math.max(...array);
            }else {
                value="Đã tắt tool";
            }
        }

    }
    console.log("GIÁ TRỊ SẼ NHẬP VÀO LÀ : " + value);
    return value;
}

function getNumberInput(offersPrice) {
    let value = 'Đã tắt tool';
    if (userFolow !== '') {
        let flag = true;
        offersPrice.forEach(item => {
            if (item !== null && userFolow.trim() === item.userName) {
                let v = item.numberPrice*1000;
                 
                if (ACTION === isAutoSell) {
					v = v - (v * 0.01);
                    if (v >= MIN) {
                        value = v - 1;
						if(value < MIN){
							value = MIN;
						}
                        flag = false;
                        console.log("ĐÃ THEO " + userFolow);
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
                }else if (ACTION === isAutoBuy) {
					v = v + (v * 0.01);
                    if (v <= MAX) {
                        console.log("ĐÃ THEO BUY" + userFolow);
                        value = v + 4;
						if(value>MAX){
							value=MAX;
						}
                        flag = false;
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
                }else {
                    value="Đã tắt tool";
                }
            }
        });
        if (flag) {
            value = getValue(offersPrice);
        }
    } else {
        value = getValue(offersPrice);
    }
    return value;
}
*/
