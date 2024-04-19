    function addTeammate() {
        const nameInput = document.getElementById("teammateName");
        const name = nameInput.value;
        const shiftnow=0;
        shiftd=parseInt(document.getElementById("inputX").value);
        shiftu=parseInt(document.getElementById("inputY").value)
        if (!name) {
            alert("請輸入隊友名稱");
            return;
        }
        const blocked = currentSelectedCells;
      
        currentSelectedCells.forEach((cell) => {
            const [col, row] = cell;
            const table = document.getElementById("teammate-table");
            table.rows[row].cells[col].style.backgroundColor = "white";
        });
        currentSelectedCells = [];
        teammates.push({ name, blocked ,shiftd, shiftu, shiftnow});
      console.log(teammates);
     //  console.log(typeof teammates[0].blocked[0]);
        // Clear teammate name input
        nameInput.value = "";
        // Update teammate list
         document.getElementById("teammateName").value = "";//清空input
         document.getElementById("teammateName").innerHTML = "";//清空畫面文字
        updateTeammateList();
    }