// routes/index.routes.js
import  express  from 'express';
import { getdatusuario, ping, login} from '../controllers/index.controllers.js';

const router = express.Router();

router.get('/ping',verifyToken, ping);

// Rutas protegidas
router.get('/getdatusuario', getdatusuario);

// Rutas de login

router.post('/login', login)
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

export default router;
