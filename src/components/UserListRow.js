import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function UserListRow({ user, setDeletedUserId }) {

	return (
		user &&
		<tr>
			<th>{ user.id }</th>
			<th>{ user.name }</th>
			<th>{ user.username }</th>
			<th>{ user.address && user.address.city }</th>
			<th>{ user.email }</th>
			<th>
				<Link to={`/users/${user.id}`}>
					<Button variant='primary'>Edit</Button>
				</Link>
			</th>
			<th>
				<Button onClick={() => setDeletedUserId(user.id)} variant='danger'>Delete</Button>
			</th>
		</tr>
	)
}

export default UserListRow