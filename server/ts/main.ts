import { KALENDAR_ITEM } from "./types";

function createClick() {
    const title = prompt("Title");
    const description = prompt("Description");
    const start = prompt("Start Date");
    const end = prompt("End Date");

    if (title && description && start && end) {
        const newItem: KALENDAR_ITEM = {
            "title": title,
            "description": description,
            "start": new Date(start),
            "end": new Date(end)
        };

        fetch("/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(res => window.location.href = "/" );
    }
}

function updateClick() {
    
}

function deleteClick(title: string) {
    fetch("/delete", {
        method: 'DELETE',
        body: JSON.stringify(title),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status === 200) {
            window.location.href = "/";
        } else {
            console.error(response.statusText)
        }
    });
}

function init() {
    const createBtn = document.getElementById("create");
    if (createBtn)
        createBtn.onclick = createClick;
    
    const updateBtn = document.getElementById("update");
    if (updateBtn)
        updateBtn.onclick = updateClick;
    
    const deleteBtns = document.getElementsByClassName('deleteBtn');
    console.log(deleteBtns);

    for (let deleteBtn of deleteBtns) {
        const titleText = deleteBtn.getAttribute("data-title");

        if (titleText != null)
            deleteBtn.addEventListener("click", (e: Event) => deleteClick(titleText));
    }
}

window.onload = init;