    function generateUniqueColor() {
        let letters = "0123456789ABCDEF";
        let color = "";
        do {
            color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (usedColors.includes(color)); // 檢查是否已使用過該顏色
        
        return color;
    }