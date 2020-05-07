//設置DOM元素
var list = document.querySelector('.list'); //list = 資料顯示DOM元素.list
var sendData = document.querySelector('.send'); //sendData = 存檔按鈕DOM元素.send
var data = JSON.parse(localStorage.getItem('listData')) || []; //data = 先撈取存在JSON資料(localStorage資料為string,需轉成Array) 沒資料就是[]空陣列

//監視事件
sendData.addEventListener('click', addData, false); //點擊存檔按鈕 執行新增事件function addData
list.addEventListener('click', toggleDone, false); //點擊資料區 執行刪除事件function toggleDone
updateList(data);//一開始更新畫面 更新data資料

//新增事件
function addData(e) {
    var txt = document.querySelector('.text').value //txt = DOM元素.text的值
    var todo = { //制定陣列todo內容 = content項目為txt
        content: txt
    }
    data.push(todo) //將陣列傳給data資料
    updateList(data) //更新畫面 更新data資料
    localStorage.setItem('listData',JSON.stringify(data)) //localStorage紀錄資料, 自訂listData項目為data(localStorage只儲存String, 需將Array轉Siring)
    document.querySelector('.text').value = "" //使用者新增完資料後, 清空DOM元素資料
}

//更新畫面事件
function updateList(items) {
    str = '' //迴圈資料存放str
    var len = items.length //len = 計算陣列資料項目數
    for(var i = 0; len > i; i++){ //設置迴圈次數不超過陣列數
        str += '<li><span>'+ items[i].content +'</span><a href="#"><i data-index="'+ i +'" class="far fa-trash-alt"></i></a></li>'
    } //迴圈內容HTML語法, 並自訂資料index為值 用來紀錄第幾筆資料 以便用於資料刪除
    list.innerHTML = str //資料區.list加入HTML語法迴圈資料
}

//刪除事件
function toggleDone(e) {
    e.preventDefault(); //取消原先HTML a連結的預設行為
    if(e.target.tagName !== 'I'){return} //如果點到的不是HTML i元素都會終止刪除事件
    var index = e.target.dataset.index //index = 紀錄迴圈次數的自訂資料
    data.splice(index,1) //資料data刪除第index筆的一筆資料
    localStorage.setItem('listData',JSON.stringify(data)) //將資料data紀錄到localStorage
    updateList(data) //更新畫面 更新data資料
}