import { AbstractDriver } from './AbstractDriver';
export declare abstract class AbstractController {
    protected resourceName: string;
    protected dbDriver: AbstractDriver;
    constructor(resourceName: any, dbDriver: any);
    sendResponse(statusCode: any, headers: any, body: any, callback: any): void;
    defaultResponse(error: any, data: any, callback: any): void;
    defaultInvalidDataResponse(callback: any): void;
    getRequestParam(request: any, paramName: any): any;
}
