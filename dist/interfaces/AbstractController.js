"use strict";
exports.__esModule = true;
var AbstractController = /** @class */ (function () {
    function AbstractController(resourceName, dbDriver) {
        this.dbDriver = dbDriver;
        this.resourceName = resourceName;
    }
    AbstractController.prototype.findOneInDB = function (key, callback) {
        this.dbDriver.find(key, null, callback);
    };
    AbstractController.prototype.sendResponse = function (statusCode, headers, body, callback) {
        var response = {
            statusCode: statusCode,
            headers: headers,
            body: JSON.stringify(body)
        };
        callback(null, response);
    };
    AbstractController.prototype.defaultResponse = function (error, data, callback) {
        if (error) {
            console.error(error);
            this.sendResponse(501, { 'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }, { statusCode: 501,
                error: 'Couldn\'t conclude operation on ' + this.resourceName + ' table.'
            }, callback);
            return;
        }
        this.sendResponse(200, { 'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*' }, data, callback);
    };
    AbstractController.prototype.defaultInvalidDataResponse = function (callback) {
        this.sendResponse(501, { 'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }, { statusCode: 501,
            error: 'Operation blocked: Invalid data received.'
        }, callback);
    };
    AbstractController.prototype.getRequestParam = function (request, paramName) {
        if (request && request.pathParameters) {
            return request.pathParameters[paramName];
        }
        else {
            return null;
        }
    };
    return AbstractController;
}());
exports.AbstractController = AbstractController;
//# sourceMappingURL=AbstractController.js.map