# My React App

This project is a modern React application built with TypeScript, Redux Toolkit (including RTK Query), React Router, Tailwind CSS, Webpack, Babel, and Jest with React Testing Library. The backend is implemented with Node.js and is run using nodemon.

## Features

- **TypeScript:** Strongly-typed code for increased quality.
- **Redux Toolkit & RTK Query:** Efficient state management and API communication.
- **React Router:** Client-side routing.
- **Tailwind CSS:** Fast styling using utility classes.
- **Webpack & Babel:** Bundling and transpiling for development and production.
- **Jest & React Testing Library:** Unit and integration testing to ensure code reliability.
- **Nodemon:** Automatically restarts the Node.js server during development.

## Installation

1. **Clone the repository:**
    ```
    git clone https://github.com/nasrin-jafari/shatel-task
   ```
   ```
   cd shatel-task
   ```

2.Install dependencies: 
```
  npm install
```


## Running the Application
Development Mode
Start the development server with:
```
    npm run dev
```
Then open your browser and navigate to http://localhost:3000 


## Production Build
Create a production build by running:
```
   npm run build
```


## Running Tests
Execute all tests (Jest with React Testing Library) in watch mode:
   npm run test


## Running the Backend Server
If your backend server is built with Node.js and uses nodemon, start it with:
```
   nodemon server/index.js
```



## Project Structure
```
shatel-task/
├── public/                  # Static files (e.g., index.html)
├── src/                     # Source code
│   ├── components/          # Reusable components
│   │   ├── Molecules/       # UI molecules (e.g., AddPost, EditPost)
│   │   └── Organisms/       # Complex components (e.g., PostList, CustomTable, CustomModal, CustomForm)
│   ├── pages/               # Main pages (e.g., Posts, Login)
│   ├── redux/               # Redux configuration, slices, and RTK Query services
│   ├── constants/           # Constants (e.g., postFields, rowsPerPageOptions)
│   ├── types/               # TypeScript type definitions
│   └── index.tsx            # Application entry point
├── dist/                    # Production build output
├── package.json             # Project settings and dependencies
├── tsconfig.json            # TypeScript configuration
├── webpack.config.js        # Webpack configuration
└── .gitignore               # Files ignored by Git
```

