import React, { Component } from 'react';
import { ThemeContext } from  '../theme.context';

class Row extends Component{

    shouldComponentUpdate(nextProps){
        if(!nextProps.changedRow.id || nextProps.changedRow.id === this.props.index || this.props.index === 'avarage'){
            return true;
        }else{
            return false;
        }
    }

    getStyle(column, amount){
            const numCol = column.length-1;
            const percentage = (column[numCol] && column[numCol].sumRow) ? Math.round(amount*100/column[numCol].sumRow) : 0;
            const styleCell = (this.props.changedRow.chart) ? { background:`linear-gradient(to top, #39ff00 ${percentage}%, transparent 0%)`} : {};

            return styleCell;
    }

    getButtons(index, removeRow, addRow){
        if(index === 'avarage'){
            return(<div className="button_wrapper" style={{width: '74px'}}></div>);
        }else{
            return(
                <React.Fragment>
                    <div className="button_wrapper">
                        <div className="remove" 
                                onClick={removeRow}  
                                rel={index}
                                key={`${index}del`}
                                >
                                &#10799;
                            </div>
                    </div>
                    <div className="button_wrapper">
                        <div className="add" 
                                onClick={addRow}  
                                rel={index}
                                key={`${index}add`}
                                >
                                &#43;
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
    getSumColumn(index, sum){
        let defineClass = 'sum';
        if(index === 'avarage'){
            sum = '';
            defineClass = 'empty';
        }
        return(
            <ThemeContext.Consumer key={index+'sum_context'}>
                {({ mouseOverRowSum, mouseOutRowSum, removeRow, addRow }) => (
                    <React.Fragment>
                        <div className={defineClass} rel={index}
                            key={`${index}sum`} 
                            onMouseOver={mouseOverRowSum}
                            onMouseOut={mouseOutRowSum}
                            >
                            {sum}
                        </div>
                        {this.getButtons(index, removeRow, addRow)}
                    </React.Fragment>
                )}
            </ThemeContext.Consumer>
        );
    }

    renderColumns(column, len, index) {
        let sum = 0;
        let resp = column.map( (cell) => {
            const { id, amount } = cell;
            if(!amount) 
                return '';
            sum += amount;
            if(index === 'avarage'){
                return (<div className="avarage" key={id}>{Math.floor(amount/len)}</div>);
            }else{
                let styleCell = this.getStyle(column, amount);
                return (
                    <ThemeContext.Consumer key={id+'context'}>
                        {({inputRef, mouseOverCell}) => (
                            <div className="column" key={id} rel={id} 
                                onClick={this.props.clickCell} 
                                ref={inputRef}
                                onMouseOver={mouseOverCell}
                                style={styleCell}
                                >
                                {amount}
                            </div>
                        )}
                    </ThemeContext.Consumer>
                );
            }
        } );
        resp.push( this.getSumColumn(index, sum) );

        return resp;
    }

    render(){
        const {column, len, index} = this.props;
        return(                
            <div className="row">
                {this.renderColumns(column, len, index)}
            </div>
        );
    }
}

export default Row;