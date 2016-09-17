<?php

$file = $_GET['file'];

header('Content-type: image/png');
header("Content-disposition: attachment; filename=output.png");

readfile($file);

?>