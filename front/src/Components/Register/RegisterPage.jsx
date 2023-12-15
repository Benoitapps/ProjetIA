import { Link } from 'react-router-dom';
import FormTheme from './FormTheme';
import fondRegister  from '../../assets/img/fondreg.png'
import '@css/Register/RegisterPage.css'
function RegisterPage() {

    return (
        <>
        <div className='mainPage'>
            <img src={fondRegister} alt="Example" />
            <div>
                <FormTheme />
                <Link to="/login">Se connecter</Link>
            </div>
            
        </div>
            
        </>
    )
}

export default RegisterPage
