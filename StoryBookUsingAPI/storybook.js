window.addEventListener("load", function () {

    // Use this variable to hold the endpoint response for the current page
    var currentPageInfo;

    // Variable for total page count here so it can be accessed by multiple functions
    var totalPageCount;

    // TODO: add click event listeners

    document.querySelector("#turn-left").addEventListener("click", previous_page);
    document.querySelector("#turn-right").addEventListener("click", next_page);

    initialisePage();

    async function initialisePage() {

        // TODO: Use a request to the first endpoint to get the information about the pages in the storybook
        const response = await fetch("https://trex-sandwich.com/ajax/story");
        // TODO: Get a JSON object from the response
        const pageInfo = await response.json();
        // TODO: Set the totalPageCount variable to the total number of pages in the endpoint
        totalPageCount = pageInfo.length;
        // TODO: Call the loadPage function and pass in the URL for the first page as a parameter
        loadPage(pageInfo[0])
    }

    async function loadPage(pageUrlToFetch) {
        // TODO: Use the fetch API to create a request to the story endpoint
        const response = await fetch(pageUrlToFetch)
        // TODO: Use the response.json() method to get a JSON Obj from the response and store the JSON in the global variable currentPageInfo
        // the currentPageInfo variable will be used by other functions
        currentPageInfo = await response.json();
        // TODO: Call the updatePageDisplay function
        updatePageDisplay();
    }

    function updatePageDisplay() {

        const currentPage = document.querySelector("#current-page");
        const totalPage = document.querySelector("#total-page");
        const pageLeft = document.querySelector("#page-left");
        const pageRight = document.querySelector("#page-right");

        // TODO: Update the span element that displays the total page count to display the total page count
        currentPage.innerText = currentPageInfo.page_number;
        // TODO: Update the span element that displays the current page number to display the current page number
        totalPage.innerText = totalPageCount;
        // TODO: Update the div element for the right hand page div to display the content for the current page
        // Have a look at the structure of the data in the endpoint response to see the content property
        pageRight.innerHTML = `${currentPageInfo.content}`;
        // TODO: Create an image element, set the src attribute to the image property of the currentPageInfo JSONObject
        const img = document.createElement("img");
        img.src = `${currentPageInfo.image}`;
        // TODO: Remove any existing HTML elements from the left hand page div
        pageLeft.innerHTML = "";
        // TODO: Append the image element to the left hand page div
        pageLeft.appendChild(img);
    }

    // This function will control what happens then we want to load the previous page
    function previous_page() {
        if(currentPageInfo.previous_page !== undefined){
            loadPage(currentPageInfo.previous_page);
        }
    }

    // This function will control what happens then we want to load the next page
    function next_page() {
        if(currentPageInfo.next_page !== undefined){
            loadPage(currentPageInfo.next_page);
        }
    }

});