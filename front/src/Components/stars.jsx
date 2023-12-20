import {useState} from "react";
import StarEmpty18 from "@img/star-empty-18.svg";
import Star18 from "@img/star-18.svg";
import StarEmpty16 from "@img/star-empty-16.svg";
import Star16 from "@img/star-16.svg";

function stars({note, size}) {
    const [stars, setStars] = useState([
        {
            id: 1,
            selected: false
        },
        {
            id: 2,
            selected: false
        },
        {
            id: 3,
            selected: false
        },
        {
            id: 4,
            selected: false
        },
        {
            id: 5,
            selected: false
        }
    ]);
    const [src, setSrc] = useState(null);

}

export default stars