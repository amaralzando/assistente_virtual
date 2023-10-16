import React, { useState } from "react";

const ChatAssistent = () => {

    const apiKey = "API_KEY";

    const sendMessage = () =>{
        var message = document.querySelector("#message-input")   
        if(!message.value){
            message.style.border = '2px solid red'
            return
        }
        message.style.border = 'none'

        var btnSubmit = document.querySelector("#btn-submit")
        var status = document.querySelector("#status")

        btnSubmit.disabled = true
        btnSubmit.style.cursor = 'not-allowed'
        message.disabled = true

        showMessage(message.value)

        status.style.display = 'block'
        status.innerHTML = 'Carregando...'

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages:[
                    {
                      "role": "user",
                      "content": `${message.value}`
                    }
                  ],
                temperature: 1,
                max_tokens: 2048,
            })
        })       
        .then((response) => response.json())
        .then((data) => {
            status.style.display = 'none'
            showResponse(data.choices[0].message.content)
        })
        .catch((e) => {
            console.log('Errror => ', e)
        })
        .finally(() => {
            btnSubmit.disabled = false
            btnSubmit.style.cursor = 'pointer'
            message.disabled = false
        })
    }
    
    const showMessage = (message) => {
        var historic = document.querySelector("#historic")

        var divMessage = document.createElement("div")
        divMessage.className = 'divMessage'
        divMessage.innerHTML = message

        historic.appendChild(divMessage)

        historic.scrollTop = historic.scrollHeight
    }

    const showResponse = (resp) => {
        var historic = document.querySelector("#historic")

        var divResponse = document.createElement("div")
        divResponse.className = 'divResponse'
        divResponse.innerHTML = resp

        historic.appendChild(divResponse)

        historic.scrollTop = historic.scrollHeight
    }

    return(
        <div className="bg-black flex justify-center h-screen w-screen">
            <div className="flex flex-col my-20 bg-white text-black justify-between rounded-xl text-center w-4/5 max-h-4/5">
                <div className="bg-Secondary text-white text-2xl font-bold py-5 rounded-t-xl">
                    <p>Gasa Chat</p>
                </div>
                <p id="status"></p>
                <div id="historic" className="historic p-4 overflow-auto flex flex-col gap-4 h-full">
                    
                </div>
                <div className="bg-Secondary py-5 rounded-b-xl space-x-2">
                    <input className="w-1/2 text-lg outline-none border-none p-2 rounded-lg" 
                        id="message-input" 
                        type="text" 
                        placeholder="Escreva sua dúvida:"/>
                    <button 
                        className="rounded-xl text-lg p-2 border-none bg-white hover:bg-Quaternary transition-colors" 
                        id="btn-submit"
                        onClick={sendMessage}
                            >Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default ChatAssistent