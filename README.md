# Password Strength Checker

A beginner cybersecurity project with two versions of a password strength checker:

1. **Python command-line tool** (`password_checker.py`)
2. **React web dashboard** (`password-dashboard/`)

![Dashboard screenshot](screenshot.png)

## Features

**React dashboard**
- Scores a password from 0 to 7 and rates it Weak, Medium or Strong
- Circular gauge that fills as the score goes up
- Checklist showing which checks pass or fail
- Tips on how to improve the password
- Show and hide button for the password field
- Session log that counts Weak, Medium and Strong checks (length and rating only)
- Automatic light and dark mode based on your system setting

**Python tool**
- Scores a password in the terminal
- Checks length, character types, common passwords and repeated patterns
- Gives tips to improve the password

## How the scoring works
- Length: 0 to 3 points (under 8, 8-11, 12-15, 16 or more)
- Character types: 1 point each for lowercase, uppercase, numbers and symbols
- Repeated or sequential characters (like `aaa` or `123`): minus 2 points
- Common passwords (like `password`) always score 0
- Rating: 0-3 Weak, 4-5 Medium, 6-7 Strong

## Security and privacy
- Passwords are checked only on your own device
- Nothing is sent to a server or stored
- The session log keeps only the length, score and rating

## Project structure
```
Password checker/
├── password_checker.py        Python command-line version
├── README.md
└── password-dashboard/        React web app
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
        ├── App.jsx            main page, state and layout
        ├── Meter.jsx          circular score gauge
        ├── passwordLogic.js   scoring logic
        ├── main.jsx           app entry point
        └── index.css          styles
```

## Run the Python version
```
python password_checker.py
```
Type a password when asked. Type `quit` to exit.

## Run the React version
Requires Node.js.
```
git clone https://github.com/rupalipawar5151-web/PassGuard.git
cd PassGuard/password-dashboard
npm install
npm run dev
```
Then open the link shown in the terminal.

## Built with
Python, React, Vite, JavaScript and CSS

## What I learned
- Why length matters more than complexity, and how dictionary attacks work
- Splitting logic (`passwordLogic.js`) from the interface (React components)
- Using React state and props to build a dashboard

