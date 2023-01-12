import React, { useState, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
    const snakeSize = 2.5
    const [snakeDots, setSnakeDots] = useState([[0, 0], [snakeSize, 0]]);
    const [foodDot, setFoodDot] = useState([10, 10]);
    const [direction, setDirection] = useState('RIGHT');
    const [speed, setSpeed] = useState(100);
    const [gameOver, setGameOver] = useState(false);

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
        const intervalId = setInterval(() => {
            move();
            checkCollision();
        }, speed);
        // setFood();
        return () => clearInterval(intervalId);
    }, [direction ,speed]);

    const move = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];

        switch (direction) {
          case 'RIGHT':
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

    const checkCollision = () => {
        let snake = [...snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
          if (head[0] === dot[0] && head[1] === dot[1]) {
            setSnakeDots([[0,0], [snakeSize,0]]);
            setDirection('RIGHT');
            setFoodDot([10,10]);
          }
        });
      };

    const setFood = () => {
        if (gameOver) return;
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
            setSpeed(speed - 10);
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
        }
    };

    return (
        <div className="game-area">
            {snakeDots.map((dot, i) => {
                return <div className="snake-dot" key={i} style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}></div>
            })}
            <div className="food-dot" style={{ left: `${foodDot[0]}%`, top: `${foodDot[1]}%` }}></div>
        </div>
    )
}

export default Snake;