# Use the official MySQL image from the Docker Hub
FROM mysql:8.0

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=password

# Expose the default MySQL port
EXPOSE 3306

# Copy a custom MySQL configuration file if needed (optional)
# COPY ./my-custom.cnf /etc/mysql/conf.d/

# Start the MySQL service
CMD ["mysqld"]
