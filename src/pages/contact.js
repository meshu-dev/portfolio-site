import React from "react"
import { Form, Button } from 'react-bootstrap';
import APIUtils from '../common/APIUtils';
import Layout from '../components/layout'
import Title from '../components/title'
import Recaptcha from 'react-google-invisible-recaptcha';

export default class ContactPage extends React.Component {
	state = {
		isSent: false,
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
		this.recaptcha.execute()
	}

	onResolved = async () => {
		let responseToken = this.recaptcha.getResponse()

		console.log('responseToken: ', responseToken);

		if (responseToken) {
			let isSent = await this.sendEmail(responseToken)

			this.setState({
				['isSent']: isSent
			})
		}
	}

	sendEmail = async (captchaToken) => {
		let apiUtils = new APIUtils(
		  process.env.MAILER_API_URL
		);

		let result = await apiUtils.post(
		  `/send`,
		  {
		  	name: this.state.name,
		    email: this.state.email,
		    message: this.state.message,
		    captchaToken: captchaToken
		  }
		);

		return result.isSent ? true : false;
	}

	render() {
		return this.state.isSent === true ? (
			<Layout>
				<Title text='Contact' />
		  		<p>Message has been sent.</p>
		  		<p>You will be contacted back shortly.</p>
		  	</Layout>
		) : (
			<Layout>
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
			        <Recaptcha
			          ref={ ref => this.recaptcha = ref }
			          sitekey={ process.env.CAPTCHA_SITE_KEY }
			          onResolved={ this.onResolved } />
					<Button variant="primary" type="submit">
					Send
					</Button>
				</Form>
			</Layout>
		)
	}
}
