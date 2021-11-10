"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOCIAL_NAMES = exports.ArtistFilter = exports.ArtistSorting = void 0;
var ArtistSorting;
(function (ArtistSorting) {
    ArtistSorting["OldestMember"] = "id";
    ArtistSorting["NewestMember"] = "id DESC";
    ArtistSorting["AZ"] = "name";
    ArtistSorting["ZA"] = "name DESC";
    ArtistSorting["Random"] = "RANDOM ()";
    ArtistSorting["OldestFeatured"] = "start_date";
    ArtistSorting["NewestFeatured"] = "start_date DESC";
})(ArtistSorting = exports.ArtistSorting || (exports.ArtistSorting = {}));
var ArtistFilter;
(function (ArtistFilter) {
    ArtistFilter[ArtistFilter["pastFeatured"] = 0] = "pastFeatured";
})(ArtistFilter = exports.ArtistFilter || (exports.ArtistFilter = {}));
var SOCIAL_NAMES;
(function (SOCIAL_NAMES) {
    SOCIAL_NAMES["FACEBOOK"] = "facebook";
    SOCIAL_NAMES["TWITTER"] = "twitter";
    SOCIAL_NAMES["INSTAGRAM"] = "instagram";
})(SOCIAL_NAMES = exports.SOCIAL_NAMES || (exports.SOCIAL_NAMES = {}));
;
//# sourceMappingURL=artists.js.map