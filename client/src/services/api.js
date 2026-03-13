import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// AUTH
export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);

// ROOMS
export const getRooms = () => API.get('/rooms');
export const getRoom = (id) => API.get(`/rooms/${id}`);
export const createRoom = (data) => API.post('/rooms', data);
export const updateRoom = (id, data) => API.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

// BOOKINGS
export const createBooking = (data) => API.post('/bookings', data); // legacy
export const createRazorpayOrder = (data) => API.post('/bookings/create-order', data);
export const verifyPayment = (data) => API.post('/bookings/verify-payment', data);
export const getBookings = () => API.get('/bookings');
export const getBookedDates = (roomId) => API.get(`/bookings/room/${roomId}`);
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}`, { status });
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);

// MENU
export const getMenu = (category) => API.get('/menu', { params: category ? { category } : {} });
export const createMenuItem = (data) => API.post('/menu', data);
export const updateMenuItem = (id, data) => API.put(`/menu/${id}`, data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`);

// REVIEWS
export const getReviews = () => API.get('/reviews');
export const getAllReviews = () => API.get('/reviews/all');
export const createReview = (data) => API.post('/reviews', data);
export const updateReview = (id, data) => API.put(`/reviews/${id}`, data);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

// MESSAGES
export const sendMessage = (data) => API.post('/messages', data);
export const getMessages = () => API.get('/messages');
export const markMessageRead = (id) => API.put(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

// RESERVATIONS
export const createReservation = (data) => API.post('/reservations', data);
export const getReservations = () => API.get('/reservations');
export const updateReservation = (id, status) => API.put(`/reservations/${id}`, { status });
export const deleteReservation = (id) => API.delete(`/reservations/${id}`);

// GALLERY
export const getGallery = (category) => API.get('/gallery', { params: category ? { category } : {} });
export const uploadGalleryImage = (data) => API.post('/gallery', data);
export const deleteGalleryImage = (id) => API.delete(`/gallery/${id}`);

export default API;
