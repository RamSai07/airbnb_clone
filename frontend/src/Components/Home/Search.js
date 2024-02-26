import React,{useState} from 'react';
import {DatePicker,Space} from "antd";//space is margin and padding.
const Search = () => {
  const  {RangePicker} = DatePicker;//destructuring the RangePicker component from the DatePicker.
  const  [keyword,setKeyword] =useState({}); //for storing keyword value in state hook.
  const  [value,setValue] = useState([]);//storing selected date range in a state variable using useState hook.
  function returnDates(date,dateString){
    //setting the date range value in state
      setValue([date[0],date[1]]);
    //updating keyword object with date range.
    updateKeyword("dateIn",dateString[0]);
    updateKeyword("dateOut",dateString[1]);
  }
  //function to update a specific field in the keyword state object
  const updateKeyword = (field,value)=>{
          setKeyword((prevKeyword)=>({
            ...prevKeyword,
            [field]:value,
          }))
  }
    return (
    <>
    <div className='searchbar'>

      {/* Input field for searching destinations */}
        <input 
        className='search'
        id='search_destination'
        placeholder='Search Destinations'
        type='text'
        value={keyword.city}
        onChange={(e) => updateKeyword('city', e.target.value)}
        />
        {/* DatePicker */}

        <Space direction='vertical' size={12} className='search'>
            <RangePicker
            value={value}
            format="YYYY-MM-DD"
            picker='date'
            className='date_picker'
            disabledDate={(current)=>{
              return current && current.isBefore(Date.now(),"day");
            }}
            onChange={returnDates}
            />
        </Space>
        {/* Input filed for adding guests */}
        <input
        className='search'
        id='addguest'
        placeholder='Add Guests'
        type='number'
        value={keyword.guests}
        onChange={(e)=>updateKeyword("guests",e.target.value)}
        />
        {/* Search Icon */}
      <span class="material-symbols-outlined searchicon">search</span>
    </div>
    </>
  )
};

export default Search;