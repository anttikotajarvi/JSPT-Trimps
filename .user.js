// ==UserScript==
// @name         JSPT-Trimps
// @version      1.0
// @namespace    https://anttikotajarvi.github.io/JSPT-Trimps
// @downloadURL  https://anttikotajarvi.github.io/JSPT-Trimps/.user.js
// @updateURL    https://anttikotajarvi.github.io/JSPT-Trimps/.user.js
// @description  JS Performance Trick - no js deferring
// @author       Antti kotajarvi (40oz)
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @connect      *trimps.github.io*
// @connect      self
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const performanceTrickDescription = `
While on turned on the tab will emit a quiet, almost inaudible, constant static sound to keep the browser from slowing down JS processing when the tab is not infocus.
Trimps natively does a good job in playing catchup with when the tab comes in focus again but doesnt account for AutoTrimps. AFK performance should be very noticable.
Credit for fix goes to Kaan Soral for his <a href='https://stackoverflow.com/questions/6032429/chrome-timeouts-interval-suspended-in-background-tabs/51191818#51191818'>Stackoverflow answer</a>`

var howler = document.createElement('script');
howler.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js');
document.head.appendChild(howler)
var PTScript = document.createElement("script");
PTScript.setAttribute("name", "Performance Trick");
PTScript.text = `
var sound;
const playSound = () => {
    sound = new Howl({
        src: ['http://adventure.land/sounds/loops/empty_loop_for_js_performance.ogg','http://adventure.land/sounds/loops/empty_loop_for_js_performance.wav'],
        volume:0.5,
        autoplay: true, loop: true,
    });
}
var PTState = false;
function togglePT() {
    var PTBtn = document.getElementById("togglePT");
    if(PTState) {
        sound.stop();
        PTState = false;
        PTBtn.setAttribute("class", "btn fightBtn btn-danger");
    } else {
        playSound();
        PTState = true;
        PTBtn.setAttribute("class", "btn fightBtn btn-success");
    }
}
`
document.head.appendChild(PTScript);


var PTBtn = document.createElement("div");
PTBtn.setAttribute("class", "battleSideBtnContainer")
PTBtn.innerHTML = `<span class="btn fightBtn btn-danger" id="togglePT" onmouseover="tooltip('JS Performance Trick', 'customText', event, \`${performanceTrickDescription}\`)" onmouseout="tooltip('hide')" onclick="togglePT()" style="display: block; opacity: 1.0568; padding: 0.01vw;">JS PT On</span>`
document.getElementById("battleBtnsColumn").appendChild(PTBtn);
