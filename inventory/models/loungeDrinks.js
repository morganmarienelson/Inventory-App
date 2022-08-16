import {Schema, model, models } from 'mongoose';

const LoungeDrinkSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})


const LoungeDrink = models.LoungeDrinkSchema || model('LoungeDrink', LoungeDrinkSchema);

export default LoungeDrink;