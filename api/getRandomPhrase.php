<?php

// src: https://blogs.transparent.com/english/25-english-expressions-about-time/
$dictionary = array(
    'Time flies',
    'To kill time',
    'A waste of time',
    'Time is money',
    'No time to lose',
    'Crunch time',
    'Time is of the essence',
    'High time',
    'Stand the test of time',
    'In the right place at the right time',
    'In the wrong place at the wrong time',
    'From time to time',
    'Catch someone at the wrong time',
    'Long time no see',
    'Too much time on one\'s hands',
    'There\'s no time like the present',
    'In the nick of time',
    'Only time will tell',
    'To hit the big time',
    'For the time being',
    'Third time\'s the charm',
    'A whale of a time',
    'Time heals all wounds',
);

function getRandomPhrase() {
    global $dictionary;
    
    $last_arr_index = count($dictionary) - 1;
    $random_index = rand(0, $last_arr_index);
    
    return $dictionary[$random_index];
}