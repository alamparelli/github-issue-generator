document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('issueForm');
    const resultDiv = document.getElementById('result');

    // Load saved values from localStorage
    ['githubToken', 'repoOwner', 'repoName'].forEach(field => {
        const savedValue = localStorage.getItem(field);
        if (savedValue) {
            document.getElementById(field).value = savedValue;
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Save form values to localStorage
        ['githubToken', 'repoOwner', 'repoName'].forEach(field => {
            localStorage.setItem(field, document.getElementById(field).value);
        });

        const formData = new FormData();
        formData.append('githubToken', document.getElementById('githubToken').value);
        formData.append('repoOwner', document.getElementById('repoOwner').value);
        formData.append('repoName', document.getElementById('repoName').value);
        formData.append('markdownFile', document.getElementById('markdownFile').files[0]);

        // Display loading message
        resultDiv.innerHTML = '<p>Generating issues... Please wait.</p>';

        try {
            // Send data to the backend
            const response = await fetch('/generate', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to generate issues');
            }

            const result = await response.text();

            // Display the result
            resultDiv.innerHTML = `
                <h2>Generated Issues:</h2>
                <pre>${result}</pre>
            `;
        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
        }
    });
});