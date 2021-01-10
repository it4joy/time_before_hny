<?php

define('LEAP_YEAR', 366);
define('NON_LEAP_YEAR', 365);

$num_of_days_per_year = NON_LEAP_YEAR;

// leap year definition
/*
N: 

The following conditions must be executed:
- a year whose number is a multiple of 400;
- years whose number is a multiple of 4
(src: ru.wikipedia.org)

Q: should I follow the logic of predicate and return boolean val?
*/
function isYearLeap($year) {
    if ( ($year % 400 == 0) || ($year % 4 == 0) ) {
        $num_of_days_per_year = LEAP_YEAR;
    }
}

function getTime() {
    global $num_of_days_per_year;

    $cur_time = getdate();
    $cur_year = $cur_time['year'];
    $ordinal_num_of_day = $cur_time['yday'] + 1; // from 0, so '+ 1'

    isYearLeap($cur_year);

    $diff = $num_of_days_per_year - $ordinal_num_of_day;

    return $diff;
}