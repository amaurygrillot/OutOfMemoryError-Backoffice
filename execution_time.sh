#!/bin/bash
ts=$(date +%s%N);
$@;
tt=$(($(date +%s%N) - $ts));
echo "scale  = 4; $tt / 1000000000" | bc -l;
