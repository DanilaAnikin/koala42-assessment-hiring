# Koala42 Assessment - Backend

### Description
1) In this project I'm using NestJS and DrizzleORM
2) Drizzle is initialized in /src/drizzle/drizzle.module.ts
3) Main code, which gets and returns data is located in /src/

   i. app.controller.ts - controller with only 1 Get method function

   ii. app.module.ts - module, which connects controller and service

   ii. app.service.ts - main code, which gets and returns the main data

### Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/DanilaAnikin/koala42-assessment-hiring.git
cd koala42-assessment-hiring
npm install
```
You'll need to add DATABASE_URL to your .env file

Running:
```bash
npm run start:dev
```

### Issues and posible improvements
#### Testing
If it should be a bigger project, I would add unit test and E2E tests. For this project it is not necessary.

#### Split code into multiple modules
If the project contained more modules, I should split it and create f.e. module for these statistics.
