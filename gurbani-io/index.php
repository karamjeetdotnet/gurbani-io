<?php


 $dirPath = "";
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dirPath));

 try

 {
     $memcached = new Memcached();
     $memcached->addServer("127.0.0.1", 11211); 
     //$response = $memcached->get("sample_key");
     //$memcached->delete("sample_key");
     $response = $memcached->getAllKeys();
     if($response==true) 
     {
        //echo $memcached->get($response[64]);
        // foreach ($response as $res) {

        //     echo $res;
        // }
        echo "<ol>";
foreach ($response as $res) {
    $memcached->delete($res);
    echo "<li>" .$res  . "</li>"; 
     }
     echo "</ol>";
     } 
 
     else
 
     {
        $filesArr = [];
     foreach ($rii as $file) {
    if ($file->isDir()){ 
        continue;
    }
    $key = str_replace($dirPath."/","",$file->getRealPath());
    $key = str_replace(".json","",$key);
    $key = str_replace("/","-",$key);
    list($groupName, $fileName) = explode("-", $key);
    if($fileName == ""){
        $fileName = $groupName;
        $groupName = "root";
    }
    $cachekey = str_replace(" ","_",$groupName)."_".$fileName;

    $json = '{}'; // Empty JSON object
$obj = json_decode($json); // Convert JSON to PHP object
$obj->groupName = $groupName; // Dynamically add properties
$obj->fileName = $fileName;
$obj->cacheKey = $cachekey;
$obj->absPath = $file->getRealPath();
$filesArr[] = $obj;
    //echo "<li>" .$key . "<br/>groupname:".$groupName."<br/>filename:".$fileName."<br/>cachekey:".$cachekey."</li>";     
    //echo "<li>" .$file->getRealPath() . "</li>";  
    //$fileContent = file_get_contents($file->getRealPath()); 

    //$memcached->set(str_replace("/","_",$key), $fileContent) ;
    //$files[] =  $file->getRealPath();    
}
array_multisort(array_column($filesArr, 'groupName'),  SORT_ASC,
                array_column($filesArr, 'fileName'), SORT_ASC,
                $filesArr);
//var_dump($filesArr);
echo "<ol>";
function generateRandomString($length = 10) {
    return substr(str_shuffle(str_repeat($x='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil($length/strlen($x)) )),1,$length);
}
foreach ($filesArr as $fileItem) {
    echo "<li>" .$fileItem->groupName . "-". $fileItem->fileName . "</li>"; 
    $fileContent = file_get_contents($fileItem->absPath); 

    $memcached->set(generateRandomString(35), $fileContent) ; 
     }
     echo "</ol>";
    }
 }
 catch (exception $e)
 {
 echo $e->getMessage();
 }
// phpinfo();
// // Using scandir()
// echo "--------------------------------<br>";
// echo "Method 1: Using scandir() <br>";
// echo "--------------------------------<br>";
// $files = scandir($dirPath);
// foreach ($files as $file) {
//     $filePath = $dirPath . '/' . $file;
//     if (is_file($filePath)) {
//         echo $file . "<br>";
//     }
// }
// 

//  echo "<ul>";
// /** @var SplFileInfo $file */


// echo "</ul>";
//echo sizeof($files)
//var_dump($files);

?>