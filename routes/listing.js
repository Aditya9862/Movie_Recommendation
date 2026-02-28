const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateList } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateList, upload.single("listing[image]"), wrapAsync(listingController.createListing))

// new route 
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner, upload.single("listing[image]"), validateList, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))


//index route
//router.get("/", wrapAsync(listingController.index));

// show route
//router.get("/:id", wrapAsync(listingController.showListing));

// create route
//router.post("/", isLoggedIn, validateList, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update Route
//router.put("/:id", isLoggedIn,isOwner, validateList, wrapAsync(listingController.updateListing));

// Delete Route
//router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;