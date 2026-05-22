# Saw Timba Company - Full Website

Modern React + Node.js + MySQL website for a saw timber/furniture business.

## Features

- Modern animated homepage
- Furniture product section
- Saw timber price list
- Services section
- Cart and order form
- Admin dashboard
- Add/update/delete products
- Add/update/delete saw timber prices
- MySQL database included
- Backend API included
- Responsive mobile design

## Folder Structure

```txt
frontend/   React Vite website
backend/    Node Express API
database/   MySQL database SQL file
```

## How to Run

### 1. Import database
Open phpMyAdmin and import:

```txt
database/saw_timba.sql
```

### 2. Setup backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL:

```txt
http://localhost:5000
```

If your MySQL port is 3307, change `.env`:

```env
DB_PORT=3307
```

### 3. Setup frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

## Admin Login

```txt
Email: admin@sawtimba.lk
Password: admin123
```

## Notes

This project is suitable for a university web project/demo. You can customize company name, images, prices, products, and contact details easily.
