const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeTables = async () => {
  try {
    const connection = await pool.getConnection();

    // Create admin table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('unread', 'read', 'archived') DEFAULT 'unread',
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        featured BOOLEAN DEFAULT false,
        image VARCHAR(500),
        image_color VARCHAR(50),
        technologies JSON,
        highlights JSON,
        metrics JSON,
        github VARCHAR(500),
        demo VARCHAR(500),
        year VARCHAR(10),
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Check if admin exists
    const [adminRows] = await connection.query(
      'SELECT * FROM admins WHERE email = ?',
      [process.env.ADMIN_EMAIL]
    );

    // Create default admin if doesn't exist
    if (adminRows.length === 0) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await connection.query(
        'INSERT INTO admins (name, email, password) VALUES (?, ?, ?)',
        [process.env.ADMIN_NAME, process.env.ADMIN_EMAIL, hashedPassword]
      );
      console.log('✅ Default admin user created');
    }

    connection.release();
    console.log('✅ Database tables created/verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing tables:', error.message);
    return false;
  }
};

// Initialize database
const initializeDatabase = async () => {
  const connected = await testConnection();
  if (connected) {
    await initializeTables();
  }
};

// Call initialization
initializeDatabase();

module.exports = pool;
