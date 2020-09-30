const jwt = require('jsonwebtoken');
interface User {
	id: string;
	username: string;
}

module.exports = ({id, username}: User) => {
	const payload = {
		id: id,
	  username: username
	};
  
	const secret = process.env.JWT_SECRET;
  
	const options = {
	  expiresIn: "3h",
	};
  
	return jwt.sign(payload, secret, options); 
  }