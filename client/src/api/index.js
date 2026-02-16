import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const getMe = () => API.get("/auth/me");

// Listings
export const getListings = () => API.get("/listings");
export const getListing = (id) => API.get(`/listings/${id}`);
export const createListing = (formData) =>
    API.post("/listings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const updateListing = (id, formData) =>
    API.put(`/listings/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
export const deleteListing = (id) => API.delete(`/listings/${id}`);

// Reviews
export const createReview = (listingId, data) =>
    API.post(`/listings/${listingId}/reviews`, data);
export const deleteReview = (listingId, reviewId) =>
    API.delete(`/listings/${listingId}/reviews/${reviewId}`);

export default API;
