import Modal from "react-modal";
import "@testing-library/jest-dom";

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

Modal.setAppElement("#root");
