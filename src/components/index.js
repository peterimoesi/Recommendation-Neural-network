import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
    <div>
        <div>
            <Link to='/machine'>
                <button>Color Predict</button>
            </Link>
        </div>
        <div>
            <Link to='/recommendation'>
                <button>Recommendation Sys</button>
            </Link>
        </div>
    </div>
);

export default home;
