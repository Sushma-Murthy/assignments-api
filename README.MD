# ASSIGNMENTS API
Dockerised service to create and serve assignments.

## Tech stack
ES6, Node.Js

## Setup
`npm install`

## Run
* **local**
  
`npm run start` || `npm run dev` (development friendly, uses nodemon)

* **Docker**
  
`docker build . -t <your username>/assignments-api`

`docker run -p 8080:8080 -d <your username>/assignments-api`

## Rest Api
Refer to swagger api docs for details - `http://localhost:8080/api-docs`

## Reference for developers/contributors
Code Linting: ESLint is enabled to verify the code quality and align with ECMASript6/Node standards.
```bash
npm run lint:check
npm run lint:fix
```

Code Consistency: Prittier is enabled to maintain code consistency.
```bash
npm run format:check
npm run format:write
```

Unit Testing: Test cases are written using jest 
```bash
npm run test
```

Note: Run the above scripts before commit

## Future Enhancements/TODOs
* Add precommit hook
* Add more unit test cases and improve code coverage
