import {Schema, model, models } from 'mongoose';

const InventoryDeletionSchema = new Schema({
    employee: {
        type: String,
        required: true,
    },
    liquorName: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
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


const InventoryDeletion = models.InventoryDeletion || model('InventoryDeletion', InventoryDeletionSchema);

export default InventoryDeletion;