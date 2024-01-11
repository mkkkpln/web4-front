import "../assets/table.css";
export default function Table({points}) {
    console.log(points)
    return(
        <>
            <div className="name_of_table">Таблица введённых точек</div>
            <table id="result_table">
                <tbody>
                {points.map(element =>
                    <tr style={ {
                        color : element.result ? "green" : "red"
                    }}
                        key={element.id}>
                        <td>{element.x}</td>
                        <td>{element.y}</td>
                        <td>{element.r}</td>
                        <td>{element.createdAt}</td>
                        <td>{element.executionTime}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>

    )
}