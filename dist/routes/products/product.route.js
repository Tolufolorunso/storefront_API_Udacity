"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var product_controller_1 = require("./product.controller");
var productRoute = express_1["default"].Router();
productRoute.post('/', product_controller_1.createProduct);
productRoute.get('/', product_controller_1.getAllProducts);
exports["default"] = productRoute;
