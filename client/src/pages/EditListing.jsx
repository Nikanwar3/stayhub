import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Flash from "../components/Flash";
import * as api from "../api";
import "./ListingForm.css";

const EditListing = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flash, setFlash] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        fetchListing();
    }, [id]);

    const fetchListing = async () => {
        try {
            const { data } = await api.getListing(id);
            if (data.success) {
                const l = data.listing;
                setForm({
                    title: l.title,
                    description: l.description,
                    price: l.price,
                    location: l.location,
                    country: l.country,
                });
                setCurrentImage(l.image?.url);
            }
        } catch {
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("listing[title]", form.title);
            formData.append("listing[description]", form.description);
            formData.append("listing[price]", form.price);
            formData.append("listing[location]", form.location);
            formData.append("listing[country]", form.country);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const { data } = await api.updateListing(id, formData);
            if (data.success) {
                navigate(`/listings/${id}`);
            }
        } catch (err) {
            setFlash({
                message: err.response?.data?.message || "Failed to update listing",
                type: "error",
            });
        } finally {
            setSubmitting(false);
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

    return (
        <div className="form-page">
            {flash && (
                <Flash message={flash.message} type={flash.type} onClose={() => setFlash(null)} />
            )}

            <div className="form-container">
                <div className="form-header">
                    <h1>Edit Listing</h1>
                    <p>Update your listing details</p>
                </div>

                <form onSubmit={handleSubmit} className="listing-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Update Image (Optional)</label>
                        <div className="image-upload">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {(preview || currentImage) && (
                                <img
                                    src={preview || currentImage}
                                    alt="Preview"
                                    className="image-preview"
                                />
                            )}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price (per night)</label>
                            <div className="price-input">
                                <span className="currency-symbol">₹</span>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="btn-spinner"></span>
                                Updating...
                            </>
                        ) : (
                            "Update Listing"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditListing;
