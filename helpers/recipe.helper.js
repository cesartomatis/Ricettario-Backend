const setUsersNames = async (recipes, User) => {
	let creator;
	let editor;
	const recipesToReturn = [];
	for (let r of recipes) {
		const recipe = r.toObject();
		creator = await User.findById(r.createdBy);
		if (creator) {
			const { firstName, lastName, _id, email } = creator;
			recipe.createdBy = { firstName, lastName, _id, email };
		}
		editor = await User.findById(r.createdBy);
		if (editor) {
			const { firstName, lastName, _id, email } = editor;
			recipe.editedBy = { firstName, lastName, _id, email };
		}
		recipesToReturn.push(recipe);
	}
	return recipesToReturn;
};

module.exports = {
	setUsersNames
};
