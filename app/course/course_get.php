<?php
//

require_once "../path.php";
require_once "../public/_pdo.php";

global $PDO;
PDO_Connect("sqlite:"._FILE_DB_COURSE_);
$query = "select * from course where id = '{$_GET["id"]}'   limit 0,1";
$fAllLesson = PDO_FetchAll($query);
echo json_encode($fAllLesson, JSON_UNESCAPED_UNICODE);

?>