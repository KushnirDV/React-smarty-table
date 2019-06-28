import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import './Table.css';

const Table = (props) => {

    const renderRows = () => {
        const len = Object.keys(props.matrix).length-1;
        let rows = [];
        for (let index in props.matrix){
            rows.push(
                <Row column={props.matrix[index]} len={len} index={index} clickCell={props.clickCell} key={index} changedRow={props.changedRow}/>
            )
       }
       return rows;
    }
  
    return (
        <div id='matrix' className="table">
            {renderRows()}
        </div>
    )
}

Table.propTypes = {
    matrix: PropTypes.object,
    clickCell: PropTypes.func,
    changedRow: PropTypes.object
};

export default Table;
  