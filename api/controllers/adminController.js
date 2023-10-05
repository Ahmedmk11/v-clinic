import mongoose  from 'mongoose';
import adminModel from '../models/adminModel.js';

const addAdmin = async (req, res) => {
    const fetchedAdmin = await adminModel.find();
    console.log(req.body)
    for(let i = 0 ; i < fetchedAdmin.length; i++)
        if (fetchedAdmin.at(i).Username === req.body.Username){
            res.status(500).send({message:"this username is in use"})
            return
        }
    const newAdmin = new adminModel(req.body)
    newAdmin.save().then(result => res.status(200).send(result))
}

const getUser = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(500).send({error: "invalid id"})

    if (req.body.type === 'admin'){
        const ret = await adminModel.findById(id)
        if (ret) {
            res.status(200).json(ret)
        }
        else{
            res.status(404).send({error: "user not found"})
        }
    }
    else
        res.status(500).send({error:"invalid type of user"})
}

// const getUsers = async (req, res) => {

// }

const adminController = {addAdmin, getUser}
export default adminController