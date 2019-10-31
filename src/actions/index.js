export const setUsers = users => ({
	type: "SET_USERS",
	users
})

export const createNewUser = user => ({
	type: "CREATE_USER",
	user
})

export const editExistingUser = user => ({
	type: "EDIT_USER",
	user
})

export const deleteExistingUser = userId => ({
	type: "DELETE_USER",
	userId
})