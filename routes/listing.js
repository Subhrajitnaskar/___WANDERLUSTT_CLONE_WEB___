const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listngController = require("../controllers/listings.js");

router
.route("/")
 .get(
   wrapAsync(listngController.index)
  )
 .post(
   isLoggedIn,
   validateListing,
   wrapAsync(listngController.createListing)
  );

  // New Route
router.get("/new", isLoggedIn, listngController.renderNewFrom);

router
.route("/:id")
 .get(
   wrapAsync(listngController.showListing)
  )
 .put(
   isLoggedIn,
   isOwner,
   validateListing,
   wrapAsync(listngController.updateListing)
  )
 .delete(
   isLoggedIn,
   isOwner,
   wrapAsync(listngController.destroyListing)
  );



// // Index Route
// router.get(
//   "/",
//   wrapAsync(listngController.index)
// );

// // New Route
// router.get("/new", isLoggedIn, listngController.renderNewFrom);

// Show Route
// router.get(
//   "/:id",
//   wrapAsync(listngController.showListing)
// );

// // Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listngController.createListing)
// );

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listngController.renderEditFrom)
);

// // Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listngController.updateListing)
// );

// Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listngController.destroyListing)
// );

module.exports = router;


// Validate Listing
// const validateListing = (req, res, next) => {
//   let result = listingSchema.validate(req.body);
//   console.log(result);

//   let { error } = result;

//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// // Index Route
// router.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
//   })
// );

// // New Route
// router.get("/new", isLoggedIn, (req, res) => {
//   // console.log(req.user);
//   // if(!req.isAuthenticated()) {
//   //   req.flash("error", "You must be logged in to create listing!");
//   //   return res.redirect("/login");
//   // }
//   res.render("listings/new.ejs");
// });

// // Show Route
// router.get(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     const listing = await Listing.findById(id)
//      .populate({
//        path: "reviews",
//        populate: {
//         path: "author",
//        },
       
//       })
//      .populate("owner");

//     if (!listing) {
//       req.flash("error", "Listing you requestde for does not exist!");
//       return res.redirect("/listings");
//     }
//     // console.log("/listings");
//     res.render("listings/show", { listing });
//   })
// );

// Create Route
// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(async (req, res) => {
//     // let result = listingSchema.validate(req.body);
//     // console.log(result);
//     // if(result.error) {
//     //   throw new ExpressError(400, result.error);
//     // }
//     // if(!req.body.listing) {
//     //   throw new ExpressError(400, "Send valid data for listing");
//     // }

//     const newListing = new Listing(req.body.listing);

//     // if(!newListing.title) {
//     //   throw new ExpressError(400, "Title is missing!");
//     // }
//     // if(!newListing.description) {
//     //   throw new ExpressError(400, "Description is missing!");
//     // }
//     // if(!newListing.location) {
//     //   throw new ExpressError(400, "Location is missing!");
//     // }

//     // console.log(req.user);
//     newListing.owner = req.user._id;
//     await newListing.save();
//     req.flash("success", "New Listing Created Successfully!");
//     res.redirect("/listings");
//   })
// );

// // Edit Route
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     const listing = await Listing.findById(id);
    
//     if (!listing) {
//       req.flash("error", "Listing you requestde for does not exist!");
//       return res.redirect("/listings");
//     }

//     res.render("listings/edit", { listing });
//   })
// );

// // Update Route
// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(async (req, res) => {
//     // if(!req.body.listing) {
//     //   throw new ExpressError(400, "Send valid data for listing");
//     // }

//     const { id } = req.params;
//     // let listing = await Listing.findById(id);
//     // if(!listing.owner._id.equals(res.locals.currUser._id)) {
//     //   req.flash("error", "you don't have permission to edit");
//     //   return res.redirect(`/listings/${id}`);
//     // }

//     await Listing.findByIdAndUpdate(id, {
//       ...req.body.listing,
//     });
//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
//   })
// );

// // Delete Route
// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     await Listing.findByIdAndDelete(id);

//     req.flash("success", "Listing Deleted!");
//     res.redirect("/listings");
//   })
// );

// module.exports = router;