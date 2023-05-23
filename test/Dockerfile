# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set the environment variables
ENV POSTGRES_USER cookies
ENV POSTGRES_PASSWORD cookies
ENV POSTGRES_DB cookies

# Copy the SQL script to initialize the database
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432