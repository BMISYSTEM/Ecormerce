<?php

use Doctrine\Common\Annotations\Annotation\Required;


include_once '../models/Index.php';
$process  = new Index();
/* Checking if the variable `['accion']` is set, if it is, it will assign it to ``, if
not, it will assign an empty string to ``. */
$accion = (isset($_POST['accion'])) ? $_POST['accion'] : "";
switch ($accion) {

    case 'get_marks':
        get_marks();
        break;
    case 'get_model':
        get_model();
        break;
    case 'get_line_product':
        get_line_product();
        break;
    case 'get_articles_data':
        get_articles_data();
        break;
    case 'get_name_list_article':
        get_name_list_article();
        break;
    case 'get_name_list_code':
        get_name_list_code();
        break;
    case 'get_list_publications':
        get_list_publications();
        break;
    case 'get_list_new_models':
        get_list_new_models();
        break;
    case 'set_cart_article':
        // set_cart_article();
        break; 
     
}

/**
 * It gets the marks from the database and returns them as a JSON object.
 */

function get_marks()
{

    global $process;
    $rps = $process->getMarks();
    echo json_encode($rps);
}
/**
 * It gets the model from the process.
 */

function get_model()
{
    global $process;
    $id_mark  = $_POST['id_mark'];
    $rps = $process->getModel([":mark" => $id_mark]);
    echo json_encode($rps);
}

/**
 * It gets a list of products from the database and returns it as a JSON object.
 */
function get_line_product()
{
    global $process;
    $id_model = $_POST['id_model'];
    $rps = $process->getLineProduct([":model" => $id_model]);
    echo json_encode($rps);
}

/**
 * It gets the data from the database and returns it as a JSON object.
 */
function  get_articles_data()
{

    global $process;

    $id_product_line = (isset($_POST['id_product_line'])) ? $_POST['id_product_line'] : "";
    $value_search_id = (isset($_POST['value_search_id'])) ? $_POST['value_search_id'] : "";
    $accion_search = (isset($_POST['accion_search'])) ? $_POST['accion_search'] : "";
    $id_model = (isset($_POST['id_model'])) ? $_POST['id_model'] : "";

    if (!empty($value_search_id)) {

        $data = [":value_id" => $value_search_id];

        
    }else {

        $data = [":product" => $id_product_line];
    }
    $rps = $process->getArticlesData($data, $accion_search);

    echo json_encode($rps);
}
/**
 * It takes a value from a form, passes it to a function in a class, and returns the result as JSON.
 */
function get_name_list_article()
{
    global $process;
    $value_input  = $_POST['vale_input'];
    $rps = $process->getNameListArticle($value_input);
    echo json_encode($rps);
}

/**
 * It takes a value from a form, passes it to a function in a class, and returns the result as JSON.
 */
function get_name_list_code()
{
    global $process;
    $value_input  = $_POST['vale_input'];
    $rps = $process->getNameListCode($value_input);
    echo json_encode($rps);
}


/**
 * It gets a list of new models from the database and returns it as a JSON object.
 */
function get_list_publications()
{
    global $process;

    $local_publications = $_POST['local_publications'];
    $rps = $process->getListPublications($local_publications);
    echo json_encode($rps);
}

/**
 * It gets a list of new models from the database and returns it as a JSON object.
 */
function get_list_new_models()
{
    global $process;
    $rps  = $process->getListNewModels();
    echo json_encode($rps);
}
// function set_cart_article(){
//     global $process;
//     $rps  = $process->setCartArticle([]);
// }