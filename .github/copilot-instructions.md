# Material Requirement Processing System - Setup Checklist

## Project Overview
This is a full-stack Material Requirement Processing System with:
- **Frontend**: React with Vite
- **Backend**: Node.js/Express
- **Database**: MySQL

## Getting Started

### 1. Database Setup
Update the `.env` file in the `/server` folder with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=material_requirement_db
```

### 2. Backend Installation and Setup
```bash
cd server
npm install
npm run dev
```
Backend will run on: `http://localhost:5000`

### 3. Frontend Installation and Setup
```bash
cd client
npm install
npm run dev
```
Frontend will run on: `http://localhost:3000`

## Available Routes

### Dashboard
- `/` - Main dashboard with statistics

### Management Pages
- `/materials` - Manage materials inventory
- `/requirements` - Manage material requirements
- `/suppliers` - Manage supplier information
- `/orders` - Manage purchase orders

## Key Features

✅ **Material Management** - Add, edit, and delete materials
✅ **Requirements Tracking** - Create and track material requirements
✅ **Supplier Management** - Manage supplier details and lead times
✅ **Order Management** - Create and track purchase orders
✅ **Dashboard** - Overview of all metrics
✅ **Responsive Design** - Works on desktop and mobile

## API Endpoints

All endpoints are prefixed with `/api`

- Materials: `/materials`
- Requirements: `/requirements`
- Suppliers: `/suppliers`
- Orders: `/orders`

Each resource supports:
- `GET` - Retrieve list or single item
- `POST` - Create new item
- `PUT` - Update item
- `DELETE` - Delete item

## Database Auto-Initialization

The database tables are automatically created when the server starts:
- `materials` table
- `requirements` table
- `suppliers` table
- `orders` table

## Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Verify credentials in `.env` file
- Check if port 3306 is accessible

### Port Already in Use
- Backend (5000): Change `PORT` in `.env`
- Frontend (3000): Vite will ask to use another port

### CORS Issues
- Backend CORS middleware is configured
- API URL in frontend `.env` must match backend

## Next Steps

1. Install dependencies: `npm install` (both folders)
2. Update MySQL credentials
3. Start backend and frontend
4. Navigate to `http://localhost:3000`
5. Start adding materials, requirements, suppliers, and orders

## Support

Check the README files in both `/client` and `/server` folders for more details.
