import React from 'react';
import Grid from '@material-ui/core/Grid';

const SingleAnnoun = ({name, price, state, photo}) => {
    return (
        <Grid item xs={12} sm={6} lg={4} xl={3}>
            <div className='announ'>
                <div className='view'>
                    <div className='state'>DS</div>
                    <div className='photo' style={{ backgroundImage: `url(${photo})`}}></div>
                </div>
                <div className='informations'>
                    <div>
                        <h1>NIKE AIR MAX 95</h1>
                        <h2>500 PLN + SHIP</h2>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default SingleAnnoun


//<img src={fila} className='bimg'/>