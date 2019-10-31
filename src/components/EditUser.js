import React, { useState, useEffect } from 'react'
import { Card, ListGroup, Button, Form, ButtonToolbar } from 'react-bootstrap'
import { Redirect, useParams } from 'react-router-dom'
import isEmail from '../utils/isEmail'
import { editExistingUser } from '../actions'
import {connect} from 'react-redux'

function EditUser({editUser, users}) {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState({
		name: '',
		email: ''
	})
	const [shouldRedirect, setShouldRedirect] = useState(false)
	let { id } = useParams()

	useEffect(() => {
		const editedUser = users.find(el => el.id === parseInt(id))
		if (editedUser) {
			setName(editedUser.name)
			setEmail(editedUser.email)
		}
	}, [users, id])

	const validateForm = event => {
		event.preventDefault()
		event.stopPropagation()

		const nameValid = !!name
		const emailValid = isEmail(email)

		if (nameValid && emailValid) {
			fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
				method: 'PATCH',
				body: JSON.stringify({
					name: name,
					mail: email
				}),
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			})
				.then(response => response.json())
				.then(json => {
					editUser(json)
					setShouldRedirect(true)
				})
		} else {
			setErrors({
				name: nameValid ? '' : 'Name is required',
				email: emailValid ? '' : 'Valid email address is required'
			})
		}
	}

	if (shouldRedirect) {
		return (
			<Redirect to='/' />
		)
	}

	return (
		<Card body style={{ padding: '1rem' }}>
			<ListGroup>
				<ListGroup.Item
					style={{
						padding: '1rem',
						textAlign: 'left'
					}}>
					<h3>Form</h3>
				</ListGroup.Item>
				<ListGroup.Item>
					<Form noValidate onSubmit={validateForm}>
						<Form.Group
							controlId='formBasicName'
							style={{ textAlign: 'left' }}
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='text'
								placeholder='Name'
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
							<Form.Text style={{ color: 'red' }}>
								{ errors.name }
							</Form.Text>
						</Form.Group>
						<Form.Group
							style={{ textAlign: 'left' }}
							controlId='formBasicEmail'
						>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								onChange={(event) => setEmail(event.target.value)}
								value={email}
							/>
							<Form.Text style={{ color: 'red' }}>
								{ errors.email }
							</Form.Text>
						</Form.Group>
						<ButtonToolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
							<Button
								variant='secondary'
								onClick={() => setShouldRedirect(true)}
							>
								Cancel
							</Button>
							<Button
								style={{ marginLeft: '1rem' }}
								variant='primary'
								type='submit'
							>
								Submit
							</Button>
						</ButtonToolbar>
					</Form>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	)
}


const mapDispatchToProps = (dispatch) => ({
	editUser: (user) => {dispatch(editExistingUser(user))},
})

const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditUser)