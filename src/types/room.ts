export type Room = {
    id: number;
    name: string;
    price: Price;
};

type Price = {
    currencyCode: string;
    value: number;
};

export type RoomAvailability = {
    availabilityStatus: AvailabilityStatus;
    price: Price;
};

export enum AvailabilityStatus {
    Available = 'available',
    OnRequest = 'onRequest',
    SoldOut = 'soldOut',
    Error = 'error',
}
