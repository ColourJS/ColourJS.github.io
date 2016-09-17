var saveButton = document.getElementById('save');

saveButton.addEventListener('click', saveImage);

//function saveImage(){
//    var data = canvas.toDataURL();
//
//    var request = new XMLHttpRequest();
//
//    request.onreadystatechange = function() {
//        if (request.readyState == 4 && request.status == 200) {
//            //do stuff
//            var response = request.responseText;
//            //window.open('download.php?file='+response, '_blank', 'location=0 menubar=0');
//            document.getElementById('downloadframe').src = 'download.php?file='+response;
//        }
//    };
//
//    request.open('POST','php/save.php',true);
//    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//    request.send('img='+data);
//}

function saveImage(){
    var data = canvas.toDataURL();

    window.open(data, '_blank', 'location=0, menubar=0')
}