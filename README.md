# E-commerce Backend Redesign and Optimization

## Overview
This project involves the redesign and optimization of a monolithic backend system into a set of microservices for an e-commerce web application. The goal was to improve scalability, performance, and maintainability while ensuring a seamless experience for users.

## Features
- **Scalable Products Microservice**: Built RESTful APIs to support the front-end of the e-commerce platform.
- **Efficient Data Transformation**: Implemented ETL processes to transform over 10 million lines of CSV data into a PostgreSQL database.
- **Performance Enhancement**: Improved request throughput by 300% through horizontal scaling.
- **Optimized Traffic Handling**: Deployed three AWS EC2 micro instances with an Nginx load balancer and caching mechanisms for efficient request management.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Cloud Services**: AWS EC2
- **Load Balancing & Caching**: Nginx, Redis
- **Data Processing**: ETL Pipelines, CSV Parsing
  
## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/rfp2212-SDC1-honeyDijon/SDC-PRODUCTS.git
   ```
2. Navigate to the project directory:
   ```sh
   cd SDC-PRODUCTS
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (e.g., `.env` file) with database credentials.
   ```sh
   LOADER_IO=your_loader_io_token  # Replace with your actual Loader.io token
   ```
7. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| GET    | /products            | Fetch all products |
| GET    | /products/:id        | Fetch a single product |

## Performance Benchmark
- **ETL Efficiency**: Processed 10M+ records.
- **Request Throughput**: Improved by 300% with optimized scaling and caching.

## Future Improvements
- Implement POST, PUT, and DELETE functionality for products.
- Implement GraphQL support.
- Add unit and integration tests.
- Enhance security with authentication and authorization.
- Explore Dockerization for containerized deployment.

