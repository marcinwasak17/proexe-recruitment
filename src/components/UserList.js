import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Table, Card, ListGroup, Button, Modal } from 'react-bootstrap'
import UserListRow from './UserListRow'
import { Link } from 'react-router-dom'
import { deleteExistingUser } from '../actions'

function DashboardContainer({ users, deleteUser }) {
	const [displayModal, setDisplayModal] = useState(false)
	const [deletedUserId, setDeletedUserId] = useState(null)

	useEffect(() => {
		if (deletedUserId && !displayModal) {
			setDisplayModal(true)
		}
	}, [deletedUserId, displayModal])

	return (
		<Card body style={{ padding: '1rem' }}>
			<ListGroup>
				<ListGroup.Item
					style={{
						padding: '1rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					<h3>Users List</h3>
					<Link to='/users'>
						<Button variant="primary">Add new</Button>
					</Link>
				</ListGroup.Item>
				<ListGroup.Item>
					<Table responsive bordered hover>
						<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Username</th>
							<th>City</th>
							<th>Email</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
						</thead>
						<tbody>
						{
							!!users.length ?
								users.map((user) => (
									<UserListRow
										user={user}
										key={`user-list-row-${user.id}`}
										setDeletedUserId={setDeletedUserId}
									/>
								))
								:
								<tr>There are no users to display</tr>
						}
						</tbody>
					</Table>
				</ListGroup.Item>
			</ListGroup>
			<Modal show={displayModal} onHide={() => setDisplayModal(false)}>
				<Modal.Dialog>
					<Modal.Header closeButton>
						<Modal.Title>Delete user id {deletedUserId}</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<p>Are you sure you want to delete user id {deletedUserId}?</p>
					</Modal.Body>

					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => {
								setDeletedUserId(null)
								setDisplayModal(false)
							}}
						>Cancel</Button>
						<Button
							variant="danger"
							onClick={() => {
								setDisplayModal(false)
								fetch(`https://jsonplaceholder.typicode.com/users/${deletedUserId}`, {
									method: 'DELETE'
								})
									.then(() => {
										deleteUser(deletedUserId)
										setDeletedUserId(null)
										setDisplayModal(false)
									})
							}}
						>Delete</Button>
					</Modal.Footer>
				</Modal.Dialog>
			</Modal>
		</Card>
	)
}

const mapDispatchToProps = (dispatch) => ({
	deleteUser: (userId) => {dispatch(deleteExistingUser(userId))},
})

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DashboardContainer)