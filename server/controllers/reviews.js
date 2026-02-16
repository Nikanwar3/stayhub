const Listing = require("../models/listing");
const Review = require("../models/review");

// POST create review
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // Populate author for response
  await newReview.populate("author", "username");

  res.status(201).json({ success: true, message: "Review created!", review: newReview });
};

// DELETE review
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  res.json({ success: true, message: "Review deleted!" });
};
