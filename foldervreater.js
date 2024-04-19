function createFolder() {
    const folderName = document.getElementById("folderName");
    if (!folderName) {
        alert("Please enter a folder name.");
        return;
    }


var request = indexedDB.open(folderName); 
request.onerror = function(event) {
    console.error('IndexedDB error:', event.target.error);
};

request.onsuccess = function(event) {
    console.log('IndexedDB opened successfully.');
    var db = event.target.result;
};

// 在版本升級時創建新的物件儲存物件
request.onupgradeneeded = function(event) {
    var db = event.target.result;

    
    db.createObjectStore('teamates', { keyPath: 'id', autoIncrement: true });

    
    db.createObjectStore('tables', { keyPath: 'id', autoIncrement: true });
    
    console.log('Object stores created.');
};




}