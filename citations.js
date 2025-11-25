citations = [
    {
        "cite": "this is the first cite this add more space or less space or whatever needs to happen, thanks so much",
        "notes": "this is notes about that cite1",
        "revealed": true
    },
    {
        "cite": "this is the first cite this add more space or less space or whatever needs to happen, thanks so much",
        "notes": "this is notes about that cite1",
        "revealed": true
    },
    {
        "cite": "this is the first cite this add more space or less space or whatever needs to happen, thanks so much",
        "notes": "this is notes about that cite1 :)",
        "revealed": true
    },
    {
        "cite": "this is the first cite this add more space or less space or whatever needs to happen, thanks so much",
        "notes": "this is notes about that cite1",
        "revealed": true
    },


];



// ICONS FROM GOOGLE MATERIAL DESIGN
icons = [];
icons.copy = '<span title="Copy to clipboard" class="material-symbols-outlined">content_copy</span>';

// ENSURE CARDS ARE ALWAYS ABOVE EACH OTHER WHEN CLICKED
var highestIndex = 1;

// OBJECTS
const reveal_all = document.getElementById("reveal_all");
const empty_state = document.getElementById("empty_state");

// SET UP FUNCTIONS
renderCitations();


// SHOW CARDSAND MAKE THEM DRAGGABLE
function renderCitations() {
    const card_wrapper = document.getElementById("card_wrapper");

    var hiddenCount = 0;
    var citationsLength = 0;

    for (var id in citations) {
        citationsLength++;
        if (citations[id].revealed) {


            // create a new div element
            const newCard = document.createElement("div");

            newCard.classList.add("card");

            const cardTitle = document.createElement("p");
            cardTitle.classList.add("card_title");
            cardTitle.innerHTML = citations[id].cite;

            const copyIcon = document.createElement("div");
            copyIcon.classList.add("copy_icon");
            copyIcon.innerHTML = icons.copy;
            copyIcon.onclick = function () { navigator.clipboard.writeText(citations[id].cite) };

            const cardHeading = document.createElement("div");
            cardHeading.classList.add("card_heading");
            cardHeading.appendChild(cardTitle);
            cardHeading.appendChild(copyIcon);

            newCard.appendChild(cardHeading);

            const cardContent = document.createElement("p");
            cardContent.classList.add("card_content");
            cardContent.innerHTML = citations[id].notes;

            newCard.appendChild(cardContent);

            newCard.draggable = true;
            // dragElement(newCard);

            card_wrapper.appendChild(newCard);
        } else {
            hiddenCount++;
        }
    }

    if (hiddenCount == citationsLength) {
        empty_state.style.display = "block";
    } else {

        empty_state.style.display = "none";
    }

}



// // DRAGGABLE
// // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
// function dragElement(elmnt) {
//     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

//     elmnt.onmousedown = dragMouseDown;


//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // get the mouse cursor position at startup:
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         document.onmouseup = closeDragElement;
//         // call a function whenever the cursor moves:
//         document.onmousemove = elementDrag;
//         // console.log(e);

//         elmnt.style.zIndex = highestIndex;
//         highestIndex++;
//         reveal_all.style.zIndex = highestIndex + 1;

//     }

//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();
//         // calculate the new cursor position:
//         pos1 = pos3 - e.clientX;
//         pos2 = pos4 - e.clientY;
//         pos3 = e.clientX;
//         pos4 = e.clientY;
//         // set the element's new position:
//         elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//         elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//     }

//     function closeDragElement() {
//         /* stop moving when mouse button is released:*/

//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }

function revealAll() {

    if (confirm("Reveal all citations? The only way to reset this is to reset all your progress.")) {

        for (var id in citations) {
            citations[id].revealed = true;
        }

        renderCitations();

    }
}