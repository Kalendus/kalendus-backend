import { KALENDAR_ITEM } from "./types";

let allItems: KALENDAR_ITEM[] = [];

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
        }).then(res => {
            console.log(`Create Status: ${res.status}`);
            window.location.href = "/";
        });
    }
}

function updateClick() {
    
}

function deleteClick() {
    
}

async function loadItems() {

}

async function init() {
    await loadItems();

    const createBtn = document.getElementById("create");
    if (createBtn)
        createBtn.onclick = createClick;
    
    const updateBtn = document.getElementById("update");
    if (updateBtn)
        updateBtn.onclick = updateClick;
    
    const deleteBtn = document.getElementById("delete");
    if (deleteBtn)
        deleteBtn.onclick = deleteClick;
}

window.onload = init;