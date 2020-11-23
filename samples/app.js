// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START trace_setup_nodejs_app]
if (process.env.NODE_ENV === 'production') {
  // [START trace_setup_nodejs_implicit]
  // eslint-disable-next-line node/no-missing-require
  require('@google-cloud/trace-agent').start();
  // [END trace_setup_nodejs_implicit]
}

const express = require('express');
const got = require('got');

const app = express();
const DISCOVERY_URL = 'https://www.googleapis.com/discovery/v1/apis';

// This incoming HTTP request should be captured by Trace
app.get('/', async (req, res) => {
  // This outgoing HTTP request should be captured by Trace
  try {
    const {body} = await got(DISCOVERY_URL, {responseType: 'json'});
    const names = body.items.map(item => item.name);
    res.status(200).send(names.join('\n')).end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END trace_setup_nodejs_app]
