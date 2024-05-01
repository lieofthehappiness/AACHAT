    function updateTeammateList() {
        const abutton=document.getElementById("alittlebutton");
        abutton.style.display="block";
        const teammateListContainer = document.getElementById("teammate-list");
        teammateListContainer.innerHTML = ""; // Clear previous list
        teammates.forEach((teammate, index) => {
            const teammateNameElement = document.createElement("div");
            teammateNameElement.classList.add("teammate-name");
            teammateNameElement.textContent ="name:"+teammate.name+" shift:"+teammate.shiftd+"\~"+teammate.shiftu;
            teammateNameElement.onclick = function () {
                // Highlight blocked cells
                highlightBlockedCells(teammate.blocked);
            };
            teammateListContainer.appendChild(teammateNameElement);
        });
    }
    function highlightBlockedCells(blockedCells) {
        const table = document.getElementById("teammate-table");
        table.querySelectorAll("td").forEach((cell) => {
            cell.style.backgroundColor = ""; // Reset background color
        });
        blockedCells.forEach((cell) => {
            var index = currentSelectedCells.indexOf(cell);
                cell.style.backgroundColor = "red";
                if(index==-1)currentSelectedCells.push(cell);
            
        })
     //   blockedCells.forEach(([row, col]) => {
           // table.rows[row].cells[col].style.backgroundColor = "gray";
       // });
    }