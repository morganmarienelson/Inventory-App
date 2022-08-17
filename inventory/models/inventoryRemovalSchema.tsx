import {Schema, model, models } from 'mongoose';

const InventoryRemovalSchema = new Schema({
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
    quantityTaken: {
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


const InventoryRemoval = models.InventoryRemoval || model('InventoryRemoval', InventoryRemovalSchema);

export default InventoryRemoval;