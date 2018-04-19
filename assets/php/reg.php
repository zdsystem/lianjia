<?php 

$phone = $_GET['phone'];

$arr = ['13333613468', '13333612880', '155565760993', '18938202889'];

if(in_array($phone, $arr)){
	echo  '{"success": 1, "more":"该手机号已被注册"}' ;
} else {
	echo '{"success": 0}';
}