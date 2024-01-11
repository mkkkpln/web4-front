import {useEffect, useState} from "react";
import axios from "axios";
import {add, set} from "../pointsSlice";
import {useDispatch, useSelector} from "react-redux";
import "../assets/form.css";

export default function Form({setR1}) {
    const [x, setX] = useState(0);
    const [y, setY] = useState("");
    const [r, setR] = useState(0);
    const dispatch = useDispatch()
    useEffect( () => {
        setR1(r)
    }, [r])

    return (
        <div className="fields">
            <div className="container">
                <form className="fields-form" id="fields-form" action="src/main/Form#" onSubmit={event => {
                    event.preventDefault();
                    console.log(x,y,r);
                    axios('http://localhost:8080' + '/add', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                        data: JSON.stringify({'x' : x, 'y' : y, 'r' : r})
                    }).then(res => {
                        console.log(res)
                        dispatch(add(res.data));
                    }).catch(err => {
                        console.log(err)
                    })
                }
                }>
                    <label className="fields-x">
                        <span className="fields-label" >Выберите значение X</span>
                        <div className="fieldsRadios">

                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio--5"
                                    value="-5"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio--5">-5</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio--4"
                                    value="-4"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio--4">-4</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio--3"
                                    value="-3"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio--3">-3</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio--2"
                                    value="-2"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio--2">-2</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio--1"
                                    value="-1"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio--1">-1</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio-0"
                                    value="0"
                                    onClick={event => {setX(event.target.value)}}
                                    defaultChecked={true}
                                />
                                <label htmlFor="radio-0">0</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio-1x"
                                    value="1"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio-1x">1</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio-2x"
                                    value="2"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio-2x">2</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio-x"
                                    type="radio"
                                    id="radio-3x"
                                    value="3"
                                    onClick={event => {setX(event.target.value)}}
                                />
                                <label htmlFor="radio-3x">3</label>
                            </div>

                        </div>
                    </label>

                    <label className="fields-y">
                        <span className="fields-label">Введите значение Y</span>
                        <p>
                            <input
                                type="text"
                                id="y"
                                className="fields-input"
                                placeholder="(от -3 до 3)"
                                onInput={event => {
                                    let y = event.target.value.replace(",", ".");
                                    setY(y)
                                    if (isNaN(y)) {
                                        event.target.setCustomValidity("Y не число");
                                        return;
                                    }
                                    if (y < -3 || y > 3) {
                                        event.target.setCustomValidity("Y не входит в [-3; 3]");
                                        return;
                                    }
                                    event.target.setCustomValidity("");
                                }}
                            />
                        </p>
                    </label>

                    <label className="fields-r">
                        <span className="fields-label">Выберите значение R</span>
                        <div className="fieldsRadios">
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio"
                                    type="radio"
                                    id="radio-0"
                                    value="0"
                                    onClick={event => {setR(event.target.value)}}
                                    defaultChecked={true}
                                />
                                <label htmlFor="radio-0">0</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio"
                                    type="radio"
                                    id="radio-1"
                                    value="1"
                                    onClick={event => {setR(event.target.value)}}
                                />
                                <label htmlFor="radio-1">1</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio"
                                    type="radio"
                                    id="radio-2"
                                    value="2"
                                    onClick={event => {setR(event.target.value)}}
                                />
                                <label htmlFor="radio-2">2</label>
                            </div>
                            <div className="custom-wrapper">
                                <input
                                    className="custom-radio"
                                    name="radio"
                                    type="radio"
                                    id="radio-3"
                                    value="3"
                                    onClick={event => {setR(event.target.value)}}
                                />
                                <label htmlFor="radio-3">3</label>
                            </div>
                        </div>
                    </label>
                    <input className="btn" type="submit" value="Отправить"/>
                </form>
                <button className="btn" onClick={event => {
                    axios('http://localhost:8080' + '/delete', {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true,
                    }).then(res => {
                        console.log(res)
                        dispatch(set([]));
                    }).catch(err => {
                        console.log(err)
                    })
                }} >Удалить</button>
            </div>
        </div>

    )
}