import Graph from "./Graph";
import Form from "./Form";
import Table from "./Table";
import classes from "./Main.module.css"
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import { set } from './pointsSlice'
import axios from "axios";
import {useEffect, useState} from "react";
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom";

export default function Main() {
    const points = useSelector((state) => state.points.value)
    const [r, setR] = useState(0)
    const dispatch = useDispatch()
    const [cookies, setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    useEffect(() => {
        axios('http://localhost:8080' + '/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        }).then(res => {
            console.log(res)
            if (res.data.length > 0) {
                dispatch(set(res.data))
            }
        }).catch(err => {
            console.log(err)
        })
    },
    [])
    return (
        <div className={classes.mainContainer}>
            <div className="fields-and-graph">
                <div className={classes.graphContainer}>
                    <Graph points={points} r={r}/>
                </div>
                <Form setR1={setR}/>
            </div>
            <button className="button-return" onClick={ event => {
                removeCookie("Token")
                navigate("/");
            }}>
                Вернуться на главную страницу
            </button>
            <p></p>
            <p></p>
            <Table points={points}/>

        </div>


    )
}