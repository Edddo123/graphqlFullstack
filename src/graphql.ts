
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Buyer {
    id: string;
    name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    location?: Nullable<string>;
    posts?: Nullable<Nullable<BuyerPost>[]>;
}

export class BuyerPost {
    id: string;
    propertyType?: Nullable<string>;
    price?: Nullable<number>;
    buyer?: Nullable<Buyer>;
}

export abstract class IQuery {
    abstract buyer(id: string): Nullable<Buyer> | Promise<Nullable<Buyer>>;

    abstract buyers(): Nullable<Nullable<Buyer>[]> | Promise<Nullable<Nullable<Buyer>[]>>;

    abstract post(id: string): Nullable<BuyerPost> | Promise<Nullable<BuyerPost>>;

    abstract posts(): Nullable<Nullable<BuyerPost>[]> | Promise<Nullable<Nullable<BuyerPost>[]>>;
}

export abstract class IMutation {
    abstract addBuyer(name: string, email: string, password: string, location: string): Nullable<Buyer> | Promise<Nullable<Buyer>>;

    abstract addBuyerPost(propertyType: string, price: number, buyer: string): Nullable<BuyerPost> | Promise<Nullable<BuyerPost>>;
}

type Nullable<T> = T | null;
