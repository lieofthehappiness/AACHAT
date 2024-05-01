function endingofthegroup() {
    grouping = false;
    document.getElementById('interface1').style.display = 'block'; 
    var container1 = document.getElementById("table-container");
    var container2 = document.getElementById("another-table");
    // 將 container1 移動到 container2 中
    container2.appendChild(container1);
    document.getElementById('selectthegroup').style.display = 'none'; 
    clearthecolor();
   // console.log(timegroup);
}


