# GitHub Issue Generator

This Node.js script generates GitHub issues from a markdown file. Each top-level heading (# ) in the markdown file becomes a new issue title, and the content below it becomes the issue body.

## Prerequisites

- Node.js installed on your system
- A GitHub account and a personal access token with repo scope

## Installation

1. Clone this repository:

   ```
   git clone https://github.com/yourusername/github-issue-generator.git
   cd github-issue-generator
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add your GitHub configuration:

   ```
   GITHUB_REPO_OWNER=your_github_username
   GITHUB_REPO_NAME=your_repo_name
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   Replace the values with your actual GitHub username, repository name, and personal access token.

## Usage

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

## License

This project is open source and available under the [MIT License](LICENSE).
