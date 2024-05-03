const express = require('express');
const socketIo = require('socket.io');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
let ii=1;
// 设置 Express 中间件来解析请求体中的 JSON 数据
const server = http.createServer(app);
app.use(express.json());
const io = socketIo(server);
// 设置根路径的 GET 请求发送到 HTML 页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'AACHAT' ,'AACHAT2.html'));
});
/////////////////////////

app.get('/listFolders', (req, res) => {
    const folderPath = path.join(__dirname,"allthetable"); // 指定特定資料夾的路徑
    // 讀取資料夾內容
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Failed to read directory.' });
        }
        // 過濾出文件夾
        const folders = files.filter(file => fs.statSync(path.join(folderPath, file)).isDirectory());
        res.json({ folders });
    });
});
app.delete('/deleteFolder', (req, res) => {
    const folderToDelete = req.query.folder;
     folderPath = path.join(__dirname,"allthetable");
     folderPath = path.join(folderPath, folderToDelete); // 請替換為您的資料夾路徑
  
     fs.rm(folderPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Error deleting folder:', err);
          return res.status(500).json({ error: 'Failed to delete folder.' });
        }
        res.sendStatus(200);
      });
  });

  
// 设置 Express 中间件来提供静态文件
app.use(express.static('D:/AACHAT'));
let folderName;
let folderpath;
app.post('/createFolder', (req, res) => {
    ii=1;
    folderName = req.body.folderName;
    if (!folderName) {
        return res.status(400).json({ error: 'Folder name is required.' });
    }

    // 创建文件夹路径
    folderpath = path.join(__dirname,"allthetable", folderName);

    // 创建文件夹
    fs.mkdir(folderpath, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create folder.' });
        }
                     // 创建子文件夹 table
        const tableFolderPath = path.join(folderpath, 'table');
        fs.mkdir(tableFolderPath, { recursive: true }, (tableErr) => {
            if (tableErr) {
                console.error(tableErr);
                return res.status(500).json({ error: 'Failed to create table folder.' });
            }

            res.json({ message: 'Folder and subfolders created successfully.' });
        });
    });
   
});
//////////////////////,,,,,,,,,,,,,,,,,,,,,,,//////
app.post('/saveallhtml', (req, res) => {
    const teamateshtml = req.body.htmler;

    const saveFilePath = path.join(__dirname, 'allthetable',folderName, folderName+'.html');
   // const directoryPath = path.dirname(saveFilePath);
    const another_path=path.join(__dirname, 'allthetable',folderName);
    // Ensure the directory exists before attempting to write the file
    fs.mkdir(another_path, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return res.status(500).json({ error: 'Failed to create directory html.' });
        }
       // console.log("D");
        // Now write the file
        fs.writeFile(saveFilePath, teamateshtml, 'utf8', (err) => {
            if (err) {
                console.error(err+"FFFFFFFFFFFF");
                return res.status(500).json({ error: 'Failed to save HTML.' });
            }
            res.json({ message: 'HTML saved successfully.' });
        });

    });
});
//////////

app.post('/savearray', (req, res) => {
    const teamateshtml = req.body.array;
    const saveFilePath = path.join(__dirname, 'allthetable',folderName,  folderName+'.json');
   // const directoryPath = path.dirname(saveFilePath);
    fs.writeFile(saveFilePath, teamateshtml, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save json.' });
        }
        res.json({ message: 'json saved successfully.' });
    });

});

 //////////////////////////////
 
 app.post('/showtheresult', (req, res) => {
    const tableFolderPath = path.join(folderpath, 'table');
  //  console.log(tableFolderPath);
    fs.readdir(tableFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // 篩選出HTML檔案
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        // 隨機選擇一個HTML檔案
        const randomIndex = Math.floor(Math.random() * htmlFiles.length);
       // console.log( htmlFiles.length);
      //  console.log(randomIndex);
       const randomHTMLFile = htmlFiles[randomIndex];

        // 讀取HTML檔案的內容並回傳給客戶端
        fs.readFile(path.join(tableFolderPath, randomHTMLFile), 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
           // console.log("MAYBE");
            // 回傳HTML檔案的內容給客戶端
            res.send(data);
        });
    });
});
///////////////
app.post('/showexistingResult', (req, res) => {
    var x=req.body.name;
    console.log(x);
    const tableFolderPath = path.join(__dirname,'allthetable',x, 'table');
    console.log(tableFolderPath);
    fs.readdir(tableFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // 篩選出HTML檔案
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        // 隨機選擇一個HTML檔案
        const randomIndex = Math.floor(Math.random() * htmlFiles.length);
       // console.log( htmlFiles.length);
      //  console.log(randomIndex);
       const randomHTMLFile = htmlFiles[randomIndex];

        // 讀取HTML檔案的內容並回傳給客戶端
        fs.readFile(path.join(tableFolderPath, randomHTMLFile), 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
           // console.log("MAYBE");
            // 回傳HTML檔案的內容給客戶端
            res.send(data);
        });
    });
});
 //////////////////////////////////
 app.post('/savetable', (req, res) => {
    const pdfData = req.body.pdfData;
    const pdfFileName = 'mytable'+ii+'.html'; 
    ii++;
    const pdfFilePath = path.join(folderpath,"table", pdfFileName);
  //  console.log(folderpath);
    let notimportantnumber=1;
    if(ii>100) {
        notimportantnumber=1+Math.floor(Math.random() * (ii/100));
    }
 //  console.log(notimportantnumber+"  "+ii);
   
    if(notimportantnumber==1) {
        fs.writeFile(pdfFilePath, pdfData,'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save tMable.' });
            }
            if(ii>100) {

                 const pf=path.join(folderpath,"table");
                fs.readdir(pf, (err, files) => {
                    if (err) {
                        console.error('Error reading folder:', err);
                        return;
                    }
                    // 过滤出 HTML 文件
                    const htmlFiles = files.filter(file => file.endsWith('.html'));
                   // console.log( htmlFiles.length);
                    if (htmlFiles.length === 0) {
                        console.log('No HTML files found in the folder');
                        return;
                    }
                
                    // 随机选择一个 HTML 文件
                    const randomFile = htmlFiles[Math.floor(Math.random() * htmlFiles.length)];
                
                    // 构建被删除文件的完整路径
                    const filePath = path.join(pf, randomFile);
                    if(ii>100) {
                        try {
                            fs.unlinkSync(filePath);
                        //     console.log(`File "${randomFile}" has been deleted`);
                        } catch (err) {
                            console.error('Error deleting file:', err);
                            return;
                        }
                    }
                    // 删除文件

                });
               
            }
       
            
            ////
            res.json({ message: 'PDF saved successfully.' });
        });
    }
    else res.json({ message: 'PDF continue.' });
    
});
//////////////
app.post('/openexistinghtml', (req, res) => {
    const teamateshtml = req.body.name; // 假设请求体中有一个字段 name，用来指定 HTML 文件名
    const filePath = path.join(__dirname, 'allthetable', teamateshtml, teamateshtml+'.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teamHTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data); // 发送 HTML 文件的内容
    });
});
app.post('/openjson', (req, res) => {
    const teamateshtml = req.body.name; // 假设请求体中有一个字段 name，用来指定 HTML 文件名
    const filePath = path.join(__dirname, 'allthetable', teamateshtml, teamateshtml+'.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading teamHTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data); // 发送 HTML 文件的内容
    });
})

// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});