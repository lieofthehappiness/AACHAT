    function showRandomResult() {
        fetch('/showtheresult', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
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