const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

// Validate Listing
const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body);
  console.log(result);

  let { error } = result;

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

// New Route
router.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id).populate("reviews");

    res.render("listings/show", { listing });
  })
);

// Create Route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error) {
    //   throw new ExpressError(400, result.error);
    // }
    // if(!req.body.listing) {
    //   throw new ExpressError(400, "Send valid data for listing");
    // }

    const newListing = new Listing(req.body.listing);

    // if(!newListing.title) {
    //   throw new ExpressError(400, "Title is missing!");
    // }
    // if(!newListing.description) {
    //   throw new ExpressError(400, "Description is missing!");
    // }
    // if(!newListing.location) {
    //   throw new ExpressError(400, "Location is missing!");
    // }

    await newListing.save();

    res.redirect("/listings");
  })
);

// Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    res.render("listings/edit", { listing });
  })
);

// Update Route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    // if(!req.body.listing) {
    //   throw new ExpressError(400, "Send valid data for listing");
    // }

    const { id } = req.params;

    await Listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    });

    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
  })
);

module.exports = router;