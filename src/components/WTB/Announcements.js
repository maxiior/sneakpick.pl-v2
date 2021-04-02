import SingleAnnoun from './SingleAnnoun'
import Grid from '@material-ui/core/Grid';
import fila from './fila.jpg'
import fila2 from './fila2.jpg'

const Announcements = () => {
    return (
        <div className='announcements'>
            <Grid container spacing={2}>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
                <SingleAnnoun photo={fila}/>
                <SingleAnnoun photo={fila2}/>
            </Grid>
        </div>
    )
}

export default Announcements
