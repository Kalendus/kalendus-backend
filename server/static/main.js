var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let allItems = [];
    function createClick() {
        const title = prompt("Title");
        const description = prompt("Description");
        const start = prompt("Start Date");
        const end = prompt("End Date");
        if (title && description && start && end) {
            const newItem = {
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
    function loadItems() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    function init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield loadItems();
            const createBtn = document.getElementById("create");
            if (createBtn)
                createBtn.onclick = createClick;
            const updateBtn = document.getElementById("update");
            if (updateBtn)
                updateBtn.onclick = updateClick;
            const deleteBtn = document.getElementById("delete");
            if (deleteBtn)
                deleteBtn.onclick = deleteClick;
        });
    }
    window.onload = init;
});
