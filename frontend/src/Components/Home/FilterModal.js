import React,{useEffect,useState} from 'react';
import PropTypes from  "prop-types";//for type-checking props
import '../../CSS/FilterModal.css';
import 'react-input-range/lib/css/index.css' // If you use a bundler (e.g., webpack or parcel)
import InputRange from 'react-input-range';
const FilterModal = ({selectedFilters,onFilterChange,onClose}) => {
    const [priceRange,setPriceRange] = useState({
        min:selectedFilters.priceRange?.min || 600,
        max:selectedFilters.priceRange?.max || 30000,
    });
    const [propertyType,setPropertyType] =  useState(selectedFilters.propertyType || "");
    const [roomType,setRoomType] =  useState(selectedFilters.roomType || "");
    const [amenities,setAmenities] =  useState(selectedFilters.amenities || []);


    // useeffect hook to update states when selected  filters change in prop changes
    useEffect(()=>{
        setPriceRange({
            min:selectedFilters.priceRange?.min || 600,
            max:selectedFilters.priceRange?.max || 30000,
        });
        setPropertyType(selectedFilters.propertyType || "");
        setRoomType(selectedFilters.roomType||"");
        setAmenities(selectedFilters.amenities || []);

    },[selectedFilters]);


    //  function to handle price range input
    const handelPriceRangeChange = (value)=>{
        setPriceRange(value) //it will update the price range state
    }
    // finction to handel min value
    const handelMinInputChange = (e) =>{
        const minValue =parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,min:minValue}));
    }
    // finction to handel max value
    const handelMaxInputChange = (e) =>{
        const maxValue =parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,max:maxValue}));
    }
    //function to handel applying filters
    const handelFilterChange =() =>{
        onFilterChange("minPrice",priceRange.min);
        onFilterChange("maxPrice",priceRange.max);
        onFilterChange("propertyType",propertyType);
        onFilterChange("roomType",roomType);
        onFilterChange("amenities",amenities);
        onClose();//close the model
    };
  return (
    <div>

    </div>
  )
};

export default FilterModal;