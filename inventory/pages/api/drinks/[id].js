import connectMongo from '../../../utils/connectMongo'
import Drink from '../../../models/drink'

export default async function (req, res){
    await connectMongo();

    const {     query: { id },
        method
    } = req;


    switch(method) {
        case 'GET':
            try {
                const drink = await Drink.findById(id);
                if (!drink){
                    return res.status(400).json({ success: false});
                }

                res.status(200).json({ success: true, data: drink})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
            case 'PUT':
                try {
                    const drink = await Drink.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true,
                    });

                    if (!drink){
                        return res.status(400).json({ success: false})
                    }

                    res.status(200).json({ success: true, data: drink})
                } catch (error){
                    res.status(400).json({ success: false})
                } 
                break;
                case 'DELETE':
                    try {
                        const deletedNote = await Drink.deleteOne({_id: id});
    
                        if (!deletedNote){
                            return res.status(400).json({ success: false})
                        }
                        res.status(200).json({ success: true, data: {}})
                    } catch (error){
                        res.status(400).json({ success: false})
                    } 
                    break;
                default:
                res.status(400).json({success: false});
            break;
    }

}