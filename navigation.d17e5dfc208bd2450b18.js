(()=>{const e=document.getElementById("Sidebar"),t=document.getElementById("SidebarButton");let d=!1;t.addEventListener("click",(()=>{d=!d,d?(t.classList.add("article__sidebar-button--checked"),e.classList.add("article__sidebar--opened")):(t.classList.remove("article__sidebar-button--checked"),e.classList.remove("article__sidebar--opened"))}))})();