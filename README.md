# Multi-Store Order Management System

A Full Stack Order Management System built as part of a **Full Stack Developer Assessment**.

The application enables multiple stores to manage customer orders, receive real-time updates, archive old orders, and visualize business analytics through an intuitive dashboard.

---

# Features

## Task 1 – Multi-Store Order Management

- Create Orders
- View Orders
- Store-wise Order Filtering
- Pagination
- Update Order Status
- Soft Delete Orders

---

## Task 2 – Real-Time Notification System

Implemented using **Socket.IO**

### Features

- Real-time Order Creation
- Real-time Order Status Updates
- Store-based Socket Rooms
- Automatic Reconnection
- Live UI Refresh without page reload

---

## Task 3 – Data Archival & Analytics

### Archive

- Archive Orders older than N days (30 days by default)
- View Archived Orders
- Paginated Archived Orders

### Analytics

- Orders Per Day
- Revenue Per Store
- Top Selling Items
- Store-wise Revenue

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Zustand
- React Query (TanStack Query)
- Socket.IO Client
- Tailwind CSS
- Recharts

---

## Backend

- Node.js
- Express.js
- TypeScript (CommonJS)
- Socket.IO
- Zod Validation

---

## Database

- MongoDB
- Mongoose

---

## DevOps

- Docker
- Docker Compose

---

# Project Structure

```
multi-store-order-management

│
├── backend
│
├── frontend
│
├── docker-compose.yml
│
└── README.md
```

---

# Backend Structure

```
backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── validators
│   ├── utils
│   │
│   ├── app.ts
│   └── server.ts
```

---

# Frontend Structure

```
frontend
│
├── src
│   ├── app
│   ├── components
│   ├── hooks
│   ├── providers
│   ├── services
│   ├── store
│   ├── styles
│   ├── types
│   └── utils
```

---

# Prerequisites

Install the following before running the project.

- Node.js (18+)
- npm
- MongoDB
- Docker & Docker Compose (Optional)

---

# Setup Instructions

## Clone Repository

```bash
git clone <repository-url>

cd multi-store-order-management
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/order_management

CLIENT_URL=http://localhost:3000
```

Run Backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend

npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Run Frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:3000
```

---

# Docker Setup

Build and start the application

```bash
docker compose up --build
```

Stop Containers

```bash
docker compose down
```

---

# API Documentation

## Orders

### Create Order

**POST**

```
/api/orders
```

Request

```json
{
  "store_id": "247543",
  "customer_name": "Rahul",
  "items": [
    {
      "item_id": "ITEM001",
      "item_name": "Pizza",
      "qty": 2
    }
  ],
  "total_amount": 450
}
```

---

### Get Orders

**GET**

```
/api/orders?store_id=247543&page=1&limit=10
```

---

### Get Order By ID

**GET**

```
/api/orders/:store_id/:order_id
```

---

### Update Order Status

**PATCH**

```
/api/orders/:store_id/:order_id/status
```

Request

```json
{
  "status": "COMPLETED"
}
```

---

### Delete Order

**PATCH**

```
/api/orders/:store_id/:order_id/delete
```

---

## Stores

### Get Stores

**GET**

```
/api/stores?page=1&limit=10
```

---

## Archive

### Archive Old Orders

**POST**

```
/api/analytics/archive-old-orders
```

Request

```json
{
  "days": 30
}
```

---

### Get Archived Orders

**GET**

```
/api/analytics?page=1&limit=10
```

Optional Query Parameters

```
store_id
page
limit
```

---

## Analytics

### Orders Per Day

**GET**

```
/api/analytics/orders-per-day
```

---

### Revenue Per Store

**GET**

```
/api/analytics/revenue-per-store
```

---

### Top Selling Items

**GET**

```
/api/analytics/top-items
```

---

# Socket.IO Events

## Client Events

| Event | Description |
|--------|-------------|
| join-store | Join a specific store room |
| leave-store | Leave a specific store room |

---

## Server Events

| Event | Description |
|--------|-------------|
| order-created | Fired when a new order is created |
| order-status-updated | Fired when an order status changes |
| order-deleted | Fired when an order is deleted |

---

# Database Collections

## orders

Fields

- store_id
- order_id
- customer_name
- items
- total_items
- total_amount
- status
- created_at
- updated_at

Indexes

- store_id
- created_at

---

## orderarchives

Stores archived orders.

Fields

- store_id
- order_id
- customer_name
- items
- total_items
- total_amount
- status
- archived_at
- created_at
- updated_at

---

## stores

Fields

- store_id
- name
- address

---

# Frontend Pages

- Dashboard
- Store Listing
- Orders
- Create Order
- Order Details
- Analytics Dashboard
- Archived Orders

---

# Scalability & Performance

- MongoDB Indexing
- Pagination
- Store-wise Filtering
- Aggregation Pipelines
- React Query Caching
- Zustand Global State
- Socket.IO Room-based Communication
- Soft Delete Strategy
- Efficient Database Queries

---

# Assumptions

- Order status values are:

  - PLACED
  - PREPARING
  - COMPLETED

- Orders can be archived based on configurable days (30 days by default).

- MongoDB is used as the primary database.

- Each Store has a unique `store_id`.

---

# Author

**Rahul Kalashetti**
