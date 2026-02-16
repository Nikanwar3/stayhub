import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useAuth } from "../context/AuthContext";
import Flash from "../components/Flash";
import * as api from "../api";
import "leaflet/dist/leaflet.css";
import "./ListingDetail.css";

// Fix Leaflet default marker icon
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [flash, setFlash] = useState(null);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchListing();
    }, [id]);

    const fetchListing = async () => {
        try {
            const { data } = await api.getListing(id);
            if (data.success) {
                setListing(data.listing);
            }
        } catch (err) {
            setFlash({ message: "Listing not found", type: "error" });
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await api.deleteListing(id);
            navigate("/");
        } catch (err) {
            setFlash({ message: "Failed to delete listing", type: "error" });
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await api.createReview(id, { review: reviewForm });
            if (data.success) {
                setListing((prev) => ({
                    ...prev,
                    reviews: [...prev.reviews, data.review],
                }));
                setReviewForm({ rating: 5, comment: "" });
                setFlash({ message: "Review added!", type: "success" });
            }
        } catch (err) {
            setFlash({
                message: err.response?.data?.message || "Failed to add review",
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            await api.deleteReview(id, reviewId);
            setListing((prev) => ({
                ...prev,
                reviews: prev.reviews.filter((r) => r._id !== reviewId),
            }));
            setFlash({ message: "Review deleted!", type: "success" });
        } catch (err) {
            setFlash({ message: "Failed to delete review", type: "error" });
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading listing...</p>
            </div>
        );
    }

    if (!listing) return null;

    const coordinates = listing.geometry?.coordinates || [0, 0];
    const mapCenter = [coordinates[1], coordinates[0]];
    const isOwner = user && listing.owner && listing.owner._id === user._id;
    const avgRating =
        listing.reviews.length > 0
            ? (
                listing.reviews.reduce((sum, r) => sum + r.rating, 0) /
                listing.reviews.length
            ).toFixed(1)
            : null;

    return (
        <div className="detail-page">
            {flash && (
                <Flash
                    message={flash.message}
                    type={flash.type}
                    onClose={() => setFlash(null)}
                />
            )}

            <div className="detail-container">
                {/* Header */}
                <div className="detail-header">
                    <h1>{listing.title}</h1>
                    <div className="detail-meta">
                        <span className="detail-location">
                            <i className="fa-solid fa-location-dot"></i>
                            {listing.location}, {listing.country}
                        </span>
                        {avgRating && (
                            <span className="detail-rating">
                                <i className="fa-solid fa-star"></i>
                                {avgRating} · {listing.reviews.length} review
                                {listing.reviews.length !== 1 && "s"}
                            </span>
                        )}
                    </div>
                </div>

                {/* Image */}
                <div className="detail-image-wrapper">
                    <img
                        src={listing.image?.url}
                        alt={listing.title}
                        className="detail-image"
                    />
                </div>

                <div className="detail-grid">
                    {/* Left Content */}
                    <div className="detail-left">
                        {/* Host Info */}
                        <div className="detail-host">
                            <div className="host-avatar">
                                {listing.owner?.username?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3>Hosted by {listing.owner?.username}</h3>
                                <p>Entire place</p>
                            </div>
                        </div>

                        <hr className="detail-divider" />

                        {/* Description */}
                        <div className="detail-description">
                            <h3>About this place</h3>
                            <p>{listing.description}</p>
                        </div>

                        <hr className="detail-divider" />

                        {/* Owner Actions */}
                        {isOwner && (
                            <div className="owner-actions">
                                <Link to={`/listings/${listing._id}/edit`} className="btn-edit">
                                    <i className="fa-solid fa-pen-to-square"></i> Edit Listing
                                </Link>
                                <button onClick={handleDelete} className="btn-delete">
                                    <i className="fa-solid fa-trash-can"></i> Delete
                                </button>
                            </div>
                        )}

                        {/* Reviews Section */}
                        <div className="reviews-section">
                            <h3>
                                <i className="fa-solid fa-star"></i>
                                {avgRating ? `${avgRating} · ` : ""}
                                {listing.reviews.length} Review
                                {listing.reviews.length !== 1 && "s"}
                            </h3>

                            {/* Review Form */}
                            {user && (
                                <form onSubmit={handleReviewSubmit} className="review-form">
                                    <div className="rating-input">
                                        <label>Rating</label>
                                        <div className="star-input">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className={`star-btn ${star <= reviewForm.rating ? "active" : ""
                                                        }`}
                                                    onClick={() =>
                                                        setReviewForm((prev) => ({
                                                            ...prev,
                                                            rating: star,
                                                        }))
                                                    }
                                                >
                                                    <i className="fa-solid fa-star"></i>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <textarea
                                        placeholder="Write your review..."
                                        value={reviewForm.comment}
                                        onChange={(e) =>
                                            setReviewForm((prev) => ({
                                                ...prev,
                                                comment: e.target.value,
                                            }))
                                        }
                                        required
                                        rows={3}
                                    />
                                    <button
                                        type="submit"
                                        className="btn-submit-review"
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting..." : "Submit Review"}
                                    </button>
                                </form>
                            )}

                            {!user && (
                                <p className="login-prompt">
                                    <Link to="/login">Login</Link> to leave a review
                                </p>
                            )}

                            {/* Reviews List */}
                            <div className="reviews-list">
                                {listing.reviews.map((review) => (
                                    <div key={review._id} className="review-card">
                                        <div className="review-header">
                                            <div className="review-avatar">
                                                {review.author?.username?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4>{review.author?.username}</h4>
                                                <div className="review-stars">
                                                    {[...Array(5)].map((_, i) => (
                                                        <i
                                                            key={i}
                                                            className={`fa-solid fa-star ${i < review.rating ? "filled" : ""
                                                                }`}
                                                        ></i>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="review-comment">{review.comment}</p>
                                        {user && review.author?._id === user._id && (
                                            <button
                                                onClick={() => handleDeleteReview(review._id)}
                                                className="btn-delete-review"
                                            >
                                                <i className="fa-solid fa-trash-can"></i> Delete
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="detail-right">
                        {/* Price Card */}
                        <div className="price-card">
                            <div className="price-amount">
                                <span className="price-value">
                                    ₹{listing.price?.toLocaleString("en-IN")}
                                </span>
                                <span className="price-unit">/night</span>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="map-card">
                            <h4>
                                <i className="fa-solid fa-map-location-dot"></i> Location
                            </h4>
                            <div className="map-wrapper">
                                <MapContainer
                                    center={mapCenter}
                                    zoom={13}
                                    style={{ height: "250px", width: "100%", borderRadius: "12px" }}
                                    scrollWheelZoom={false}
                                >
                                    <TileLayer
                                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    />
                                    <Marker position={mapCenter}>
                                        <Popup>
                                            <strong>{listing.title}</strong>
                                            <br />
                                            {listing.location}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <p className="map-address">
                                <i className="fa-solid fa-location-dot"></i>
                                {listing.location}, {listing.country}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;
