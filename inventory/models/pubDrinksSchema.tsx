import {Schema, model, models } from 'mongoose';

const PubDrinkSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    liquorName: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})


const PubDrink = models.PubDrink || model('PubDrink', PubDrinkSchema);

export default PubDrink;