"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var fs_1 = __importDefault(require("fs"));
//Check out the docs here:
//https://node-postgres.com/
var _a = process.env, PG_PORT = _a.PG_PORT, PG_USER = _a.PG_USER, PG_HOST = _a.PG_HOST, PG_PASSWORD = _a.PG_PASSWORD;
var pool = new pg_1.Pool({
    user: PG_USER,
    host: PG_HOST,
    database: 'postgres',
    password: PG_PASSWORD,
    port: Number(PG_PORT),
    ssl: {
        ca: fs_1.default.readFileSync('../../ca.pem')
    }
});
pool.on('error', function (err, client) {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
//Check out these docs for <pool.query> vs <client = await pool.connect -> client.query>
//TLDR: don't use the shortcut pool.query for transactions
//https://node-postgres.com/api/pool
exports.default = {
    query: function (query) { return pool.query(query); }
};
//# sourceMappingURL=pool.js.map