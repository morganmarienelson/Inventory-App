import {Schema, model, models } from 'mongoose';

const DrinkSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    pubQuantity: {
        type: Number,
        required: true,
    },
    loungeQuantity: {
        type: Number,
        required: true,
    }
})


const Drink = models.Drink || model('Drink', DrinkSchema);

export default Drink;