import '@css/Recipe/RecipeDetails.css';
import { useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

function RecommendationItem({name, src, description,id}) {

   return (
        <li className="recommendations__list__recipe">
            <Link to={`/recipe/${id}`}>
                <div className="recommendations__list__recipe__img">
                    <img src={src} alt={name}/>
                </div>
                <div className="recommendations__list__recipe__text">
                    <h5>{name}</h5>
                    <div className="recommendations__list__recipe__text__description">
                        {description}
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default RecommendationItem
