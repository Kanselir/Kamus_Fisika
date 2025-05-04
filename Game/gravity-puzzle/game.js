class GravityPuzzle {
    constructor() {
        this.grid = document.querySelector('.grid');
        this.ball = document.querySelector('.ball');
        this.levelInfo = document.querySelector('.level-info');
        this.currentLevel = 0;
        this.levels = this.createLevels();
        this.gravityDirection = 'down';
        this.isMoving = false;
        this.ballPosition = { x: 0, y: 0 };

        this.setupControls();
        this.loadLevel(this.currentLevel);
    }

    createLevels() {
        return [
            {
                width: 8,
                height: 8,
                ball: { x: 1, y: 1 },
                flag: { x: 6, y: 6 },
                walls: [
                    { x: 2, y: 2 },
                    { x: 2, y: 3 },
                    { x: 2, y: 4 },
                    { x: 2, y: 5 },
                    { x: 2, y: 6 },
                    { x: 2, y: 7 },
                    { x: 7, y: 1 },
                    { x: 7, y: 2 },
                    { x: 7, y: 3 },
                    { x: 7, y: 4 },
                    { x: 7, y: 5 },
                    { x: 7, y: 6 },
                    { x: 7, y: 7 }
                ],
                holes: []
            },
            {
                width: 10,
                height: 10,
                ball: { x: 1, y: 1 },
                flag: { x: 8, y: 8 },
                walls: [
                    // Dinding luar
                    { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 }, { x: 0, y: 9 },
                    { x: 9, y: 0 }, { x: 9, y: 1 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 }, { x: 9, y: 9 },
                    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
                    { x: 1, y: 9 }, { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
                    
                    // Dinding dalam
                    { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }, { x: 2, y: 6 }, { x: 2, y: 7 },
                    { x: 7, y: 2 }, { x: 7, y: 3 }, { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 6 }, { x: 7, y: 7 },
                    { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
                    { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 }, { x: 6, y: 7 },
                    
                    // Dinding penghalang
                    { x: 4, y: 4 }, { x: 4, y: 5 },
                    { x: 5, y: 4 }, { x: 5, y: 5 }
                ],
                holes: [
                    { x: 4, y: 4 },
                    { x: 5, y: 5 }
                ]
            },
            {
                width: 12,
                height: 12,
                ball: { x: 1, y: 1 },
                flag: { x: 10, y: 10 },
                walls: [
                    { x: 2, y: 2 },
                    { x: 2, y: 3 },
                    { x: 2, y: 4 },
                    { x: 2, y: 5 },
                    { x: 2, y: 6 },
                    { x: 2, y: 7 },
                    { x: 2, y: 8 },
                    { x: 2, y: 9 },
                    { x: 2, y: 10 },
                    { x: 2, y: 11 },
                    { x: 3, y: 1 },
                    { x: 4, y: 1 },
                    { x: 5, y: 1 },
                    { x: 6, y: 1 },
                    { x: 7, y: 1 },
                    { x: 8, y: 1 },
                    { x: 9, y: 1 },
                    { x: 10, y: 1 },
                    { x: 11, y: 1 },
                    { x: 11, y: 2 },
                    { x: 11, y: 3 },
                    { x: 11, y: 4 },
                    { x: 11, y: 5 },
                    { x: 11, y: 6 },
                    { x: 11, y: 7 },
                    { x: 11, y: 8 },
                    { x: 11, y: 9 },
                    { x: 11, y: 10 },
                    { x: 11, y: 11 }
                ],
                holes: [
                    { x: 4, y: 4 },
                    { x: 5, y: 5 },
                    { x: 6, y: 6 },
                    { x: 7, y: 7 },
                    { x: 8, y: 8 }
                ]
            }
        ];
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (this.isMoving) return;

            switch (e.key) {
                case 'ArrowUp':
                    this.setGravity('up');
                    break;
                case 'ArrowDown':
                    this.setGravity('down');
                    break;
                case 'ArrowLeft':
                    this.setGravity('left');
                    break;
                case 'ArrowRight':
                    this.setGravity('right');
                    break;
            }
        });

        const buttons = document.querySelectorAll('.control-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isMoving) return;
                const direction = button.getAttribute('data-direction');
                if (direction) {
                    this.setGravity(direction);
                }
            });
        });
    }

    setGravity(direction) {
        console.log('Setting gravity to:', direction);
        this.gravityDirection = direction;
        this.moveBall();
    }

    loadLevel(levelIndex) {
        const level = this.levels[levelIndex];
        this.grid.innerHTML = '';
        this.grid.style.gridTemplateColumns = `repeat(${level.width}, var(--grid-size))`;

        for (let y = 0; y < level.height; y++) {
            for (let x = 0; x < level.width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                this.grid.appendChild(cell);
            }
        }

        level.walls.forEach(wall => {
            const cell = this.getCell(wall.x, wall.y);
            if (cell) cell.classList.add('wall');
        });

        level.holes.forEach(hole => {
            const cell = this.getCell(hole.x, hole.y);
            if (cell) cell.classList.add('hole');
        });

        const flagCell = this.getCell(level.flag.x, level.flag.y);
        if (flagCell) flagCell.classList.add('flag');

        this.ballPosition = { x: level.ball.x, y: level.ball.y };
        this.updateBallPosition();

        this.levelInfo.textContent = `Level ${levelIndex + 1} dari ${this.levels.length}`;
    }

    getCell(x, y) {
        return document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    }

    updateBallPosition() {
        const gridSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));
        this.ball.style.left = `${this.ballPosition.x * gridSize}px`;
        this.ball.style.top = `${this.ballPosition.y * gridSize}px`;
    }

    moveBall() {
        if (this.isMoving) return;
        this.isMoving = true;

        let { x, y } = this.ballPosition;

        switch (this.gravityDirection) {
            case 'up': y--; break;
            case 'down': y++; break;
            case 'left': x--; break;
            case 'right': x++; break;
        }

        const nextCell = this.getCell(x, y);
        if (!nextCell || nextCell.classList.contains('wall')) {
            this.isMoving = false;
            return;
        }

        if (nextCell.classList.contains('hole')) {
            this.gameOver();
            return;
        }

        if (nextCell.classList.contains('flag')) {
            this.levelComplete();
            return;
        }

        this.ballPosition = { x, y };
        this.updateBallPosition();

        setTimeout(() => {
            this.isMoving = false;
            this.moveBall();
        }, 200);
    }

    gameOver() {
        alert('Game Over! Bola jatuh ke lubang.');
        this.loadLevel(this.currentLevel);
        this.isMoving = false;
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
        this.isMoving = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GravityPuzzle();
});
