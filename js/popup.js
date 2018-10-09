/*
let value = 3;
let id = "";
let infoAdURL = "";
let userFolow = "";
let max = 21000;
let min = 25000;
let NUMBER_STAMP = 0;
let autoMuaBanMore = "off";
let stampCanBuy = 21000;
let stampCanSell = 24000;
window.onload = onWindowLoad;

let timeDUR = 15;

function clickTab1() {
    document.getElementById("body-tab1").style.display = "block";
    document.getElementById("body-tab2").style.display = "none";
    document.getElementById("tab2").style.backgroundColor = "#eee";
    document.getElementById("tab1").style.backgroundColor = "white";
    document.getElementById("tab2").style.color = "#fff";
    document.getElementById("tab1").style.color = "#f3910e";
}

function clickTab2() {
    document.getElementById("body-tab2").style.display = "block";
    document.getElementById("body-tab1").style.display = "none";
    document.getElementById("tab1").style.backgroundColor = "#eee";
    document.getElementById("tab1").style.color = "#fff";
    document.getElementById("tab2").style.color = "#f3910e";
    document.getElementById("tab2").style.backgroundColor = "white";

}

chrome.tabs.query({'active': false, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log("URL URL URL");
    console.log(url);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn-save").addEventListener("click", clickSavebtn);
    document.getElementById("tab1").addEventListener("click", clickTab1);
    document.getElementById("tab2").addEventListener("click", clickTab2);
    var radios = document.querySelectorAll('input[type=radio][name="theRadioGroupName"]');

    function changeHandler(event) {

        if (this.value === "1") {
            value = 1;
            console.log('value', '1');
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "table-row";

        } else if (this.value === "2") {
            value = 2;
            console.log('value', '2');
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "none";
        } else {
            value = 3;
            document.getElementById("mua-ban").style.display = "none";
        }
    }


    Array.prototype.forEach.call(radios, function (radio) {
        radio.addEventListener('change', changeHandler);
    });


    var checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.getElementById("input-buy-more").disabled = false;
            document.getElementById("input-sell-more").disabled = false;
            autoMuaBanMore = "on";
            console.log("checked")
        } else {
            document.getElementById("input-buy-more").disabled = true;
            document.getElementById("input-sell-more").disabled = true;
            autoMuaBanMore = "off";
            console.log("unchecked")
        }
    });

});

function clickSavebtn() {
    userFolow = document.getElementById("input-folow-user").value + '';
    timeDUR = parseInt(document.getElementById("input-time-dur").value);

    timeDUR = timeDUR <= 7 ? 7 : timeDUR;
    id = document.getElementById("input-id").value;
    infoAdURL = document.getElementById("input-url-ad").value;
    max = document.getElementById("input-mua").value;
    min = document.getElementById("input-ban").value;
    NUMBER_STAMP = parseFloat(document.getElementById("input-sle").value);
    stampCanSell = document.getElementById("input-sell-more").value;
    stampCanBuy = document.getElementById("input-buy-more").value;
    if (value === 3) {
        chrome.runtime.sendMessage({
            action: "getSource",
            min: min,
            max: max,
            NUMBER_STAMP: NUMBER_STAMP,
            timeDUR: timeDUR,
            infoAdURL: infoAdURL,
            source: value + "." + id,
            userFolow: userFolow
        });
        chrome.runtime.sendMessage({
            action: "canbuySell",
            autoMuaBanMore: autoMuaBanMore,
            stampCanSell: stampCanSell,
            stampCanBuy: stampCanBuy,
        });

    } else if (infoAdURL !== "") {
        if (NUMBER_STAMP >= 0) {
            document.getElementById("error-sle").innerText = '';
            if (value === 1) {
                if (max.length === 5 && max > 15000) {
                    document.getElementById("error-mua").innerText = '';
                    chrome.runtime.sendMessage({
                        action: "getSource",
                        min: min,
                        max: max,
                        NUMBER_STAMP: NUMBER_STAMP,
                        timeDUR: timeDUR,
                        infoAdURL: infoAdURL,
                        source: value + "." + id,
                        userFolow: userFolow
                    });
                    chrome.runtime.sendMessage({
                        action: "canbuySell",
                        autoMuaBanMore: autoMuaBanMore,
                        stampCanSell: stampCanSell,
                        stampCanBuy: stampCanBuy,
                    });


                } else {
                    document.getElementById("error-mua").innerText = 'Kiểm tra giá trị  ';
                }

            } else if (value === 2) {
                if (min.length === 5 && min < 45000) {
                    document.getElementById("error-ban").innerText = '';
                    chrome.runtime.sendMessage({
                        action: "getSource",
                        min: min,
                        max: max,
                        NUMBER_STAMP: NUMBER_STAMP,
                        timeDUR: timeDUR,
                        infoAdURL: infoAdURL,
                        source: value + "." + id,
                        userFolow: userFolow
                    });
                    chrome.runtime.sendMessage({
                        action: "canbuySell",
                        autoMuaBanMore: autoMuaBanMore,
                        stampCanSell: stampCanSell,
                        stampCanBuy: stampCanBuy,
                    });
                } else {
                    document.getElementById("error-ban").innerText = 'Kiểm tra giá trị  ';
                }
            }
        } else {
            document.getElementById("error-sle").innerText = 'Mốc số lượng phải >= 0';
        }
        document.getElementById("error-url").innerText = '';

    } else {
        document.getElementById("error-url").innerText = 'Nhập URL quảng cáo (http://...offers/ID-mua-bitcoin-giá...)';
    }
}


function onWindowLoad() {
    clickTab1();
    id = localStorage.getItem('IDgetSource1212');
    infoAdURL = localStorage.getItem('infoAdURL');
    autoMuaBanMore = localStorage.getItem('autoMuaBanMore');
    stampCanBuy = parseInt(localStorage.getItem('stampCanBuy'));
    timeDUR = parseInt(localStorage.getItem('timeDUR'));
    stampCanSell = parseInt(localStorage.getItem('stampCanSell'));
    if (autoMuaBanMore === 'on') {
        document.getElementById("inputSw").checked = true;
        document.getElementById("input-buy-more").disabled = false;
        document.getElementById("input-sell-more").disabled = false;
        console.log("checked")
    } else {
        document.getElementById("inputSw").checked = false;
        document.getElementById("input-buy-more").disabled = true;
        document.getElementById("input-sell-more").disabled = true;
        console.log("checked")
    }
    userFolow = localStorage.getItem('userFolow');
    max = parseInt(localStorage.getItem('MAX'));
    min = parseInt(localStorage.getItem('MIN'));
    NUMBER_STAMP = parseFloat(localStorage.getItem('NUMBER_STAMP'));
    document.getElementById("input-id").value = id;
    document.getElementById("input-url-ad").value = infoAdURL;
    document.getElementById("input-mua").value = max;
    document.getElementById("input-ban").value = min;
    document.getElementById("input-sle").value = NUMBER_STAMP;
    document.getElementById("input-buy-more").value = stampCanBuy;
    document.getElementById("input-sell-more").value = stampCanSell;
    document.getElementById("input-folow-user").value = userFolow;
    document.getElementById("input-time-dur").value = timeDUR;
    value = parseInt(localStorage.getItem('ACTIONgetSource1212'));
    console.log(value);
    let radio1 = document.querySelector('#radio1');
    let radio2 = document.querySelector('#radio2');
    let radio3 = document.querySelector('#radio3');
    switch (value) {
        case 1:
            console.log("AAAAAAAAAAA");
            radio1.checked = true;
            radio2.checked = false;
            radio3.checked = false;
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "table-row";
            break;
        case 2:
            console.log("BBBBBBBBBB");
            radio1.checked = false;
            radio2.checked = true;
            radio3.checked = false;
            document.getElementById("mua-ban").style.display = "unset";
            document.getElementById("div-input-ban").style.display = "table-row";
            document.getElementById("div-input-mua").style.display = "none";
            break;
        case 3:
            document.getElementById("mua-ban").style.display = "none";
            console.log("CCCCCCCCCCCCCCCCC");
            radio1.checked = false;
            radio2.checked = false;
            radio3.checked = true;
            document.getElementById("div-input-ban").style.display = "none";
            document.getElementById("div-input-mua").style.display = "none";
            break;

        default :
            break;
    }
}


chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action === "close") {
        window.close();
    }
});*/
