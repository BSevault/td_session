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
            req.session.uid = data.id;
            req.session.email = data.email;
            return res.status(200).json({ success: data });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    checkLoginStatus: async (req, res) => {
        const { uid, email } = req.session;
        if (uid && email) {
            return res.status(200).json({ success: { uid, email } });
        }
        return res.status(401).send();
        
    },
    logout: (req, res) => {
        if (req.session) {
            req.session.destroy();
            return res.status(200).send()
        }
        return res.status(400).send()
    }
}
