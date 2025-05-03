function searchTerm() {
    var input = document.getElementById("searchTerm").value.toLowerCase();
    var terms = document.getElementsByClassName("term");

    for (var i = 0; i < terms.length; i++) {
        var term = terms[i].getAttribute("data-term").toLowerCase();
        if (term.includes(input)) {
            terms[i].style.display = "";
        } else {
            terms[i].style.display = "none";
        }
    }
}
