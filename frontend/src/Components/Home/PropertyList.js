import React from 'react';
const Card = ({image,address,price,name})=>{
    return (
        <figure className='property'>
            <img src={image} alt="Propertyimg"/>
            <h4>{name}</h4>
            <figcaption>
                <main className='propertydetails'>
                    <h5>{name}</h5>
                    <h6>
                        <span className='material-symbols-outlined houseicon'>home_pin</span>{address}
                    </h6>
                    <p>
                        <span className='price'>Rs.{price}</span> per night

                    </p>

                </main>
            </figcaption>

        </figure>
    );
}

const PropertyList = () => {
    const cardsData =[
        {
            id:1,
            image:"/assets/image1.jpeg",
            name:'House Manali',
            address:"Manali Road, Himachal Pradesh,India",
            price:1999,
        },
        {
            id:2,
            image:"/assets/property2.webp",
            name:'Villa Home',
            address:"Coorg,India",
            price:4000,
        },
        {
            id:1,
            image:"/assets/property3.webp",
            name:'House of  Nature',
            address:"Nature's Way, Kashmir Valley, India" ,
            price:3500,
        },
    ]
  return (
    <div className='propertylist'>
        {cardsData.map((card)=>(
            <Card
            key={card.id}
            name= {card.name}
            image={card.image}
            address={card.address}
            price={card.price}
            />
        ))}

    </div>
  )
}

export default PropertyList;