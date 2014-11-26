#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


node_modules="${DIR}/../node_modules"

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

clean=0
force=0
verbose=0


MD5=$(which md5 md5sum  2> /dev/null | head -1)

hashFunction="${MD5} package.json"
dependencyHashFile=".dependency_hash"

while getopts ":cfv" opt; do
  case $opt in
    c)
      clean=1
    ;;
    f)
      force=1
    ;;
    v)
      echo -e "${LCYAN}Verbose mode ${RESTORE}" >&2
      verbose=1
    ;;
    \?)
      echo -e "Invalid option: -$OPTARG" >&2
    ;;
  esac
done

function npm_exec(){
  PATH=$(npm bin):$PATH $*
}


function set_params(){
  # https://www.npmjs.org/doc/misc/npm-config.html
  npm_params=""
  if [ $verbose -eq 1 ]; then
    npm_params="${npm_params} --loglevel info"
  else
    npm_params="${npm_params} --loglevel error"
  fi
}

function npm_build(){
  echo -e "${LYELLOW} ==> Installing NPM dependencies...${RESTORE}" >&2
  npm install $npm_params >&2
  npm update $npm_params >&2
}

function store_checksum(){
  hash=`$hashFunction > $dependencyHashFile`
}

function clean_environment(){
  echo -e "${LCYAN}Cleaning environment ${RESTORE}" >&2

  echo -e "${LRED}Cleaning previously installed node modules...${RESTORE}" >&2
  npm cache clean
  rm -rf $node_modules
}

# Checks hash of dependency files against previously stored hash from last
# install to determine whether a (re)-install is necessary.
# Only works properly if this script is used consistently so mainly
# meant for CI environments.
# (Similar to deps-ok node package but couldn't get that to work properly with
# packages that pointed to custom git repositories).
function install_if_different_from_last_install(){
  if [ $force -eq 1 ]; then
    echo "Cleaning dependency hash file..."
    rm $dependencyHashFile
  fi

  hash=`$hashFunction`
  lastHash=`cat $dependencyHashFile`

  if [ "$lastHash" == "$hash" ]; then
    echo -e "${LYELLOW}No differences, aborting.${RESTORE}"
  else
    echo -e "${LYELLOW}Found differences, (re-)installing dependencies.${RESTORE}"

    if [ $clean -eq 1 ]; then
      clean_environment
    fi

    set_params
    npm_build
    store_checksum
  fi
}

install_if_different_from_last_install
