import {pool} from '../db.js'
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export const ping = async (req,res) => {
    const [result] = await pool.query('SELECT "pong" AS result')
    res.json(result)
}

// gets generales
export const getdatusuario = async (req, res) => { 
    console.log(req.body)

    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de usuario' });
    }
}
//login
export const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const [rows] = await pool.query('SELECT * FROM ?? WHERE correo = ? AND contrasena = ?', [correo, contrasena]);
        
        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign({ 
                name: `${user.nombre} ${user.apellido}`,
            }, 'secretKey', { expiresIn: '1h' });

            res.json({ status: 200, message: 'Inicio de sesión exitoso', token , rows});
        } else {
            res.status(401).json({ status: 'fail', message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta de administrador' });
    }
    
}
