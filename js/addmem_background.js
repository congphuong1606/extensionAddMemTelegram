let userNames = '';
let arrayUserName = [];
let loadingAddMem = true;
let isAuto = "off";

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "data") {
        userNames = request.inputArrayUserName.trim();
        let array = userNames.split('\n');
        array.forEach(item => {
            if (item.trim() !== '@null') {
                let data = {
                    userName: item,
                    isAdded: false,
                };
                arrayUserName.push(data)
            }
        });
        console.log(arrayUserName);
        isAuto = request.isAuto;
    }
});

function getUserName() {
    let userName = '@PhuongBtc0965100635';
    let flag = true;
    arrayUserName.forEach(item => {
        if (flag) {
            if (!item.isAdded) {
                console.log("ĐANG ADD MEMBER: " + item.userName.trim());
                userName = item.userName.trim();
                flag = false;
            } else {
                console.log("ĐÃ ADD MEMBER: " + item.userName.trim())
            }
        }
    });
    return userName;
}

setInterval(function () {
    if (loadingAddMem) {
        loadingAddMem = false;
        start();
    }
}, 1000);


function closebtnOKifNotAdd(tabs, userName) {
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function clickPage() {\n" +
            "    var result = 'not click';\n" +
            "    var element = document.getElementsByClassName('btn btn-md btn-md-primary');\n" +
            "    if (element.length >0) {\n" +
            "         for(var i=0;i<element.length;i++){\n" +
            "             if(element[i].innerText=='OK'){\n" +
            "                 element[i].click();\n" +
            "                 text = 'clicked';\n" +
            "             }\n" +
            "         }\n" +
            "        \n" +
            "    }\n" +
            "    return text;\n" +
            "};clickPage();"
        },
        function (result) {
            arrayUserName.forEach(item => {
                if (item.userName === userName) {
                    item.isAdded = true;
                }
            });
            closeDialogSearch(tabs);
        });


}

async function clickNext(tabs, userName) {
    await sleep(500);
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function clickPage() {\n" +
            "    var result = 'not click';\n" +
            "    var element = document.getElementsByClassName('btn btn-md btn-md-primary pull-right');\n" +
            "    if (element.length > 0) {\n" +
            "        element[0].click();\n" +
            "        result = 'clicked';\n" +
            "    }\n" +
            "    return result;\n" +
            "};clickPage();"
        },
        function (result) {
            console.log(result);
            if (result[0] === 'clicked') {
                console.log("click Next");
                closebtnOKifNotAdd(tabs, userName);

            }
            if (result[0] === 'not click') {
                closebtnOKifNotAdd(tabs, userName);
                console.log("not Next");
            }
        });
}

function closeDialogSearch(tabs) {
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function clickPage() {\n" +
            "    var result = 'not click';\n" +
            "    var element = document.getElementsByClassName('md_modal_action md_modal_action_close');\n" +
            "    if (element.length >0) {\n" +
            "         for(var i=0;i<element.length;i++){\n" +
            "             if(element[i].innerText=='Close'){\n" +
            "                 element[i].click();\n" +
            "                 text = 'clicked';\n" +
            "             }\n" +
            "         }\n" +
            "        \n" +
            "    }\n" +
            "    return text;\n" +
            "};clickPage();"
        },
        function (result) {
            start();
            /* loadingAddMem = true;*/
        });
}

async function chooseMember(tabs, userName) {
    await sleep(3000);
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function clickPage() {\n" +
            "    var result = 'not click';\n" +
            "    var element = document.getElementsByClassName('contacts_modal_contact');\n" +
            "    if (element.length > 0) {\n" +
            "        element[0].click();\n" +
            "        result = 'clicked';\n" +
            "    }\n" +
            "    return result;\n" +
            "};clickPage();"
        },
        function (result) {
            console.log(result);
            if (result[0] === 'clicked') {
                console.log("add contact");
                clickNext(tabs, userName);
            }
            if (result[0] === 'not click') {
                closeDialogSearch(tabs);
            }
        });
}


