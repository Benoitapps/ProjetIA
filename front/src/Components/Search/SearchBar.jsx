import React, { useState, useEffect } from 'react';
import searchRecipe from '../../hook/search';
import '@css/Search/SearchBar.css';
import loading from '@img/loading.gif';
import 'regenerator-runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function SearchBar({ setRecipes, setIsLoading, isLoading }) {
    const [searchValue, setSearchValue] = useState("");
    const [error, setError] = useState(null);
    const [isListening, setIsListening] = useState(false);

    const makeRequest = async (value) => {
        setIsLoading(true);
        setError(null);

        try {
            setRecipes([]);
            const recipes = await searchRecipe(value);
            setRecipes(recipes);
        } catch (err) {
            setError("Une erreur s'est produite lors de la recherche.");
        }

        setIsLoading(false);
    }

    const handleClick = async () => {
        await makeRequest(searchValue);
    }

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(false);
        }
    }, [isLoading]);

    const {
        transcript,
        resetTranscript,
        listening,
    } = useSpeechRecognition();

    const handleListen = async () => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            setError("Votre navigateur ne supporte pas la reconnaissance vocale.");
        }

        if (!listening) {
            SpeechRecognition.startListening({ language: 'fr-FR', continous: true});
            setIsListening(true);
            setSearchValue("");
            resetTranscript();
        } else {
            SpeechRecognition.stopListening();
            setIsListening(false);
            setSearchValue(transcript);
            await makeRequest(transcript);
        }
    }

    return (
        <>
            <form className="search-bar">
                <button onClick={handleClick} disabled={isLoading}>
                    {
                        isLoading ?
                            <img src={loading} alt="Chargement"/> :
                            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.6562 22.0542L16.7563 16.1542C18.1734 14.4513 18.8794 12.2677 18.7275 10.0575C18.5756 7.84731 17.5774 5.78079 15.9407 4.28781C14.3039 2.79483 12.1546 1.99035 9.93982 2.04171C7.72503 2.09308 5.6153 2.99634 4.04953 4.56359C2.48376 6.13085 1.58248 8.24142 1.53321 10.4563C1.48393 12.6711 2.29044 14.8197 3.78496 16.455C5.27948 18.0903 7.34694 19.0865 9.55726 19.2364C11.7676 19.3862 13.9506 18.6781 15.6521 17.2594L21.5521 23.1594L22.6562 22.0552V22.0542ZM3.125 10.6594C3.125 9.26873 3.53738 7.90931 4.30998 6.75303C5.08258 5.59674 6.18071 4.69553 7.46551 4.16335C8.7503 3.63117 10.164 3.49193 11.528 3.76323C12.8919 4.03453 14.1448 4.7042 15.1281 5.68753C16.1114 6.67087 16.7811 7.92372 17.0524 9.28765C17.3237 10.6516 17.1845 12.0653 16.6523 13.3501C16.1201 14.6349 15.2189 15.733 14.0626 16.5056C12.9063 17.2783 11.5469 17.6906 10.1562 17.6906C8.29212 17.6884 6.50498 16.9469 5.18684 15.6288C3.8687 14.3106 3.12721 12.5235 3.125 10.6594Z" fill="#989898"/>
                            </svg>
                    }
                </button>
                <input
                    type="text"
                    name="search"
                    placeholder="Qu’est-ce qu’il vous ferait plaisir ?"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleListen}
                  className="micro"
                  title="Recherche vocale"
                >
                    {
                        isListening ?
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26"
                               fill="none">
                              <path
                                d="M17.9687 11.4375V13.7812C17.9687 15.2317 17.3926 16.6227 16.367 17.6482C15.3414 18.6738 13.9504 19.25 12.5 19.25C11.0496 19.25 9.6586 18.6738 8.63301 17.6482C7.60742 16.6227 7.03125 15.2317 7.03125 13.7812V11.4375H5.46875V13.7812C5.46957 15.5102 6.10739 17.1782 7.26033 18.4667C8.41327 19.7551 10.0005 20.5735 11.7187 20.7656V22.375H8.59375V23.9375H16.4062V22.375H13.2812V20.7656C14.9995 20.5735 16.5867 19.7551 17.7397 18.4667C18.8926 17.1782 19.5304 15.5102 19.5312 13.7812V11.4375H17.9687Z"
                                fill="var(--primary)"/>
                              <path
                                d="M12.5 17.6875C13.013 17.6875 13.5209 17.5865 13.9949 17.3902C14.4688 17.1938 14.8994 16.9061 15.2621 16.5434C15.6249 16.1807 15.9126 15.75 16.1089 15.2761C16.3052 14.8022 16.4062 14.2942 16.4062 13.7812V5.96875C16.4062 4.93275 15.9947 3.93918 15.2621 3.20661C14.5296 2.47405 13.536 2.0625 12.5 2.0625C11.464 2.0625 10.4704 2.47405 9.73786 3.20661C9.0053 3.93918 8.59375 4.93275 8.59375 5.96875V13.7812C8.59375 14.2942 8.69479 14.8022 8.8911 15.2761C9.0874 15.75 9.37514 16.1807 9.73786 16.5434C10.4704 17.2759 11.464 17.6875 12.5 17.6875Z"
                                fill="var(--primary)"/>
                          </svg> :
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26"
                               fill="none">
                              <path
                                d="M17.9688 11.4375V13.7812C17.9687 15.2317 17.3926 16.6227 16.367 17.6482C15.3414 18.6738 13.9504 19.25 12.5 19.25C11.0496 19.25 9.6586 18.6738 8.63301 17.6482C7.60742 16.6227 7.03125 15.2317 7.03125 13.7812V11.4375H5.46875V13.7812C5.46957 15.5102 6.10739 17.1782 7.26033 18.4667C8.41327 19.7551 10.0005 20.5735 11.7188 20.7656V22.375H8.59375V23.9375H16.4062V22.375H13.2812V20.7656C14.9995 20.5735 16.5867 19.7551 17.7397 18.4667C18.8926 17.1782 19.5304 15.5102 19.5312 13.7812V11.4375H17.9688Z"
                                fill="var(--text-grey)"/>
                              <path
                                d="M12.5 17.6875C13.013 17.6875 13.5209 17.5865 13.9949 17.3902C14.4688 17.1938 14.8994 16.9061 15.2621 16.5434C15.6249 16.1807 15.9126 15.75 16.1089 15.2761C16.3052 14.8022 16.4062 14.2942 16.4062 13.7812V5.96875C16.4062 4.93275 15.9947 3.93918 15.2621 3.20661C14.5296 2.47405 13.536 2.0625 12.5 2.0625C11.464 2.0625 10.4704 2.47405 9.73786 3.20661C9.0053 3.93918 8.59375 4.93275 8.59375 5.96875V13.7812C8.59375 14.2942 8.69479 14.8022 8.8911 15.2761C9.0874 15.75 9.37514 16.1807 9.73786 16.5434C10.4704 17.2759 11.464 17.6875 12.5 17.6875ZM10.1562 5.96875C10.1562 5.34715 10.4032 4.75101 10.8427 4.31147C11.2823 3.87193 11.8784 3.625 12.5 3.625C13.1216 3.625 13.7177 3.87193 14.1573 4.31147C14.5968 4.75101 14.8438 5.34715 14.8438 5.96875V13.7812C14.8438 14.4029 14.5968 14.999 14.1573 15.4385C13.7177 15.8781 13.1216 16.125 12.5 16.125C11.8784 16.125 11.2823 15.8781 10.8427 15.4385C10.4032 14.999 10.1562 14.4029 10.1562 13.7812V5.96875Z"
                                fill="var(--text-grey)"/>
                          </svg>
                    }
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </>
    );
}

export default SearchBar;