import { Router } from 'express';
import userModel from '../models/user.js';

const router = Router();

router.get("/", async (req, res) => {
    const user = await userModel.find({});
    if (user?.length == 0) {
        return res.status(200).send({ msg: "No User Found" })
    }
    return res.status(200).send({ success: true, users: user });
})

router.post("/create", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send({ success: false, msg: "Provide all details" })
    }
    const newUser = new userModel();
    newUser.name = name;
    newUser.email = email;
    newUser.save();
    return res.status(201).send({ success: true, msg: "New User Created"})


})

router.put("/update/:id", async (req, res) => {
    const {id} = req.params;
    const { name, email } = req.body;
    if (!id) {
        return res.status(400).send({ msg: "id is required" })
    }
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(400).send({ success: false, msg: "User not found" })
    }
    await userModel.findByIdAndUpdate(id, {
        name, email
    });

    return res.status(200).send({ success: true, msg: "User Updated" })


})
router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send({ msg: "id is required" })
    }
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(400).send({ success: false, msg: "User not found" })
    }
    await userModel.findByIdAndDelete(id);

    return res.status(200).send({ success: true, msg: "User Deleted" })


})


export default router;