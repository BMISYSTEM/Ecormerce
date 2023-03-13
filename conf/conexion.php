<?php
require_once 'globals.php'; //globals of conections
class Conections
{
     private  $conne;
     private  $hosName = HOSTNAME;
     private  $dbName = DBNAME;
     private  $userName = USERNAME;
     private  $password  = PASSWORD;
     /*
     [function for connect postgres]
     @return $conne  
     */
     public function __construct()
     {
          $this->hosName = HOSTNAME;
          $this->dbName = DBNAME;
          $this->userName = USERNAME;
          $this->password  = PASSWORD;
          try {
               $this->conne =  new PDO("pgsql: host= $this->hosName; dbname= $this->dbName ; user= $this->userName ; password= $this->password");
               // echo "conections successfully";
          } catch (PDOException $exp) {
               echo "conections failed  " . $exp;
          }
     }
     /* 
     [fucntions for run plain sql]
     @param string $sql
     @param int $imp
     @return array $fectData
     */
     public function runSql($sql = "", $paramers , $imp = 0  )
     {
          echo ($imp) ? "<pre>" . $sql : ""; // 1 for prinr sql
          $rps  = $this->conne->prepare($sql);
          $rps->execute($paramers);
          $fectData = $rps->fetchAll(PDO::FETCH_ASSOC);
          return $fectData;
     }
     /*
     [fucntions to execute a query and return status]
     @param string $sql
     $param array of parameters;
     @param int $imp
     @return array $dataStatus
     */
     public function runQueryReturnStatus($sql = "", $paramers, $imp = 0)
     {
          echo ($imp) ? "<pre>" . $sql : ""; // 1 for prinr sql

          $rps = $this->conne->prepare($sql);
          $dataStatus = $rps->execute($paramers);
          return $dataStatus;
     }

     /*
      [function to execute sentences inserted and return last inserted]
      @param string $sql
      @param array $parameters
      @param int $imp
      @return array $fectData
      */
     public function runQueryReturnLastInserted($sql = "", $paramers, $imp = 0)
     {
          echo ($imp) ? "<pre>" . $sql : ""; // 1 for prinr sql

          $rps = $this->conne->prepare($sql);
          $rps->execute($paramers);
          $returnId = $this->conne->lastInsertId();
          return $returnId;
     }
}


// $con = new Conections();
// $name_city  = "Bogota";
// $code_city = 234;
// $conres = $con->runQueryReturnLastInserted("INSERT INTO city(name_city , code_city) VALUES( ? , ?)", [ $name_city , $code_city],  0);
// print_r($conres);
