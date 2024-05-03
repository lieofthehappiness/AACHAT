    function updateTeammateList() {
        const abutton=document.getElementById("alittlebutton");
        abutton.style.display="block";
        const teammateListContainer = document.getElementById("teammate-list");
        teammateListContainer.innerHTML = ""; // Clear previous list
        teammates.forEach((teammate, index) => {
            const teammateNameElement = document.createElement("div");
            teammateNameElement.classList.add("teammate-name");
            teammateNameElement.id="teammate-name";
            teammateNameElement.textContent ="name:"+teammate.name+" shift:"+teammate.shiftd+"\~"+teammate.shiftu;
            teammateNameElement.onclick = function () {
                // Highlight blocked cells
                highlightBlockedCells(teammate.ineedthisarray);
            };
            teammateListContainer.appendChild(teammateNameElement);
        });
    }
    function highlightBlockedCells(array) {
        const table = document.getElementById("teammate-table");
      //  if(table) console.log("J");
        table.querySelectorAll("td").forEach((cell) => {
            cell.style.backgroundColor = ""; // Reset background color
         //   console.log("U");
         //   console.log(cell.name);
            if(array.includes(cell.name)) {
                var index = currentSelectedCells.indexOf(cell);
                cell.style.backgroundColor = "red";
                if(index==-1)currentSelectedCells.push(cell);
            }
       //     console.log(array);
        //    console.log(cell.name);
         //   console.log(array.includes(cell.name));
        });
    }