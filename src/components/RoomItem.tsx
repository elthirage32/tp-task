import { useState, FC } from 'react';

import { fetchRoomAvailability } from '../services/roomsService';
import { Room, AvailabilityStatus } from '../types/room.ts';

const RoomItem: FC<{ room: Room }> = ({ room }) => {
    const [availability, setAvailability] = useState<string>(null);
    const [checkedPrice, setCheckedPrice] = useState<number | null>(null);

    const checkAvailability = async () => {
        const availabilityData = await fetchRoomAvailability(room.id);
        setAvailability(availabilityData.availabilityStatus);
        setCheckedPrice(availabilityData.price?.value || null);
    };

    return (
        <li data-test="room-item">
            <h3>{room.name}</h3>
            <div>
                Original Price:
                <span>{room.price.value}</span>
            </div>
            <div>
                Checked Price:
                {checkedPrice && <span data-test="checked-price">{checkedPrice}</span>}
            </div>
            <div>
                Availability:
                {availability && <span data-test="availability-status">{availability}</span>}
            </div>
            <button data-test="availability-check-button" onClick={checkAvailability}>
                Check Availability
            </button>
            <button data-test="book-button" onClick={() => console.log(room)} disabled={availability !== AvailabilityStatus.Available}>
                Book
            </button>
        </li>
    );
};

export default RoomItem;
