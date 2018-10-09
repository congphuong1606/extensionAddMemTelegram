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


localStorage.setItem('ACTIONgetSource1212', '3');
localStorage.setItem('MAX', 21000 + '');
localStorage.setItem('MIN', 24000 + '');
localStorage.setItem('NUMBER_STAMP', 0 + '');
localStorage.setItem('userFolow', '');
localStorage.setItem('infoAdURL', '');
let urlTab1 = '';
chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "getSource") {
        ACTION = parseInt(request.source.split(".")[0]);
        console.log(ACTION);
        MAX = request.max;
        MIN = request.min;
        NUMBER_STAMP = request.NUMBER_STAMP;
        userFolow = request.userFolow;
        infoAdURL = request.infoAdURL;
        urlTab1 = 'https://remitano.com/' + infoAdURL.split('/')[3] + '/vn';
        ID = request.source.split(".")[1];
        localStorage.setItem('ACTIONgetSource1212', ACTION + '');
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


    }
});
/!*
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
        "function getData(){" +
        "             var res=[];" +
        "                var bodyDatas= document.getElementsByClassName('offer-body-meta');" +
        "                var users= document.getElementsByClassName('offer-item-username');" +
        "                 for(var i=0; i< bodyDatas.length ;i++){" +
        "           var data={" +
        "               numberPrice: bodyDatas[i].firstChild.innerText.split(' ')[0]," +
        "               maxPrice: parseFloat(bodyDatas[i].lastChild.innerText.split(' ')[2].replace(',','.'))," +
        "               userName: users[i].innerText" +
        "               };" +
        "                     res.push(data);" +
        "                    }" +
        "                return res;" +
        "            }" +
        "getData();"
    }, function (result) {
        if (index === 1) {
            araybuyTam = [];
            araySellTam = [];
        }
        let data = result[0];
        for (let i = 0; i < 10; i++) {
            if(data[i]!==undefined&&data[i]!==null){
                if (i < 5) {

                    araySellTam.push(data[i]);
                } else {
                    araybuyTam.push(data[i]);
                }
            }
        }

        if (index === 2) {
            sellOffersPrice = araySellTam;
            buyOffersPrice = araybuyTam;
            if (ACTION === isAutoSell) {

            } else {
                /!* console.log("10 ACC ĐẶT QUẢNG CÁO MUA Ở 2 PAGE ĐẦU:");
                 console.log(JSON.stringify(buyOffersPrice));*!/
            }
            /!*let valueInput = ACTION === isAutoSell ? getNumberInput(sellOffersPrice) : getNumberInput(buyOffersPrice);
            scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
            inputData(tabs);*!/

            getDataSuccess = true;
            chrome.runtime.sendMessage({
                action: "dataTab2",
                sellOffersPrice: sellOffersPrice,
                buyOffersPrice: buyOffersPrice,
            });
        } else {
            clickPage2p(tabs);
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
    const urlTab1 = 'https://remitano.com/' + infoAdURL.split('/')[3] + '/vn';
    if (tabs[0].url !== urlTab1) {
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
                "code":
                "document.getElementsByClassName('pagination-prev')[0].firstChild.click();" +
                "document.getElementsByClassName('pagination-prev')[1].firstChild.click();"
            },
            function (result) {
                console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 1");
                getDataFirstPagep(tabs, 1);
            });
    }
}

function getScript() {
    let val = ACTION === isAutoSell ? getNumberInput(sellOffersPrice) : getNumberInput(buyOffersPrice);
    return "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input'," +
        " { bubbles: true});ev.simulated = true;element.value = " + val + ";element.defaultValue  = " + val +
        ";element.dispatchEvent(ev);";

}

async function clickSavep(tabs) {
    await sleep(1000);
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
            clickSavep(tabs)
        } else {
            startTab2(tabs)
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

function inputDatab(tabs) {
    chrome.tabs.executeScript(tabs[1].id, {"code": getScript()},
        function (result) {
            console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
            clickSavep(tabs);
        }
    );
}

async function setupTab2b(tabs) {
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
            inputDatab(tabs)

        });
}

async function startTab2(tabs) {
    await sleep(3000);
    if (tabs[1].url !== infoAdURL) {
        chrome.tabs.update(tabs[1].id, {url: infoAdURL, active: false}, function (tab2) {
            let listener = function (tabId, changeInfo, tab) {
                if (tabId === tab2.id && changeInfo.status === 'complete') {
                    setupTab2b(tabs);
                    chrome.tabs.onUpdated.removeListener(listener);
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
        });
    } else {
        setupTab2b(tabs);
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
}*!/

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


setInterval(function () {

    if (ACTION !== isOff) {
        console.log("SAU MOT GIAY");
        refreshTab()
    }
}, 20000);

let flag=0;


function refreshTab() {
    chrome.tabs.query({}, function (tabs) {
        if (isloaded1) {
            isloaded1 = false;
            if (tabs[0].url !== urlTab1||flag===0) {
                flag=1;
                chrome.tabs.update(tabs[0].id, {url: urlTab1, active: false}, function (tab1) {
                    let listener = function (tabId, changeInfo, tab) {
                        if (tabId === tab1.id && changeInfo.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener);
                            getDataFirstPage(tabs, 1);
                        }
                    };
                    chrome.tabs.onUpdated.addListener(listener);
                });
            } else {
                chrome.tabs.executeScript(tabs[0].id, {
                        "code":"document.getElementsByClassName('pagination-prev')[0].firstChild.click();" +
                        "document.getElementsByClassName('pagination-prev')[1].firstChild.click();"
                        /!* "function  clickPage1(){\n" +
                         "    var element=document.getElementsByClassName('pagination');\n" +
                         "   for(var index=0;index<element.length;index++){\n" +
                         "       var page =element[index].children;\n" +
                         "        for(var i=0;i<page.length;i++){\n" +
                         "                 if(page[i].innerText=='1'){\n" +
                         "                      page[i].firstChild.click();\n" +
                         "                 }\n" +
                         "            }\n" +
                         "   }\n" +
                         "\n" +
                         "};clickPage1();"*!/
                    },
                    function (result) {
                        console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 1");
                        getDataFirstPage(tabs, 1);
                    });
            }
        }
        if (isloaded2) {
            isloaded2 = false;
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
    });
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
            if (isloaded1) {
                inputData(tabs)
            }
            isloaded2 = true;
        });
}

function clickPage2(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
            "code":"document.getElementsByClassName('pagination-next')[0].firstChild.click();" +
            "document.getElementsByClassName('pagination-next')[1].firstChild.click();"
            /!*"function  clickPage1(){\n" +
            "    var element=document.getElementsByClassName('pagination');\n" +
            "   for(var index=0;index<element.length;index++){\n" +
            "       var page =element[index].children;\n" +
            "        for(var i=0;i<page.length;i++){\n" +
            "                 if(page[i].innerText=='2'){\n" +
            "                      page[i].firstChild.click();\n" +
            "                 }\n" +
            "            }\n" +
            "   }\n" +
            "\n" +
            "};clickPage1();"*!/
        },
        function (result) {
            console.log("Ở TAB LẤY DỮ LIỆU ĐANG CHUYỂN PAGE 2");
            getDataFirstPage(tabs, 2);
        });
}

