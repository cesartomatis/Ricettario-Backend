const setUsersNames = async (recipes, User) => {
	let creator;
	let editor;
	const recipesToReturn = [];
	for (let r of recipes) {
		const recipe = r.toObject();
		creator = await User.findById(r.createdBy);
		if (creator) {
			const { firstName, lastName, email } = creator;
			recipe.creator = { firstName, lastName, email };
		}
		editor = await User.findById(r.createdBy);
		if (editor) {
			const { firstName, lastName, email } = editor;
			recipe.editor = { firstName, lastName, email };
		}
		recipesToReturn.push(recipe);
	}
	return recipesToReturn;
};

module.exports = {
	setUsersNames
};
