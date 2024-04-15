import React, {useState, useEffect} from 'react'

function categorias() {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/api/categorias").then(
        res => {
            return res.json()
        }
        ).then(
        data => {
            setData(data)
            console.log(data)
        }
        )
    }, [])
    return (
        <div>categorias</div>
    )
}

export default categorias