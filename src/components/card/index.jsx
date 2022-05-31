import './card.scss'

const Card = props => {
    return (
        <div className='card'>
            <div className='progress_bar'></div>
            {props.children}
            <div>
                <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;&nbsp;
                <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default Card