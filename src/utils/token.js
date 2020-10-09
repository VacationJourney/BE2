const jwt = require('jsonwebtoken');

export const signToken = (user) => {
	const payload = {
		id: user.id,
	  username: user.username
	};
  
	const secret = process.env.JWT_SECRET;
  
	const options = {
	  expiresIn: "3h",
	};
  
	return jwt.sign(payload, secret, options); 
	}
	
	export const decodeToken = (req, requireAuth = true) => {
		const header = req.req.headers.authorization;
	
		if (header) {
				const token = header.replace('Bearer ', '');
				const decoded = jwt.verify(token, process.env.JWT_SECRET);
				return decoded;
		}
	
		if (requireAuth) {
				throw new Error('Authentication required')
		} 
		
		return null
	}