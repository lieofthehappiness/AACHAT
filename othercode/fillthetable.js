function fillTable(x,y) {
    const table = document.getElementById("teammate-table");
    const cell = table.rows[x].cells[y];
    
    var isPresent = awaysblockcell.includes(cell);
    if(isPresent) {
        if(y<numCols-1) fillTable (x,y+1);
        else if (x<numRows-1) fillTable(x + 1, 0);
        else if (x ===numRows-1 && y === numCols-1) {
            generate();
        }
    }
    else {
        for(let i=0;i<teammates.length;i++) {
            w=true;
            if(teammates[i].shiftnow>=teammates[i].shiftu) {
                w=false;
                continue;
            } 
            var anumber=parseInt(cell.id, 10);
            if (isNaN(anumber)) w=true;
            else {
                timegroup[anumber].forEach(function(cell) {
                    w=(cell.innerHTML!=teammates[i].name&&w);    
                })
                
            }
           // console.log(w);
            if(!w) continue; 
            w=(w&&!teammates[i].blocked.includes(cell));
            if(w) {
            //   console.log([cell.cellIndex, cell.parentElement.rowIndex]);  
                cell.innerHTML=teammates[i].name;
                teammates[i].shiftnow++;
                if(y<numCols-1) fillTable (x,y+1);
                else if (x<numRows-1) fillTable(x + 1, 0);
                else if (x ===numRows-1 && y === numCols-1) {
                    generate();
                }
            teammates[i].shiftnow--;
            }
            cell.innerHTML=""; 
        }
    }
    if(x==0&&y==0) anotherblockshoudbeshow();
}