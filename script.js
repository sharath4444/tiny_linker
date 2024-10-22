document.getElementById('shorten-btn').addEventListener('click', shortenUrl);

function shortenUrl() {
    const urlInput = document.getElementById('url-input').value;
    const resultDiv = document.getElementById('result');
    const shortenedUrlSpan = document.getElementById('shortened-url');
    const loadingDiv = document.getElementById('loading');

    if (!urlInput) {
        alert('Please enter a URL.');
        return;
    }

    // Show loading spinner
    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';

    // Build the API URL
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlInput)}`;

    fetch(apiUrl)
        .then(response => response.text()) // TinyURL API returns plain text
        .then(data => {
            shortenedUrlSpan.textContent = data; // The shortened URL is the response text
            resultDiv.style.display = 'block';
        })
        .catch(() => {
            alert('Error occurred while communicating with the server.');
        })
        .finally(() => {
            // Hide loading spinner
            loadingDiv.style.display = 'none';
        });
}

document.getElementById('copy-btn').addEventListener('click', () => {
    const urlToCopy = document.getElementById('shortened-url').textContent;
    navigator.clipboard.writeText(urlToCopy).then(() => {
        alert('Shortened URL copied to clipboard!');
    });
});
