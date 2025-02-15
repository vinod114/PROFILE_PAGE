import React, { useState, useEffect } from 'react';

import RingLoader from "react-spinners/RingLoader";

function Loader() {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000000");

    // const override=  css`display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",`
        

    return (
        <div>
            <div className="sweet-loading loader-universal">
                <RingLoader
                    color={color}
                    loading={loading}
                    // cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>

    )
}

export default Loader