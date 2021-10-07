/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSlider } from '../../service/sliderApi';
import { baseImageUrl } from '../../config';
import { useHistory } from 'react-router';
export default function Slider() {
    const history = useHistory();
    const [data, setData] = useState([]);
    const getSliderdata = () => {
        getSlider().then((response) => {
            setData(response.data);

        }).catch(() => {
            history.push("/home")
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
                        <Carousel.Caption>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>

                )
            }
            </Carousel>
        </div>
    )
}
