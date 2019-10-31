import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import { setUsers } from '../actions'
import DashboardHeader from './DashboardHeader'
import UserList from './UserList'
import CreateUser from './CreateUser'
import EditUser from './EditUser'

function DashboardContainer({ users, setListData }) {
	const [isDataFetched, setIsDataFetched] = useState(false)

	useEffect(() => {
		if (!users.length && !isDataFetched) {
			fetch('https://jsonplaceholder.typicode.com/users')
				.then(response => response.json())
				.then(json => {
					setIsDataFetched(true)
					setListData(json)
				})
		}
	}, [setListData, users.length, isDataFetched])

	return (
		<React.Fragment>
			<DashboardHeader />
			<Router>
				<Switch>
					<Route path="/users/:id">
						<EditUser />
					</Route>
					<Route path="/users">
						<CreateUser />
					</Route>
					<Route path="/">
						<UserList />
					</Route>
				</Switch>

			</Router>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const mapDispatchToProps = (dispatch) => ({
	setListData: (users) => {dispatch(setUsers(users))},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardContainer)