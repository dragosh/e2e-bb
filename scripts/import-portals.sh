#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"
FILE_PATH=$( echo "$DIR" | sed 's/ /\\ /g' )
IMPORTER="./scripts/importer.jar"
function importarchive {
    echo "-- START Importing ${1}"
    java -jar "${IMPORTER}" -m importarchive -u sys2sys -p sys2sys -s http://launchpad:8180/orchestrator -a "${1}"
    echo "-- END Importing---"
}


#importarchive imports/my-test-portal.zip

