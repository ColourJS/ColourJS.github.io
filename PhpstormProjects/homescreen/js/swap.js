document.getElementById('myVideo').addEventListener('ended',myHandler,false);
function myHandler(e) {
    if(!e) { e = window.event; }
    // What you want to do after the event
    document.getElementById('myVideo').style.display="none";
    document.getElementById('videoEnd').style.display="block";
}
