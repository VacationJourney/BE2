export const UserRegResult = {
  
		__resolveType(obj, ctx, info) {
			if (obj.username) {
				return 'User';
			}
			if (obj.message) {
				return 'UserFoundError';
			}
			return null;
		},
	
}