import { Link } from "react-router-dom";
import "./ListingCard.css";

const ListingCard = ({ listing }) => {
    return (
        <Link to={`/listings/${listing._id}`} className="listing-card-link">
            <div className="listing-card">
                <div className="listing-card-img-wrapper">
                    <img
                        src={listing.image?.url || "https://via.placeholder.com/400x300?text=No+Image"}
                        alt={listing.title}
                        className="listing-card-img"
                    />
                    <div className="listing-card-overlay">
                        <span className="listing-card-price">
                            ₹{listing.price ? listing.price.toLocaleString("en-IN") : "N/A"}
                            <small>/night</small>
                        </span>
                    </div>
                </div>
                <div className="listing-card-body">
                    <h3 className="listing-card-title">{listing.title}</h3>
                    <p className="listing-card-location">
                        <i className="fa-solid fa-location-dot"></i>
                        {listing.location}
                    </p>
                    {listing.owner && (
                        <p className="listing-card-owner">
                            <i className="fa-solid fa-user"></i>
                            Hosted by {listing.owner.username}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;
