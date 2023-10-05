import UserModel from '../models/user.model.js'

async function createUser(req, res) {
    try {
        const { name, email } = req.body
        const newUser = new UserModel({ name, email })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        console.error('Error creating user:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export { createUser }
