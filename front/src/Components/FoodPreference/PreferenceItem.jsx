import React from 'react'

function PreferenceItem({name,id,deleteFood}) {
    return (
        <li className="preferences__list__item">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none"
                 onClick={() => deleteFood(id)}
            >
                <path d="M8.3125 7.125H7.125V14.25H8.3125V7.125Z" fill="var(--text-white)"/>
                <path d="M11.875 7.125H10.6875V14.25H11.875V7.125Z" fill="var(--text-white)"/>
                <path
                    d="M2.375 3.5625V4.75H3.5625V16.625C3.5625 16.9399 3.68761 17.242 3.91031 17.4647C4.13301 17.6874 4.43506 17.8125 4.75 17.8125H14.25C14.5649 17.8125 14.867 17.6874 15.0897 17.4647C15.3124 17.242 15.4375 16.9399 15.4375 16.625V4.75H16.625V3.5625H2.375ZM4.75 16.625V4.75H14.25V16.625H4.75Z"
                    fill="var(--text-white)"/>
                <path d="M11.875 1.1875H7.125V2.375H11.875V1.1875Z" fill="var(--text-white)"/>
            </svg>
            <p>{name}</p>
        </li>
    )
}

export default PreferenceItem
