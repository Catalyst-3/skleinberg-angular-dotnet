# Steven's Todo App
This is the todo app Steven made on the bench using Angular and ASP.net.

# Development Setup

## Local Requirements

 - Docker
 - Node.js & npm
 - Angular CLI 19+
 - .NET SDK 9.0+
 - Entity Framework CLI
 - PostgreSQL Client

## Clone the Repository

    git clone git@github.com:Catalyst-3/skleinberg-angular-dotnet.git
    cd skleinberg-angular-dotnet

## Configure Environment Variables

Create an environment file in the root directory .env based on the example provided in .env.example

## Install Dependencies

#### Frontend: Install Angular Packages

    cd frontend
    npm install
   
 Ensure all Angular dependencies are installed.

#### Backend: Install .NET Dependencies

    cd ../backend
    dotnet restore

Ensure all .NET dependencies are installed.

## Apply Database Migrations Locally

Before starting Docker, apply the database migrations from the backend directory:

    cd backend
    dotnet ef database update


## Start the app
Navigate to the root directory of the app, then build and start the frontend, backend, and database containers.

    cd ..
    docker-compose up -d --build
## Verify the app is running
Once the containers have been built and are running you can access the app at:  http://localhost:4200/

The backend API will be available at http://localhost:8080/

## Testing
Tests for the app can be run from the front end directory using ng   test

    cd frontend
    ng test
## Stopping the app
To stop all containers:

    docker-compose down


To stop and remove all volumes (including database data):

    docker-compose down -v
