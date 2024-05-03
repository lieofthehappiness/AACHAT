function addlistener() {
    const teammateListContainer = document.getElementById("teammate-list");
    teammateListContainer.innerHTML = ""; 

    const cells = document.querySelectorAll("#teammate-table td");
    immmm=1;
    cells.forEach(function(cell) {
        cell.name=immmm;
        immmm++;
    })
    
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
    document.getElementById("another2").style.display="block";
    document.getElementById("fill-table").style.display="none";

}

function showexistingResult(){
    console.log(nowfolder);
    fetch('/showexistingResult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: nowfolder })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to show.');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("table").innerHTML = data;
            var dow=data;
            var blob = new Blob([dow], { type: 'text/html' });
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'downloaded_content.html'; // 下載檔案的名稱

            document.body.appendChild(downloadLink);
            downloadLink.click();
        
            // 清理
            document.body.removeChild(downloadLink);
        })
        .catch(error => {
            console.error(error);
            console.log('Failed to showw.');
        });

}