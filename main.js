
function add() {
    let inputValue = document.getElementById("inputbox").value;
    if (inputValue.trim()) {
        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: inputValue,
                completed: false,
                userId: 100,
            })
        })
            .then(res => res.json())
            .then(data => {

                let table = document.getElementById('table');
                let tr = document.createElement('tr');
                let tasksNum = table.rows.length;
                tr.id = 'tr' + tasksNum;

                //Creat checkbox element
                let checkTd = document.createElement('td');
                checkTd.style.padding = 0;

                let taskId = document.createElement('td');
                let desc = document.createElement('td');
                let taskDate = document.createElement('td');
                let status = document.createElement('td');

                //Creat remove element
                let remove = document.createElement('td');
                remove.innerHTML = '<img class="delete" src="imges/delete.png" onclick="deleteRow(this)" />';

                checkTd.innerHTML = '<input type="checkbox" style="width: 45px; height: 45px;" onclick="handleClick(this)">';
                tr.appendChild(checkTd);

                taskId.innerHTML = tasksNum;
                tr.appendChild(taskId);

                desc.innerHTML = data.todo;
                tr.appendChild(desc);

                taskDate.innerHTML = new Date().toLocaleDateString();
                tr.appendChild(taskDate);

                status.innerHTML = getStatus(data.completed);
                tr.appendChild(status);

                // remove.appendChild(delImg);
                tr.appendChild(remove);

                table.appendChild(tr);
                console.log(JSON.stringify(data, null, 2))
                document.getElementById("inputbox").value = '';
            });
    }
}

function getStatus(completed) {
    if (completed == false) {
        return "In progress";
    }
    else {
        return "Completed";
    }
}

function deleteRow(el) {

    // if user answer no, return out of function.
    if (!confirm("Are you sure you want to delete this todo item?")) return;

    let tbl = el.parentNode.parentNode.parentNode;
    let row = el.parentNode.parentNode.rowIndex;
    tbl.deleteRow(row);

    updateRowsIndex();
}

function updateRowsIndex() {
    let table = document.getElementById('table');
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i+1].cells[1].innerHTML = i+1;
    }
}

function handleClick(el) {
    let parentTr = el.closest("tr");
    let description = document.getElementById(parentTr.id).childNodes[2];
    let status = document.getElementById(parentTr.id).childNodes[4];
    if (el.checked) {
        description.style.textDecoration = "line-through";
        status.innerHTML= "Completed";

    }
    else {
        description.style.textDecoration = "none";
        status.innerHTML= "In progress";
    }
}






