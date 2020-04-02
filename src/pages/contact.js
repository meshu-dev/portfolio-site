import React from "react"
import { Form, Button, Spinner } from 'react-bootstrap';
import Recaptcha from 'react-google-invisible-recaptcha';
import APIUtils from '../common/APIUtils';
import Layout from '../components/Layout/layout'
import Title from '../components/Layout/title'

import styles from '../styles/pages/contact.module.scss';

export default class ContactPage extends React.Component {
	state = {
		name: '',
		email: '',
		message: '',
		isSent: false,
		isLoading: false
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

		this.setState({
			isLoading: true
		})
		this.recaptcha.execute()
	}

	onResolved = async () => {
		let responseToken = this.recaptcha.getResponse()

		if (responseToken) {
			let isSent = await this.sendEmail(responseToken)

			this.setState({
				isSent: isSent,
				isLoading: false
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

		return result && result.isSent ? true : false;
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
					<Button id={ styles.contactbtn } variant="primary" type="submit">
						{
							this.state.isLoading === true
							?
							<div>
								<Spinner
								  as="span"
								  animation="border"
								  size="sm"
								  role="status"
								  aria-hidden="true"
								/>
								<span className={ styles.loadingText }>Loading...</span>
							</div>
							:
							<span>Send</span>
						}
					</Button>
				</Form>
			</Layout>
		)
	}
}
