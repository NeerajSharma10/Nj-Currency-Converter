import React from 'react'
import CustomDropDown from './CustomDropDown'

const CurrencySelector = ({currencyFlag, defaultCurrencyFromParent}) => {
  return (
    <div className=' h-2/5 flex justify-center text-2xl font-semibold items-center'>
        <div className='w-5/12 h-3/4'>
            <div className='flex items-center  h-1/2'>{currencyFlag}</div>
            <div className=' flex items-center  h-1/2'>0</div>    
        </div>
        <div className=' w-5/12 h-3/4'> 
            <div className='flex items-center  h-1/2'>CurrencyType</div>
            <div className='flex items-center  h-1/2'>
              <CustomDropDown defaultCurrency = {defaultCurrencyFromParent}/>
            </div>
        </div>
    </div>
  )
}

export default CurrencySelector