import React from "react"
import { Form, Button } from 'react-bootstrap';
import Layout from "../components/layout"
import Title from '../components/title'

export default class ContactPage extends React.Component {
	state = {
		name: "",
		email: "",
		message: ""
	}

	handleInputChange = event => {
		const target = event.target
		const value = target.value
		const name = target.name

		this.setState({
			[name]: value,
		})
	}

	handleSubmit = event => {
		event.preventDefault()
		alert(`Welcome ${this.state.name} ${this.state.email}!`)
	}

	render() {
		return <Layout>
			<Title text='Contact' />
			<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={this.state.name}
						onChange={this.handleInputChange}
						required />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlInput1">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						name="email"
						value={this.state.email}
						onChange={this.handleInputChange}
						required />
				</Form.Group>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Label>Message</Form.Label>
					<Form.Control
						as="textarea"
						name="message"
						value={this.state.message}
						onChange={this.handleInputChange}
						rows="10"
						required />
				</Form.Group>
				<Button variant="primary" type="submit">
				Send
				</Button>
			</Form>
		</Layout>
	}
}
