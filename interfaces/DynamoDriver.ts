import uuid = require('uuid');
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { AbstractDriver } from './AbstractDriver';

export class DynamoDriver extends AbstractDriver {

  public hash: string;
  public tableName: string;
  public db = new DynamoDB.DocumentClient();

  constructor(tableName: string, hash = 'id'){
    super();
    this.hash = hash;
    this.tableName = tableName;
  }

  public all(fields = [], callback){
    let obj = {
      TableName: this.tableName
    };

    this.db.scan(obj, callback);
  }

  public create(obj, callback){
    let item = {
      TableName: this.tableName,
      Item: obj
    };

    item.Item.id = uuid.v4();
    item.Item.created_at = Math.floor(Date.now() / 1000);
    item.Item.updated_at = Math.floor(Date.now() / 1000);

    this.db.put(item, callback);
  }

  public update(id, obj, callback){

  }

  public delete(id, callback){
    let params = {
      TableName: this.tableName,
      Key: { }
    };

    params.Key[this.hash] = id;

    this.db.delete(params, callback);
  }

  public find(id, fields = [], callback){
    let params = {
      TableName: this.tableName,
      Key: { },
      AttributesToGet: fields,
      ExpressionAttributeValues: null,
      UpdateExpression: null,
      ReturnValues: null
    };

    params.Key[this.hash] = id;

    this.db.get(params, callback);
  }

  public findBy(field, value, fields = [], callback){
    let params = {
      TableName : this.tableName,
      FilterExpression : field + ' = :value',
      ExpressionAttributeValues : {':value' : value}
    };

    this.db.scan(params, callback);
  }

}
