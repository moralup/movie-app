import './error.css'
import image from '../../images/cross.svg'
export default (props) => {
    return (
        <div className="error-box">
            <div className="error-image"
                onClick={(e) => e.target.parentElement.className += ' none'}>
                    <span/>
                    <span/>
            </div>

            <p className="error-descriptions">{props.title}</p>
            <p className="error-descriptions">{props.descriptions}</p>
        </div>
    );
}