async function getDataTab(tabs, index) {
    await sleep(2000);
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
        if(data.length<10){
            console.log("data.length");
            chrome.tabs.update(tabs[0].id, {url: urlTab1, active: false}, function (tab1) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === tab1.id && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        getDataFirstPage(tabs, index);
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        }else {
            if (index === 1) {
                sellOffersPrice = [];
                buyOffersPrice = [];
            }
            data.forEach(item=>{
                if(item.type==='buy'){
                    buyOffersPrice.push(item);
                }
                if(item.type==='sell'){
                    sellOffersPrice.push(item);
                }

            });
            if (index === 2) {
                if (ACTION === isAutoSell) {
                    console.log("10 ACC ĐẶT QUẢNG CÁO BÁN Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(sellOffersPrice));
                } else {
                    console.log("10 ACC ĐẶT QUẢNG CÁO MUA Ở 2 PAGE ĐẦU:");
                    console.log(JSON.stringify(buyOffersPrice));
                }
                let valueInput = ACTION === isAutoSell ? getNumberInput(sellOffersPrice) : getNumberInput(buyOffersPrice);
                scriptCodeInput = "var element = document.getElementsByClassName('input-group')[0].firstChild;var ev = new Event('input', { bubbles: true});ev.simulated = true;element.value = " + valueInput + ";element.defaultValue  = " + valueInput + ";element.dispatchEvent(ev);";
                if (isloaded2) {
                    inputData(tabs)
                }
                isloaded1 = true;

            } else {
                clickPage2(tabs);
            }
        }

    });
}

async function inputData(tabs) {

    chrome.tabs.executeScript(tabs[1].id, {"code": scriptCodeInput},
        function (result) {
            console.log("ĐANG NHẬP DỮ LIỆU VÀO [Giá ethUSD]");
            clickSave(tabs);
        }
    );

}

async function getDataFirstPage(tabs, index) {
    if (index === 1) {
        chrome.tabs.executeScript(tabs[0].id, {
                "code":
                    "document.getElementsByClassName('text-btc-color')[0].click()"
            },
            function (result) {
                console.log("ĐANG CHUYỂN CHẾ ĐỘ XEM -> VND/ethUSDT");
                getDataTab(tabs, index);
            });
    } else {
        getDataTab(tabs, index);
    }


}

async function sleepp(ms) {
    await sleep(ms);
}

async function clickSave(tabs) {
    await sleep(1000);
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
            let v = item.numberPrice;
            if (ACTION === isAutoSell) {
                v = v - (v * 0.01);
            }
            if (ACTION === isAutoBuy) {
                v = v + (v * 0.01);
            }
            v = parseInt((v * 1000));
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
                    value = item + 1;
                    flag = false;
                }
            }
            if (ACTION === isAutoBuy) {
                if (item <= MAX) {
                    value = item - 1;
                    flag = false;
                }
            }
        }
    });
    if (flag) {
        if (array1.length > 0) {
            value = ACTION === isAutoBuy ? MAX : MIN;
        } else {
            value = ACTION === isAutoBuy ? Math.min(...array) : Math.max(...array);
        }

    }
    console.log("GIÁ TRỊ SẼ NHẬP VÀO LÀ : " + value);
    return value;
}

function getNumberInput(offersPrice) {
    let value = 0;
    if (userFolow !== '') {
        let flag = true;
        offersPrice.forEach(item => {
            if (item !== null && userFolow === item.userName) {
                let v = parseFloat(item.numberPrice.replace(",", "."));
                if (ACTION === isAutoSell) {
                    v = v - (v * 0.01);
                }
                if (ACTION === isAutoBuy) {
                    v = v + (v * 0.01);
                }
                const stringVal = (v * 1000) + '';
                v = parseInt(stringVal.split(".")[0]);
                if (ACTION === isAutoSell) {
                    if (v >= MIN) {
                        value = v + 1;
                        flag = false;
                        console.log("v => giá bán");
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
                }
                if (ACTION === isAutoBuy) {
                    if (v <= MAX) {
                        console.log("v <= giá mua");
                        value = v - 1;
                        flag = false;
                        console.log(value);
                    } else {
                        flag = false;
                        value = getValue(offersPrice);
                    }
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
}*/
