import React, { useState, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
    const snakeSize = 5;

    const [score, updateScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [snakeDots, setSnakeDots] = useState([[0, 0], [snakeSize, 0]]);
    const [foodDot, setFoodDot] = useState([10, 10]);
    const [direction, setDirection] = useState('RIGHT');
    const [speed, setSpeed] = useState(100);
    const [gameOver, setGameOver] = useState(false);

    const move = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];

        switch (direction) {
            case 'RIGHT':
                // if(direction == "LEFT")
                head = [head[0] + snakeSize, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - snakeSize, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + snakeSize];
                break;
            case 'UP':
                head = [head[0], head[1] - snakeSize];
                break;
        }

        if (head[0] >= 100) head[0] = 0;
        if (head[1] >= 100) head[1] = 0;
        if (head[0] < 0) head[0] = 100;
        if (head[1] < 0) head[1] = 100;

        dots.push(head);
        dots.shift();
        setSnakeDots(dots);
        eatFood();
    };

    useEffect(() => {
        document.onkeydown = (e) => {
            e = e || window.event;
            switch (e.keyCode) {
                case 38:
                    setDirection('UP');
                    break;
                case 40:
                    setDirection('DOWN');
                    break;
                case 37:
                    setDirection('LEFT');
                    break;
                case 39:
                    setDirection('RIGHT');
                    break;
            }
        };

        if (!gameOver) {
            const intervalId = setInterval(() => {
                move();
                checkCollision();
            }, speed);
            // move();
            return () => clearInterval(intervalId);
        }

    }, [direction, speed, move]);

    const checkCollision = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                setSnakeDots([[0, 0], [snakeSize, 0]]);
                setDirection('RIGHT');
                setFoodDot([10, 10]);
                updateScore(0);
                setSpeed(100);
            }
        });
    };

    const setFood = () => {
        if (gameOver) return
        let food = [randomNum(), randomNum()];
        let snake = [...snakeDots];
        snake.forEach(dot => {
            if (food[0] === dot[0] && food[1] === dot[1]) {
                food = [randomNum(), randomNum()];
            }
        });

        setFoodDot(food);
    };

    const randomNum = () => {
        return Math.floor(Math.random() * 100 / snakeSize) * snakeSize;
    };

    const increaseSpeed = () => {
        if (speed > 10) {
            setSpeed(speed - 0.5);
        }
    };

    const eatFood = () => {
        if (gameOver) return;
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];
        let food = [...foodDot];
        if (head[0] === food[0] && head[1] === food[1]) {
            setFood();
            increaseSpeed();
            snake.unshift([]);
            setSnakeDots(snake);

            setHighScore(score + 1);
            handleScore(highScore + 1);
            updateScore(score + 1);
        }
    };

    const handleScore = (newScore) => {
        if (localStorage.getItem("highScore")) {
            if (newScore > localStorage.getItem("highScore")) {
                localStorage.setItem("highScore", newScore);
            }
        } else {
            localStorage.setItem("highScore", newScore);
        }
        updateScore(newScore);
    };

    return (
        <>
            <div>
                <div className='game-info'>
                    <div className='row'>
                        <h1>Snake The Game</h1>
                    </div>
                    <div className='row'>
                        <p>Score: {score}</p>
                        <p>High Score: {localStorage.getItem("highScore")}</p>
                        <p>Speed: {100 - speed}</p>
                    </div>
                </div>

            </div>
            <div className="game-area" style={{ margin: "0 auto" }}>
                {snakeDots.map((dot, i) => {
                    return <div className={`snake-dot ${i === snakeDots.length - 1 ? 'snake-head' : ''}`} key={i} style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}></div>
                })}
                <div className="food-dot" style={{ left: `${foodDot[0]}%`, top: `${foodDot[1]}%` }}></div>
            </div>
        </>
    )
}

export default Snake;