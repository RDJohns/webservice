<?php

//$output = shell_exec("python C:\wamp64\www\progressus\data_maj.py");

exec('python3.7 data_maj.py');
	
//exec(" start C:\Users\an.ranaivoson\AppData\Local\Continuum\anaconda3\python.exe data_maj.py",$output);
//var_dump($output);

	
//exec("C:\WINDOWS\system32\cmd.exe",$output);
//exec('C:\WINDOWS\system32\cmd.exe C:\wamp64\www\progressus\test.bat', $output);
//print_r($output);
	
//echo $variable;
require("index-2.html");