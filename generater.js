    function generate() {
        var tableHtml= "<table border='1'>";
        tableHtml+=document.getElementById("teammate-table").innerHTML;
        tableHtml+="</table>";
    // var blob = new Blob([tableHtml], { type: "text/html" });
        fetch('/savetable', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pdfData: tableHtml })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to send table data.');
            }
           return response.json();
        })
        .then(data => {
           console.log(data.message); // 顯示成功消息
        })
        .catch(error => {
            console.error(error);
          console.log('Failed to send table data.');
        });
    };