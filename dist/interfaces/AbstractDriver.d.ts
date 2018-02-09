export declare abstract class AbstractDriver {
    abstract all(fields: any, callback: any): any;
    abstract create(obj: any, callback: any): any;
    abstract update(id: any, obj: any, callback: any): any;
    abstract delete(id: any, callback: any): any;
    abstract find(id: any, fields: any, callback: any): any;
    abstract findBy(field: any, value: any, fields: any, callback: any): any;
}
