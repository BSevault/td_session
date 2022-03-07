const pool = require('../config/database');

module.exports = {
    register: async (req, res) => {
        const { login, password } = req.body

        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("CALL insertUser(?,?)", [login, password]);
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    login: async (req, res) => {
        const { login, password } = req.body

        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("CALL checkCredentials(?,?)", [login, password]);
            const data = result[0][0];
            req.session.uid = data.id;  // id user stocké dnas le cookie, les infos de la session transit via les headers, "uid" est nommé librement
            req.session.email = data.email;
            return res.status(200).json({ success: data });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    checkLoginStatus: async (req, res, next) => {
        const { uid, email } = req.session;
        if (uid && email) {
            // return res.status(200).json({ success: { uid, email } });
            return next();  
        }
        return res.status(401).send({message: "Vous n'êtes pas connecté."});
        
    },
    logout: (req, res) => {
        if (req?.session?.uid) {
            console.log(req.session);
            req.session.destroy();
            console.log(req.session);
            return res.status(200).send({ success: 'Vous êtes déconnecté.'})
        }
        return res.status(401).send({})
    }
}
