class ProjectileChallenge {
    constructor() {
        // Game elements
        this.cannon = document.querySelector('.cannon');
        this.cannonBarrel = document.querySelector('.cannon-barrel');
        this.projectile = document.querySelector('.projectile');
        this.target = document.querySelector('.target');
        this.obstacle = document.querySelector('.obstacle');
        this.trajectoryCanvas = document.getElementById('trajectory');
        this.ctx = this.trajectoryCanvas.getContext('2d');
        
        // Controls
        this.angleSlider = document.getElementById('angle');
        this.velocitySlider = document.getElementById('velocity');
        this.angleValue = document.getElementById('angle-value');
        this.velocityValue = document.getElementById('velocity-value');
        this.shootButton = document.getElementById('shoot');
        this.resetButton = document.getElementById('reset');
        
        // Game state
        this.currentLevel = 0;
        this.levels = this.createLevels();
        this.isShooting = false;
        this.projectilePosition = { x: 0, y: 0 };
        this.projectileVelocity = { x: 0, y: 0 };
        this.gravity = 0.5; // m/s² (dikurangi untuk membuat game lebih mudah)
        this.timeStep = 0.016; // ~60fps
        this.airResistance = 0.01; // Hambatan udara dikurangi
        
        // Initialize
        this.setupControls();
        this.setupCanvas();
        this.loadLevel(this.currentLevel);
    }

    createLevels() {
        return [
            {
                target: { x: 500, y: 100 },
                obstacle: null,
                description: "Level 1: Tembak target tanpa rintangan"
            },
            {
                target: { x: 500, y: 100 },
                obstacle: { x: 300, y: 0, width: 30, height: 150 },
                description: "Level 2: Hindari rintangan untuk mencapai target"
            },
            {
                target: { x: 500, y: 100 },
                obstacle: { x: 300, y: 0, width: 30, height: 150 },
                movingTarget: true,
                description: "Level 3: Target bergerak! Tembak saat target berada di posisi yang tepat"
            }
        ];
    }

    setupControls() {
        // Update displays when sliders change
        this.angleSlider.addEventListener('input', () => {
            const angle = this.angleSlider.value;
            this.angleValue.textContent = `${angle}°`;
            this.updateCannonAngle(angle);
        });

        this.velocitySlider.addEventListener('input', () => {
            const velocity = this.velocitySlider.value;
            this.velocityValue.textContent = `${velocity} m/s`;
        });

        // Shoot button
        this.shootButton.addEventListener('click', () => {
            if (!this.isShooting) {
                this.shoot();
            }
        });

        // Reset button
        this.resetButton.addEventListener('click', () => {
            this.reset();
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !this.isShooting) {
                this.shoot();
            } else if (e.key === 'r') {
                this.reset();
            }
        });
    }

    setupCanvas() {
        this.trajectoryCanvas.width = this.trajectoryCanvas.offsetWidth;
        this.trajectoryCanvas.height = this.trajectoryCanvas.offsetHeight;
    }

    updateCannonAngle(angle) {
        this.cannonBarrel.style.transform = `rotate(${-angle}deg)`;
    }

    loadLevel(levelIndex) {
        const level = this.levels[levelIndex];
        this.currentLevel = levelIndex;
        
        // Position target
        this.target.style.left = `${level.target.x}px`;
        this.target.style.bottom = `${level.target.y}px`;
        
        // Position obstacle if exists
        if (level.obstacle) {
            this.obstacle.style.display = 'block';
            this.obstacle.style.left = `${level.obstacle.x}px`;
            this.obstacle.style.height = `${level.obstacle.height}px`;
        } else {
            this.obstacle.style.display = 'none';
        }

        // Update level info
        document.querySelector('.level-info').textContent = level.description;
        
        this.reset();
    }

    shoot() {
        if (this.isShooting) return;
        
        this.isShooting = true;
        this.projectile.style.display = 'block';
        
        const angle = parseFloat(this.angleSlider.value);
        const velocity = parseFloat(this.velocitySlider.value);
        
        // Convert angle to radians and calculate initial velocity components
        const angleRad = angle * Math.PI / 180;
        this.projectileVelocity = {
            x: velocity * Math.cos(angleRad),
            y: velocity * Math.sin(angleRad)
        };
        
        // Set initial position
        this.projectilePosition = {
            x: 50, // Cannon position
            y: 50  // Cannon height
        };
        
        this.updateProjectilePosition();
        this.animate();
    }

    animate() {
        if (!this.isShooting) return;
        
        // Update position
        this.projectilePosition.x += this.projectileVelocity.x * this.timeStep;
        this.projectilePosition.y += this.projectileVelocity.y * this.timeStep;
        
        // Apply gravity and air resistance
        this.projectileVelocity.y -= this.gravity * this.timeStep;
        this.projectileVelocity.x *= (1 - this.airResistance);
        this.projectileVelocity.y *= (1 - this.airResistance);
        
        // Update visual position
        this.updateProjectilePosition();
        
        // Check collisions
        if (this.checkCollisions()) {
            this.isShooting = false;
            return;
        }
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }

    updateProjectilePosition() {
        this.projectile.style.left = `${this.projectilePosition.x}px`;
        this.projectile.style.bottom = `${this.projectilePosition.y}px`;
        
        // Draw trajectory
        this.drawTrajectory();
    }

    drawTrajectory() {
        this.ctx.clearRect(0, 0, this.trajectoryCanvas.width, this.trajectoryCanvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(50, this.trajectoryCanvas.height - 50);
        this.ctx.lineTo(this.projectilePosition.x, this.trajectoryCanvas.height - this.projectilePosition.y);
        this.ctx.strokeStyle = 'rgba(52, 152, 219, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    checkCollisions() {
        const projectileRect = this.projectile.getBoundingClientRect();
        const targetRect = this.target.getBoundingClientRect();
        const obstacleRect = this.obstacle.getBoundingClientRect();
        
        // Check if projectile is out of bounds
        if (this.projectilePosition.y < 0 || 
            this.projectilePosition.x > this.trajectoryCanvas.width) {
            return true;
        }
        
        // Check collision with target
        if (this.checkRectCollision(projectileRect, targetRect)) {
            this.levelComplete();
            return true;
        }
        
        // Check collision with obstacle
        if (this.obstacle.style.display !== 'none' && 
            this.checkRectCollision(projectileRect, obstacleRect)) {
            this.gameOver();
            return true;
        }
        
        return false;
    }

    checkRectCollision(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    reset() {
        this.isShooting = false;
        this.projectile.style.display = 'none';
        this.ctx.clearRect(0, 0, this.trajectoryCanvas.width, this.trajectoryCanvas.height);
    }

    gameOver() {
        alert('Game Over! Coba lagi dengan sudut dan kecepatan yang berbeda.');
        this.reset();
    }

    levelComplete() {
        alert('Level Selesai!');
        this.currentLevel++;
        if (this.currentLevel < this.levels.length) {
            this.loadLevel(this.currentLevel);
        } else {
            alert('Selamat! Anda telah menyelesaikan semua level!');
            this.currentLevel = 0;
            this.loadLevel(this.currentLevel);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectileChallenge();
}); 