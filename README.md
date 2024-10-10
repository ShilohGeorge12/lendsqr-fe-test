# Lendsqr Frontend Engineer Assessment

This repository contains the solution to the Lendsqr Frontend Engineer technical assessment. The project is built using **Next.js**, **TypeScript**, and **SCSS**,
following the provided Figma design and assessment instructions.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Mock API](#mock-api)
- [LocalStorage/IndexedDB Implementation](#localstorageindexeddb-implementation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Documentation](#documentation)

## Overview

At Lendsqr, web apps are used to reach over half a million customers. This project replicates part of the **Lendsqr Admin Console**, which allows lenders to manage users
effectively. The assessment focuses on building the following pages:

1. **Login Page**: User authentication with basic validation.
2. **Dashboard**: Displays a list of users fetched from a mock API.
3. **User Page**: Shows user records with links to individual profiles.
4. **User Details Page**: Displays details of a specific user. Information is stored in **localStorage** or **IndexedDB** for faster retrieval and offline functionality.

## Features

- **Login Page**: Simple login form with validation.
- **Dashboard**: Fetches 500 user records from a mock API.
- **User Page**: Displays a table of users with navigation to individual user profiles.
- **User Details Page**: Retrieves and stores user data using IndexedDB or localStorage for offline use.
- **Responsive Design**: Mobile-first approach using **SCSS** media queries.
- **Pixel-perfect Design**: UI matches the provided Figma design precisely.

## Tech Stack

- **Next.js**: React framework for server-side rendering and routing.
- **TypeScript**: Provides type safety for better code quality.
- **SCSS**: Preprocessor for writing more maintainable and modular CSS.
- **Mock API**: API data generated using mocky.io.
- **IndexedDB/LocalStorage**: Used for storing and retrieving user details locally.
- **Jest/React Testing Library**: For unit testing components.

## Project Structure

```
├── public/
├── src/
│   ├── api/              # Mock API setup
│   ├── components/       # Reusable components
│   ├── pages/            # Individual pages (Login, Dashboard, User, User Details)
│   ├── styles/           # SCSS files
│   ├── utils/            # Helper functions and utilities
│   ├── index.tsx         # Entry point for the application
└── package.json          # Project dependencies and scripts
```

## Installation & Setup

To run this project locally, follow these steps:

1. **Clone the repository**:

```bash
git clone git@github.com:<your-username>/lendsqr-fe-test.git
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the development server**:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Mock API

A mock API was used to simulate a database of 500 users. The API is created using **mocky.io** and is consumed via Axios for fetching the user data on the **Dashboard**
and **User Pages**.

## LocalStorage/IndexedDB Implementation

For the **User Details Page**, user information is stored in the browser using **IndexedDB** or **localStorage**. This allows for faster data retrieval and offline access
to user profiles. If the user details are not found in storage, they are fetched from the API and then cached locally.

## Testing

Unit tests have been written to cover key components of the application. These tests include:

- **Positive and Negative Scenarios**: Testing both valid and invalid states.
- **Component Rendering**: Ensuring components render as expected.
- **Snapshot Testing**: For visual consistency.

To run tests:

```bash
npm run test
```

## Deployment

The application has been deployed to **[Platform Name]**. You can view the live demo at the following URL:

[https://<your-name>-lendsqr-fe-test.<platform-domain>.com](https://<your-name>-lendsqr-fe-test.<platform-domain>.com)

## Screenshots

- **Login Page**:  
  ![Login](screenshots/login.png)
- **Dashboard Page**:  
  ![Dashboard](screenshots/dashboard.png)
- **User Page**:  
  ![User](screenshots/user.png)
- **User Details Page**:  
  ![User Details](screenshots/user-details.png)

## Documentation

A complete review of the project, including decisions made, trade-offs, and any deviations from the design, can be found in the documentation
[here](<link to your document>).

Additionally, you can watch a 3-minute video walkthrough of the application [here](<Loom video link>).
