<?php

use FTP\Connection;

include_once '../conf/conexion.php';



class Index extends Conections
{

    public $sql;
    public $paramers = array();

    /**
     * It returns all the marks from the database.
     * 
     * @return An array of objects.
     */
    public function getMarks()
    {

        $this->sql = "SELECT * FROM marks WHERE status_mark = '1'";
        $this->paramers = array();
        $resp = Conections::runSql($this->sql, $this->paramers);
        return $resp;
    }

    /**
     * It returns a list of models from the database.
     * 
     * @return An array of objects.
     */
    public function getModel($data)
    {
        $this->sql = "SELECT * FROM models WHERE mark_id = :mark AND  status_model = '1'";
        $this->paramers = $data;
        $resp = Conections::runSql($this->sql, $this->paramers);
        return $resp;
    }
    /**
     * It returns the result of a query.
     * 
     * @return An array of objects.
     */
    public function getLineProduct($data)
    {

        $this->sql = "SELECT * FROM product_line WHERE model_id = :model AND  status_product_line = '1'";
        $this->paramers = $data;
        $resp = Conections::runSql($this->sql, $this->paramers);
        return $resp;
    }

    /**
     * It gets the articles data from the database
     * 
     * @param data Array ( [mark] => 1 [model] => 1 [product] => 1 )
     * 
     * @return An array of arrays.
     */
    public function getArticlesData($data)
    {
        if (array_key_exists(":value_id", $data)) {

              $where  = " detail_article = :value_id";
        }else {
             
              $where = " product_line_id = :product";
         }
            
        $this->sql = "SELECT * FROM articles WHERE $where AND status_article = '1' ";
        $this->paramers = $data;
        $resp = Conections::runSql($this->sql, $this->paramers);
        return $resp;
    }

    /**
     * It returns a list of articles that match the input value.
     * 
     * @param value_input the value of the input field
     * 
     * @return An array of arrays.
     */
    public function getNameListArticle($value_input)
    {
        $this->sql = "SELECT id_article , detail_article FROM articles WHERE detail_article ILIKE '%$value_input%'";
        $this->paramers = array();
        $rps = Conections::runSql($this->sql, $this->paramers);
        return $rps;
    }

    /**
     * It returns the id_article and detail_article from the articles table where the code_article
     * column is like the value_input parameter.
     * 
     * @param value_input the value of the input field
     * 
     * @return An array of arrays.
     */
    public function getNameListCode($value_input)
    {

        $this->sql = "SELECT id_article , detail_article FROM articles WHERE code_article::varchar ILIKE '%$value_input%'";
        $this->paramers = array();
        $rps = Conections::runSql($this->sql, $this->paramers);
        return $rps;
    }

    /**
     * Get all the publications that have the status of 1
     * 
     * @return The result of the query.
     */
    public  function getListPublications($local_publications)
    {
        $this->sql = "SELECT id_publication, title_publication, description_publication, date_publication, location_publication, img_publication
                 FROM  publications  WHERE location_publication = '$local_publications'  AND status_publication =  '1'";
        $this->paramers = array();

        $rps = Conections::runSql($this->sql, $this->paramers);
        return $rps;
    }

  /**
   * It returns the last 6 models that have been added to the database.
   * 
   * @return An array of arrays.
   */
    public function getListNewModels()
    {
        $this->sql = "SELECT * FROM models WHERE status_model  = '1' ORDER BY 1 DESC LIMIT 6";
        $this->paramers = array();
        $rps  = Conections::runSql($this->sql, $this->paramers);
        return $rps;
    }

    // public function setCartArticle($data)
    // {
    //     $this->sql = "";
    //     $this->paramers = $data
    //     $rps = Conections::runSql($this->sql, $this->paramers);
    //     return $rps;
    // }

}
