#!/bin/bash

# Docker Build and Run Script for Linux/Mac

echo "Building IPNOTEC.VIP Docker Image..."

# Build the Docker image
docker build -t ipnotec-vip .

if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo ""
    echo "Starting container on port 1123..."
    
    # Stop and remove existing container if it exists
    docker stop ipnotec-vip 2>/dev/null
    docker rm ipnotec-vip 2>/dev/null
    
    # Run the container
    docker run -d -p 1123:1123 --name ipnotec-vip ipnotec-vip
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✓ Container started successfully!"
        echo "✓ Application is running at http://localhost:1123"
        echo ""
        echo "Useful commands:"
        echo "  View logs:    docker logs -f ipnotec-vip"
        echo "  Stop:         docker stop ipnotec-vip"
        echo "  Restart:      docker restart ipnotec-vip"
        echo "  Remove:       docker rm -f ipnotec-vip"
    else
        echo "✗ Failed to start container"
        exit 1
    fi
else
    echo "✗ Build failed"
    exit 1
fi
