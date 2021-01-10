<?php

if ( count($_REQUEST) > 0 ) {
    $url = $_SERVER['REQUEST_URI'];

    $query_str = parse_url($url, PHP_URL_QUERY);

    $resp = array();

    if ( strpos($query_str, 'getTime') !== false ) {
        require_once 'getTime.php';

        $time = getTime();
        
        array_push($resp, $time);
    }
    
    if ( strpos($query_str, 'getRandomPhrase') !== false ) {
        require_once 'getRandomPhrase.php';

        $phrase = getRandomPhrase();

        array_push($resp, $phrase);
    }

    echo json_encode($resp);
}