function downloadarray() {
  //  var array = teammates;
    const array = JSON.stringify(teammates);
   // var htmlContent = document.getElementById("download").innerHTML;
    fetch('/savearray', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ array: array })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to send array');
            }
           return response.json();
        })
        .then(data => {
           console.log(data.message); // 顯示成功消息
        })
        .catch(error => {
            console.error(error);
          console.log('Failed to send array');
        });
}

