import connectMongo from '../../../utils/connectMongo'
import Test from '../../../models/testModel'

export default async function addTest(req, res){
    console.log("Connecting to mongo");
    await connectMongo();
    console.log("Connected to mongo");
    console.log("Creating doc");
    const test = await Test.create(req.body);
    console.log("Created doc");
    res.json({test});
}

