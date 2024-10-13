import './AddNewArticle.css';
import { useNavigate } from 'react-router-dom';

const SignOut = ({handleLogin}) => {
    const navigate = useNavigate();

    const onSubmit =(e)=>{
        // e.preventDefault();  
        handleLogin()
        navigate('/signup');
    }


    return (
        <div className="wrapper">
            <div className="flip-card__inner">
                <div className="flip-card__front">
                    <h2 className="title">Are You Sure You Want To SignOut</h2>
                    
                        <button className="flip-card__btn" onClick={onSubmit}>
                            Yes
                        </button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;
