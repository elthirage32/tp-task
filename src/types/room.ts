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
    availabilityStatus: string;
    price: Price;
};
