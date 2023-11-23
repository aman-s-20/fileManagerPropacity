# File Manager System

## Overview

The File Manager System is a web application that allows users to organize and manage their files and folders. It provides a set of APIs to perform various file and folder operations, such as creating, renaming, moving, and deleting.

## Features

- **Create User:** We can create user for authentication.

- **Create Folders:** Users can create new folders to organize their files efficiently.

- **Create Subfolders:** Subfolders can be created inside existing folders for a hierarchical organization.

- **Upload Files:** Users can upload files to the appropriate folders.

- **Manage Files:** The system supports renaming, moving, and deleting files.

## Technologies Used

- **Node.js:** Backend runtime environment.

- **Express:** Web framework for building APIs.

- **PostgreSQL:** Database for storing file and folder metadata.

- **Sequelize:** ORM for interacting with the PostgreSQL database.

- **AWS S3:** Cloud storage for storing files.

- **JWT:** JSON Web Token for user authentication.

## Setup

1. Clone the repository.
   ```bash
   git clone https://github.com/aman-s-20/fileManagerPropacity.git
   ```
2. Install dependencies.
   ```bash
   cd fileManagerPropacity
   npm install
   ```
## Configuration
1. Set up your PostgreSQL database and AWS S3 bucket.
2. Create a .env file in the root directory and add the following:

  ```bash
    DB_HOST=your-db-host
    DB_USER=your-db-username
    DB_PASSWORD=your-db-password
    DB_NAME=your-db-name
    DB_PORT=your-db-port

    AWS_S3_BUCKET=your-s3-bucket
    AWS_ACCESS_KEY=your-access-key
    AWS_SECRET_KEY=your-secret-key
  ```

## Usage
   start the server
   ```bash
   npm start
   ```
   Test the APIs
   -Import the fileManager.postman_collection.json in postman 
   