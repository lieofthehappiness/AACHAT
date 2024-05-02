function blobloblo() {
    downloadHtml();
    downloadarray()
    const table = document.getElementById("teammate-table");
    for(i=0;i<numRows;i++) {
        for(j=0;j<numCols;j++) {  
            const cellInput = table.rows[i].cells[j].querySelector("input");
            const cell = table.rows[i].cells[j];
            if(cellInput.value.trim()!=="") {
                awaysblockcell.push(cell);
                cell.innerHTML=cellInput.value.trim();
            }
        }
    }
    document.getElementById("fill-table").style.display="none";
    
  // console.log(awaysblockcell);
    fillTable(0,0);

}

