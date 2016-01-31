#!/bin/bash
# Copyright 2015 Niall Frederick Weedon
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# # You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
set -e

# Install Haxe 3.2
curl http://haxe.org/website-content/downloads/3.2.0/downloads/haxe-3.2.0-linux64.tar.gz > haxe.tar.gz
tar -xzf haxe.tar.gz -C ~
chmod +x ~/haxe-3.2.0/haxe

export HAXE_STD_PATH=~/haxe-3.2.0/std
export HAXE_HOME=~/haxe-3.2.0
export PATH=${PATH}:${HAXE_HOME}

# Install Haxe and npm dependencies
haxelib install hxdecorate
npm install mocha -g

# Retrieve Angular 2.0.0-beta.0 ES5 libraries
mkdir -p ${TRAVIS_BUILD_DIR}/bin/lib
cd ${TRAVIS_BUILD_DIR}/bin/lib

curl https://code.angularjs.org/2.0.0-beta.0/Rx.umd.js
curl https://code.angularjs.org/2.0.0-beta.0/angular2-all.umd.dev.js
curl https://code.angularjs.org/2.0.0-beta.0/angular2-polyfills.js
