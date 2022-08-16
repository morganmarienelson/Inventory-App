import {Schema, model, models } from 'mongoose';

const InventoryDeletionSchema = new Schema({
    employee: {
        type: String,
        required: true,
        unique: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantityAtDeletion: {
        type: Number,
        required: true,
    }
})


const InventoryDeletion = models.InventoryDeletion || model('InventoryDeletion', InventoryDeletionSchema);

export default InventoryDeletion;