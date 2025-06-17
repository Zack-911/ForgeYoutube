"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const generateMDFunctions_1 = require("./generateMDFunctions");
const fs_1 = __importDefault(require("fs"));
const constants_1 = require("./constants");
(0, forgescript_1.generateMetadata)(__dirname + "/functions", "functions", constants_1.ForgeYoutubeEventManagerName, undefined, undefined, __dirname + "/events");
const docs = (0, generateMDFunctions_1.generateDocsFromMetadata)("./metadata/functions.json");
fs_1.default.writeFileSync("./metadata/functions.md", docs);
//# sourceMappingURL=docgen.js.map