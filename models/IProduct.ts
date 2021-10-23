export interface IProduct {
    save: any;
    _id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    brand: string;
    qty: number;
    usage: string;
    craetedAt?: string;
    updatedAt?: string;
}