const Listing = require("../models/listing");

// GET all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}).populate("owner", "username");
  res.json({ success: true, listings: allListings });
};

// GET single listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username",
      },
    })
    .populate("owner", "username email");

  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }
  res.json({ success: true, listing });
};

// POST create listing
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }

  // Geocode location using OpenStreetMap Nominatim API
  try {
    const query = `${newListing.location}, ${newListing.country}`;
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { headers: { "User-Agent": "StayHub/1.0" } }
    );
    const geoData = await geoRes.json();
    if (geoData.length > 0) {
      newListing.geometry = {
        type: "Point",
        coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
      };
    } else {
      newListing.geometry = { type: "Point", coordinates: [0, 0] };
    }
  } catch (err) {
    newListing.geometry = { type: "Point", coordinates: [0, 0] };
  }

  await newListing.save();
  const populated = await Listing.findById(newListing._id).populate("owner", "username");
  res.status(201).json({ success: true, message: "Listing created!", listing: populated });
};

// PUT update listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (req.file) {
    listing.image = { url: req.file.path, filename: req.file.filename };
  }

  // Re-geocode if location was updated
  try {
    const query = `${req.body.listing.location}, ${req.body.listing.country}`;
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { headers: { "User-Agent": "StayHub/1.0" } }
    );
    const geoData = await geoRes.json();
    if (geoData.length > 0) {
      listing.geometry = {
        type: "Point",
        coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
      };
    }
  } catch (err) {
    console.log("Geocoding failed:", err.message);
  }

  await listing.save();
  const populated = await Listing.findById(listing._id)
    .populate("owner", "username")
    .populate({ path: "reviews", populate: { path: "author", select: "username" } });
  res.json({ success: true, message: "Listing updated!", listing: populated });
};

// DELETE listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.json({ success: true, message: "Listing deleted!" });
};
