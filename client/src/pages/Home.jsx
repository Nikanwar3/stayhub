import { useState, useEffect } from "react";
import * as api from "../api";
import ListingCard from "../components/ListingCard";
import "./Home.css";

const Home = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const { data } = await api.getListings();
            if (data.success) {
                setListings(data.listings);
            }
        } catch (err) {
            console.error("Failed to fetch listings:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredListings = listings.filter(
        (l) =>
            l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            l.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Discovering amazing places...</p>
            </div>
        );
    }

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Find your next <span className="hero-highlight">stay</span>
                    </h1>
                    <p className="hero-subtitle">
                        Discover unique homes, experiences, and places around the world
                    </p>
                    <div className="search-bar">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Search by place, city, or country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Listings Grid */}
            <section className="listings-section">
                <div className="section-header">
                    <h2>
                        {searchTerm
                            ? `Results for "${searchTerm}"`
                            : "Explore all listings"}
                    </h2>
                    <span className="listing-count">
                        {filteredListings.length} place{filteredListings.length !== 1 && "s"}
                    </span>
                </div>

                {filteredListings.length === 0 ? (
                    <div className="empty-state">
                        <i className="fa-solid fa-map-location-dot"></i>
                        <h3>No listings found</h3>
                        <p>Try adjusting your search or be the first to add a listing!</p>
                    </div>
                ) : (
                    <div className="listings-grid">
                        {filteredListings.map((listing) => (
                            <ListingCard key={listing._id} listing={listing} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
