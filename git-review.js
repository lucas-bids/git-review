#!/usr/bin/env node

const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const git = require('simple-git');
const diff = require('diff');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Função para gerar revisão de código com a API da OpenAI
async function generateReview(code) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Imagine you are a senior fullstack developer. Review the following code:\n\n${code}\n, based on good practices, performance, clean code and readability. Please note that the response will be logged in the terminal's console, so format the text accordingly. Always give alternatives when you find problematic code`,
      },
    ],
    max_tokens: 2000,
  });
  return response.data.choices[0].message;
}

// Função para obter as diferenças do último commit
async function getLastCommitDiff() {
  const log = await git().log({ n: 1 });
  const diff = await git().diff([log.latest.hash + '~1', log.latest.hash]);
  return diff;
}

// Função principal
async function main() {
  const diffText = await getLastCommitDiff();
  const patches = diff.parsePatch(diffText);

  for (let patch of patches) {
    if (patch.hunks.length > 0) {
      console.log(`Review for ${patch.oldFileName}:`);
      console.log('\n');
      for (let hunk of patch.hunks) {
        const changes = hunk.lines.join('\n');
        const review = await generateReview(changes);
        let reviewContentFormatted = formatContent(review.content);
        console.log(`${reviewContentFormatted} + \x1b[0m`);
      }
      console.log('\n');
    }
  }
}

function formatContent(content) {
  // Utilizamos regex para identificar blocos de código markdown
  const regex = /(```[\s\S]*?```)/gm;
  const subst = '\x1b[35m$1\x1b[34m';
  const result = content.replace(regex, subst);
  return '\x1b[34m ' + result + ' \x1b[34m';
}

main();