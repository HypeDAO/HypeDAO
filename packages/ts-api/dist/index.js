"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // must be fired before handlers are imported
var index_1 = require("./handlers/index");
var artists_1 = __importDefault(require("./routes/artists"));
var app = (0, express_1.default)();
var port = process.env.PORT || '8000';
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', index_1.rootHandler);
app.use('/api/v1/artists', artists_1.default);
app.listen(port, function () {
    return console.log("Server is listening on " + port);
});
exports.default = app;
//# sourceMappingURL=index.js.map