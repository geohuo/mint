<?php
require_once __DIR__."/../../app/config.php";

define("_PG_DB_PALI_SENTENCE_SIM_", _DB_ENGIN_.":host="._DB_HOST_.";port="._DB_PORT_.";dbname="._DB_NAME_.";user="._DB_USERNAME_.";password="._DB_PASSWORD_.";");
define("_PG_TABLE_SENT_SIM_", "sent_sims");
define("_PG_TABLE_SENT_SIM_INDEX_", "sent_sim_indexs");

$dest_db = _PG_DB_PALI_SENTENCE_SIM_;#目标数据库
$dest_table = _PG_TABLE_SENT_SIM_INDEX_;#目标表名

echo "migarate sent_sim_index".PHP_EOL;


#打开目标数据库
$PDO_DEST = new PDO($dest_db,_DB_USERNAME_,_DB_PASSWORD_,array(PDO::ATTR_PERSISTENT=>true));
$PDO_DEST->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
echo "open dest".PHP_EOL;

#删除目标表中所有数据
fwrite(STDOUT,"deleting date".PHP_EOL) ;
try{
	$query = "DELETE FROM ".$dest_table;
	$stmt = $PDO_DEST->prepare($query);
	$stmt->execute();
}catch(PDOException $e){
	fwrite(STDERR,"error:".$e->getMessage());
	exit;
}
fwrite(STDOUT,"deleted date".PHP_EOL) ;

#插入数据
$query = "INSERT INTO ".$dest_table." (sent_id, count ) SELECT sent1,count(*) FROM "._PG_TABLE_SENT_SIM_." group by sent1;";
try{
	$stmt = $PDO_DEST->prepare($query);
	$stmt->execute();
}catch(PDOException $e){
	fwrite(STDERR,"error:".$e->getMessage());
	exit;
}
echo "insert dest".PHP_EOL;

echo "done".PHP_EOL;





