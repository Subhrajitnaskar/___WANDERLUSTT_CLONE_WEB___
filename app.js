if(process.env.NODE_ENV != "production") {
require('dotenv').config();
}
// require('dotenv').config();
//console.log(process.env);
const PORT = 8080;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

// Database Connection
async function main() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB");
}

main().catch((err) => console.log(err));

// Middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: "mysupersecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO STORE", err);
});

const sessionOptions = {
  store,
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Home Route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;   
  next();
});

// app.get("/demouser", async (req, res, next) => {
//   try {
//     let fakeUser = new User({
//       email: "student@gmail.com",
//       username: "delta-student",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");

//     res.send(registeredUser);
//   } catch (err) {
//     next(err);
//   }
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// // Validate Listing
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

// // Validate Review
// const validateReview = (req, res, next) => {
//   let result = reviewSchema.validate(req.body);
//   console.log(result);

//   let { error } = result;

//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };

// // Home Route
// app.get("/", (req, res) => {
//   res.send("Hi, I am Root");
// });

// // Index Route
// app.get(
//   "/listings",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index", { allListings });
//   })
// );

// // New Route
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new");
// });

// // Show Route
// app.get(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     const listing = await Listing.findById(id).populate("reviews");

//     res.render("listings/show", { listing });
//   })
// );

// // Create Route
// app.post(
//   "/listings",
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

//     await newListing.save();

//     res.redirect("/listings");
//   })
// );

// // Edit Route
// app.get(
//   "/listings/:id/edit",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     const listing = await Listing.findById(id);

//     res.render("listings/edit", { listing });
//   })
// );

// // Update Route
// app.put(
//   "/listings/:id",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     // if(!req.body.listing) {
//     //   throw new ExpressError(400, "Send valid data for listing");
//     // }

//     const { id } = req.params;

//     await Listing.findByIdAndUpdate(id, {
//       ...req.body.listing,
//     });

//     res.redirect(`/listings/${id}`);
//   })
// );

// // Delete Route
// app.delete(
//   "/listings/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;

//     await Listing.findByIdAndDelete(id);

//     res.redirect("/listings");
//   })
// );

// // reviews post route
// app.post(
//   "/listings/:id/reviews",
//   validateReview,
//   wrapAsync(async (req, res) => {
//     let listing = await Listing.findById(req.params.id);

//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("new review saved");

//     res.redirect(`/listings/${req.params.id}`);
//   })
// );

// // delete review Route
// app.delete(
//   "/listings/:id/reviews/:reviewId",
//   wrapAsync(async (req, res) => {
//     let { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, {
//       $pull: { reviews: reviewId },
//     });

//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
//   })
// );

// 404 Route
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong!" } = err;

  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

// Server
//const PORT = 8080;

app.listen(8080, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});