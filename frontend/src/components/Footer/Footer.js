import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {


    return (
        <>
            <section id='footer'>
                <div id='technologies'>
                    <p>JavaScript</p>
                    <p>Expressjs</p>
                    <p>React</p>
                    <p>Redux</p>
                    <p>Sequelize</p>
                    <p>PostgreSQL</p>
                    <p>HTML</p>
                    <p>CSS</p>
                </div>
                <div id='my-links'>
                    <Link to={{ pathname: 'https://www.linkedin.com/in/andrew-cooksey-78569618a/' }} target='_blank' ><img src='https://cdn-icons-png.flaticon.com/512/174/174857.png' alt='Linkedin' /></Link>
                    <Link to={{ pathname: 'https://github.com/Cooksey99/instagram-clone' }} target='_blank' ><img src='https://cdn-icons-png.flaticon.com/512/25/25231.png' alt='Github' /></Link>
                </div>
            </section>
        </>
    )
}
