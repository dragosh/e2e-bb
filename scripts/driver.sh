#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

MODULES_DIR="${DIR}/../node_modules"
OPTIONS="$*"

# colors for output
RESTORE='\033[0m'

RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\033[00;33m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'
LIGHTGRAY='\033[00;37m'

LRED='\033[01;31m'
LGREEN='\033[01;32m'
LYELLOW='\033[01;33m'
LBLUE='\033[01;34m'
LPURPLE='\033[01;35m'
LCYAN='\033[01;36m'
WHITE='\033[01;37m'


function run_gulp(){
    #nm_bin
    run_cmd="${MODULES_DIR}/.bin/gulp ${OPTIONS}"
    echo "${GREEN} Running task with command ==> ${LYELLOW} ${run_cmd}" >&2
    eval $run_cmd
}

run_gulp

