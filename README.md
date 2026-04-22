# Material Requirement Processing System

A comprehensive Material Requirement Processing System built with React, Node.js, and MySQL. This application manages materials, requirements, suppliers, and purchase orders efficiently.

## 🏗️ Project Structure

```
Material Requirement Processing/
├── server/                    # Node.js/Express Backend
│   ├── config/               # Database configuration
│   ├── controllers/          # Request handlers
│   ├── routes/              # API routes
│   ├── models/              # Data models
│   ├── server.js            # Main server file
│   ├── package.json         # Server dependencies
│   └── .env                 # Environment variables
│
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main App component
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Entry point
│   ├── index.html           # HTML template
│   ├── package.json         # Client dependencies
│   ├── vite.config.js       # Vite configuration
│   └── .env                 # Environment variables
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Installation

#### 1. Backend Setup

```bash
cd server
npm install
```

Configure MySQL connection in `.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=material_requirement_db
DB_PORT=3306
NODE_ENV=development
```

Start the backend:
```bash
npm run dev    # Development with auto-reload
npm start      # Production
```

#### 2. Frontend Setup

```bash
cd client
npm install
```

Configure API URL in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📋 Features

### Dashboard
- Overview of all materials, requirements, suppliers, and orders
- Quick statistics

### Materials Management
- View all materials
- Add new materials
- Edit material details
- Delete materials
- Track quantity and costs

### Requirements Management
- Create material requirements for projects
- Track requirement status (pending, approved, completed, cancelled)
- Set priority levels (low, medium, high)
- Link requirements to materials

### Suppliers Management
- Manage supplier information
- Track contact details and locations
- Monitor lead times
- Build supplier relationships

### Orders Management
- Create purchase orders for materials
- Track order status (pending, confirmed, shipped, delivered)
- Monitor delivery dates
- Calculate total order amounts

## 🗄️ Database Schema

### Materials Table
- `id` - Unique identifier
- `name` - Material name
- `description` - Material description
- `unit` - Unit of measurement
- `quantity_required` - Required quantity
- `quantity_available` - Available quantity
- `reorder_level` - Minimum reorder level
- `unit_cost` - Cost per unit
- `category` - Material category
- `status` - Active/Inactive

### Requirements Table
- `id` - Unique identifier
- `material_id` - Reference to material
- `project_name` - Associated project
- `required_quantity` - Quantity needed
- `required_date` - Delivery date
- `priority` - Priority level
- `status` - Current status
- `notes` - Additional notes
- `created_by` - Person who created

### Suppliers Table
- `id` - Unique identifier
- `name` - Supplier name
- `contact_person` - Contact name
- `email` - Email address
- `phone` - Phone number
- `address` - Full address
- `city`, `state`, `country` - Location details
- `lead_time_days` - Delivery lead time
- `status` - Active/Inactive

### Orders Table
- `id` - Unique identifier
- `requirement_id` - Reference to requirement
- `supplier_id` - Reference to supplier
- `material_id` - Reference to material
- `quantity_ordered` - Order quantity
- `order_date` - Date of order
- `expected_delivery_date` - Expected delivery
- `actual_delivery_date` - Actual delivery
- `status` - Order status
- `total_amount` - Total cost

## 🔌 API Endpoints

### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Create material
- `PUT /api/materials/:id` - Update material
- `DELETE /api/materials/:id` - Delete material

### Requirements
- `GET /api/requirements` - Get all requirements
- `GET /api/requirements/:id` - Get requirement by ID
- `POST /api/requirements` - Create requirement
- `PUT /api/requirements/:id` - Update requirement
- `DELETE /api/requirements/:id` - Delete requirement

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🛠️ Technology Stack

### Frontend
- React 18+
- React Router v6
- Axios
- Vite
- CSS3

### Backend
- Node.js
- Express.js
- MySQL2
- UUID
- CORS
- Body Parser
- Dotenv

## 📝 Example API Usage

```javascript
// Get all materials
GET http://localhost:5000/api/materials

// Create a material
POST http://localhost:5000/api/materials
{
  "name": "Steel Plates",
  "description": "High-quality steel plates",
  "unit": "kg",
  "quantity_required": 1000,
  "reorder_level": 100,
  "unit_cost": 50,
  "category": "Metal"
}

// Create a requirement
POST http://localhost:5000/api/requirements
{
  "material_id": "uuid-here",
  "project_name": "Building Project A",
  "required_quantity": 500,
  "required_date": "2024-12-31",
  "priority": "high",
  "notes": "Urgent material needed"
}
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=material_requirement_db
DB_PORT=3306
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🚦 Running Both Applications

1. **Terminal 1 - Backend**
```bash
cd server
npm run dev
```

2. **Terminal 2 - Frontend**
```bash
cd client
npm run dev
```

Access the application at `http://localhost:3000`

## 📦 Building for Production

### Backend
```bash
cd server
# No build needed, run with: npm start
```

### Frontend
```bash
cd client
npm run build
npm run preview
```

## 🤝 Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📧 Support

For support, issues, or questions, please create an issue in the repository.

---

**Happy Coding!** 🎉
