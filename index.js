const fs = require('fs');
const path = require('path');
const onHeaders = require('on-headers');
const validate = require('./helpers/validate');
const onHeadersListener = require('./helpers/on-headers-listener');
const socketIoInit = require('./helpers/socket-io-init');

const middlewareWrapper = (config) => {
  config = validate(config);

  const renderedHtml =
    fs.readFileSync(path.join(__dirname, '/index.html'))
      .toString()
      .replace(/{{title}}/g, config.title)
      .replace(/{{script}}/g, fs.readFileSync(path.join(__dirname, '/app.js')))
      .replace(/{{style}}/g, fs.readFileSync(path.join(__dirname, '/style.css')));

  return ({ req, rawRes }, next) => {
    socketIoInit(req.socket.server, config.spans);

    const startTime = process.hrtime();
    if (req.path === config.path) {
      rawRes.end(renderedHtml)
    } else {
      onHeaders(rawRes, () => { onHeadersListener(rawRes.statusCode, startTime, config.spans) });
      return next();
    }
  };
};

module.exports = middlewareWrapper;
