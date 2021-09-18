import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSlider } from '../../service/sliderApi';
import { baseImageUrl } from '../../config';
export default function Slider() {
    const [data, setData] = useState([]);
    const getSliderdata = () => {
        getSlider().then((response) => {
            setData(response.data);

        });
    }
    useEffect(() => {
        getSliderdata();
    }, [])
    return (
        <div >
            <Carousel >{
                data.map((item) =>
                    <Carousel.Item interval={2000}>
                        <img
                            className="d-block w-100"
                            src={baseImageUrl + item.photo}
                            alt="First slide"
                            height="400px"
                        />
                    </Carousel.Item>

                )
            }
            </Carousel>
        </div>
    )
}
