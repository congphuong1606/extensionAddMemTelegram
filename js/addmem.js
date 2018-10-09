let inputArrayUserName = '';
let isAuto = "off";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn-save").addEventListener("click", clickSavebtn);
    let checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            isAuto = "on";
            console.log("checked")
        } else {
            isAuto = "off";
            console.log("unchecked")
        }
    });
});


function clickSavebtn() {
    console.log("clcilclc")
    inputArrayUserName = document.getElementById("input-array-user-name").value + '';
    if (inputArrayUserName !== '') {
        sendDataToBgFile();
    }
}


function sendDataToBgFile() {
    chrome.runtime.sendMessage({
        action: "data",
        inputArrayUserName: inputArrayUserName,
        isAuto: isAuto,

    });
}

window.onload = onWindowLoad;

function onWindowLoad() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAa")
}

var valueInput = 'hiihihihi';

function clickPage() {
    var result = 'not click';
    var element = document.getElementsByClassName('contacts_modal_contact');
    if (element.length > 0) {
        element[0].click();
        result = 'clicked';
    }
    return result;
};clickPage();


