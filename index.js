#!/usr/bin/env node

const openai = require('openai');
const git = require('simple-git');
const diff = require('diff');

openai.apiKey = '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';

// Função para gerar revisão de código com a API da OpenAI
async function generateReview(code) {
    const response = await openai.Completion.create({
        engine: 'davinci-codex',
        prompt: `Review the following JavaScript code:\n\n${code}\n`,
        max_tokens: 150,
    });
    return response.choices[0].text;
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
                console.log(review);
            }
        }
    }
}

main();
