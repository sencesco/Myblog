/* Toggle between showing and hiding the navigation menu links 
   when the user clicks on the hamburger menu / bar icon */
function myFunction() {
    var sublist = document.getElementsByClassName("sublist");
    for (var idx = 0; idx < sublist.length; idx++) {
        if (window.getComputedStyle(sublist[idx]).display === "none") {
            sublist[idx].style.display = "block";
        } else {
            sublist[idx].style.display = "none";
        }
    }
}


/* Toggle between showing and hiding the content */
function toggleContent(button) {
    var content = button.nextElementSibling.nextElementSibling; // Update to skip over the link
    if (content.style.display === "none") {
        content.style.display = "block";
        button.textContent = "Hide";
    } else {
        content.style.display = "none";
        button.textContent = "Summary";
    }
}


// /* Fetch and display code from the specified URL and load descriptions */
document.addEventListener('DOMContentLoaded', function() {
    const codeWrapper = document.querySelector('.code-wrapper');
    const codeBlocks = codeWrapper.querySelectorAll('button[data-url]');
    const codeDisplay = document.getElementById('code-display');
    const copyButton = document.querySelector('.code-wrapper #copy-button');

    // Function to fetch and display code
    function fetchAndDisplayCode(url) {
        fetch(url)
            .then(response => response.text())
            .then(text => {
                codeDisplay.textContent = text;
                Prism.highlightElement(codeDisplay);
            })
            .catch(error => {
                codeDisplay.textContent = 'Error fetching code.';
                console.error('Error:', error);
            });
    }
    
    // Function to show only the matching content and hide others
    function showMatchingContent(buttonText) {
        const codeDescElements = document.getElementsByClassName("code-description");

        for (let i = 0; i < codeDescElements.length; i++) {
            let selector = codeDescElements[i].querySelector("ul li strong:first-child").innerText;
            selector = selector.replace(/:$/, "").trim(); // Removes colon at the end and trims whitespace

            // Check if selector matches the button text
            if (selector === buttonText) {
                codeDescElements[i].style.display = "block";  // Show matching content
            } else {
                codeDescElements[i].style.display = "none";  // Hide non-matching content
            }
        }
    }

    // Event listener for buttons that activate when clicked
    codeBlocks.forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            codeBlocks.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Fetch and display the code
            fetchAndDisplayCode(url);
            // Show matching content based on button text
            showMatchingContent(button.innerText);
        });
    });

    // Auto load the first file and show the first description when the page loads
    if (codeBlocks.length > 0) {
        const firstButton = codeBlocks[0];
        const firstUrl = firstButton.getAttribute('data-url');
        fetchAndDisplayCode(firstUrl);
        firstButton.classList.add('active');
        showMatchingContent(firstButton.innerText); // Show matching description
    }

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            if (codeDisplay && codeDisplay.textContent) {
                const tempTextArea = document.createElement('textarea');    // Create a temporary text area
                tempTextArea.value = codeDisplay.textContent;   // Set the value of the text area to the code
                document.body.appendChild(tempTextArea);    // Append the text area to the body
                tempTextArea.select();                      // Select the text area
                document.execCommand('copy');               // Copy the selected text
                document.body.removeChild(tempTextArea);
                
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);       // Revert back to "Copy" after 2 seconds
            } else {
                console.error('No code to copy');
                copyButton.textContent = 'No Code';
            }
        });
    } else {
        console.error('Copy button not found');
    }
});


function shareTwitter() {
    var url = window.location.href;
    var title = document.title;
    var shareUrl = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
    window.open(shareUrl, 'Twitter');
}

function shareFacebook() {
    var url = window.location.href;
    var title = document.title;
    var shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title);
    window.open(shareUrl, 'Facebook');
}

function shareLinkedin() {
    var url = window.location.href;
    var title = document.title;
    var shareUrl = 'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    window.open(shareUrl, 'LinkedIn');
}


/* Current time */
function updateDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    document.getElementById('currentDateTime').innerHTML = 
        `Current time: ${formattedDateTime}<br><br>© ${year} 
        Somchai Kradingthong. All rights reserved.`;
}

window.onload = updateDateTime;
setInterval(updateDateTime, 1000);  // Update the time every second
