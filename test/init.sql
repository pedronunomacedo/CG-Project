-- Create the cookies table
CREATE TABLE IF NOT EXISTS cookies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  value TEXT NOT NULL
);