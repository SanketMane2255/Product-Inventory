# Inventory Management System

A single-page application (SPA) for managing product inventory for a manufacturing unit in Pune. Built with React 18.2.0, TypeScript, Tailwind CSS, and Redux.

## Features

- **Product List View**: Display all products with their details (name, category, total cost, number of raw materials)
- **Add Product**: Create new products with raw materials
- **Edit Product**: Update existing products
- **Raw Material Management**: Add multiple raw materials to each product with automatic calculations
- **Dynamic Calculations**: Automatic calculation of:
  - Total Price (Quantity × Price)
  - Tax Amount (10% of Total Price)
  - Total Amount (Total Price + Tax)
  - Product Total Cost (Sum of all materials)
- **Form Validation**: Validates all required fields and ensures expiry date is in the future
- **Standalone Application**: Works without internet or external APIs

## Technology Stack

- **React**: 18.2.0
- **React-DOM**: 18.2.0
- **TypeScript**: 5.5.3
- **Tailwind CSS**: 3.4.1
- **Redux Toolkit**: 2.0.1
- **React-Redux**: 9.0.4
- **Vite**: 5.4.2 (Build tool)

## Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager)

## Installation

1. Navigate to the project directory:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```