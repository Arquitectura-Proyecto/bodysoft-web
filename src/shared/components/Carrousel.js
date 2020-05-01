import React from 'react';

import { Carousel } from 'antd';

const Carrousel = (props) => {
    return (
        <Carousel autoplay>
            <div>
                <img src={props.img1} alt={props.alt1} style={{ width: "100%" }} />
            </div>
            <div>
                <img src={props.img2} alt={props.alt2} style={{ width: "100%" }} />
            </div>
            <div>
                <img src={props.img3} alt={props.alt3} style={{ width: "100%" }} />
            </div>
        </Carousel>
    )
}

export default Carrousel;