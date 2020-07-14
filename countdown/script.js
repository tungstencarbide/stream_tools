function loadGoogleFont(fontName) {
    var head = document.getElementsByTagName('HEAD')[0];  
    var link = document.createElement('link'); 
    link.rel = 'stylesheet';  
    link.type = 'text/css'; 
    link.href = 'https://fonts.googleapis.com/css?family=' + fontName;  
    head.appendChild(link);
}

function makeTimer(endTime) {
    // if you are using in a place where you can't provide query
    // arguments (e.g. OBS local file URL) uncomment and change
    // this line to the time you want.
    // var endTime = new Date("July 9, 2020 18:00:00 MST");			
    var endTime = (Date.parse(endTime)) / 1000;
    if (isNaN(endTime)) {
    document.getElementById("timer").innerHTML = "endtime query parameter must be a valid date and time.<br>Example: July 9, 2020 18:00:00 PDT";
        return;
    }
    var now = new Date();
    var now = (Date.parse(now) / 1000);

    var timeLeft = endTime - now;
    if (timeLeft < 0) {
        document.getElementById("timer").innerHTML = "Right now!";
    } 
    var days = Math.floor(timeLeft / 86400); 
    var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    var dword = "Days";
    var hword = "Hours";
    var mword = "Minutes";
    var sword = "Seconds";

    if (hours < "10") { hours = "0" + hours; }
    if (minutes < "10") { minutes = "0" + minutes; }
    if (seconds < "10") { seconds = "0" + seconds; }
    if (days == 1) {dword = "Day";}
    if (hours == 1) {hword = "Hour";}
    if (minutes == 1) {mword = "Minute";}
    if (seconds == 1) {sword = "Second";}
    if (days > 0) {
        document.getElementById("days").innerHTML = days + "<span>" + dword + "</span>"
    }
    else {
        document.getElementById("days").innerHTML = "";
    }
    if (hours > 0 || days > 0) {
        document.getElementById("hours").innerHTML = hours + "<span>" + hword + "</span>"
    }
    else {
        document.getElementById("hours").innerHTML = "";
    }
    document.getElementById("minutes").innerHTML = minutes + "<span>" + mword + "</span>"
    document.getElementById("seconds").innerHTML = seconds + "<span>" + sword + "</span>"

}

var qs = window.location.search;
var parms = new URLSearchParams(qs);
var endTime = parms.get('endtime');
var font = parms.get('font');
if (font != null) {
    loadGoogleFont(font);
    for (let k in document.styleSheets[0].cssRules) {
        var curRule = document.styleSheets[0].cssRules[k];
        if (curRule.selectorText == "body") {
            curRule.style.fontFamily = font;
        }
    }
}
setInterval(function() { makeTimer(endTime); }, 1000);
