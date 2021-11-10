"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArtistProfile = exports.getArtistProfiles = exports.updateArtistProfile = exports.createArtistProfile = void 0;
var artists_1 = require("../types/artists");
var pool_1 = __importDefault(require("../postgres/pool"));
function createArtistProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, wallet_address, name, bio, socials, collection, stringSocials, query, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, wallet_address = _a.wallet_address, name = _a.name, bio = _a.bio, socials = _a.socials, collection = _a.collection;
                    stringSocials = JSON.stringify(socials) //Must stringify an array of objects
                    ;
                    query = {
                        text: "\n\t\t\tINSERT INTO artist_profile (\n\t\t\t\twallet_address,\n\t\t\t\tname,\n\t\t\t\tbio,\n\t\t\t\tsocials,\n\t\t\t\tcollection\n\t\t\t)\n\t\t\tVALUES($1, $2, $3, $4, $5)\n\t\t\tRETURNING *;\n\t\t",
                        values: [wallet_address, name, bio, stringSocials, collection]
                    };
                    return [4 /*yield*/, pool_1.default.query(query)
                            .then(function (res) { return res.rows[0]; })
                            .catch(function (error) { return console.log(error); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, res.json(response)];
            }
        });
    });
}
exports.createArtistProfile = createArtistProfile;
function updateArtistProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, wallet_address, name, bio, socials, collection, id, stringSocials, query, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, wallet_address = _a.wallet_address, name = _a.name, bio = _a.bio, socials = _a.socials, collection = _a.collection, id = _a.id;
                    stringSocials = JSON.stringify(socials) //Must stringify an array of objects
                    ;
                    query = {
                        text: "\n\t\t\tUPDATE artist_profile\n\t\t\tSET\n\t\t\t\twallet_address = $1,\n\t\t\t\tname = $2,\n\t\t\t\tbio = $3,\n\t\t\t\tsocials = $4,\n\t\t\t\tcollection = $5\n\t\t\tWHERE id = $6\n\t\t\tRETURNING *\n\t\t",
                        values: [wallet_address, name, bio, stringSocials, collection, id]
                    };
                    return [4 /*yield*/, pool_1.default.query(query)
                            .then(function (res) { return res.rows[0]; })
                            .catch(function (error) { return console.log(error); })];
                case 1:
                    response = _b.sent();
                    return [2 /*return*/, res.json(response)];
            }
        });
    });
}
exports.updateArtistProfile = updateArtistProfile;
function getArtistProfiles(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        function getQuery() {
            switch (filter) {
                case artists_1.ArtistFilter.pastFeatured: {
                    return "\n\t\t\t\t\tSELECT\n\t\t\t\t\t\tfa.*,\n\t\t\t\t\t\tap.*,\n\t\t\t\t\t\tjson_agg(n.*) AS collection\n\t\t\t\t\tFROM\n\t\t\t\t\t\tFeaturedArtist fa\n\t\t\t\t\t\tLEFT JOIN artist_profile ap ON fa.wallet_address = ap.wallet_address\n\t\t\t\t\t\tLEFT JOIN nft n ON n.id = ap.collection[1]\n\t\t\t\t\tWHERE\n\t\t\t\t\t\tname LIKE $1\n\t\t\t\t\tORDER BY " + sortChecked + "\n\t\t\t\t\tLIMIT $2\n\t\t\t\t\tOFFSET $3\n\t\t\t\t";
                }
                default: {
                    return "\n\t\t\t\t\tSELECT\n\t\t\t\t\t\tap.*,\n\t\t\t\t\t\tjson_agg(n.*) AS collection\n\t\t\t\t\tFROM\n\t\t\t\t\t\tartist_profile ap\n\t\t\t\t\t\tLEFT JOIN nft n ON n.id = ap.collection[1]\n\t\t\t\t\tWHERE\n\t\t\t\t\t\tname LIKE $1\n\t\t\t\t\tORDER BY " + sortChecked + "\n\t\t\t\t\tLIMIT $2\n\t\t\t\t\tOFFSET $3\n\t\t\t\t";
                }
            }
        }
        var _a, _b, limit, _c, page, sorting, _d, filter, _e, search, offset, sortChecked, query, response;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = req.body, _b = _a.limit, limit = _b === void 0 ? 20 : _b, _c = _a.page, page = _c === void 0 ? 1 : _c, sorting = _a.sorting, _d = _a.filter, filter = _d === void 0 ? null : _d, _e = _a.search, search = _e === void 0 ? "" : _e;
                    offset = (page - 1) * limit;
                    sortChecked = Object.values(artists_1.ArtistSorting).includes(sorting)
                        ? sorting
                        : artists_1.ArtistSorting.Random;
                    query = {
                        text: getQuery(),
                        values: ["%" + search + "%", limit, offset]
                    };
                    return [4 /*yield*/, pool_1.default.query(query)
                            .then(function (res) { return res.rows; })
                            .catch(function (error) { return console.log(error); })];
                case 1:
                    response = _f.sent();
                    return [2 /*return*/, res.json(response)];
            }
        });
    });
}
exports.getArtistProfiles = getArtistProfiles;
function getArtistProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, query, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    query = {
                        text: "\n\t\t\tSELECT\n\t\t\t\tap.*,\n\t\t\t\tjson_agg(n.*) AS collection\n\t\t\tFROM\n\t\t\t\tartist_profile ap\n\t\t\t\tLEFT JOIN nft n ON n.id = ANY (ap.collection)\n\t\t\tWHERE id = $1\n\t\t",
                        values: [id]
                    };
                    return [4 /*yield*/, pool_1.default.query(query)
                            .then(function (res) { return res.rows[0]; })
                            .catch(function (error) { return console.log(error); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, res.json(response)];
            }
        });
    });
}
exports.getArtistProfile = getArtistProfile;
//# sourceMappingURL=artists.js.map