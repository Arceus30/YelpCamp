const { Campground } = require("../models");
const { cloudinary } = require("../cloudinary");
const mbxGeoCoding = require("@mapbox/mapbox-sdk/services/geocoding-v6");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geoCoder = mbxGeoCoding({ accessToken: mapBoxToken });

// all campgrounds controller
const index = async (req, res, next) => {
    try {
        const campgrounds = await Campground.find({});
        return res.render("campgrounds/index", { campgrounds });
    } catch (e) {
        return next(e);
    }
};

// render new campground form controller
const renderNew = (req, res) => {
    res.render("campgrounds/new");
};

// create new campground controller
const createNewCampground = async (req, res, next) => {
    try {
        const { campground } = req.body;
        const geoData = await geoCoder
            .forwardGeocode({
                query: campground.location,
                limit: 1,
            })
            .send();
        const newCampground = new Campground(campground);
        newCampground.geometry = geoData.body.features[0].geometry; //[longitudes, latitudes]
        const uploadedImages = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
        newCampground.images = uploadedImages;
        newCampground.author = res.locals.currentUser._id;
        await newCampground.save();
        req.flash("success", "Campground created successfully");
        return res.redirect(`/campgrounds/${newCampground._id}`);
    } catch (e) {
        req.flash("error", "Campground not created");
        return next(e);
    }
};

// show specific campground controller
const showCampground = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("author");
        return res.render("campgrounds/show", { campground });
    } catch (e) {
        req.flash("error", "Campground does not exist");
        return res.redirect("/campgrounds");
    }
};

// render campground edit form controller
const renderEdit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findById(id);
        return res.render("campgrounds/edit", { campground });
    } catch (e) {
        req.flash("error", "Campground does not exist");
        return res.redirect("/campgrounds");
    }
};

// campground edit controller
const editCampground = async (req, res, next) => {
    const { id } = req.params;
    const { campground, deleteImages } = req.body;
    try {
        const geoData = await geoCoder
            .forwardGeocode({
                query: campground.location,
                limit: 1,
            })
            .send();
        const updatedCampground = await Campground.findByIdAndUpdate(
            id,
            { ...campground },
            { new: true }
        );
        const uploadedImages = req.files.map((fl) => ({
            url: fl.path,
            filename: fl.filename,
        }));
        updatedCampground.images.push(...uploadedImages);
        updatedCampground.geometry = geoData.body.features[0].geometry;
        await updatedCampground.save();
        if (deleteImages) {
            for (let filename of deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await campground.updateOne({
                $pull: { images: { filename: { $in: deleteImages } } },
            });
        }
        req.flash("success", "Campground updated successfully");
        return res.redirect(`/campgrounds/${updatedCampground._id}`);
    } catch (e) {
        req.flash("error", "Campground not edited");
        return res.redirect(`/campgrounds/${id}`);
    }
};

// delete campground controller
const deleteCampground = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { images } = await Campground.findByIdAndDelete(id);
        for (let image of images) {
            await cloudinary.uploader.destroy(image.filename);
        }
        req.flash("warn", "Campground deleted successfully");
        return res.redirect("/campgrounds");
    } catch (e) {
        req.flash("error", "Campground not deleted");
        return next(e);
    }
};

module.exports = {
    index,
    createNewCampground,
    renderNew,
    showCampground,
    editCampground,
    deleteCampground,
    renderEdit,
};
