import {Schema, model, models } from 'mongoose';

const InventoryDeletionSchema = new Schema({
    employee: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    side: {
        type: String,
        required: true,
    }
})

const InventoryDeletion = models.InventoryDeletion || model('InventoryDeletion', InventoryDeletionSchema);

export default InventoryDeletion;