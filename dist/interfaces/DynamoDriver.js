"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var uuid = require("uuid");
var DynamoDB = require("aws-sdk/clients/dynamodb");
var AbstractDriver_1 = require("./AbstractDriver");
var DynamoDriver = /** @class */ (function (_super) {
    __extends(DynamoDriver, _super);
    function DynamoDriver(tableName) {
        var _this = _super.call(this) || this;
        _this.db = new DynamoDB.DocumentClient();
        _this.tableName = tableName;
        return _this;
    }
    DynamoDriver.prototype.all = function (fields, callback) {
        if (fields === void 0) { fields = []; }
        var obj = {
            TableName: this.tableName
        };
        this.db.scan(obj, callback);
    };
    DynamoDriver.prototype.create = function (obj, callback) {
        var item = {
            TableName: this.tableName,
            Item: obj
        };
        item.Item.id = uuid.v4();
        item.Item.created_at = Math.floor(Date.now() / 1000);
        item.Item.updated_at = Math.floor(Date.now() / 1000);
        this.db.put(item, callback);
    };
    DynamoDriver.prototype.update = function (id, obj, callback) {
    };
    DynamoDriver.prototype["delete"] = function (id, callback) {
        var params = {
            TableName: this.tableName,
            Key: {
                id: id
            }
        };
        this.db["delete"](params, callback);
    };
    DynamoDriver.prototype.find = function (id, fields, callback) {
        if (fields === void 0) { fields = []; }
        var params = {
            TableName: this.tableName,
            Key: {
                id: id
            },
            AttributesToGet: fields,
            ExpressionAttributeValues: null,
            UpdateExpression: null,
            ReturnValues: null
        };
        this.db.get(params, callback);
    };
    DynamoDriver.prototype.findBy = function (field, value, fields, callback) {
        if (fields === void 0) { fields = []; }
        var params = {
            TableName: this.tableName,
            FilterExpression: field + ' = :value',
            ExpressionAttributeValues: { ':value': value }
        };
        this.db.scan(params, callback);
    };
    return DynamoDriver;
}(AbstractDriver_1.AbstractDriver));
exports.DynamoDriver = DynamoDriver;
//# sourceMappingURL=DynamoDriver.js.map