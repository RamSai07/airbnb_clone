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


    // options for propert types
    const propertyTypeOptions =[
        {
            value:"House",
            label:"House",
            icon:"home",
        },
        {
            value:"Flat",
            label:"Flat",
            icon:"apartment",
        },
        {
            value:"Guest House",
            label:"Guest House",
            icon:"hotel",
        },
        {
            value:"Hotel",
            label:"Hotel",
            icon:"meeting_room",
        },
    ];
    // option for room types
    const roomTypeOptions=[
        {
            value:"Entire Room",
            label:"Entire Room",
            icon:"hotel",
        },
        {
            value:"Room",
            label:"Room",
            icon:"meeting_room",
        },
        {
            value:"AnyType",
            label: "AnyType",
            icon:"apartment",
        },
        ];

        // options for amenites
        const amenitiesOptions = [
            {
                value:"Wifi",
                label:"Wifi",
                icon:"wifi",
            },
            {
                value:"Kitchen",
                label:"Kitchen",
                icon:"kitchen",
            },
            {
                value:"Ac",
                label:"AC",
                icon:"ac_unit"
            },
            {
                value:"Washing Machine",
                label: "Washing Machine",
                icon:"local_laundry_service",
            },
            {
                value:"Tv",
                label:"Tv",
                icon:"tv",
            },
            {
                value:"Pool",
                label:"Pool",
                icon:"pool",
            },
            {
                value:"Free Parking",
                label:"Free Parking",
                icon:"local_parking",
            }
        ];
        // function to handel clearing filters
        const handleClearFilter = ()=>{
            setPriceRange({min:600,max:30000});
            setPropertyType("");
            setRoomType("");
            setAmenities([]);

        };
        // function to handel changes in amenities
        const handleAmenitiesChange = (selectedAmenity)=>{
            setAmenities((prevAmenities)=>
            prevAmenities.includes(selectedAmenity)
            ? prevAmenities.filter((item)=>item !== selectedAmenity)
            :[...prevAmenities, selectedAmenity]
            );
        };
        // /function to handel changes in property type
        const  handlePropertyTypeChange= (selectedType)=>{
            setPropertyType((prevType)=>
            prevType ===  selectedType? "" : selectedType
            );
        };

        const  handleRoomTypeChange= (selectedType)=>{
            setRoomType((prevType)=>
            prevType ===  selectedType? "" : selectedType
            );
        };
  return (
    <>
        <div className='modal-backdrop'>
            <div className='modal-content'>
                <h4>
                    Filters<hr/>
                </h4>
                <button className='close-button' onClick={onClose}>
                    <span>&times;</span>
                </button>
                {/* filter sections */}
                <div className='modal-filters-container'>
                    <div className='filter-section'>
                        <label>Price Range:</label>
                        <InputRange
                        minValue={600}
                        maxValue={30000}
                        value={priceRange}
                        onChange={handelPriceRangeChange}
                        />
                        <div className='range-inputs'>
                            <input
                            type='number'
                            value={priceRange.min}
                            onChange={handelMinInputChange}
                            />
                            <input
                            type='number'
                            value={priceRange.max}
                            onChange={handelMaxInputChange}
                            />


                        </div>

                    </div>
                    <div className="filter-section">
                        <label>Property Type:</label>
                        <div className='icon-box'>
                            {propertyTypeOptions.map((options)=>(
                                <div
                                key={options.value}
                                className={`selectable-box ${propertyType === options.value ? "selected":""}`}
                                onClick={()=>handlePropertyTypeChange(options.value)}
                                 >
                                    <span className='material-icons'>{options.icon}</span>
                                    <span>{options.label}</span>

                                </div>

                            ))}

                        </div>
                    </div>

                    <div className="filter-section">
                        <label>Room Type:</label>
                        <div className='icon-box'>
                            {roomTypeOptions.map((options)=>(
                                <div
                                key={options.value}
                                className={`selectable-box ${roomType === options.value ? "selected":""}`}
                                onClick={()=>handleRoomTypeChange(options.value)}
                                 >
                                    <span className='material-icons'>{options.icon}</span>
                                    <span>{options.label}</span>

                                </div>

                            ))}

                        </div>
                    </div>

                    <div className='filter-section'>
                        <label>Amenities:</label>
                        <div className='amenities-checkboxes'>
                            {amenitiesOptions.map((options)=>(
                                <div
                                key={options.value}
                                className='amenity-checkbox'>
                                    {console.log(amenities.includes(options.value))}
                                   <input  type='checkbox'
                                    checked={amenities.includes(options.value) }
                                   value={options.value}
                                    onChange={()=>handleAmenitiesChange(options.value)}
                                  />
                                  <span className='material-icons amenitieslabel'>{options.icon}</span>
                                    <span>{options.label}</span>

                                </div>

                            )) }

                        </div>

                    </div>
                    {/* filter action for buttons */}
                    <div className='filter-buttons'>
                        <button className='clear-button bg-primary' onClick={handleClearFilter}>Clear</button>
                        <button  className='clear-button bg-success'onClick={handelFilterChange}>Apply Filters</button>
                        

                    </div>

                </div>

            </div>

        </div>
    </>
  )
};

FilterModal.propTypes = {
    selectedFilters:PropTypes.object.isRequired,
    onFilterChange:PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default FilterModal;