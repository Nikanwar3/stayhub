import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Flash from "../components/Flash";
import * as api from "../api";
import "./ListingForm.css";

const CreateListing = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [flash, setFlash] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        country: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);

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

            const { data } = await api.createListing(formData);
            if (data.success) {
                navigate(`/listings/${data.listing._id}`);
            }
        } catch (err) {
            setFlash({
                message: err.response?.data?.message || "Failed to create listing",
                type: "error",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-page">
            {flash && (
                <Flash message={flash.message} type={flash.type} onClose={() => setFlash(null)} />
            )}

            <div className="form-container">
                <div className="form-header">
                    <h1>Create a New Listing</h1>
                    <p>Share your amazing space with travelers around the world</p>
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
                            placeholder="Enter a catchy title"
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
                            placeholder="Describe your property..."
                            rows={4}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <div className="image-upload">
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                            {preview && (
                                <img src={preview} alt="Preview" className="image-preview" />
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
                                    placeholder="1200"
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
                                placeholder="City, State"
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
                            placeholder="India"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <span className="btn-spinner"></span>
                                Creating...
                            </>
                        ) : (
                            "Create Listing"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateListing;
