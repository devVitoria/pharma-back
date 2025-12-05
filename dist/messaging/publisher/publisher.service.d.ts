import { OnModuleInit } from '@nestjs/common';
export declare class PublisherService implements OnModuleInit {
    private readonly client;
    constructor();
    onModuleInit(): Promise<void>;
    publish(type: string, payload: any): import("rxjs").Observable<any>;
}
