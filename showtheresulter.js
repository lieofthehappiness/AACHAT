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
        })
        .catch(error => {
            console.error(error);
            console.log('Failed to showw.');
        });
    }