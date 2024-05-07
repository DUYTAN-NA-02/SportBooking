import Style from './singleimage.module.scss'
import 'animate.css';

function singelImage({ url, setUrl }) {
    console.log("re render")
    return (
        <div
            className={`${Style["single-image"]} animate__animated animate__backInDown`}
            onClick={() => { setUrl(null)}}
        >
            <img src={url} />
        </div>
    )
}

export default singelImage