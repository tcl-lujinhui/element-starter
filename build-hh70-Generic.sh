#!/bin/sh
function _Exec()
{
  eval "$1" || { echo "Error:###############Exec Error: ""$1";read -p "Press any key to exit.";exit 0; }
}

_Exec "svn update"
_Exec "node build.js HH70/Generic"
_Exec "rm -rf www"
_Exec "mkdir www"
_Exec "cp -rf dist www/"
_Exec "cp -rf cfgbak www/"
_Exec "cp -rf index.html www/"
_Exec "cp -rf default.html www/"
_Exec "rm -r index.html"
_Exec "rm -rf cfgbak"
_Exec "rm -rf dist"
_Exec "rm -rf webrc"
_Exec "svn update ../SmartSwReleaseUI/ElementUI/www"
_Exec "cp -rf www/** ../SmartSwReleaseUI/ElementUI/www"