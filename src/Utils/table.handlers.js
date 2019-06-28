export function inputRef(el){
        if(!el) return;

        const id = el.attributes.rel.value;
        this.sort.forEach( item => { 
            if(item.id === id){
            item.ref = el;
            }
        });
    }
export function clickCell(e){
        const [row, col] = e.target.attributes.rel.value.split('_');
        const rowItem = row+'row';
        
        this.setState(state => {
            let data = {...state};
            
            const pos = this.sort.indexOf(data.matrixData[rowItem][col]);
            this.sort.splice(pos, 1);

            data.matrixData[rowItem][col].amount++;
        
            for (let it = pos-1, len = this.sort.length; it < len; it++) {
                if (data.matrixData[rowItem][col] && this.sort[it] && data.matrixData[rowItem][col].amount > this.sort[it].amount) {
                    this.sort.splice(it+1, 0, data.matrixData[rowItem][col]);
                    break;
                }
                if(it === len-1){
                    this.sort.splice(pos, 0, data.matrixData[rowItem][col]);
                    break;
                }
            }
        
            let sum = 0;
            for(let row in data.matrixData){
                if(row !== 'avarage'){
                sum += data.matrixData[row][col].amount;
                }
            }
            data.matrixData.avarage[col].amount = sum;
        
            data.changedRow = {id:rowItem, chart: false};
            return {...state, ...data}
        });
    }

export function mouseOverCell(event){
        if(this.activeCells.length){
            this.activeCells.map(el=>{
                if(el.ref.innerText){
                el.ref.className = "column";
                }
                return el;
            });
        }

        let itemPos = -1;
        const id = event.target.attributes.rel.value;
        this.sort.forEach( (item, i) => { 
            if(item.id === id){
                itemPos = i;
            }
        });
        if(itemPos > -1){
            this.activeCells = _getSelectedCells(itemPos, this);
            this.activeCells.forEach(el=>{
                if(el.ref.innerText){
                    el.ref.className = "column selected";
                    return el;
                }
            });
        }else{
            console.error('itemPos is not detected for cell with id '+id);
        }
    }

export function mouseOutRowSum (event) {
        const id = event.target.attributes.rel.value;
        if(this.state.changedRow.chart){
            this.setState({changedRow:{id, chart: false}});
        }
    }

export function mouseOverRowSum(event) {
    if(this.activeCells.length){
        this.activeCells.map(el=>{
            if(el.ref.innerText){
                el.ref.className = "column";
            }
            return el;
        });
    }
    
    const id = event.target.attributes.rel.value;
        if(id !== 'avarage'){
            this.setState({changedRow:{id, chart: true}});
        }
    }

export function removeRow(event) {
    const id = event.target.attributes.rel.value;
    this.setState( state => {
        let data = {...state};
        const removedData = [...data.matrixData[id]];
        delete data.matrixData[id];

        data.matrixData.avarage.forEach( (el, i) => {
            el.amount -= removedData[i].amount;
        });
        data.changedRow.id = id;
        return {...data};
    });
}

export function addRow(event) {
    const len = Object.keys(this.state.matrixData).length-1;
    const newId = _getRowId(len, this);
    let data = {...this.state};
    let avarages = [...this.state.matrixData.avarage]

    const rowId = newId+'row';    
    const id = parseInt(event.target.attributes.rel.value);
    let row = this.prepareRow(newId, avarages, data.matrixSize.columns);
    
    data.matrixData = _getNewMatrixData(id, row, rowId, data.matrixData);;
    data.matrixData.avarage = avarages;
    data.changedRow.id = rowId;
    this.setState( state => {
        return {...state, ...data};
    });
    
}

const _getNewMatrixData = (id, row, rowId, matrixData) => {
    let newMatrixData = {};
    for(let prop in matrixData){
        if(prop === 'avarage')
            continue;
        const pos = parseInt(prop);
        newMatrixData[prop] = matrixData[prop];
        if(row && (pos === id)){
            newMatrixData[rowId] = [...row];
            row = null;
        }
    }
    if(row)
        newMatrixData[rowId] = row;

    return newMatrixData;
}

const _getRowId = (len, self) => {
    let rowId = len;
    for( let i=len; i<1001; i++){
        if(!self.state.matrixData[i+'row']){
            rowId = i;
            break;
        }
    }
    return rowId;
}

const _getSelectedCells = (itemPos, self) => {

    let cloneSort = [...self.sort],
        len = cloneSort.length-1;
    let step = self.state.matrixSize.selectedCells/2;
    let start = itemPos-step,
        end = itemPos+step;

    if(start < 0){
        end += start * -1;
    }else if(step === 1){
        start -= 1;
    }
    if(end > len){
        start -= end-len;
    }
    
    return cloneSort.slice(start, end);
}