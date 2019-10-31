const INITIAL_STATE = {
	users: []
}

export const rootReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'SET_USERS':
			return {
				...state,
				users: action.users
			}
		case 'CREATE_USER':
			return {
				...state,
				users: [
					...state.users,
					action.user
				]
			}
		case 'EDIT_USER':
			const editedElementIndex = state.users.findIndex(el => el.id === action.user.id)
			return {
				...state,
				users: [
					...state.users.slice(0, editedElementIndex),
					action.user,
					...state.users.slice(editedElementIndex + 1, state.users.length)
				]
			}
		case 'DELETE_USER':
			const deletedElementIndex = state.users.findIndex(el => el.id === action.userId)
			return {
				...state,
				users: [
					...state.users.slice(0, deletedElementIndex),
					...state.users.slice(deletedElementIndex + 1, state.users.length)
				]
			}
		default:
			return state
	}
}

