import connectMongo from '../../../utils/connectMongo'
import LiquorAddition from '../../../models/liquorAdditionSchema'

export default async function (req, res){
    await connectMongo();

    const {method} = req;

    switch(method) {
        case "GET":
            try {
                const addedLiquors = await LiquorAddition.find({});
                res.status(200).json({ success: true, data: addedLiquors})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
        case "POST":
            try {
                const addedLiquor = await LiquorAddition.create(req.body)
                res.status(200).json({ success: true, data: addedLiquor})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
        default:
            res.status(400).json({success: false});
            break;

    }
}