   function addTeammate() {
        const nameInput = document.getElementById("teammateName");
        const name = nameInput.value;
        shiftd=document.getElementById("inputX").value;
        shiftu=document.getElementById("inputY").value;
        let shiftnow=0;
        if (!name) {
            alert("請輸入隊友名稱");
            return;
        }
        const blocked = currentSelectedCells;
        // get the selected cells and set the backgroundColor to white
        currentSelectedCells.forEach((cell) => {
            const [col, row] = cell;
            const table = document.getElementById("teammate-table");
            table.rows[row].cells[col].style.backgroundColor = "white";
        });
        currentSelectedCells = [];
        teammates.push({ name, blocked ,shiftd,shiftu,shiftnow});
        console.log(teammates);
      //  console.log(typeof teammates[0].blocked[0]);
        // Clear teammate name input
        nameInput.value = "";
        // Update teammate list
         document.getElementById("teammateName").value = "";//清空input
         document.getElementById("teammateName").innerHTML = "";//清空畫面文字
        updateTeammateList();
    }
