# Multi-Store Order Management System

## Overview

This project is a Full Stack Order Management System developed as part of a Full Stack Developer Assessment.

The application allows multiple stores to manage orders, receive real-time updates, archive old orders, and view analytics.

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Zustand
* React Query
* Socket.IO Client

## Backend

* Node.js
* Express.js
* TypeScript (CommonJS)
* Socket.IO
* Zod

## Database

* MongoDB
* Mongoose

## DevOps

* Docker
* Docker Compose

---

# Features

## Task 1 - Multi Store Order Management

* Create Order
* Fetch Orders
* Store-wise Filtering
* Pagination
* Update Order Status

---

## Task 2 - Real-Time Notifications

* Socket.IO Integration
* Store-based Rooms
* Live Order Creation
* Live Status Updates
* Automatic Reconnection

---

## Task 3 - Data Archival & Analytics

### Archive

* Archive Orders older than 30 Days

### Analytics

* Orders Per Day
* Revenue Per Store
* Top 5 Selling Items

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
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── services
├── validators
├── utils
│
├── app.ts
└── server.ts
```

---

# Frontend Structure

```
frontend
│
├── src
│
├── app
├── components
├── hooks
├── providers
├── services
├── store
├── styles
├── types
└── utils
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd multi-store-order-management
```

---

## Backend

```bash
cd backend

npm install
```

Create `.env`

```
PORT=5000

MONGODB_URI=mongodb://localhost:27017/order_management

CLIENT_URL=http://localhost:3000
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Create `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api

NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

---

# Docker

Run

```bash
docker compose up --build
```

---

# API Documentation

## Orders

### Create Order

```
POST /api/orders
```

### Get Orders

```
GET /api/orders?store_id=STORE-1&page=1&limit=10
```

### Update Order Status

```
PATCH /api/orders/:id/status
```

---

## Archive

```
POST /api/archive-old-orders
```

---

## Analytics

### Orders Per Day

```
GET /api/analytics/orders-per-day
```

### Revenue Per Store

```
GET /api/analytics/revenue-per-store
```

### Top Selling Items

```
GET /api/analytics/top-items
```

---

# Socket Events

## Client Events

```
join-store

leave-store
```

## Server Events

```
order-created

order-status-updated
```

---

# Database Collections

## orders

```
store_id

items

total_amount

status

created_at
```

Indexes

* store_id
* created_at

---

## orders_archive

Stores archived orders older than 30 days.

---

# Frontend Pages

* Home
* Create Order
* Orders
* Update Status
* Analytics

---

# Scalability

* Pagination
* MongoDB Indexes
* React Query Cache
* Zustand State Management
* Store-based Socket Rooms
* Efficient Aggregation Pipelines

---

# Assumptions

* Order status follows:

  * PLACED
  * PREPARING
  * COMPLETED

* Orders older than 30 days are archived manually using the archive API.

* MongoDB is used as the primary database.

---

# Author

**Rahul Kalashetti**
