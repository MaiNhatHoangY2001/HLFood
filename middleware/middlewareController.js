const jswt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const middlewareController = {

	//verifyToken
	verifyToken: (req, res, next) => {
		const token = req.headers.token;
		if (token) {
			const accessToken = token.split(' ')[1];
			jswt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
				if (err) {
					return res.status(403).json('Token is not valid');
				}
				req.user = user;
				next();
			});
		} else{
			return res.status(401).json("You're not authenticated");
		}
	},
    
    verifyGoogleToken: async (token) => {
        try {
            const ticket = await client.verifyIdToken({
              idToken: token,
              audience:  GOOGLE_CLIENT_ID,
            });
            return { payload: ticket.getPayload() };
          } catch (error) {
            return res.status(401).json(`${error}: Invalid user detected. Please try again`);
          }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, ()=> {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                return res.status(401).json("You're not authenticated");
            }
        });
    },
	verifyTokenAndUserAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, ()=> {
            if(!req.user.admin){
                next();
            }
            else{
                return res.status(401).json("You're not authenticated");
            }
        });
    }
};

module.exports = middlewareController;