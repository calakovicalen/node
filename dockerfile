# Use the official MongoDB image from Docker Hub
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Set the default data directory
VOLUME /data/db

# Start MongoDB when the container starts
CMD ["mongod"]
