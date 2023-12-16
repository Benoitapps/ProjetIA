import {useEffect, useState} from 'react';
import OpenAiWhite from '@img/openai-white.svg';
import OpenAiOrange from '@img/openai-orange.svg';
import Close from '@img/close.svg';
import Send from '@img/send.svg';
import '@css/Chatbot.css';

export default function Chatbot() {
    const [isOpened, setIsOpened] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                role: 'bot',
                text: 'Bonjour, je suis votre assistant personnel, en quoi puis-je vous aider ?'
            }
        ]);
    }, []);

    const sendMessage = (e) => {
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
            input.value = '';
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
                    <ul className="chatbot__container__chat">
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
                        <input type="text" placeholder="Ecrivez votre question"/>
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