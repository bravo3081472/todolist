var list = document.querySelector('.list');
var sendData = document.querySelector('.send');
var data = JSON.parse(localStorage.getItem('listData')) || [];

sendData.addEventListener('click', addData, false);
list.addEventListener('click', toggleDone, false);
updateList(data);

function addData(e) {
    e.preventDefault();
    var txt = document.querySelector('.text').value
    var todo = {
        content: txt
    }
    data.push(todo)
    updateList(data)
    localStorage.setItem('listData',JSON.stringify(data))
    document.querySelector('.text').value = ""
}

function updateList(items) {
    str = ''
    var len = items.length
    for(var i = 0; len > i; i++){
        str += '<li><span>'+ items[i].content +'</span><a href="#"><i data-index="'+ i +'" class="far fa-trash-alt"></i></a></li>'
    }
    list.innerHTML = str
}

function toggleDone(e) {
    e.preventDefault();
    if(e.target.tagName !== 'I'){return}
    var index = e.target.dataset.index
    data.splice(index,1)
    localStorage.setItem('listData',JSON.stringify(data))
    updateList(data)
}