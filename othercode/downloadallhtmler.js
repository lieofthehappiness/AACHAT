function downloadHtml() {
   // var htmlContent = document.documentElement.outerHTML;
   // var htmlContent = document.getElementById("download").innerHTML;
   var doc = document.getElementById('download').innerHTML;

    // 清理
    fetch('/saveallhtml', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ htmler: doc })
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to send html');
            }
           return response.json();
        })
        .then(data => {
           console.log(data.message); // 顯示成功消息
        })
        .catch(error => {
            console.error(error);
          console.log('Failed to send htmler');
        });
}

