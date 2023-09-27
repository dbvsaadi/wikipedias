let searchInputEle = document.getElementById("searchInput");
let searchResultEle = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1.Div container-result-item

    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultEle.appendChild(resultItemEle);

    //2.anchor title--result-title

    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.textContent = title;
    resultTitleEle.href = link;
    resultTitleEle.target = "_blank";
    resultItemEle.appendChild(resultTitleEle);

    //3. titlebreak

    let titleBreakEle = document.createElement("br");
    resultItemEle.appendChild(titleBreakEle);

    //4.anchor url--result-url

    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.textContent = link;
    urlEle.href = link;
    urlEle.target = "_blank";
    resultItemEle.appendChild(urlEle);

    //5. line break

    let lineBreak = document.createElement("br");
    resultItemEle.appendChild(lineBreak);

    //6. paragraph description-- line-desciption

    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add("line-description");
    descriptionEle.textContent = description;
    resultItemEle.appendChild(descriptionEle);

}


function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultEle.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEle.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });

    }
}


searchInputEle.addEventListener("keydown", searchWikipedia);