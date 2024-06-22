import axios from 'axios';
import { Room, RoomAvailability } from '../types/room.ts';

const API_URL = 'https://dcontent.inviacdn.net/shared/dev/test-api';

export const fetchRooms = async (): Promise<Room[]> => {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
};

export const fetchRoomAvailability = async (id: number): Promise<RoomAvailability> => {
    const response = await axios.get(`${API_URL}/room/${id}`);
    return response.data;
};
