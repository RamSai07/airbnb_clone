import React,{useState} from 'react';
import FilterModal from './FilterModal';

const Filter = () => {
  // state for controlling media visability
  const  [isModalOpen, setModalOpen] = useState(false);
  //state for storing  selected filter value
  const [selectedFilters, setSelectedFilters] = useState({});
  // function  to handle opening the modal
  const handelOpenModel =() =>{
      setModalOpen(true);
  };

  // function to close the model 
  const  handleCloseModal=()=>{
    setModalOpen(false)
  }
  // function to handel changes in filter
  const handelFilterChange = (filterName,value) =>{
    setSelectedFilters((prevFilters)=> ({
      ...prevFilters ,
      [filterName]:value,
    }));
  }



  return (
    <>
    <span class="material-symbols-outlined filter" onClick={handelOpenModel}>tune</span>
    {isModalOpen && (<FilterModal 
    selectedFilters={selectedFilters}
    onFilterChange= {handelFilterChange}
    onClose={handleCloseModal}
    />)}
    </>
  )
};

export default Filter;