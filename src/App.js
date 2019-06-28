import React, { Component } from 'react';
import './App.css';
import Form from './Components/Form';
import Table from './Components/Table';
import { ThemeContext } from  './theme.context';
import { setRows, setColumns, setSelectedCells} from './Utils/form.handlers';
import { inputRef, clickCell, mouseOverCell, mouseOverRowSum, mouseOutRowSum, removeRow, addRow} from './Utils/table.handlers';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      matrixSize:{
        rows: 5,
        columns: 5,
        selectedCells: 2
      },
      matrixData: [],
      changedRow: {id:'', chart: false}
    };

    this.sort = [];
    this.activeCells = [];

    this.setRows = setRows.bind(this);
    this.setColumns = setColumns.bind(this);
    this.setSelectedCells = setSelectedCells.bind(this);

    this.inputRef = inputRef.bind(this);
    this.clickCell = clickCell.bind(this);
    this.mouseOverCell = mouseOverCell.bind(this);
    this.mouseOverRowSum = mouseOverRowSum.bind(this);
    this.mouseOutRowSum = mouseOutRowSum.bind(this);
    this.removeRow = removeRow.bind(this);
    this.addRow = addRow.bind(this);
  }

  getRandom(){
    var min = 100;
    var max = 999;
    return Math.floor(Math.random()*(max-min))+min;
  }

  prepareMatrix( rows, columns ){
    let avarages = [];
    let matrixData = {};
    for(let i=0; i<rows; i++){
      const rowItem = i+'row';    
      matrixData[rowItem] = this.prepareRow(i, avarages, columns);
    }
    matrixData.avarage = avarages;
    return matrixData;
  }
  
  prepareRow(i, avarages, columns){
    let row = [];
    let sumRow = 0;
    for(let j=0; j<columns; j++){
      const amount = this.getRandom();
      if(i)
        avarages[j].amount += amount;
      else
        avarages[j] = {id:j+1, amount};

      const cell = { id: `${i}_${j}`, amount};
      sumRow += amount;
      row.push( cell );

      this.addToSort(cell);
    }
    row.push({id:`${i}sum`, sumRow});

    return row;
  }

  addToSort(cell){
    let len = this.sort.length;
    cell.ref = React.createRef();
    if(!len){
      this.sort.push(cell);
    }else{
      for (let it = 0; it < len; it++) {
          if (cell.amount <= this.sort[it].amount) {
              this.sort.splice(it, 0, cell);
              break;
          }
          if(it === len-1){
            this.sort.push(cell);
          }
      }
    }
  }

  componentWillMount(){
    if(this.state.matrixData.length === 0){
      const matrixData = this.prepareMatrix(this.state.matrixSize.rows, this.state.matrixSize.columns);
      this.setState({
        matrixData
      });
    }
  }

  render() {
// console.log(this.sort);
     return (
        <div>
            <h1 id='title'>Smarty table use React</h1>
            <div className="wrapper">
                <Form setRows={this.setRows} setColumns={this.setColumns} setSelectedCells={this.setSelectedCells}/>
                <ThemeContext.Provider value={{
                      inputRef: this.inputRef, 
                      mouseOverCell: this.mouseOverCell, 
                      mouseOverRowSum: this.mouseOverRowSum, 
                      mouseOutRowSum: this.mouseOutRowSum,
                      removeRow: this.removeRow,
                      addRow: this.addRow
                    }}>
                  <Table matrix={this.state.matrixData} clickCell={this.clickCell} changedRow={this.state.changedRow}/>
                </ThemeContext.Provider>
            </div>
        </div>
     )
  }
}

export default App;
