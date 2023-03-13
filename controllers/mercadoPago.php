<?php

Require '../conf/globals.php';
//---------------------------------------------------------------------------------------------
require __DIR__ .  '../../vendor/autoload.php';
// Agrega credenciales
MercadoPago\SDK::setAccessToken(ACCES_TOKEN);
// Crea un objeto de preferencia
//-----------------------------------------------------------------------------------------------
$productos = array();

$accion = (isset($_POST['accion'])) ? $_POST['accion'] : "";

         // (isset($_POST['id_product_line'])) ? $_POST['id_product_line'] : "";
    $title = (isset($_POST['title'])) ? $_POST['title'] : "";
    $quantity =  (isset($_POST['quantity'])) ? $_POST['quantity'] : "";
    $unit_price =  (isset($_POST['unit_price'])) ? $_POST['unit_price'] : "";
    // $rps = "hola";
    $item = new MercadoPago\item();
    $item->title        =$title;
    $item->quantity     =$quantity;
    $item->unit_price   =$unit_price;
    array_push($productos,$item);
    unset($item);
    $preference = new MercadoPago\Preference();
    // $preference->back_urls = array(
    //     "succes" => "rutas"; 
    //     
    // );
    // $preference->auto_retun =  "approved";
    // $prefrenece->binary_mode = true //aprobacion inmediata 
    $preference->items =$productos;
    $preference->return = 'approved';
    $preference->binary_mode = true;
    $preference->save();

    echo json_encode($preference->id);

         

// //arreglo vacio para llenarlo con el id
// function objecto_car(){
//     // (isset($_POST['id_product_line'])) ? $_POST['id_product_line'] : "";
//     $title = (isset($_POST['title'])) ? $_POST['title'] : "";
//     $quantity =  (isset($_POST['quantity'])) ? $_POST['quantity'] : "";
//     $unit_price =  (isset($_POST['unit_price'])) ? $_POST['unit_price'] : "";
//     // $rps = "hola";
//     $item = new MercadoPago\item();
//     $item->title        =$title;
//     $item->quantity     =$quantity;
//     $item->unit_price   =$unit_price;
//     // array_push($productos,$item);
//     $preference = new MercadoPago\Preference();
//     array_push($GLOBALS['productos'],$item);
//     unset($item);

//     // $preference->back_urls = array(
//     //     "succes" => "rutas"; 
//     //     
//     // );
//     // $preference->auto_retun =  "approved";
//     // $prefrenece->binary_mode = true //aprobacion inmediata 
//     $preference->items = $GLOBALS['productos'];
//     $preference->return = 'approved';
//     $preference->binary_mode = true;
//     $preference->save();
//     // echo $preference->id;
//     echo json_encode($preference->id);
// }
