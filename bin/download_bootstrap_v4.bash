#!/bin/bash
DIR_JS="public/assets/js"
DIR_CSS="public/assets/css"

wget "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" -P "$DIR_CSS"
wget "https://code.jquery.com/jquery-3.2.1.slim.min.js" -P "$DIR_JS"
wget "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" -P "$DIR_JS"
wget "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" -P "$DIR_JS"
