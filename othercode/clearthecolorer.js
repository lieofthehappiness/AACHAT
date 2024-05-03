function clearthecolor() {
    var cells = document.querySelectorAll('#teammate-table td');
    cells.forEach(function(cell) {
        cell.style.backgroundColor = 'white';
    });
    currentSelectedCells=[];

}