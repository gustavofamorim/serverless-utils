import DynamoDB = require('aws-sdk/clients/dynamodb');
import { AbstractDriver } from './AbstractDriver';
export declare class DynamoDriver extends AbstractDriver {
    tableName: string;
    db: DynamoDB.DocumentClient;
    constructor(tableName: string);
    all(fields: never[] | undefined, callback: any): void;
    create(obj: any, callback: any): void;
    update(id: any, obj: any, callback: any): void;
    delete(id: any, callback: any): void;
    find(id: any, fields: never[] | undefined, callback: any): void;
    findBy(field: any, value: any, fields: never[] | undefined, callback: any): void;
}
