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

function updateClick(title: string) {
    const description = prompt("New Description");
    const start = prompt("New Start Date");
    const end = prompt("New End Date");

    const updatedItem: KALENDAR_ITEM = { "title": title };
    if (description != null)
        updatedItem.description = description;
    if (start != null)
        updatedItem.start = new Date(start);
    if (end != null)
        updatedItem.end = new Date(end);
    
    fetch("/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedItem)
    }).then(res => {
        if (res.status === 200) {
            window.location.href = "/";
        } else {
            console.error(res.statusText);
        }
    });
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

    const updateBtns = document.getElementsByClassName('updateBtn');
    for (let updateBtn of updateBtns) {
        const titleText = updateBtn.getAttribute("data-title");

        if (titleText != null)
            updateBtn.addEventListener("click", (e: Event) => updateClick(titleText));
    }
    
    const deleteBtns = document.getElementsByClassName('deleteBtn');

    for (let deleteBtn of deleteBtns) {
        const titleText = deleteBtn.getAttribute("data-title");

        if (titleText != null)
            deleteBtn.addEventListener("click", (e: Event) => deleteClick(titleText));
    }
}

window.onload = init;