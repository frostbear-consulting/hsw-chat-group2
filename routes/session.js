const service = require('../services/session');
const constants = require('../services/constants');

module.exports = async function (router) {
    router.get('/api/session', async function (req, res) {
        res.json(req.session);
    });

    router.post('/api/session', async function (req, res) {
        try {
            const result = await service.createSession(
                req.body.name,
                req.body.password,
                req.app.get('db'),
            );

            res.json(result);
        } catch (e) {
            console.log('e', e, e.message);
            if (e.message === constants.USER_NOT_FOUND) {
                return res.status(404).json({ error: e.message });
            } else {
                return res.status(500).json({ error: 'Unexpected' });
            }
        }
    });
};
