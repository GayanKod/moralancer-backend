const router = require("express").Router();
const { request } = require("express");
let Gig = require("../models/gig");
const multer = require("multer");


//Image Configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../moralancer/public/uploads/gigs");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage:storage})


//http:localhost:3001/gigs/create
router.post("/create", upload.single("gigImage"), (req,res) => {

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
    const gigImage = req.file.originalname;
    const gigReq = req.body.gigReq;
    

    const newGig = new Gig({
        gigTitle,
        gigCategory,
        gigSearchTags,
        gigBasicPriceDesc,
        gigBasicPrice,
        gigStandardPriceDesc,
        gigStandardPrice,
        gigPremiumPriceDesc,
        gigPremiumPrice,
        gigDesc,
        gigImage,
        gigReq
    })

    newGig.save().then(()=>{
        res.json("Gig Created");
    }).catch((err) => {
        console.log(err);
    })

})

//Get route
//http//localhost:3001/gigs/

router.route("/").get((req,res) => {

    Gig.find().then((gigs) =>{
        res.json(gigs);
    } ).catch((err) => {
        console.log(err);
    })
})


//Update route
//http//localhost:3001/gigs/update/<gigId> e.g. eGSALDsadsawH

router.put("/update/:id", upload.single("gigImage"), async(req,res) => {  //also can use post method to update

    let gigID = req.params.id;
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
    const gigImage = req.body.gigImage;
    const gigReq = req.body.gigReq;

        const updateGig = {
            gigTitle,
            gigCategory,
            gigSearchTags,
            gigBasicPriceDesc,
            gigBasicPrice,
            gigStandardPriceDesc,
            gigStandardPrice,
            gigPremiumPriceDesc,
            gigPremiumPrice,
            gigDesc,
            gigImage,
            gigReq
        }

        if (req.file){
            updateGig.gigImage = req.file.originalname;
        }

        await Gig.findByIdAndUpdate(gigID, updateGig).then(() =>{
            
            res.status(200).send({status:"Gig Updated"});

        }).catch((err) => {
            console.log(err);
            res.status(500).send({status:"Error with updating data", error: err.message});
        })
}) 


//Delete Route
//http//localhost:3001/gigs/delete/<gigId> 
router.route("/delete/:id").delete(async (req,res) => {
    let GigID = req.params.id;
    await Gig.findByIdAndDelete(GigID).then(() =>{
        res.status(200).send({status:"Gig Deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with deleting data", error: err.message});
    })
})

//get specific Gig
////http//localhost:3001/gigs/get/<gigId> 
router.route("/get/:id").get(async(req,res) =>{

    let gigID = req.params.id;
    await Gig.findById(gigID)
    .then((gig) => {
        res.status(200).send({status:"Gig fetched",gig})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with get gig", error: err.message});
    })
})



module.exports = router;