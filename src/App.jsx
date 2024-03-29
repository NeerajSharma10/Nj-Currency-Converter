import myImage from './assets/background.jpg'
import CurrencySelector from './components/CurrencySelector'
import { useState, useEffect, useRef } from 'react';

function App() {

  const [fromMoney, setFromMoney] = useState("0.00");
  const [toMoney, setToMoney] = useState("0.00");
  const [fromCurrencyType, setFromCurrencyType] = useState("inr");
  const [toCurrencyType, setToCurrencyType] = useState("usd");

  const [currencyArray, setCurrencyArray] = useState([])

  const getCurrenyList = async () => {
    const response = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
    let parsedResponse = await response.json();
    return parsedResponse;
  }

  const dropDownHandler = (event, typeOfCurrency) => {
    let currentValue = event.target.value;
    console.log("Hello to world of programming ");
    if (typeOfCurrency.toLowerCase() === 'from') {
      setFromCurrencyType(currentValue);
    } else {
      setToCurrencyType(currentValue);
    }
  }

  const handleClick = (event) => {
    setFromMoney(event.target.value)
  }
  
  const swapHanlder = () => {
    console.log("hello");
    let x = fromCurrencyType
    setFromCurrencyType(toCurrencyType)
    setToCurrencyType(x)

  }


  useEffect(() => {
    let response = getCurrenyList();
    response.then((res) => {
      console.log(res);
      let arr = [];
      for (let key in res) {
        arr.push(<option value={key}>{key}</option>)
      }
      console.log(arr.length);
      setCurrencyArray(arr)
    }).catch((err) => {
      console.log("Getting Error", err);
    })
  }, [])

  const convertEventHandler = async () => {
    //Call the api first on the basis of from currency then convert it into desired format
    let responseOfFromCurrency = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyType}.json`)
    let parsedResponseOfFromCurrency = await responseOfFromCurrency.json(); 
    let value = [null, false];
    let skill = "inr";
    console.log(parsedResponseOfFromCurrency[fromCurrencyType]);
    for(let key in parsedResponseOfFromCurrency[fromCurrencyType]) {
      if(key === toCurrencyType) {
        let value1 = parsedResponseOfFromCurrency[fromCurrencyType][toCurrencyType]
        value = [value1, true]
        break;
      }
    }
    if(value[1]) {
      // fromMoney => toMoney
      let fromMoneyInDecimal = parseFloat(fromMoney)  
      let toMoneyInDecimal = fromMoneyInDecimal*value[0]
      console.log(toMoneyInDecimal);
      setToMoney(toMoneyInDecimal)
    }
  }



  {/* This is a comment for CurrencySelector Code ---start----*/ }

  {/* This is a comment for CurrencySelector Code ---end----*/ }


  return (
    <div className='text-orange-950	 font-mono relative flex justify-center items-center w-screen h-screen'>
      <img className='w-full h-full object-cover' src={myImage} alt="Hello Image is not available" />
      <div className='rounded-3xl w-1/2 h-4/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 bg-slate-400'>

        {/* This is a comment for CurrencySelector Code ---start----*/}
        <div className=' h-2/5 flex justify-center text-2xl font-semibold items-center'>
        <div className=' w-5/12 h-3/4'>
            <div className='flex items-center  h-1/2'>CurrencyType</div>
            <div className='flex items-center  h-1/2'>
              {/* This is a comment for CustomDropDown Code ---start----*/}
              <div>
                <select className = "border border-fuchsia-700 outline-none focus:border-blue-800 bg-slate-400" value={fromCurrencyType} onChange={(event) => {
                  dropDownHandler(event, "from")
                }}>
                  {currencyArray}
                </select>
              </div>
              {/* This is a comment for CustomDropDown Code ---end----*/}
              {/* <CustomDropDown defaultCurrency={defaultCurrencyFromParent} /> */}
            </div>
          </div>
          <div className='w-5/12 h-3/4'>
            <div className='flex items-center  h-1/2'>From</div>
            <div className=' flex items-center  h-1/2'>
            <input type="text" onChange = {handleClick} className="appearance-none border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus: ring-fuchsia-400 focus:border-transparent" placeholder={`Enter ${fromCurrencyType} value`} />
            </div>
          </div>
        </div>
        {/* This is a comment for CurrencySelector Code ---end----*/}
        {/* <CurrencySelector currencyFlag='From' defaultCurrencyFromParent='inr' /> */}
        <div className='flex justify-center'>
          <button onClick = {swapHanlder} className='border border-fuchsia-700 hover:bg-fuchsia-400 bg-fuchsia-300 pb-1 pl-2 pr-2 pt-1 rounded-md	 text-2xl font-semibold '>Swap</button>
        </div>
        {/* This is a comment for CurrencySelector Code ---start----*/}
        <div className=' h-2/5 flex justify-center text-2xl font-semibold items-center'>
          
          <div className=' w-5/12 h-3/4'>
            <div className='flex items-center  h-1/2'>CurrencyType</div>
            <div className='flex items-center  h-1/2'>
              {/* This is a comment for CustomDropDown Code ---start----*/}
              <div>
                <select className = "border border-fuchsia-700 outline-none focus:border-blue-800 bg-slate-400" value={toCurrencyType} onChange={(event) => {
                  dropDownHandler(event, "to")
                }}>
                  {currencyArray}
                </select>
              </div>
              {/* This is a comment for CustomDropDown Code ---end----*/}
              {/* <CustomDropDown defaultCurrency={defaultCurrencyFromParent} /> */}
            </div>
          </div>
          <div className='w-5/12 h-3/4'>
            <div className='flex items-center  h-1/2'>To</div>
            <div className=' flex items-center  h-1/2'>
              <input type="text" value = {toMoney} className="appearance-none border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus: ring-fuchsia-400 focus:border-transparent"  />
            </div>
          </div>
        </div>
        {/* This is a comment for CurrencySelector Code ---end----*/}
        {/* <CurrencySelector currencyFlag='From' defaultCurrencyFromParent='inr' /> */}
        <div className=' w-1/1 h-1/9 flex justify-center items-center'>
          <button onClick={convertEventHandler} className=' border border-fuchsia-700 hover:bg-fuchsia-400  bg-fuchsia-300 pb-2 pl-10 pr-10 pt-2 rounded-md	text-2xl font-semibold '>Convert {fromCurrencyType} to {toCurrencyType}</button>
        </div>
      </div>
    </div>
  )
}

export default App
