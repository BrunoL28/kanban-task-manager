#!/usr/bin/env node
/* eslint-disable no-undef */

/**
 * Module dependencies.
 */

const app = require("../app");
const debug = require("debug")("server:server");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const mongoDBConnectionString = process.env.MONGODB_URI || process.env.MONGODB_URL;

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log(`MongoDB conectado em ${mongoDBConnectionString}`);
    
    // Inicia o servidor aqui, apenas uma vez
    server.listen(port, '0.0.0.0', () => {
        console.log(`Backend rodando na porta ${port}`);
    });

    server.on("error", onError);
    server.on("listening", onListening);
})
.catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) return val;  // named pipe
    if (port >= 0) return port;   // port number
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requer privilégios elevados`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug(`Ouvindo em ${bind}`);
}