import bcrypt from 'bcrypt';
import { creatUser, findUserByEmail } from '../models/Users.js';

export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Email y contraseña son requeridos" });
    }

    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
        return res.status(409).json({ error: "El usuario ya existe" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await creatUser(email, hashedPassword);

    if (!user) {
        return res.sendStatus(503);
    }

    res.status(201).json({ id: user.id, email: user.email });
};