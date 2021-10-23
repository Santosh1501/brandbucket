import React from 'react'
import CarouselImg from './CarouselImg'

interface IProps { }

const Home: React.FC<IProps> = () => {
    return (
        <>
            <CarouselImg />
            <section className="bg-light p-5">
                <h1 className="text-center display-5 font-italic mt-1">
                    Welcome To Brand Bucket
                </h1>
                <p className="text-muted h5 text-justify">
                    A shopping cart is a piece of software that keeps the record of the items a buyer
                    has ‘picked up’ from the online store. Acting as an online store’s catalog,
                    the eCommerce shopping cart enables consumers to select products, review what they selected,
                    make modifications or add extra items if needed, and purchase the products.
                    Shopping cart abandonment occurs when customers add items to their shopping cart but don’t complete
                    the purchase. It is one of the biggest issues plaguing eCommerce entrepreneurs, as roughly of shopping
                    carts are abandoned worldwide.
                </p>
            </section>
        </>
    )
}

export default Home
