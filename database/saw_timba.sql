CREATE DATABASE IF NOT EXISTS saw_timba_db;
USE saw_timba_db;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image VARCHAR(500),
  description TEXT,
  stock INT DEFAULT 0,
  is_featured TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS timber_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  wood_type VARCHAR(100) NOT NULL,
  size VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  availability VARCHAR(50) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  address TEXT NOT NULL,
  items JSON NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (name, email, password) VALUES
('Admin', 'admin@sawtimba.lk', 'admin123');

INSERT INTO products (name, category, price, image, description, stock, is_featured) VALUES
('Modern Teak Dining Table', 'Furniture', 85000.00, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80', 'Premium teak dining table for family homes.', 8, 1),
('Luxury Wooden Sofa Set', 'Furniture', 145000.00, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80', 'Comfortable wooden sofa set with modern finishing.', 5, 1),
('Office Wooden Desk', 'Furniture', 42000.00, 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80', 'Strong office desk for home and business use.', 12, 1),
('Mahogany Bed Frame', 'Furniture', 98000.00, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', 'Elegant bed frame made with quality mahogany wood.', 6, 0),
('Kitchen Cabinet Set', 'Furniture', 175000.00, 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=900&q=80', 'Custom kitchen cabinet set with polished finish.', 4, 1);

INSERT INTO timber_prices (wood_type, size, unit, price, availability) VALUES
('Teak', '2 x 4 inch', 'Per feet', 950.00, 'Available'),
('Mahogany', '2 x 4 inch', 'Per feet', 720.00, 'Available'),
('Jack Wood', '2 x 4 inch', 'Per feet', 580.00, 'Available'),
('Kumbuk', '3 x 6 inch', 'Per feet', 1150.00, 'Limited'),
('Pine', '2 x 2 inch', 'Per feet', 320.00, 'Available');
