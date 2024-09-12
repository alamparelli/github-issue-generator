require('dotenv').config();
const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());

// Function to parse markdown content into issues
function parseMarkdownToIssues(content) {
  const issues = [];
  const lines = content.split('\n');
  let currentIssue = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      if (currentIssue) {
        issues.push(currentIssue);
      }
      currentIssue = { title: line.substring(2).trim(), body: '' };
    } else if (currentIssue) {
      currentIssue.body += line + '\n';
    }
  }

  if (currentIssue) {
    issues.push(currentIssue);
  }

  return issues;
}

// Function to create GitHub issues
async function createGitHubIssues(issues, token, owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  const createdIssues = [];

  for (const issue of issues) {
    try {
      const response = await axios.post(url, issue, { headers });
      createdIssues.push(`Created issue: ${response.data.html_url}`);
    } catch (error) {
      createdIssues.push(`Error creating issue: ${error.message}`);
    }
  }

  return createdIssues;
}

app.post('/generate', upload.single('markdownFile'), async (req, res) => {
  const { githubToken, repoOwner, repoName } = req.body;
  const markdownFile = req.file;

  if (!githubToken || !repoOwner || !repoName || !markdownFile) {
    return res.status(400).send('Missing required parameters');
  }

  try {
    const markdownContent = fs.readFileSync(markdownFile.path, 'utf8');
    const issues = parseMarkdownToIssues(markdownContent);
    const result = await createGitHubIssues(issues, githubToken, repoOwner, repoName);

    // Clean up the uploaded file
    fs.unlinkSync(markdownFile.path);

    res.send(result.join('\n'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while generating issues');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});