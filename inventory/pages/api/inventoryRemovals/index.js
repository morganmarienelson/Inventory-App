import connectMongo from '../../../utils/connectMongo'
import InventoryRemoval from '../../../models/inventoryRemovalSchema'

export default async function (req, res){
    await connectMongo();

    const {method} = req;

    switch(method) {
        case "GET":
            try {
                const removals = await InventoryRemoval.find({});
                res.status(200).json({ success: true, data: removals})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
            case "POST":
                try {
                    const removal = await InventoryRemoval.create(req.body)
                    res.status(200).json({ success: true, data: removal})
                } catch (error){
                    res.status(400).json({ success: false})
                } 
                break;
                default:
                res.status(400).json({success: false});
            break;

    }
}