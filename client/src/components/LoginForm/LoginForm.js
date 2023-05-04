import {useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import "./style.css";


const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);

    const {login} = useContext(UserContext);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData(state => ({...state, [e.target.name]: e.target.value}));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:3030/login", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if(response.status == 200){
            login(responseData);
            navigate("/")
        }else{
            setError(responseData);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <header>
                <i className="fa-solid fa-crown"></i>
                <p><span>belot.</span>bg</p>
                <i className="fa-light fa-less-than"></i>
            </header>
            <div className="body">
                <div>
                    <input type="text" name="email" placeholder="E-mail" onChange={changeHandler} value={data.email}/>
                    <i className="fa-regular fa-envelope"></i>
                </div>
                <div>
                    <input type="password" name="password" placeholder="Парола" onChange={changeHandler} value={data.password}/>
                    <i className="fa-solid fa-lock"></i>
                </div>
                {error && <p className="error">{error}</p>}
                <button>Вход</button>
                <p>Забравена парола?</p>
                <div className="footer">
                    <div><p></p></div>
                    <span>или</span>
                    <div><p></p></div>
                </div>
            </div>
            <footer>
                <div>
                    Влез с Facebook
                    <i className="fa-brands fa-facebook"></i>
                </div>
                <div>
                    Влез с Google
                    <i className="fa-brands fa-google"></i>
                </div>
                <div>
                    Влез с Twitter
                    <i className="fa-brands fa-twitter"></i>
                </div>
            </footer>
        </form>
    );
};

export default LoginForm;