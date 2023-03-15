const isAdmin = ({ authorizer }) => {
	return !!(authorizer && authorizer.claims['cognito:groups'] && authorizer.claims['cognito:groups'].includes('admin'));
};

export { isAdmin };
