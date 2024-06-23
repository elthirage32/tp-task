import { useEffect, useState } from 'react';

import { fetchRooms } from '../services/roomsService';
import RoomItem from './RoomItem';
import { Room } from '../types/room.ts';

const RoomList = () => {
    const [rooms, setRooms] = useState<Room[]>(null);
    const [sortedRooms, setSortedRooms] = useState<Room[]>([]);

    const loadRooms = async () => {
        const roomsData = await fetchRooms();
        setRooms(roomsData);
        setSortedRooms(roomsData.sort((a, b) => a.price.value - b.price.value));
    };

    useEffect(() => {
        if (!rooms) loadRooms();
    }, [rooms]);

    return (
        <div>
            <ul>{sortedRooms?.map((room) => <RoomItem key={room.id} room={room} />)}</ul>
        </div>
    );
};

export default RoomList;
