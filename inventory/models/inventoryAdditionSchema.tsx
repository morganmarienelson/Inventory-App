import {Schema, model, models } from 'mongoose';

const InventoryAdditionSchema = new Schema({
    employee: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantityBefore: {
        type: Number,
        required: true,
    },
    quantityAdded: {
        type: Number,
        required: true,
    },
    quantityAfter: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: false,
    },
    side: {
        type: String,
        required: true,
    }
})


const InventoryAddition = models.InventoryAddition || model('InventoryAddition', InventoryAdditionSchema);

export default InventoryAddition;