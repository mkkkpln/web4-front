import {useEffect, useRef} from "react";
import axios from "axios";
import {add, set} from "./pointsSlice";
import {useDispatch} from "react-redux";

export default function Graph({points, r}) {

    const svg = useRef();
    const scaleR = 30;
    const Oy = 150;
    const Ox = 150;
    const dispatch = useDispatch()

    function createPoint(point){
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let rect = svg.current.getBoundingClientRect();
        let x1 = rect.width/2 + scaleR*point.x;
        let y1 = rect.width/2 - scaleR*point.y;
        circle.setAttribute("cx", x1);
        circle.setAttribute("cy", y1);
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "rgb(60, 60, 176)");
        circle.setAttribute("stroke", "rgb(47, 47, 137)");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("opacity","0.9");
        if(!point.result) {
            circle.setAttribute("fill", "red")
        } else circle.setAttribute("fill", "green")
        svg.current.appendChild(circle);
    };
    useEffect( () => {
        if (svg.current) {
            let circle = [...svg.current.children];
            for (let e of circle) {
                if (e.tagName == "circle") {
                    svg.current.removeChild(e);
                }
            }
        }
            points.forEach(e => {createPoint(e)});
        }, [points, svg])

    function transformCoordinate(x){
        return (x-Ox)/scaleR;
    }

    function onClick(event) {
        const svgPoint = svg.current.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        const point = svgPoint.matrixTransform(svg.current.getScreenCTM().inverse());
        console.log(`Координаты: x=${point.x}, y=${point.y}, r=${r.value}`);
        const x = transformCoordinate(point.x).toFixed(4);
        const y = -1*transformCoordinate(point.y).toFixed(4);
        console.log(`Переведенные координаты: x=${x}, y=${y}, r=${r.value}`);

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
    return (
        <div className="graph">
            <svg className="svg-graph" xmlns="http://www.w3.org/2000/svg" id="svg" height="300" ref={svg} onClick={onClick}>
                <line x1="0" y1="150" x2="300" y2="150" stroke="#000720"></line>
                <line x1="150" y1="0" x2="150" y2="300" stroke="#000720"></line>
                <line x1="270" y1="148" x2="270" y2="152" stroke="#000720"></line>
                <text x="265" y="140">4</text>
                <line x1="210" y1="148" x2="210" y2="152" stroke="#000720"></line>
                <text x="200" y="140">2</text>
                <line x1="90" y1="148" x2="90" y2="152" stroke="#000720"></line>
                <text x="75" y="140">-2</text>
                <line x1="30" y1="148" x2="30" y2="152" stroke="#000720"></line>
                <text x="20" y="140">-4</text>
                <line x1="148" y1="30" x2="152" y2="30" stroke="#000720"></line>
                <text x="156" y="35">4</text>
                <line x1="148" y1="90" x2="152" y2="90" stroke="#000720"></line>
                <text x="156" y="95">2</text>
                <line x1="148" y1="210" x2="152" y2="210" stroke="#000720"></line>
                <text x="156" y="215">-2</text>
                <line x1="148" y1="270" x2="152" y2="270" stroke="#000720"></line>
                <text x="156" y="275">-4</text>

                <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>
                <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>

                <rect x={150-r/2*scaleR} y={150-r*scaleR} width={r/2*scaleR} height={r*scaleR} fillOpacity="0.4" stroke="blue" fill="pink"></rect>
                <polygon points={`150,150 ${150-r/2*scaleR},150 150,${150+r*scaleR}`} fillOpacity="0.4" stroke="blue" fill="pink"></polygon>
                <path d={`M 150 150 L 150 ${150-r*scaleR} A ${r*scaleR} ${r*scaleR} 0 0 1 ${150+r*scaleR} 150 L Z`} fillOpacity="0.4" stroke="blue"
                      fill="pink"></path>
            </svg>
        </div>
    )
}