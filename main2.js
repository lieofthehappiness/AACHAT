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
let folderName="123";
app.post('/createFolder', (req, res) => {
    folderName = req.body.folderName;
    if (!folderName) {
        return res.status(400).json({ error: 'Folder name is required.' });
    }

    // 创建文件夹路径
    const folderPath = path.join(__dirname, folderName);

    // 创建文件夹
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to create folder.' });
        }

     const teammatesFolderPath = path.join(folderPath, 'teammates');
        fs.mkdir(teammatesFolderPath, { recursive: true }, (teammatesErr) => {
            if (teammatesErr) {
                console.error(teammatesErr);
                return res.status(500).json({ error: 'Failed to create teammates folder.' });
            }

            // 创建子文件夹 table
            const tableFolderPath = path.join(folderPath, 'table');
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
app.post('/savetable', (req, res) => {
    const pdfData = req.body.pdfData;
    const pdfFileName = 'mytable.html'; 

    // 将PDF数据写入特定文件夹中
    const pdfFolderPath = path.join(__dirname, folderName, 'table'); // 指定目标文件夹路径
    const pdfFilePath = path.join(pdfFolderPath, pdfFileName);
    fs.writeFile(pdfFilePath, pdfData,'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save tMable.' });
        }
        res.json({ message: 'PDF saved successfully.' });
    });



});
 //////////////////////////////
// 启动 Express 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
