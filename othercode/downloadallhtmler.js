function downloadHtml() {
   // var htmlContent = document.documentElement.outerHTML;
   // var htmlContent = document.getElementById("download").innerHTML;
   var newDoc = document.implementation.createHTMLDocument();
   var originalHead = document.head.cloneNode(true);
   originalHead.childNodes.forEach(function(node) {
      newDoc.head.appendChild(node.cloneNode(true));
   });
   var originalScripts = document.querySelectorAll('script');
   originalScripts.forEach(function(script) {
       if (!script.src) {
           var newScript = document.createElement('script');
           newScript.textContent = script.textContent;
           newDoc.head.appendChild(newScript);
       }
   });
   var divsToDownload = document.querySelectorAll('#download');
    divsToDownload.forEach(function(div) {
        var newDiv = div.cloneNode(true);
        newDoc.body.appendChild(newDiv);
    });
    
   

// 建立下載連結
    var doc=newDoc.documentElement.outerHTML;

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

