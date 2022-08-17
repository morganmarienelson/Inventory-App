import connectMongo from '../../../utils/connectMongo'
import InventoryAddition from '../../../models/inventoryAdditionSchema'

export default async function (req, res){
    await connectMongo();

    const {method} = req;

    switch(method) {
        case "GET":
            try {
                const additions = await InventoryAddition.find({});
                res.status(200).json({ success: true, data: additions})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
            case "POST":
                try {
                    const addition = await InventoryAddition.create(req.body)
                    res.status(200).json({ success: true, data: addition})
                } catch (error){
                    res.status(400).json({ success: false})
                } 
                break;
                default:
                res.status(400).json({success: false});
            break;

    }
}