export function setColumns(e){
        const columns = e.target.value;
        var reg = new RegExp(/^\d+$/);
        if(!columns || !reg.test(columns))
            return;
        const matrixData = this.prepareMatrix(this.state.matrixSize.rows, parseInt(columns));
        this.setState({
            matrixSize:{
                rows: this.state.matrixSize.rows,
                columns,
                selectedCells: this.state.matrixSize.selectedCells
            },
            matrixData: matrixData,
            changedRow: {id:'', chart: false}
        });
    }

export function setRows(e){
        const rows = e.target.value;
        var reg = new RegExp(/^\d+$/);
        if(!rows || !reg.test(rows))
            return;
        
        const matrixData = this.prepareMatrix(rows, this.state.matrixSize.columns);
        this.setState({
            matrixSize:{
                rows,
                columns: this.state.matrixSize.columns,
                selectedCells: this.state.matrixSize.selectedCells
            },
            matrixData: matrixData,
            changedRow: {id:'', chart: false}
        });
    }

export function setSelectedCells(e){
    const numberCells = e.target.value;
    var reg = new RegExp(/^\d+$/);
    if(!numberCells || !reg.test(numberCells))
        return;
    
    this.setState({
        matrixSize:{
            rows: this.state.matrixSize.rows,
            columns: this.state.matrixSize.columns,
            selectedCells: numberCells,

        }
    });
}