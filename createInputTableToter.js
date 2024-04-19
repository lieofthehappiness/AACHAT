function createInputTableTo(id) {
    document.getElementById('interface1').style.display = 'block';
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
    
}