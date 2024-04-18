function clearthecolor() {
    for(i=0;i<numRows;i++) {

        for(j=0;j<numCols;j++) {
            
            const table = document.getElementById("teammate-table");
            table.rows[i].cells[j].style.backgroundColor = "white";

        }
    }



}