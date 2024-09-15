# GitHub Issue Generator

This application generates GitHub issues from a markdown file. Each top-level heading (# ) in the markdown file becomes a new issue title, and the content below it becomes the issue body. It now features both a command-line interface and a web interface for ease of use.

## Prerequisites

- Node.js installed on your system
- A GitHub account and a personal access token with repo scope

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/alamparelli/github-issue-generator.git
   cd github-issue-generator
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add your GitHub configuration (for command-line usage):

   ```
   GITHUB_REPO_OWNER=your_github_username
   GITHUB_REPO_NAME=your_repo_name
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   Replace the values with your actual GitHub username, repository name, and personal access token.

## Usage

### Web Interface

1. Start the server:

   ```
   node index.js
   ```

2. Open your web browser and navigate to `http://localhost:3000`.

3. Fill in the form with the following information:
   - GitHub Token: Your GitHub personal access token
   - Repository Owner: Your GitHub username or organization name
   - Repository Name: The name of the repository where you want to create issues
   - Markdown File: Upload a markdown file containing the issues you want to create

4. Click the "Generate Issues" button to create the issues.

5. The results will be displayed on the page, showing links to the created issues or any errors encountered.

### Command-line Interface

Run the script with the following command:

```
node index.js <markdown_file>
```

- `<markdown_file>`: Path to the markdown file containing the issues

Example:

```
node index.js sample-issues.md
```

## Markdown File Format

The markdown file should use the following format:

```markdown
# Issue Title 1

Issue body 1

# Issue Title 2

Issue body 2

# Issue Title 3

Issue body 3
```

Each top-level heading (# ) will create a new issue. The heading text becomes the issue title, and everything between headings becomes the issue body.

## Features

- Web interface for easy issue generation without using the command line
- Command-line interface for scriptable issue generation
- Supports multiple issues per markdown file
- Automatically creates GitHub issues with titles and descriptions

## License

This project is open source and available under the [MIT License](LICENSE).