async function inputTextSearch(tabs) {
    await sleep(2000);
    var valueInput = getUserName();
    var codeJS = "function inputS() {\n" +
        "    var result = 'not input';\n" +
        "    var element = document.getElementsByClassName('contacts_modal_search');\n" +
        "    if (element.length == 1) {\n" +
        "        var ev = new Event('input', {bubbles: true});\n" +
        "        ev.simulated = true;\n" +
        "        element[0].firstElementChild.value = '" + valueInput + "';\n" +
        "        element[0].firstElementChild.defaultValue = '" + valueInput + "';\n" +
        "        element[0].firstElementChild.dispatchEvent(ev);\n" +
        "        text = 'inputed';\n" +
        "\n" +
        "    }\n" +
        "    return text;\n" +
        "};inputS();\n";
    chrome.tabs.executeScript(tabs[1].id, {"code": codeJS},
        function (result) {
            console.log(result);
            if (result[0] === 'inputed') {
                console.log("inputed inputed");
                chooseMember(tabs, valueInput);

            }
            if (result[0] === 'not input') {
                console.log("QUAY LẠI input");
                inputTextSearch(tabs);

            }
        });

}

async function clickElementAInviteMember(tabs) {
    await sleep(500);
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function clickElementA() {\n" +
            "    var text = 'not clicked'\n" +
            "    var elementA = document.getElementsByTagName('a');\n" +
            "    for (var i = 0; i < elementA.length; i++) {\n" +
            "        if (elementA[i].innerText == 'Invite members') {\n" +
            "            elementA[i].click();\n" +
            "            text = 'clicked';\n" +
            "        }\n" +
            "    }\n" +
            "    return text;\n" +
            "};\n" +
            "clickElementA();"
        },
        function (result) {
            console.log(result);
            if (result[0] === 'clicked') {
                console.log("clicked InviteMember");
                inputTextSearch(tabs);
            }
            if (result[0] === 'not clicked') {
                console.log("QUAY LẠI InviteMember");
                showDialog(tabs)

            }
        });

}

async function showDialog(tabs) {
    await sleep(5000);
    chrome.tabs.executeScript(tabs[1].id, {
            "code": "function  clickPage1(){\n" +
            "   var element=document.getElementsByClassName('tg_head_peer_info');\n" +
            "  if(element.length==1){\n" +
            "      element[0].click();\n" +
            "      return 'clicked';\n" +
            "  }else{\n" +
            "      return 'not clicked';\n" +
            "  }\n" +
            "};clickPage1();"
        },
        function (result) {
            console.log("AAAA");
            if (result[0] === 'clicked') {
                console.log("TIẾP TỤC");
                clickElementAInviteMember(tabs);
            }
            if (result[0] === 'not clicked') {
                console.log("QUAY LẠI");
                showDialog(tabs);
            }
        });
}


async function loadTab4(tabs) {
    await sleep(10000);

    const urlTab4 = 'https://web.telegram.org/#/im?p=@phuongbtc';
    /* if (tabs[1].url !== urlTab4 || flag === 0) {*/
    chrome.tabs.update(tabs[1].id, {url: urlTab4, active: false}, function (tab1) {
        let listener = function (tabId, changeInfo, tab) {
            if (tabId === tab1.id && changeInfo.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                console.log("LOAD XONG");
                showDialog(tabs)
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });
}

function start() {
    chrome.tabs.query({}, function (tabs) {
        const urlTab4 = 'https://web.telegram.org/#/im?p=@phuongbtc';
        if (tabs[1].url !== urlTab4) {
            chrome.tabs.update(tabs[1].id, {url: 'http://webtruyen.com/', active: false}, function (tab2) {
                let listener = function (tabId, changeInfo, tab) {
                    if (tabId === tab2.id && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        chrome.tabs.update(tabs[1].id, {
                            url: 'https://web.telegram.org',
                            active: false
                        }, function (tab3) {
                            let listener = function (tabId, changeInfo, tab) {
                                if (tabId === tab3.id && changeInfo.status === 'complete') {
                                    chrome.tabs.onUpdated.removeListener(listener);
                                    loadTab4(tabs);
                                }
                            };
                            chrome.tabs.onUpdated.addListener(listener);
                        });
                    }
                };
                chrome.tabs.onUpdated.addListener(listener);
            });
        } else {
            showDialog(tabs);
        }

    });

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}