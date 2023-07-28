#!/usr/bin/env node

const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const git = require('simple-git');
const diff = require('diff');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Função para gerar revisão de código com a API da OpenAI
async function generateReview(code) {
    let space = `\x1b`
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{role: "user", content: `Review the following JavaScript code:\n\n${code}\n, based on good practices, performance and clean code. Please note that the response will be logged in the terminal's console, so format the text accordingly.`}],
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
                const lines = review.content.split('\n');
                for (let line of lines) {
                    if (line.startsWith('```') && line.endsWith('```')) {
                        // Imprimir blocos de código em amarelo
                        console.log('\x1b[33m' + line + '\x1b[0m');
                    } else {
                        // Imprimir o restante do texto em azul
                        console.log('\x1b[34m' + line + '\x1b[0m');
                    }
                }
            }
        }
    }
}

main();