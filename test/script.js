document.addEventListener("DOMContentLoaded", function() {
    var cookieList = document.getElementById("cookies");
    var saveButton = document.getElementById("saveButton");

    // Fetch the cookies and display them in the list
    function displayCookies() {
        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            var li = document.createElement("li");
            li.textContent = cookie[0] + ": " + cookie[1];
            cookieList.appendChild(li);
        }
    }

    // Save the cookies to the database
    // function saveCookies() {
    //     // Set a cookie (to test)
    //     document.cookie = "cookie1=value1; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
    //     document.cookie = "cookie2=value2; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";

    //     var cookies = document.cookie.split("; ");
    //     for (var i = 0; i < cookies.length; i++) {
    //         var cookie = cookies[i].split("=");
    //         var name = cookie[0];
    //         var value = cookie[1];

    //         // Store the cookie in the database
    //         // Make an AJAX request to save the data
    //         var xhr = new XMLHttpRequest();
    //         xhr.open("GET", "save_cookies.php?name=" + encodeURIComponent(name) + "&value=" + encodeURIComponent(value), true);
    //         xhr.onreadystatechange = function() {
    //             if (xhr.readyState === 4 && xhr.status === 200) {
    //                 console.log("Cookies saved!");
    //             }
    //         };
            
    //         xhr.send();
    //     }
    // }

    function saveCookies() {
        // Set a cookie (to test)
        document.cookie = "cookie1=value1; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";
        document.cookie = "cookie2=value2; expires=Fri, 31 Dec 2023 23:59:59 GMT; path=/";

        var cookies = document.cookie.split("; ");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split("=");
            var name = cookie[0];
            var value = cookie[1];

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", "save_cookies.php?name=" + name + "&value=" + value, true);
            
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    document.getElementById("txtHint").innerHTML = this.responseText;
                }
            };
            
            xmlhttp.send();
        }
    }

    // Event listener for the save button
    saveButton.addEventListener("click", function() {
        saveCookies();
    });

    // Display the cookies on page load
    displayCookies();
});