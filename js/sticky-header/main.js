import makeStickyHeader from "./stickyHeader.js";

const headerContainer = document.getElementById("HeaderContainer");
const header = document.getElementById("Header");

if (headerContainer) {
    makeStickyHeader(headerContainer, header, "header--fixed");
}


let navigationOpened = false;
const headerNavigation = document.getElementById("HeaderNavigation");
const headerNavigationButton = document.getElementById("HeaderNavigationButton");

headerNavigationButton.addEventListener("click", () => {
    navigationOpened = !navigationOpened;

    if (navigationOpened) {
        headerNavigation.classList.add("header__navigation--opened");
        headerNavigationButton.classList.add("nav-toggle-button--checked");
    } else {
        headerNavigation.classList.remove("header__navigation--opened");
        headerNavigationButton.classList.remove("nav-toggle-button--checked");
    }
});