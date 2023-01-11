import React, { useState, useEffect } from 'react';
import './Snake.css';

const Snake = () => {
    // state to hold the position of each segment of the snake on the game board
    const [snakeDots, setSnakeDots] = useState([[0, 0]]);
    // state to hold the pos of food on the game board
    const [food, setFood] = useState([10, 10]);
    // state to hold the current direction of the snake
    const [direction, setDirection] = useState('RIGHT');

    // move the snake in the current direction
    const moveSnake = (direction) => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];

        switch (direction) {
            case 'RIGHT':
                head = [head[0], head[1] + 1]
                break;
            case 'LEFT':
                head = [head[0], head[1] - 1]
                break;
            case 'UP':
                head = [head[0] - 1, head[1]]
                break;
            case 'DOWN':
                head = [head[0] + 1, head[1]]
                break;
            default:
        }

        // update snake pos by removing the first element and adding new head
        dots.push(head);
        dots.shift();
        setSnakeDots(dots);
    }

    const checkItOutOfBorders = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];

        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            alert('Game over - checkItOutOfBorders')
        }
    }

    const checkItCollapsed = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];
        dots.pop();
        dots.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                alert('Game over - checkItCollapsed')
            }
        });
    }

    const checkIfEat = () => {
        let dots = [...snakeDots];
        let head = dots[dots.length - 1];
        if (head[0] === food[0] && head[1] === food[1]) {
            setFood(genRandomCoordinates());
            expandSnake();
        }
        // let head = snakeDots[snakeDots.length - 1];
        // let foodDot = food;
        // if(head[0] === foodDot[0] && head[1] === foodDot[1]) {
        //     setFood([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)])
        //     growSnake();
        // }
    }

    const genRandomCoordinates = () => {
        let x = Math.floor(Math.random() * 100);
        let y = Math.floor(Math.random() * 100);
        return [x, y];
    }

    const expandSnake = () => {
        let newSnake = [...snakeDots];
        newSnake.unshift([]);
        setSnakeDots(newSnake);
    }

    const move = {
        left: () => {
            setDirection('LEFT')
        },
        right: () => {
            setDirection('RIGHT')
        },
        up: () => {
            setDirection('UP')
        },
        down: () => {
            setDirection('DWON')
        }
    }

    const onKeyDown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 39:
                move.right();
                break;
            case 37:
                move.left();
                break;
            case 38:
                move.up();
                break;
            case 40:
                move.down();
                break;
            default:
        }
    }

    // useEffect(() => {
    //     document.onkeydown = onKeyDown;
    //     setInterval(() => {
    //         moveSnake(direction);
    //         checkItOutOfBorders();
    //         checkItCollapsed();
    //         checkIfEat();
    //     }, 1);
    // }, [direction]);

    useEffect(() => {
        document.onkeydown = onKeyDown;
        setInterval(moveSnake, 100, direction);
        setInterval(checkItOutOfBorders, 100);
        setInterval(checkItCollapsed, 100);
        setInterval(checkIfEat, 100);
    }, [snakeDots, direction])

    return (
        <div className='game-area'>
            {snakeDots.map((dot, i) => {
                return (
                    <div
                        className='snake-dot'
                        key={i}
                        style={{
                            top: `${dot[0]}%`,
                            left: `${dot[1]}%`,
                        }}>
                    </div>
                )
            })}
            <div
                className='food-dot'
                style={{
                    top: `${food[0]}%`,
                    left: `${food[1]}%`,
                }}>
            </div>
        </div>
    )
}

export default Snake;