<p align="center">
  <h1 align="center">Jacket Tracker</h1>
</p>

[Access the application](https://jacket-tracker-90b5c.firebaseapp.com)

[![](https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png)](https://zenhub.com)

Status: v0.0.1 Release candidate

## What is Jacket Tracker?

- **Mobile Optimized** - Uses the Ionic framework to create a user-friendly mobile web application.
- **Uniform Checkout** - Students can checkout uniforms without logging in to the application.
- **Searchable Results** - Quickly search through uniform checkouts by a wide variety of fields.
- **Email Students** - Create reusable email templates or type a new email to send to any selected students.

# Installation Guide

## Requirements

### Globally installed packages
- [ionic](https://ionicframework.com/getting-started) v3.20.0+
- [node](https://nodejs.org/en/download/) v9.8.0+
- [npm](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions) v5.6.0+

### API Key config file
- Contact our team through our [slack channel](https://spring2018team7350.slack.com)  for the environment.ts file and copy it to the /src directory

## Build and Run

Follow the instructions to get the application source code running on your machine

1) Run 'git clone https://github.com/s-p-a-r-k/Jacket-Tracker.git'
3) Run 'npm install' from the project root
4) Run 'ionic serve' and the application will start running in your default browser

Note that common errors when trying to build and run the application include:

- **module not found error** - Ensure that you have run npm install and that all dependent packages are installed along with it.
- **tslint errors** - These can safely be ignored to run the application properly.
- **Cannot find module '../environment'** - Double check that you have gotten the most up-to-date environment.ts configuration file and moved it to the /src directory.

# Release Notes

## 0.0.1 (April 23, 2018)

### Features
- Mobile browser oriented UI
- New uniform piece registration
- New student uniform checkout without having to login
- Account management features (reset password, create new account, change email)
- Uniform lieutenants can email one or more selected students
- Option to send a previously-saved email template, or type a new email
- Searchable results by student or uniform fields
- Upload a new waiver to be displayed on uniform checkout
- Change a uniform's status (clean, dirty, alteration needed, etc.)

### Bug Fixes

### Known Issues
- You must enable popups during first time signin and accept the google agreement for emailing and waiver update features
- Application crashes if user ever closes the google agreement windows
- Cannot type custom notes into a uniform
- Names or emails with 15+ characters cause the search results table to be misshapen
- Modifying selected students information is not yet implemented (can simply delete student and recreate with proper information)
- After clicking 'Modify selected student's information' two identical pop-ups appear
- 'View Current Assignments' is not populating data
