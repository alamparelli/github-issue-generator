require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

// Function to read markdown file
function readMarkdownFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

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
async function createGitHubIssues(issues) {
  const url = `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/issues`;
  const headers = {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  };

  for (const issue of issues) {
    try {
      const response = await axios.post(url, issue, { headers });
      console.log(`Created issue: ${response.data.html_url}`);
    } catch (error) {
      console.error(`Error creating issue: ${error.message}`);
    }
  }
}

// Main function
async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: node index.js <markdown_file>');
    process.exit(1);
  }

  if (!process.env.GITHUB_REPO_OWNER || !process.env.GITHUB_REPO_NAME || !process.env.GITHUB_TOKEN) {
    console.error('Please ensure all required environment variables are set in the .env file');
    process.exit(1);
  }

  const markdownContent = readMarkdownFile(filePath);
  const issues = parseMarkdownToIssues(markdownContent);
  await createGitHubIssues(issues);
}

main().catch(console.error);