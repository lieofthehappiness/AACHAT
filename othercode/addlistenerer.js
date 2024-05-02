function addlistener() {
    const teammateListContainer = document.getElementById("teammate-list");
    teammateListContainer.innerHTML = ""; 
    teammates.forEach((teammate, index) => {
      //  console.log("F00")
        const teammateNameElement = document.createElement("div");
        teammateNameElement.classList.add("teammate-name");
        teammateNameElement.id="teammate-name";
        teammateNameElement.textContent ="name:"+teammate.name+" shift:"+teammate.shiftd+"\~"+teammate.shiftu;
        teammateNameElement.onclick = function () {
            // Highlight blocked cells
            console.log(teammate.ineedthisarray);
            highlightBlockedCells(teammate.ineedthisarray);
        };
        teammateListContainer.appendChild(teammateNameElement);
    });
}