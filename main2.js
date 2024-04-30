const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 设置 Express 中间件来解析请求体中的 JSON 数据
app.use(express.json());

// 设置根路径的 GET 请求发送到 HTML 页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'AACHAT2.html'));
});

// 设置 Express 中间件来提供静态文件
app.use(express.static('D:/AACHAT'));
let folderName;
let folderpath;
app.post('/createFolder', (req, res) => {
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

     const teammatesFolderPath = path.join(folderpath, 'teammates');
        fs.mkdir(teammatesFolderPath, { recursive: true }, (teammatesErr) => {
            if (teammatesErr) {
                console.error(teammatesErr);
                return res.status(500).json({ error: 'Failed to create teammates folder.' });
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
   
});
////////////////////////////
let ii=1;
let g=1;
app.post('/savetable', (req, res) => {
    const pdfData = req.body.pdfData;
    const pdfFileName = 'mytable'+ii+'.html'; 
    const pdfFilePath = path.join(folderpath,"table", pdfFileName);
  //  console.log(folderpath);
    let notimportantnumber=1;
    if(ii>100) {
        notimportantnumber=Math.floor(Math.random() * 2);
    }
    console.log(notimportantnumber+"  "+ii+" "+g);
   
    if(notimportantnumber) {
        fs.writeFile(pdfFilePath, pdfData,'utf8', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to save tMable.' });
            }
            if(ii>100) {

                const  folderPPath=path.join(folderpath, folderName);
                fs.readdir(folderPPath, (err, files) => {
                    if (err) {
                        console.error('Error reading folder:', err);
                        return;
                    }
                    // 过滤出 HTML 文件
                    const htmlFiles = files.filter(file => file.endsWith('.html'));
                    console.log( htmlFiles.length);
                    if (htmlFiles.length === 0) {
                        console.log('No HTML files found in the folder');
                        return;
                    }
                
                    // 随机选择一个 HTML 文件
                    const randomFile = htmlFiles[Math.floor(Math.random() * htmlFiles.length)];
                
                    // 构建被删除文件的完整路径
                    const filePath = path.join(folderPPath, randomFile);
                
                    // 删除文件
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                            return;
                        }
                        console.log(`File "${randomFile}" has been deleted`);
                    });
                });
               
            }
            ii++;
            g++;
            ////
            res.json({ message: 'PDF saved successfully.' });
        });
    }

    
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
        console.log( htmlFiles.length);
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
// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});