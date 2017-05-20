// Copyright (c) 2017 The Absolute Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');
const httpsServer = require('./https_server/https_server');
const redirectServer = require('./https_server/redirect_server');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));

httpsServer.run(app, config.serverInfo);
redirectServer.runForHttps(config.serverInfo);
