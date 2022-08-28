const sidebar = document.getElementById("Sidebar");
const button = document.getElementById("SidebarButton");

let opened = false;

button.addEventListener("click", () => {
    opened = !opened;

    if (opened) {
        button.classList.add("article__sidebar-button--checked");
        sidebar.classList.add("article__sidebar--opened");
    } else {
        button.classList.remove("article__sidebar-button--checked");
        sidebar.classList.remove("article__sidebar--opened")
    }
});