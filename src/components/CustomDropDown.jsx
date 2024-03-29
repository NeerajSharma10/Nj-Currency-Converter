import React, { useEffect, useState } from 'react'

const CustomDropDown = ({defaultCurrency}) => {

    const [currencyArray, setCurrencyArray] = useState([])

    const getCurrenyList = async () => {
        const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
        let parsedResponse = await response.json();
        return parsedResponse;
    }


    useEffect(() => {
        let response = getCurrenyList();
        response.then((res) => {
            console.log(res);
            let arr = [];
            for(let key in res) {
                arr.push(<option value={key}>{key}</option>)
            }
            console.log(arr);
            setCurrencyArray(arr)
        }).catch((err) => {
            console.log("Getting Error", err);
        })
    }, [])

    return (
        <div>
            <select  id="mySelect" onChange={() => {}}>
            <option value="" disabled hidden>{defaultCurrency}</option>
                {currencyArray}
            </select>
        </div>
    )
}

export default CustomDropDown