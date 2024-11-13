const customSelect = document.getElementById("custom-select");

console.log(customSelect)

if (customSelect) {
    const selElmnt = customSelect.getElementsByTagName("select")[0];

    console.log(selElmnt)

    const optionContainer = document.createElement("DIV");
    optionContainer.setAttribute("class", "select-selected");
    optionContainer.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    customSelect.appendChild(optionContainer);
    
    /*for each element, create a new DIV that will contain the option list:*/
    const option = document.createElement("DIV");
    option.setAttribute("class", "select-items select-hide");
    
    for (let j = 1; j < selElmnt.length; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        const item = document.createElement("DIV");
        item.innerHTML = selElmnt.options[j].innerHTML;
        item.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            let selectItem = this.parentNode?.parentNode?.getElementsByTagName("select")[0];
            let previousSibling = this.parentNode?.previousSibling;

            for (let i = 0; i < selectItem.length; i++) {
                if (selectItem.options[i].innerHTML == this.innerHTML) {
                    selectItem.selectedIndex = i;
                    previousSibling.innerHTML = this.innerHTML;
                    const sameAsSelected = this.parentNode?.getElementsByClassName("same-as-selected");
                    for (let k = 0; k < sameAsSelected.length; k++) {
                        sameAsSelected[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            previousSibling?.click();
        });
        option.appendChild(item);
    }
    customSelect.appendChild(option);
    optionContainer.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}


function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/

    let selectedList = [];
    let selectItems = document.getElementsByClassName("select-items");
    let selected = document.getElementsByClassName("select-selected");

    for (let i = 0; i < selected.length; i++) {
        if (elmnt == selected[i]) {
            selectedList.push(i)
        } else {
            selected[i].classList.remove("select-arrow-active");
        }
    }
    for (let i = 0; i < selectItems.length; i++) {
        if (selectedList.indexOf(i)) {
            selectItems[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);