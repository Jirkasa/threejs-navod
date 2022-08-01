import makeStickyHeader from "./stickyHeader.js";

const headerContainer = document.getElementById("HeaderContainer");
const header = document.getElementById("Header");

makeStickyHeader(headerContainer, header, "header--fixed");