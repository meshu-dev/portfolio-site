import React, { Component } from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3'

class ExampleComponent extends Component {

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  onChange = (value) => {
  console.log("Captcha value:", value);
}

componentDidMount() {
  loadReCaptcha("6LcW5-MUAAAAAFmk2SVoaYXlA1zr7LcqkElFBAsQ");
}

  render() {
    return (
      <div>
      	<button onClick={executeCaptcha} />
        <ReCaptcha
            sitekey="6LcW5-MUAAAAAFmk2SVoaYXlA1zr7LcqkElFBAsQ"
            action='executeCaptcha'
            verifyCallback={this.verifyCallback}
            onChange={onChange}
        />

        <h2>Google ReCaptcha with React </h2>

        <code>
          1. Add <strong>your site key</strong> in the ReCaptcha component. <br/>
          2. Check <strong>console</strong> to see the token.
        </code>
      </div>
    );
  };
};

export default ExampleComponent;

