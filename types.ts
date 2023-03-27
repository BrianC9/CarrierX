export interface Parcel {
    id: ID;
    deliveryAdress: string;
    deliveryDate: string;
    pickupAdress: string;
    pickupDate: string;
    itemsCount: number;
    items: ID[];
}
export interface Carrier {
    id: ID;
    companyName: string;
    driver: string;
    licensePlate: string;
    centerAdress: string;
}
export interface ID {
    $oid: string;
}
export interface ParcelList {
    parcel: Parcel,
    carriers: number | 0,
    nItems: number | 0,
}
export interface Item {
    id:     ID;
    type:   string;
    model:  string;
    price:  number;
    weigth: number;
}