# Git Review

## Description

This is a script that connects with ChatGPT to analyze you

## Usage

1. Create a file named `pre-push` (without extension) inside your Git Hooks directory (by default it's `.git/hooks`) and copy the contents from the `pre-push.sample` to the new file;
2. Grant executable permissions to the new file by running: `chmod +x .git/hooks/pre-push`;
3. Copy the `git-review.js` to your project root directory;
4. Create a new variable on your `.env` file called `OPENAI_API_KEY` that receives your own API key;
5. Run `npm install openai simple-git diff` to install the dependencies;
6. Now when running `git push` you should be prompted to decide if you want AI to review your commits 🤖;
