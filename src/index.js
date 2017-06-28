import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Box extends React.Component {

    render() {
        return (
            <button className="square" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            moves: [{box: Array(9).fill(null)}],
            user1Turn: true,
            user: "X"
        }
    }


    handleBox(i) {
        const box = this.state.moves[0].box;
        if (this.winner(box)) {
            return;
        }
        box[i] = this.state.user1Turn ? 'X' : 'O';
        return (
            this.setState({
                box: box,
                user1Turn: !this.state.user1Turn,
                user: this.state.user1Turn ? "O" : "X"
            })
        )
    }

    renderBox(i) {
        return (
            <Box value={this.state.moves[0].box[i]}
                 onClick={() => this.handleBox(i)}
            />
        )
    }

    winner(box) {
        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < win.length; i++) {
            const [a, b, c] = win[i];
            if (box[a] === box[b] && box[b]=== box[c]) {
                return box[a]
            }
        }
        return null;
    }

    render() {
        const won = this.winner(this.state.moves[0].box);
        let status
        if (won) {
            status = "Won by "+ won
        } else {
            status = "Turn: "+ this.state.user
        }
        return (
            <div>
                <h1>{status}</h1>
                <div className="board-row">
                    {this.renderBox(0)}
                    {this.renderBox(1)}
                    {this.renderBox(2)}
                </div>
                <div className="board-row">
                    {this.renderBox(3)}
                    {this.renderBox(4)}
                    {this.renderBox(5)}
                </div>
                <div className="board-row">
                    {this.renderBox(6)}
                    {this.renderBox(7)}
                    {this.renderBox(8)}
                </div>
            </div>
        )
    }
}


ReactDOM.render(<Game />, document.getElementById("root"));