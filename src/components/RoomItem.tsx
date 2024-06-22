import { useState, FC } from 'react';

import { fetchRoomAvailability } from '../services/roomsService';
import { Room } from '../types/room.ts';

const RoomItem: FC<{ room: Room }> = ({ room }) => {
    const [availability, setAvailability] = useState<string>('');
    const [checkedPrice, setCheckedPrice] = useState<number | null>(null);

    const checkAvailability = async () => {
        const availabilityData = await fetchRoomAvailability(room.id);
        setAvailability(availabilityData.availabilityStatus);
        setCheckedPrice(availabilityData.price.value);
    };

    return (
        <li>
            <h3>{room.name}</h3>
            <p>Original Price: {room.price.value}</p>
            {checkedPrice !== null && <p>Checked Price: {checkedPrice}</p>}
            <p>Availability: {availability}</p>
            <button onClick={checkAvailability}>Check Availability</button>
            <button onClick={() => console.log(room)} disabled={availability !== 'available'}>
                Book
            </button>
        </li>
    );
};

export default RoomItem;
