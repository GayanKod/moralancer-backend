const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gigSchema = new Schema({

    gigTitle : {
        type : String,
        required : true
    },

    gigCategory : {
        type : String,
        required : true
    },

    gigSearchTags : {
        type : String
    },

    gigBasicPriceDesc : {
        type : String
    },

    gigBasicPrice : {
        type : Number,
        required : true
    },

    gigStandardPriceDesc : {
        type : String
    },

    gigStandardPrice : {
        type : Number
    },

    gigPremiumPriceDesc : {
        type : String    
    },

    gigPremiumPrice : {
        type : Number
    },

    gigDesc : {
        type : String,
        required : true
    },

    gigReq : {
        type : String,
        required : true
    }

});

const Gig = mongoose.model("Gig", gigSchema);

module.exports = Gig; 