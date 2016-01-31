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

# Install Haxe and npm dependencies
haxelib install hxdecorate

# Install Node.js 5.0.x
nvm install 5.0
npm install mocha -g
npm install

# Retrieve Angular 2.0.0-beta.0 ES5 libraries
LIBRARY_DIR=${TRAVIS_BUILD_DIR}/bin/lib/2.0.0-beta.0
mkdir -p ${LIBRARY_DIR}
cd ${LIBRARY_DIR}

wget https://code.angularjs.org/2.0.0-beta.0/Rx.umd.js
wget https://code.angularjs.org/2.0.0-beta.0/angular2-all.umd.dev.js
wget https://code.angularjs.org/2.0.0-beta.0/angular2-polyfills.js
