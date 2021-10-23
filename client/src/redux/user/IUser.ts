export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar: string;
    address: IAddress
}

export interface IAddress {
    flat: string;
    street: string;
    city: string;
    state: string;
    mobile: string;
    country: string;
    pin: string;
    landmark: string;

}