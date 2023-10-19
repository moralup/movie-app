import './error.css';
import image from '../../images/cross.svg';
export default (props) => {
    
    return (
        <div 
            className={`error-box ${props.problem}-box`}>
            <div className={`error-image ${props.problem}-image`}>
                <span/>
                <span/>
            </div>
            <p className="error-descriptions">{props.title}</p>
            <p className="error-descriptions">{props.descriptions}</p>
        </div>
    );
};