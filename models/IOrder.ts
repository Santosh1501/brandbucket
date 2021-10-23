export interface IOrder {
    save(): IOrder | PromiseLike<IOrder>;
    _id?: string;
    name: string;
    email: string;
    mobile: string;
    tax: number;
    total: number;
    items: IItem[];
    createdAt?: String;
    updatedAt?: String;

}
export interface IItem {
    _id?: string;
    name: string;
    price: number;
    qty: number;
    brand: string;
}