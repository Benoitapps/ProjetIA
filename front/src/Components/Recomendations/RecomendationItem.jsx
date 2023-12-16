
import '@css/RecipeDetails.css';
import {useParams} from "react-router-dom";
import { useNavigate} from 'react-router-dom';


function RecomendationItem({name, src, description,id}) {

   const navigate = useNavigate();

    const redirect = (id) => {
        const route = `/recipe/${id}`;

        navigate(route);
    }

    return (
        <>
            <div className="recomendations" onClick={() => redirect(id)}>
            <img className="imgrecomendation" src={src}/>
            {name}
                <div className="descriptionReco">{description}</div>
            </div>

        </>
    )
}

export default RecomendationItem
