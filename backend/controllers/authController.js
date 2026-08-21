import {createUser} from "../services/authServices.js"
export const createNewUser = async (req, res) => {
    try {
        const {name, lastName, email, password } = req.body;
        const newUser = await createUser({ name, lastName, email, password })
        res.status(201).json({
            success: true,
            userData: newUser
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


