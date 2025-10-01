# Docker Build and Run Script for Windows PowerShell

Write-Host "Building IPNOTEC.VIP Docker Image..." -ForegroundColor Green

# Build the Docker image
docker build -t ipnotec-vip .

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting container on port 1123..." -ForegroundColor Green
    
    # Stop and remove existing container if it exists
    docker stop ipnotec-vip 2>$null
    docker rm ipnotec-vip 2>$null
    
    # Run the container
    docker run -d -p 1123:1123 --name ipnotec-vip ipnotec-vip
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ Container started successfully!" -ForegroundColor Green
        Write-Host "✓ Application is running at http://localhost:1123" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Useful commands:" -ForegroundColor Yellow
        Write-Host "  View logs:    docker logs -f ipnotec-vip" -ForegroundColor White
        Write-Host "  Stop:         docker stop ipnotec-vip" -ForegroundColor White
        Write-Host "  Restart:      docker restart ipnotec-vip" -ForegroundColor White
        Write-Host "  Remove:       docker rm -f ipnotec-vip" -ForegroundColor White
    } else {
        Write-Host "✗ Failed to start container" -ForegroundColor Red
    }
} else {
    Write-Host "✗ Build failed" -ForegroundColor Red
}
