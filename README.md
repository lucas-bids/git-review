# Git Review 🤖

## Description

Git Review is an innovative script that seamlessly connects with OpenAI to perform insightful analysis of your commits before pushing them to the remote repository! With this tool, you can gain valuable feedback from an AI-powered review, ensuring the quality and efficiency of your codebase.

## Usage

Follow these simple steps to integrate Git Review into your project:

1. **Git Hooks Setup**: Begin by creating a file named `pre-push` (without extension) inside your Git Hooks directory, typically located at `.git/hooks`. You can achieve this by copying the contents from the provided `pre-push.sample` file to the new `pre-push` file.

2. **Permissions**: Ensure that the `pre-push` file is executable. Grant the necessary permissions by running the following command: `chmod +x .git/hooks/pre-push`.

3. **Integration**: Copy the `git-review.js` file into the root directory of your project. If you want to store it somewhere else, it will be necessary to update the `pre-push` file with the new script location.

4. **Environment Configuration**: Create a `.env` file in your project's root directory if you haven't already done so. Remember to add this `.env` file to your `.gitignore` to safeguard sensitive data.

5. **API Key**: Within the `.env` file, define a new variable named `OPENAI_API_KEY` and set it to your unique OpenAI API key. This ensures a secure and personalized AI experience.

6. **Dependencies**: Install the required dependencies by running the command: `npm install openai simple-git diff`.

7. **Activate Git Review**: Now, whenever you run the `git push` command, Git Review will prompt you to decide whether you want the AI to conduct a comprehensive review of your commits 🤖. Embrace this intelligent assistant to enhance your development process.

## Benefits

- **Code Quality Assurance**: Receive valuable insights from AI-powered analysis, helping you catch potential issues before they become problems.

- **Efficiency Boost**: With Git Review, you can optimize your development workflow and ensure only the best code reaches the remote repository.

- **Customizability**: Tailor the AI's behavior and preferences through the OpenAI API, adapting the review process to your specific needs.

- **Secure Integration**: The `.env` file ensures that your OpenAI API key remains private and protected.

- **Community-Driven**: Git Review is an open-source project actively supported by a vibrant community of developers.

## Feedback and Contribution

We welcome your feedback and contributions to make Git Review even better! If you encounter any issues, have suggestions, or want to contribute to the project, please feel free to raise an issue or submit a pull request on our GitHub repository.

Get ready to take your code review process to the next level with Git Review! 🚀🔍
