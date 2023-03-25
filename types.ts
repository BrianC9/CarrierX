export interface Parcel {
    id:             ID;
    deliveryAdress: string;
    deliveryDate:   string;
    pickupAdress:   string;
    pickupDate:     string;
    itemsCount:     number;
    items:          ID[];
}

export interface ID {
    $oid: string;
}
