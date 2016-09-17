<!DOCTYPE html>
<html>
<head>

<?php

require_once('php/common.php');

header('Content-Type: text/html');

html5_header(
    "Jose Alba",
    array(
        'css/style.css', 'css/reset.css', 'css/page-scroll.css'
    )
);

html5_js(['js/scroll/modernizr.js']);
?>

</head>
<body data-hijacking="off" data-animation="scaleDown">

        <section class="cd-section">
            <div>
                <a href="http://josealba.org/financialjourney" class="cl-effect-9"><span>Financial Journey</span><span>Don'let Your Dreams Be Dreams</span>
                    <h2>Financial Journey</h2></a>
                <h3>Don't Let Your Dreams Be Dreams</h3>
            </div>
        </section>

        <section class="cd-section">
            <div>
                <a href="http://josealba.org/biographical-webpage"><h2>Biographical Webpage</h2></a>
                <h3>Welcome to My Life</h3>
            </div>
        </section>

        <section class="cd-section">
            <div>
                <a href="http://josealba.org/alba"><h2>Alba</h2></a>
                <h3>Web Designing Company</h3>
            </div>
        </section>

        <video id="myVideo" autoplay class="video">
            <source src="video/JoseAlba.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>

        <section id="videoEnd" style="display:none">
            <div id="toolbar">
                <div id="rad">
                    Radius<span id="radval"> 10</span>
                    <div id="decrad" class="radcontrol">-</div>
                    <div id="incrad" class="radcontrol">+</div>
                </div>

                <div id="colours"></div>

                <div id="save">
                    <iframe id="downloadframe" hidden=yes></iframe>
                    Save
                </div>
            </div>
            <canvas id = "drawing_app" class="cd-section">
                Upgrade Your Browser
            </canvas>


<?php

html5_js(
    array(
        'js/canvas/colours.js', 'js/canvas/myScript.js', 'js/canvas/radius.js', 'js/canvas/save.js', 'js/swap.js',
        'js/scroll/jquery-2.1.4.js', 'js/scroll/main.js', 'js/scroll/modernizr.js', 'js/scroll/velocity.min.js',
    )
);

?>

</body></html>