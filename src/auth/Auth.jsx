import axios from 'axios'
import '../assets/button.css';
import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom";
import RegistrationModal from "./RegistrationModal";

export default function Auth() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    useEffect(() => {
        if (login.includes(" ") || password.includes(" ") || login.length <= 3 || password.length <= 3) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [login, password]);

    const handleRegistration = (userData) => {
        // Логика сохранения данных в базу данных
        axios('http://localhost:8080' + '/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true,
            data: JSON.stringify({'username' : userData.login, 'password' : userData.password})
        }).then(res => {
            console.log(res)
            if (res.data.length > 0) {
                alert(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
        console.log('Сохранение данных в базу данных:', userData);
        setShowModal(false); // Закрыть модальное окно после сохранения данных
    };

    return (
        <div style={{display: "flex", alignItems: "center", width: '100%', flexDirection: "column"}}>
            <h4>Лабораторная №4 (Автор: Копалина Майя, группа: P3232) </h4>
            <h2 style={{color: "palevioletred"}}>Авторизация пользователя</h2>
            <label style={{paddingRight: "25px"}}>Имя пользователя:</label>
            <input type="text" placeholder="login" onInput={event => {setLogin(event.currentTarget.value)}}/>
            <label style={{paddingRight: "105px"}}>Пароль:</label>
            <input type="password" placeholder="password" onInput={event => {setPassword(event.currentTarget.value)}}/>
            <p ></p>
            <button className="btn" onClick={event => {

                if (handleRegistration) {
                    axios('http://localhost:8080' + '/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({'username' : login, 'password' : password})
                    }).then(res => {
                        if (res.status === 200) {
                            if (res.data) {
                                setCookie("Token", res.data);
                                navigate("/main");
                            } else {
                                alert("Такой пользователь не существует");
                            }
                        } else {
                            console.log("Ошибка при выполнении запроса");
                        }
                    }).catch(err => {
                        alert("Такой пользователь не существует");
                        console.log(err);
                    })
                } else {
                    alert("Сначала необходимо авторизоваться");
                }

            }}>
                Вход
            </button>

            <button className="btn1" onClick={openModal}>Открыть окно регистрации</button>
            {showModal && <RegistrationModal onRegistration={handleRegistration} onClose={closeModal} />}

        </div>
    )
}
