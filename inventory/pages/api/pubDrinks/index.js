import connectMongo from '../../../utils/connectMongo'
import PubDrink from '../../../models/pubDrinksSchema'

export default async function (req, res){
    await connectMongo();

    const {method} = req;

    switch(method) {
        case "GET":
            try {
                const drinks = await PubDrink.find({});
                res.status(200).json({ success: true, data: drinks})
            } catch (error){
                res.status(400).json({ success: false})
            }
            break;
            case "POST":
                try {
                    const drink = await PubDrink.create(req.body)
                    res.status(200).json({ success: true, data: drink})
                } catch (error){
                    res.status(400).json({ success: false})
                } 
                break;
                default:
                res.status(400).json({success: false});
            break;

    }
}