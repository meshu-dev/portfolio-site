# Portfolio website

I wanted a portfolio website to showcase my personal projects that I've worked on the past year or so. Originally I built the portfolio website in VanillaJS but later switched it to Gatsby as I thought having a static website is a much better solution.

## Install software
### NodeJS
- Install in ubuntu
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```
- Install in MacOS via brew 
```
brew install node
```
### Gatsby
- Install globally via NPM
```
npm install -g gatsby-cli
```
### Portfolio API
-  Go to https://github.com/meshu-dev/portfolio-api then follow install and setup instructions

### Mailer API
-  Go to https://github.com/meshu-dev/mailer then follow install and setup instructions

## Setup
- Install packages
```
npm install
```
- Copy the .env.example file to a new file named .env.development
```
cp .env.example .env.development
```
- Fill in .env variables in new file
    - Set PORTFOLIO_API_URL to the domain used to setup Portfolio API
    - Set MAILER_API_URL to the domain used to setup Mailer API
    - Set CAPTCHA_SITE_KEY to Google Captcha site key, you can get one at https://www.google.com/recaptcha
```
PORTFOLIO_API_URL=http://localhost:3001
MAILER_API_URL=http://localhost:8080
CAPTCHA_SITE_KEY=
ITEMS_PER_PAGE=6
```
## Commands
- Run website
```
npm run develop
```
- Build static files
```
npmn run build
```
- Run website with static files
```
npm run serve
```
