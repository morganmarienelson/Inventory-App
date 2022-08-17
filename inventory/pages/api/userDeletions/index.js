import connectMongo from '../../../utils/connectMongo'
import InventoryDeletion from '../../../models/inventoryDeletionSchema'

export default async function (req, res){
    await connectMongo();

    const {method} = req;

    switch(method) {
        case "GET":
            try {
                const deletions = await InventoryDeletion.find({});
                res.status(200).json({ success: true, data: deletions})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
            case "POST":
                try {
                    const deletionTest = await InventoryDeletion.create(req.body)
                    res.status(200).json({ success: true, data: deletionTest})
                } catch (error){
                    res.status(400).json({ success: false})
                } 
                break;
                default:
                res.status(400).json({success: false});
            break;

    }
}