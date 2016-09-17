<?php
session_start();

function html5_header($title="", $cssFiles=array())
{
    echo <<<ZZEOF

    <title>$title</title>
    <link rel ="shortcut icon" href="/img/svg/Alba.svg" />

ZZEOF;

    foreach ($cssFiles as $cssFile)
        echo "<link rel='stylesheet' type='text/css' href='$cssFile' />\n";

}

function html5_js($jsFiles=array())
{
    foreach ($jsFiles as $jsFile)
        echo "<script src='$jsFile' type='text/javascript'></script>\n";
}
