function createFolder() {
    const folderName = document.getElementById("folderName").value.trim();

    if (!folderName) {
        alert("Please enter a folder name.");
        return;
    }
    document.getElementById("tableSize").style.display=("block");
    document.getElementById("folderCreation").style.display=("none");
    fetch('/createFolder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folderName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create folder.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // 显示成功消息
    })
    .catch(error => {
        console.error(error);
        alert('Failed to create folder.');
    });
}