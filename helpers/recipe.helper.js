const setUsersNames = async (recipes, User) => {
	let creator;
	let editor;
	const recipesToReturn = [];
	for (let r of recipes) {
		const recipe = await setUserName(r, User);
		recipesToReturn.push(recipe);
	}
	return recipesToReturn;
};

const setUserName = async (r, User) => {
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
	return recipe;
};

module.exports = {
	setUsersNames,
	setUserName
};
