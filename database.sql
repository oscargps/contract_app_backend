  -- Create database contract_app
  CREATE DATABASE IF NOT EXISTS contract_app
  CHARACTER SET utf8
  COLLATE utf8_spanish_ci;

  -- use db
  USE contract_app;

    -- Catalogs table
  CREATE TABLE catalogs (
    id INT(11) NOT NULL AUTO_INCREMENT,
    type VARCHAR(100) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
  
  -- Users table
  CREATE TABLE users (
    user_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- Providers table
  CREATE TABLE providers (
    provider_id INT NOT NULL AUTO_INCREMENT,
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (provider_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- Supervisors table
  CREATE TABLE supervisors (
    supervisor_id INT NOT NULL ,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    position VARCHAR(100),
    department VARCHAR(100),
    status TINYINT(1) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (supervisor_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- Contracts table
  CREATE TABLE contracts (
    contract_id INT NOT NULL AUTO_INCREMENT,
    provider_id INT NOT NULL,
    contract_number VARCHAR(50) NOT NULL UNIQUE,
    purpose TEXT NOT NULL,
    contractual_obligations TEXT NOT NULL,
    total_value DECIMAL(15, 2) NOT NULL,
    monthly_value DECIMAL(15, 2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status INT(11) NOT NULL,
    early_termination_date DATE,
    supervisor_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (contract_id),
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id),
    FOREIGN KEY (supervisor_id) REFERENCES supervisors(supervisor_id),
    FOREIGN KEY (status) REFERENCES catalogs(id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- Extensions table
  CREATE TABLE extensions (
    extension_id INT NOT NULL AUTO_INCREMENT,
    contract_id INT NOT NULL,
    extension_number INT NOT NULL,
    additional_value DECIMAL(15, 2) NOT NULL,
    extension_duration VARCHAR(100) NOT NULL,
    extension_start_date DATE NOT NULL,
    extension_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status TINYINT(1) NOT NULL,
    PRIMARY KEY (extension_id),
    FOREIGN KEY (contract_id) REFERENCES contracts(contract_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- Sessions table
  CREATE TABLE sessions (
    session_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    jwt_token TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    PRIMARY KEY (session_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

  -- OTP table
  CREATE TABLE otp (
    otp_id INT NOT NULL AUTO_INCREMENT,
    provider_id INT NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    status TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (otp_id),
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;