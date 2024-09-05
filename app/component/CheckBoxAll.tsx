"use client";

export default function CheckBoxAll() {
    function click() {
        const all = document.getElementById("AllBox") as HTMLInputElement;
        const boxes = document.querySelectorAll("input[type=checkbox]");
        boxes.forEach((box) => {
            box.checked = all.checked;
        });
    }
    return(
        <input id="AllBox" type="checkbox" onClick={click} />
    )
}
