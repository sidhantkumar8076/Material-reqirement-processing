# Material Requirement Processing - Backend

Material requirement processing system backend built with Node.js and Express.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Configure database in `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=material_requirement_db
DB_PORT=3306
```

3. Start the server:
```bash
npm run dev      # Development with auto-reload
npm start        # Production
```

## API Endpoints

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

## Database Schema

Tables:
- `materials` - Material inventory
- `requirements` - Material requirements
- `suppliers` - Supplier information
- `orders` - Purchase orders
