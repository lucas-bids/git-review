import ChatBot from 'chatgpt-api';

main();

async function main() {
    const authToken = "";
    const chat = new ChatBot(authToken)
  
    try {
        console.log('ola');

        let response = await chat.sendPrompt("how to make pizza");
        console.log(response);
    } catch (error) {
        // when authToken is unauthorized
        console.log(error);
    }
}