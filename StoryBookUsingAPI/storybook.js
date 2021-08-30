window.addEventListener("load", function () {

    // This variable holds the endpoint response for the current page
    var currentPageInfo;

    // Variable for total page count here so it can be accessed by multiple functions
    var totalPageCount;

    //Click event listeners for previous and next page

    document.querySelector("#turn-left").addEventListener("click", previous_page);
    document.querySelector("#turn-right").addEventListener("click", next_page);

    initialisePage();

    async function initialisePage() {

        //Request to the first endpoint to get the information about the pages in the storybook
        const response = await fetch("https://trex-sandwich.com/ajax/story");
        //Get a JSON object from the response
        const pageInfo = await response.json();
        //Set the totalPageCount variable to the total number of pages in the endpoint
        totalPageCount = pageInfo.length;
        //Call the loadPage function and pass in the URL for the first page as a parameter
        loadPage(pageInfo[0])
    }

    async function loadPage(pageUrlToFetch) {
        //Use the fetch API to create a request to the story endpoint
        const response = await fetch(pageUrlToFetch)
        //Use the response.json() method to get a JSON Obj from the response and store the JSON in the global variable currentPageInfo that will be used by other functions
        currentPageInfo = await response.json();
        //Call the updatePageDisplay function
        updatePageDisplay();
    }

    function updatePageDisplay() {

        const currentPage = document.querySelector("#current-page");
        const totalPage = document.querySelector("#total-page");
        const pageLeft = document.querySelector("#page-left");
        const pageRight = document.querySelector("#page-right");

        //Update the span element that displays the total page count to display the total page count
        currentPage.innerText = currentPageInfo.page_number;
        //Update the span element that displays the current page number to display the current page number
        totalPage.innerText = totalPageCount;
        //Update the div element for the right hand page div to display the content for the current page
        //Have a look at the structure of the data in the endpoint response to see the content property
        pageRight.innerHTML = `${currentPageInfo.content}`;
        //Create an image element, set the src attribute to the image property of the currentPageInfo JSONObject
        const img = document.createElement("img");
        img.src = `${currentPageInfo.image}`;
        //Remove any existing HTML elements from the left hand page div
        pageLeft.innerHTML = "";
        //Append the image element to the left hand page div
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