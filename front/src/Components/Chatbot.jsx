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
    const [isFullscreen, setIsFullscreen] = useState(false);

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
    }, [messages, chat]);

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

    function handleFullscreen() {
        if(!isFullscreen) {
            setIsFullscreen(true);
        } else {
            setIsFullscreen(false);
        }
    }

    return (
        <div className={`chatbot ${isFullscreen ? 'chatbot--fullscreen' : ''}`}>
            {
                isOpened ?
                  <div className="chatbot__container">
                      <div className="chatbot__container__header">
                          <p>Votre assistant Open Cook</p>
                          <button onClick={() => {setIsOpened(false); setIsFullscreen(false);}}>
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
                      <button
                        className="chatbot__container__fullscreen-button"
                        onClick={handleFullscreen}
                      >
                          {
                              !isFullscreen ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"
                                      fill="none">
                                    <path d="M0 14V8H1.5V11.4375L11.4375 1.5H8V0H14V6H12.5V2.5625L2.5625 12.5H6V14H0Z"
                                          fill="var(--text-white)"/>
                                </svg>) :
                                (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                      fill="none">
                                    <path
                                      d="M1.0625 16L0 14.9375L5.4375 9.5H2V8H8V14H6.5V10.5625L1.0625 16ZM8 8V2H9.5V5.4375L14.9375 0L16 1.0625L10.5625 6.5H14V8H8Z"
                                      fill="var(--text-white)"/>
                                </svg>)
                          }
                      </button>
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