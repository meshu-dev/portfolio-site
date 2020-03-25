import React from 'react'
import ReCAPTCHA from "react-google-recaptcha";
 
function onChange(value) {
  console.log("Captcha value:", value);
}
 
export default () => (
  <ReCAPTCHA
    sitekey="Your client site key"
    onChange={onChange}
  />
)
