import {Schema, model, models } from 'mongoose';

const LiquorAdditionSchema = new Schema({
    employee: {
        type: String,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    liquorName: {
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


const LiquorAddition = models.LiquorAddition || model('InventoryDeletion', LiquorAdditionSchema);

export default LiquorAddition;