# IPNOTEC.VIP - Docker Deployment Guide

This guide explains how to deploy the IPNOTEC.VIP application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, but recommended)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   - Open your browser and navigate to `http://localhost:1123`

3. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker Commands

1. **Build the Docker image:**
   ```bash
   docker build -t ipnotec-vip .
   ```

2. **Run the container:**
   ```bash
   docker run -d -p 1123:1123 --name ipnotec-vip ipnotec-vip
   ```

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:1123`

4. **Stop the container:**
   ```bash
   docker stop ipnotec-vip
   docker rm ipnotec-vip
   ```

## Docker Commands Reference

### View logs:
```bash
docker-compose logs -f
# or
docker logs -f ipnotec-vip
```

### Restart the container:
```bash
docker-compose restart
# or
docker restart ipnotec-vip
```

### Rebuild after code changes:
```bash
docker-compose up -d --build
# or
docker build -t ipnotec-vip . && docker run -d -p 1123:1123 --name ipnotec-vip ipnotec-vip
```

### Check container status:
```bash
docker-compose ps
# or
docker ps
```

### Execute commands inside the container:
```bash
docker-compose exec ipnotec-app sh
# or
docker exec -it ipnotec-vip sh
```

## Configuration

The application runs on **port 1123** by default. To change the port:

1. **Using Docker Compose:**
   - Edit `docker-compose.yml` and change the port mapping:
     ```yaml
     ports:
       - "YOUR_PORT:1123"
     ```

2. **Using Docker command:**
   ```bash
   docker run -d -p YOUR_PORT:1123 --name ipnotec-vip ipnotec-vip
   ```

## Environment Variables

You can add environment variables in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - PORT=1123
  - YOUR_ENV_VAR=value
```

Or pass them in the Docker run command:
```bash
docker run -d -p 1123:1123 -e YOUR_ENV_VAR=value --name ipnotec-vip ipnotec-vip
```

## Production Deployment

For production deployment:

1. **Enable HTTPS** by using a reverse proxy (Nginx, Traefik, etc.)
2. **Set up proper logging** and monitoring
3. **Use Docker secrets** for sensitive data
4. **Configure health checks** (already included in docker-compose.yml)
5. **Set up automatic restarts** (already configured with `restart: unless-stopped`)

## Troubleshooting

### Container won't start:
```bash
docker-compose logs
```

### Port already in use:
- Change the port in `docker-compose.yml` or stop the service using port 1123

### Build fails:
- Make sure you have enough disk space
- Try cleaning Docker cache: `docker system prune -a`

### Application not accessible:
- Check if container is running: `docker ps`
- Check firewall settings
- Verify port mapping is correct

## Architecture

The Docker setup uses a multi-stage build:
1. **deps**: Installs dependencies
2. **builder**: Builds the Next.js application
3. **runner**: Production runtime with minimal footprint

The final image is optimized for production with:
- Alpine Linux base (minimal size)
- Non-root user for security
- Standalone output for faster startup
- Health checks for container orchestration

## Support

For issues and questions, please refer to the project documentation or create an issue in the repository.
