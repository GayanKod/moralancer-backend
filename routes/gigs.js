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

router.route("/update/:gigId").put(async(req,res) => {  //also can use post method to update

    let gigID = req.params.gigId;
    const {gigTitle,
        gigCategory,
        gigSearchTags,
        gigBasicPriceDesc,
        gigBasicPrice,
        gigStandardPriceDesc,
        gigStandardPrice,
        gigPremiumPriceDesc,
        gigPremiumPrice,
        gigDesc,
        gigReq} = req.body;

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
            gigReq
        }

        const update = await Gig.findByIdAndUpdate(gigID, updateGig).then(() =>{
            
            res.status(200).send({status:"Gig Updated", Gig:update});

        }).catch((err) => {
            console.log(err);
            res.status(500).send({status:"Error with updating data", error: err.message});
        })
}) 


//Delete Route
//http//localhost:3001/gigs/delete/<gigId> 
router.route("/delete/:gigId").delete(async (req,res) => {
    let GigID = req.params.gigId;
    await Gig.findByIdAndDelete(GigID).then(() =>{
        res.status(200).send({status:"User Deleted"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with deleting data", error: err.message});
    })
})

//get specific Gig
////http//localhost:3001/gigs/get/<gigId> 



module.exports = router;