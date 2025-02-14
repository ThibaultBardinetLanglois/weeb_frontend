import DesktopImage from '../../../assets/images/Desktop-large.png';
import MediumImage from '../../../assets/images/Desktop-medium.png';
import ShapesImage from '../../../assets/images/Shapes.png';
import SmartFinderIcon from '../../../assets/icons/smartFinder.svg';
import ZoomerrIcon from '../../../assets/icons/zoomerr.svg';
import ShellsIcon from '../../../assets/icons/shells.svg';
import WavesIcon from '../../../assets/icons/waves.svg';
import ArtVenueIcon from '../../../assets/icons/artVenue.svg';
import RightArrowIcon from '../../../assets/icons/arrowRight.svg';
import "./Home.style.scss";

const Home = () => {
    return (
        <div className="page home-page">
            <div className="home-page__section-discover">
                <h1>Explorez le <span>Web</span> sous toutes ses <span>facettes</span></h1>
                <p>Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.</p>
                <div className="home-page__section-discover__buttons">
                    <button className="button button--purple">Découvrir les articles</button>
                    <button className="button button--transparent">S'abonner à la newsletter</button>
                </div>  
                <img src={DesktopImage} alt='desktop-large-img' />          
            </div>

            <div className="home-page__section-partnership">
                <h2>Ils nous font confiance</h2>
                <ul>
                    <li>
                        <img src={SmartFinderIcon} alt="Smart Finder Icon" />
                        <p>SmartFinder</p>
                    </li>
                    <li>
                        <img src={ZoomerrIcon} alt="Zoomerr Icon" />
                        <p>Zoomerr</p>
                    </li>
                    <li>
                        <img src={ShellsIcon} alt="Shells Icon" />
                        <p>SHEELS</p>
                    </li>
                    <li>
                        <img src={WavesIcon} alt="Waves Icon" />
                        <p>WAVES</p>
                    </li>  
                    <li>
                        <img src={ArtVenueIcon} alt="Art Venue Icon" />
                        <p>ArtVenue</p>
                    </li>  
                </ul>          
            </div>

            <div className="home-page__section-ressources">
                <div className="home-page__section-ressources__text-block">
                    <p className='home-page__section-ressources__text-block-first-paragraphe'>Des ressources pour tous les niveaux</p>
                    <h1><span>Apprenez</span> et <span>Progressez</span></h1>
                    <p className='home-page__section-ressources__text-block-description'>Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.</p>
                    <div className="home-page__section-ressources__text-block__link">
                        <p>Explorer les ressources</p>
                        <img src={RightArrowIcon} alt="Right Arrow Icon" />
                    </div>
                </div> 
                <div className="home-page__section-ressources__img">
                    <img src={MediumImage} alt='desktop-medium-img' />          
                </div>
            </div>

            <div className="home-page__section-informations">
                <div className="home-page__section-informations-image">
                    <img src={ShapesImage} alt='desktop-medium-img' />          
                </div>
                <div className="home-page__section-informations__text-block">
                    <p className='home-page__section-informations__text-block-first-paragraphe'>Le web, un écosystème en constante évolution</p>
                    <h1>Restez informé des dernières <span>tendances</span></h1>
                    <p>Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !</p>
                    <div className="home-page__section-informations__text-block__link">
                        <p>Lire les articles récents</p>
                        <img src={RightArrowIcon} alt="Right Arrow Icon" />
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Home