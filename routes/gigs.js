const router = require("express").Router();
let Gig = require("../models/gig");


//http:localhost:3001/gigs/create
router.route("create").post((req,res) => {

    const gigTitle = req.body.gigTitle;
    const gigCategory = req.body.gigCategory;
    const gigSearchTags = req.body.gigSearchTags;
    const gigBasicPriceDesc = req.body.gigBasicPriceDesc;
    const gigBasicPrice = Number(req.body.gigBasicPrice);
    const gigStandardPriceDesc = req.body.gigStandardPriceDesc;
    const gigStandardPrice = Number(req.body.gigStandardPrice);
    const gigPremiumPriceDesc = req.body.gigPremiumPriceDesc;
    const gigPremiumPrice = Number(req.body.gigPremiumPrice);
    const gigDesc = req.body.gigDesc;
    const gigReq = req.body.gigReq;

    const newGig = new Gig({
        gigTitle,
        gigCategory,
        gigSearchTags,
        gigBasicPriceDesc,
        gigBasicPrice,
        gigBasicPrice,
        gigStandardPriceDesc,
        gigStandardPrice,
        gigPremiumPriceDesc,
        gigPremiumPrice,
        gigDesc,
        gigReq
    })

    newGig.save().then(()=>{
        res.json("Gig Created");
    }).catch((err) => {
        console.log(err);
    })

})

//Get route
//http:localhost:3001/gigs/

router.route("/").get((req,res) => {

    Gig.find().then((gigs) =>{
        res.json(gigs);
    } ).catch((err) => {
        console.log(err);
    })
})





module.exports = router;