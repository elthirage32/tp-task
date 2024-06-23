import axios from 'axios';
import { Room, RoomAvailability } from '../types/room.ts';

const API_URL = 'https://dcontent.inviacdn.net/shared/dev/test-api';

export const fetchRooms = async (): Promise<Room[]> => {
    try {
        const response = await axios.get(`${API_URL}/rooms`);
        return response.data;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw new Error('Failed to fetch rooms');
    }
};

export const fetchRoomAvailability = async (id: number): Promise<RoomAvailability> => {
    try {
        const response = await axios.get(`${API_URL}/room/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching availability for room ${id}:`, error);
        throw new Error('Failed to fetch room availability');
    }
};
