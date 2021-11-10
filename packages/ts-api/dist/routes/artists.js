"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var artists_1 = require("../handlers/artists");
var router = express_1.default.Router();
router.post('/profile', artists_1.createArtistProfile);
router.put('/profile', artists_1.updateArtistProfile);
router.get('/profile/:id', artists_1.getArtistProfile);
router.get('/profiles', artists_1.getArtistProfiles);
exports.default = router;
//# sourceMappingURL=artists.js.map