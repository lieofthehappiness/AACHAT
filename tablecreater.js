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
            input.style.width = "20px";
            input.addEventListener("input", function() {
                adjustWidth(this);
            });
            cell.appendChild(input); 
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }

     function adjustWidth(input) {
        const tableRows = document.querySelectorAll("#teammate-table tbody tr");
        const columnIndex = Array.from(input.parentElement.parentElement.children).indexOf(input.parentElement);
        let maxWidth = 0;
        tableRows.forEach(row => {
            const currentInput = row.children[columnIndex].querySelector("input");
            const currentWidth = currentInput.value.length + 1;
            if (currentWidth > maxWidth) {
                maxWidth = currentWidth;
            }
        });
        tableRows.forEach(row => {
            const currentInput = row.children[columnIndex].querySelector("input");
            currentInput.style.width = (maxWidth * 8) + 'px'; // 假设每个字符大约占 8 像素的宽度
           
        });
    }
    table.appendChild(tableBody);
    document.getElementById(id).appendChild(table);
    const cells = document.querySelectorAll("#teammate-table td");


    cells.forEach(function(cell) {
        cell.addEventListener("click", function() {
    ///////////////////////////////////
        if(grouping) {
            if(donottouchcells.includes(cell)) {
                //console.log(donottouchcells.includes(cell));
            }
            else if (selectedCells.includes(cell)) {
                cell.style.backgroundColor = "";
                let index = selectedCells.indexOf(cell);
                selectedCells.splice(index, 1);
                cell.id='cell';
            } else {
                cell.style.backgroundColor  = currentColor;
                selectedCells.push(cell);
                cell.id=iiii;
            }         
        }
/////////////////////////////////////////
    // console.log(isToggling);
    // console.log("FUCK");
        if(isToggling) {
            if (cell.style.backgroundColor == "red") {
                console.log("de");
                cell.style.backgroundColor = "";
               var index = currentSelectedCells.indexOf(cell);
               currentSelectedCells.splice(index, 1);
            } else {
                console.log("K");
                cell.style.backgroundColor = "red";
                currentSelectedCells.push(cell);
            }
            console.log(currentSelectedCells);
        }
    // else console.log("FFF");
        });
    });
    
}