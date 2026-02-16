const jwt = require("jsonwebtoken");
const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require("./schemaValidation.js");
const ExpressError = require("./utils/ExpressError.js");

const JWT_SECRET = process.env.JWT_SECRET || process.env.SECRET || "mysupersecretcode";

// Verify JWT token
module.exports.isLoggedIn = (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }
  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({ success: false, message: "You are not the owner of this listing" });
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({ success: false, message: errMsg });
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({ success: false, message: errMsg });
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review) {
    return res.status(404).json({ success: false, message: "Review not found" });
  }
  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ success: false, message: "You are not the author of this review" });
  }
  next();
};
