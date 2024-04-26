function createInputTableTo(id) {
    document.getElementById('selectthegroup').style.display = 'block';
    document.getElementById('confirmGroup').style.display = 'none';
    document.getElementById('00').style.display = 'none';
    const tableContainer = document.getElementById(id);
    if (tableContainer.firstChild) {
        tableContainer.removeChild(tableContainer.firstChild);
    }
     numRows = parseInt(document.getElementById("num-rows").value);
     numCols = parseInt(document.getElementById("num-cols").value);
    if (numRows <= 0 || numCols <= 0) {
        alert("請輸入正整數");
        return;
    }
    const table = document.createElement("table");
    table.id = "teammate-table";
    const tableBody = document.createElement("tbody");
    for (let i = 0; i < numRows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            cell.appendChild(input); 
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    document.getElementById(id).appendChild(table);
    const cells = document.querySelectorAll("#teammate-table td");


    cells.forEach(function(cell) {
        cell.addEventListener("click", function() {
        var jj=[cell.parentElement.rowIndex,cell.cellIndex];
        console.log(grouping);
    ///////////////////////////////////
        if(grouping) {
            if (cell.style.backgroundColor==currentColor) {
                cell.style.backgroundColor = "white";
                selectedCells = selectedCells.filter(function(subArray) {
                    return JSON.stringify(subArray) !== JSON.stringify(jj);
                });
            } else {
                cell.style.backgroundColor  = currentColor;
                selectedCells.push(jj);
            }         
        }
/////////////////////////////////////////到這裡
    // console.log(isToggling);
    // console.log("FUCK");
        if(isToggling) {
            if (cell.style.backgroundColor === "gray") {
                cell.style.backgroundColor = "white";
                currentSelectedCells = currentSelectedCells.filter(function(subArray) {
                    return JSON.stringify(subArray) !== JSON.stringify(jj);
                });
            } else {
                cell.style.backgroundColor = "gray";
                currentSelectedCells.push(jj);
            }
        }
    // else console.log("FFF");
        });
    });
    
}