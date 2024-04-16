# NestJS Application API Documentation

## Overview

This documentation provides information on how to interact with the APIs of the NestJS application. The application allows users to perform various actions such as user authentication, company creation, and image uploading.

## Authentication

### User Login
- **Endpoint:** `POST /user/login`
- **Description:** Logs in a user with email and password.
- **Request:**
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response:**
  - `message` (string): Confirmation message.
  - `token` (string): Authentication token.

## User A Actions

### Create Company
- **Endpoint:** `POST /company`
- **Description:** Creates a new company.
- **Request:**
  - `name` (string): Company name.
  - `numberOfUsers` (number): Number of users in the company.
  - `numberOfProducts` (number): Number of products in the company.
- **Authentication:** Required (User A)
- **Response:**
  - `message` (string): Confirmation message.

## User B Actions

### Update Company Image
- **Endpoint:** `POST /image`
- **Description:** Updates the image for User A's company.
- **Request:**
  - `email` (string): User A's email.
  - `image` (file): Image file to upload.
- **Authentication:** Required (User B)
- **Response:**
  - `message` (string): Confirmation message.

