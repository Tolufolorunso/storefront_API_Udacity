"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CustomError = exports.globalErrorHandler = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(status, message) {
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.message = message;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalErrorHandler(error, req, res, _next) {
    // console.log(15, error.status, error.message);
    var status = error.status || 500;
    var message = error.message || 'something went wrong';
    res.status(status).json({
        status: false,
        message: message
    });
}
exports.globalErrorHandler = globalErrorHandler;
