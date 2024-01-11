import React, {useEffect, useState} from 'react';
import '../assets/registration.css';

const RegistrationModal = (props) => {
    const [userData, setUserData] = useState({
        login: '',
        password: '',
    });
    const [validation, setValidation] = useState(false)

    const handleUsernameChange = (event) => {
        setUserData({ ...userData, login: event.target.value });
    };

    const handlePasswordChange = (event) => {
        setUserData({ ...userData, password: event.target.value });
    };
    useEffect(() => {
        if (userData.login.includes(" ") || userData.password.includes(" ") || userData.login.length <= 3 || userData.password.length <= 3) {
            setValidation(false);
        } else {
            setValidation(true);
        }
    }, [userData.login, userData.password]);

    const handleSubmit = () => {
        if (validation) {
            props.onRegistration(userData);
        } else {
            alert("Пароль или имя пользователя содержит пробелы или меньше 4 символов.")
        }
    };

    return (
        <div style={{display: "flex", alignItems: "center", width: '100%', flexDirection: "column"}}>
            <h2>Регистрация</h2>
            <input
                type="text"
                placeholder="Имя пользователя"
                value={userData.login}
                onChange={handleUsernameChange}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={userData.password}
                onChange={handlePasswordChange}
            />
            <button style={{padding: "10px"}} className="btn" onClick={handleSubmit}>Зарегистрироваться</button>
        </div>
    );
};

export default RegistrationModal;
