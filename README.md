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
#### Enhanced Testing
Increase test coverage with more integration and performance tests to ensure the application can handle various scenarios robustly.

#### Advanced Error Handling
Integrate a more robust error handling mechanism with structured logging and monitoring for production readiness.

#### Scalability & Performance
Optimize the codebase and architecture for better scalability, especially under high-load conditions.
