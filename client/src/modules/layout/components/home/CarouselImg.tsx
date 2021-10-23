import React from 'react'
import './carousel.css'
import { Carousel } from 'react-bootstrap'
import carosolImg4 from '../../../../assets/images/carosolimg4.jpg'
import carosolImg2 from '../../../../assets/images/carosolimg2.jpg'
import carosolImg3 from '../../../../assets/images/carosolimg3.jpg'

const CarouselImg: React.FC = () => {
    return (
        <>
            <Carousel controls={true} fade={true}>
                <Carousel.Item interval={2000}>
                    <div className="wrap">
                        <img
                            className="d-block w-100" height="600"
                            src={carosolImg4}
                            alt="First slide"
                        />
                    </div>
                    <Carousel.Caption className="d-flex justify-content-center align-content-center flex-center flex-column mt-5">
                        <h1 className="display-3">MEN'S FASHION</h1>
                        <p className="h3">
                            “Music has shaped men’s fashion and transposed in a playful and witty manner its riding or military heritage. It is difficult to figure out who leads but music and fashion are connected genetically.”
                        </p>
                        <button className="btn btn-amber btn-lg mt-5">Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100" height="600"
                        src={carosolImg2}
                        alt="Second slide"
                    />

                    <Carousel.Caption className="d-flex justify-content-center align-content-center flex-center flex-column mt-5">
                        <h1 className="display-3">WOMEN'S FASHION</h1>
                        <p className="h3">
                            "You gotta have style. It helps you get down the stairs. It helps you get up in the morning. It’s a way of life. Without it, you’re nobody. I’m not talking about lots of clothes.”
                        </p>
                        <button className="btn btn-amber btn-lg mt-5">Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100" height="600"
                        src={carosolImg3}
                        alt="Third slide"
                    />

                    <Carousel.Caption className="d-flex justify-content-center align-content-center flex-center flex-column mt-5">
                        <h1 className="display-3">KID'S FASHION</h1>
                        <p className="h3">
                            It's a new era in fashion - there are no rules. It's all about the individual and personal style, wearing high-end, low-end, classic labels, and up-and-coming designers all together.
                        </p>
                        <button className="btn btn-amber btn-lg mt-5">Shop Now</button>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default CarouselImg
