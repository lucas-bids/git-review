#!/usr/bin/env node

const { Configuration, OpenAIApi } = require("openai");

const git = require('simple-git');
const diff = require('diff');

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

// Função para gerar revisão de código com a API da OpenAI
async function generateReview(code) {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: "user", content: `Review the following JavaScript code:\n\n${code}\n, based on good practices, performance and clean code. Please note that the response will be logged in the terminal's console, so format the text accordingly. Set the output color to be green using ANSI Escape Codes.`}],
        max_tokens: 200,
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
            for (let hunk of patch.hunks) {
                const changes = hunk.lines.join('\n');
                const review = await generateReview(changes);
                console.log(review.content);
            }
        }
    }
}

main();