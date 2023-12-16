import { Link } from "react-router-dom";
import '@css/Switcher.css';

export default function Switcher({ links }) {
    return (
        <ul className="switcher">
            {
                links.map(
                    link =>
                        <li
                            key={link.id}
                            className={`switcher__item ${link.active ? 'switcher__item--active' : ''}`}
                        >
                            <Link to={link.href}>{link.title}</Link>
                        </li>
                )
            }
        </ul>
    )
}