const citations_dictionary = {
    burkhart: 'Burkhart, B. Y. (2004). "What Coyote and Thales Can Teach Us: An Outline of American Indian Epistemology."',
    corbett: 'Corbett, J. (2024, March 19). CREE#: Coding in Cree | Cultural Survival. <a target="_blank" href="https://www.culturalsurvival.org/publications/cultural-survival-quarterly/cree-coding-cree">https://www.culturalsurvival.org/publications/cultural-survival-quarterly/cree-coding-cree</a>',
    cordova: 'Cordova, V. F. (with Moore, K. D., Peters, K., Jojola, T. S., Lacy, A., & Hogan, L.). (2007). How it is: The Native American philosophy of V.F. Cordova. The University of Arizona Press.',
    smithsonian: 'Smithsonian Education (Director). (2008, February 5). Lakota Winter Counts [Video recording]. <a target="_blank" href="https://www.youtube.com/watch?v=XNaYrAKiZmw">https://www.youtube.com/watch?v=XNaYrAKiZmw</a>',
    tovias:'Tovias, B. (2014). The Right to Possess Memory: Winter Counts of the Blackfoot, 1830–1937. Ethnohistory, 61(1), 99–122. <a target="_blank" href="https://doi.org/10.1215/00141801-2376096">https://doi.org/10.1215/00141801-2376096</a>',
    learnmore: 'This project was created for LIS 534: Indigenous Systems of Knowledge at the University of Washington, Autumn 2025. No AI was used or referenced. Code adapted from <a target="_blank" href="https://codepen.io/narrowdesign/pen/JNVyJb">https://codepen.io/narrowdesign/pen/JNVyJb</a>'
};

var citation_wrapper = document.getElementById("citation-wrapper");
var citation_content = document.getElementById("citation-content");

var copy_icon = document.getElementById("copy-icon")

function fillInCitation(ref) {
    var content = citations_dictionary["" + ref];
    citation_content.innerHTML = content;
    copy_icon.onclick = function () { navigator.clipboard.writeText(content) };

}


function checkForCitations(data_cite) {

    if (data_cite != null && data_cite != undefined) {
        citation_wrapper.style.display = "flex";
        fillInCitation(data_cite);

    } else {
        hideCitation();
    }

}

function hideCitation() {
    citation_wrapper.style.display = "none";

}