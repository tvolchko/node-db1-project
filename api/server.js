const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.use((error, req, res, next) => {
    console.log(error.status)
    res.status(error.status || 500).json({
      message: 'Catastrophic error!',
      originalMessage: error.message,
    })
  })

module.exports = server;
