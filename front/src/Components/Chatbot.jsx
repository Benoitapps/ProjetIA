import {useEffect, useRef, useState} from 'react';
import OpenAiWhite from '@img/openai-white.svg';
import OpenAiOrange from '@img/openai-orange.svg';
import Close from '@img/close.svg';
import Send from '@img/send.svg';
import '@css/Chatbot.css';
import sendMessageToChatbot from "../hook/chatbot.js";

export default function Chatbot() {
    const [isOpened, setIsOpened] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputIsBlocked, setInputIsBlocked] = useState(false);
    const chat = useRef(null);

    useEffect(() => {
        setMessages([
            {
                role: 'bot',
                text: 'Bonjour, je suis votre assistant personnel, en quoi puis-je vous aider ?'
            }
        ]);
    }, []);

    useEffect(() => {
        if (chat.current) {
            document.querySelector('.chatbot__container__chat__message:last-child').scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        const input = document.querySelector('.chatbot__container__input input');
        const message = input.value;

        if (message !== '') {
            setMessages([
                ...messages,
                {
                    role: 'user',
                    text: message
                }
            ]);

            setInputIsBlocked(true);
            input.value = '';

            setTimeout(() => {
                setMessages([
                    ...messages,
                    {
                        role: 'user',
                        text: message
                    },
                    {
                        role: 'bot',
                        text: 'Je cherche la réponse à votre question, veuillez patienter...'
                    }
                ]);
            }, 1000);

            await sendMessageToChatbot(message).then((response) => {
                setInputIsBlocked(false);

                setMessages([
                    ...messages,
                    {
                        role: 'user',
                        text: message
                    },
                    {
                        role: 'bot',
                        text: response.answer
                    }
                ]);
            });
        }
    }

    return (
        <div className="chatbot">
            {
                isOpened ?
                <div className="chatbot__container">
                    <div className="chatbot__container__header">
                        <p>Votre assistant Open Cook</p>
                        <button onClick={() => setIsOpened(false)}>
                            <img src={Close} alt="Fermer le chatbot"/>
                        </button>
                    </div>
                    <ul className="chatbot__container__chat" ref={chat}>
                        {
                            messages.map((message, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            `chatbot__container__chat__message
                                            ${message.role === 'bot' ? 'chatbot__container__chat__message--bot' : ''}`
                                        }
                                    >
                                        {
                                            message.role === 'bot' ?
                                                <img src={OpenAiOrange} alt="Logo OpenAI"/>
                                                : null
                                        }
                                        <p>
                                            {message.text}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <form className="chatbot__container__input" onSubmit={sendMessage}>
                        <input type="text" placeholder="Ecrivez votre question" disabled={inputIsBlocked}/>
                        <button type="submit">
                            <img src={Send} alt="Envoyer le message"/>
                        </button>
                    </form>
                </div>
                : <button className="chatbot__button" onClick={() => setIsOpened(true)}>
                    <img src={OpenAiWhite} alt="Logo OpenAI"/>
                </button>
            }
        </div>
    )
}