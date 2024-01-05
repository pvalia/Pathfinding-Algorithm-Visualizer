import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra';
import {astar, getNodesInShortestPathOrder2} from '../Algorithms/Astar';

import './PathVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
    this.ClearGrid = this.ClearGrid.bind(this);
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
        }
        setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const isStartNode = node === startNode;
        const isFinishNode = node === finishNode;
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
            `node ${isStartNode ? 'node-start' : isFinishNode ? 'node-finish' : 'node-visited'}`;
        }, 10 * i);
    }
    }

    animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const isStartNode = node.isStart;
        const isFinishNode = node.isFinish;
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
            `node ${isStartNode ? 'node-start' : isFinishNode ? 'node-finish' : 'node-shortest-path'}`;
        }, 50 * i);
    }
    }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateShortestPath2(nodesInShortestPathOrder2) {
    for (let i = 0; i < nodesInShortestPathOrder2.length; i++) {
        setTimeout(() => {
        const node = nodesInShortestPathOrder2[i];
        const isStartNode = node.isStart;
        const isFinishNode = node.isFinish;
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
            `node ${isStartNode ? 'node-start' : isFinishNode ? 'node-finish' : 'node-shortest-path'}`;
        }, 50 * i);
    }
    }

  animateAstar(visitedNodesInOrder, nodesInShortestPathOrder) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath2(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const isStartNode = node === startNode;
        const isFinishNode = node === finishNode;
        
        document.getElementById(`node-${node.row}-${node.col}`).className =
          `node ${isStartNode ? 'node-start' : isFinishNode ? 'node-finish' : 'node-visited'}`;
      }, 10 * i);
    }
  }

  visualizeAstar() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder2(finishNode);
    this.animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateClearing() {
    const { grid } = this.state;
  
    for (let row = 0; row < 21; row++) {
      for (let col = 0; col < 51; col++) {
        setTimeout(() => {
          if (row === START_NODE_ROW && col === START_NODE_COL) {
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
          } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
          } else {
            document.getElementById(`node-${row}-${col}`).className = 'node clear-grid';
          }
        }, 100);
      }
    }
  }
  
  ClearGrid() {
    const grid = getInitialGrid();
    this.setState({grid});
    this.animateClearing();
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
    <div className="main">
        <div className="header">
            <img className="logo" alt="" src="/logo.png" />
            <div className="buttons">
                <div className="Dalgo" onClick={() => this.visualizeDijkstra()}>
                    <img className="algo-box"alt="" src="/algo-box.png"></img>
                    <div className="text1">Dijkstra's Algorithm</div>
                </div> 
                <div className="Aalgo" onClick={() => this.visualizeAstar()}>
                    <img className="algo-box"alt="" src="/algo-box.png"></img>
                    <div className="text">A* Algorithm</div>
                </div> 
                <div className="Xalgo" onClick={() => this.visualizeDijkstra()}>
                    <img className="algo-box"alt="" src="/algo-box.png"></img>
                    <div className="text">X Algorithm</div>
                </div> 
            </div>
            <div className="ClearGrid-parent" onClick={() => this.ClearGrid()}>
                <img className="algo-box"alt="" src="/cleargrid.png"></img>
                <div className="text2">Clear Grid</div>
            </div> 
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
    const currentRow = [];
    for (let col = 0; col < 51; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};