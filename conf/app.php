<?php

/**
 * It takes an image and a url and returns the name of the image.
 * 
 * @param img The image file that you want to upload.
 * @param url The URL of the folder where you want to upload the image.
 * 
 * @return The name of the file that was uploaded.
 */
function uploadImg($img, $url)
{
    $name_phone = $img['name'];
    if (empty($img)) {
        $newName = "1.png";
    } else {
        $tmp_name = $img['tmp_name'];
        list($base, $ext)  = explode('.', $name_phone);
        $newName = implode('.', [time(), $ext]);
        try {
            move_uploaded_file($tmp_name, $url . $newName);
        } catch (Exception  $e) {
            echo $e;
        }
    }

    return $newName;
}

/**
 * It takes an array of images, uploads them to a specified directory, and returns a string of the
 * image names separated by commas.
 * 
 * @param arrImg The array of images that you want to upload.
 * @param url The URL of the folder where you want to upload the image.
 */
function  uploadImgMultiple($arrImg, $url)
{
    $arrNameImg  = $arrImg['name'];
    $newArrNameImg = array();

    if (empty($arrNameImg)) {

        $newArrNameImg  = "[]";

    } else {
        
        for ($i = 0; $i < count($arrNameImg); $i++) {

            $tmp_name = $arrImg['tmp_name'][$i];
            list($base, $ext)  = explode('.', $arrNameImg[$i]);

            $ran =  mt_rand();

            $newName = implode('.', [time() . "_" . $ran, $ext]);
            try {
                move_uploaded_file($tmp_name, $url . $newName);

                $newArrNameImg[] = $newName;
            } catch (Exception  $e) {
                echo $e;
            }
        }

        $arrImplodeNameImg  = implode(",", $newArrNameImg);
    }

    return $arrImplodeNameImg;
}
