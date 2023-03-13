<?php
     /*
      [function to valid data types]
      @param  $param  //value to validation
      @param $typeParam  //data type to validate 
      @return data corresponding
     */
     function  filterValidate($param, $typeParam)
    {
        $opciones = array(
            'options' => array(
                'default' => 3, // valor a retornar si el filtro falla
                // más opciones aquí
                'min_range' => 0
            ),
            'flags' => FILTER_FLAG_ALLOW_OCTAL,
        );
        switch ($typeParam) {
            case 'email':
                return filter_var($param, FILTER_SANITIZE_EMAIL);
                break;
            case 'numero_int':
                return filter_var($param, FILTER_SANITIZE_NUMBER_INT);
                break;
            case 'numero_flotante':
                return filter_var($param, FILTER_FLAG_NO_ENCODE_QUOTES);
                break;
            case 'caracteres_especiales':
                return filter_var($param, FILTER_SANITIZE_SPECIAL_CHARS );
                break;
            case 'string':
                return filter_var($param, FILTER_SANITIZE_STRING );
                break;
            case 'url':
                return filter_var($param, FILTER_SANITIZE_URL);
                break;
        }
        
    }

