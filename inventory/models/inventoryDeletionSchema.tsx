import {Schema, model, models } from 'mongoose';

const InventoryDeletionSchema = new Schema({
    employee: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantityAtDeletion: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
})


const InventoryDeletion = models.InventoryDeletion || model('InventoryDeletion', InventoryDeletionSchema);

export default InventoryDeletion;