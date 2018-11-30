
import * as React from 'react';
import './Slideshow.css';

interface IArrows{
    decreaseCount:(event:React.MouseEvent<HTMLSpanElement>)=>void,
    increaseCount:(event:React.MouseEvent<HTMLSpanElement>)=>void
}

class Arrows extends React.Component<IArrows,{}> {
    constructor(props:IArrows){
        super(props);
    }

    public render (){
        return(
            <div className="arrows">
                <span
                    onClick={this.props.decreaseCount}
                    className="arrow btn-arrow btn-arrow-left"
                />
                <span
                    onClick={this.props.increaseCount}
                    className="arrow btn-arrow btn-arrow-right"
                />
            </div>
        );
    }
};

export default Arrows;