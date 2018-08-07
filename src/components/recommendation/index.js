import React from 'react';
import Brain from 'brain.js';

import './styles.css';

class Recommend extends React.Component {
    constructor() {
        super();
        this.boxes = [1,2,3,4,5];
        this.network = new Brain.NeuralNetwork();
        this.onHoverEnter = this.onHoverEnter.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.generateRandomColor = this.generateRandomColor.bind(this);
        this.generateRandomTheme = this.generateRandomTheme.bind(this);
        this.predictColorData = this.predictColorData.bind(this);
        this.trainingData = [];
        this.state = {
            currColor : [
                {}, {}, {}, {}, {}
            ],
            recommendations : []
        };
    }

    componentDidMount() {
        this.generateRandomTheme();
    }

    onHoverEnter(e, i) {
        const { target } = e;
        const allStar = document.querySelectorAll('.fa-star');
        [].forEach.call(allStar, (elem, x) => {
            if (x <= i) {
                elem.classList.add('star-highlight');
            }
        })
    }

    onHoverLeave() {
        const allStar = document.querySelectorAll('.fa-star');
        [].forEach.call(allStar, elem => elem.classList.remove('star-highlight'));
    }

    onStarClick(e, i) {
        const input = [];
        const { currColor } = this.state;
        currColor.forEach(i => input.push(
            Math.round(i.r / 2.55) / 100,
            Math.round(i.g / 2.55) / 100,
            Math.round(i.b / 2.55) / 100
        ));

        this.trainingData.push({
            input,
            output : [ i / 4 ]
        });

        this.generateRandomTheme();
        this.predictColorData();
    }

    generateRandomColor() {
        return {
            r: Math.round(Math.random() * 255), // number between 0 and 50
            g: Math.round(Math.random() * 255),
            b: Math.round(Math.random() * 255),
        }
    }

    generateRandomTheme() {
        const { currColor } = this.state;
        for(var i in currColor) {
            currColor[i] = this.generateRandomColor()
        }
        this.setState({
            currColor
        })
    }

    predictColorData() {
        const results  = [];
        this.network.train(this.trainingData);
        for (let i = 0; i < 100000; i += 1) {
            const colors = [];
            const box1 = this.generateRandomColor();
            const box2 = this.generateRandomColor();
            const box3 = this.generateRandomColor();
            const box4 = this.generateRandomColor();
            const box5 = this.generateRandomColor();
            [box1, box2, box3, box4, box5].forEach(itm => colors.push(
                Math.round(itm.r / 2.55) / 100,
                Math.round(itm.g / 2.55) / 100,
                Math.round(itm.b / 2.55) / 100
            ));
            const [score] = this.network.run(colors);
            results.push({ box1, box2, box3, box4, box5, score })
        }
        const sortedResults  = results.sort((a, b) => b.score - a.score);
        this.setState({
            recommendations : sortedResults.filter((arr, i) => i < 3)
        })
    }

    render() {
        const { currColor, recommendations } = this.state;
        console.log(this.trainingData.length, recommendations[0] && recommendations[0].score);
        return (
            <div className="recommendation-container container">
                <div className="header"><h2>Rate this color combination</h2></div>
                <section>
                    <div className="color-boxes color-1" style={{  backgroundColor : `rgb(${currColor[0].r}, ${currColor[0].g}, ${currColor[0].b})` }}>
                        <h2>P</h2>
                    </div>
                    <div className="middle-box-cont">
                        <div className="color-boxes color-2" style={{  backgroundColor : `rgb(${currColor[1].r}, ${currColor[1].g}, ${currColor[1].b})` }}>
                            <h2>E</h2>
                        </div>
                        <div className="color-boxes color-3" style={{  backgroundColor :`rgb(${currColor[2].r}, ${currColor[2].g}, ${currColor[2].b})` }}>
                            <h2>T</h2>
                        </div>
                        <div className="color-boxes color-4" style={{  backgroundColor : `rgb(${currColor[3].r}, ${currColor[3].g}, ${currColor[3].b})` }}>
                            <h2>E</h2>
                        </div>
                    </div>
                    <div className="color-boxes color-5" style={{  backgroundColor :`rgb(${currColor[4].r}, ${currColor[4].g}, ${currColor[4].b})` }}>
                        <h2>R</h2>
                    </div>
                </section>
                <section className="star-rating-cont">
                    <hr />
                    <div className="star-rating">
                        {
                            this.boxes.map((elem, i) => (
                                <i
                                    className={`fa fa-star`}
                                    onMouseEnter={e => this.onHoverEnter(e, i)}
                                    onMouseLeave={this.onHoverLeave}
                                    onClick={e => this.onStarClick(e, i)}
                                    aria-hidden
                                    key={i}
                                />
                            ))
                        }
                    </div>
                    <hr />
                </section>
                <section>
                    <div><h3>Items you may like</h3></div>
                    <div className="row recommendations-sect">
                    {
                        recommendations.map((box, i) => (
                            
                                <div className="col-lg-4"  key={i}>
                                    <div className="color-boxes color-1" style={{  backgroundColor : `rgb(${box.box1.r}, ${box.box1.g}, ${box.box1.b})` }}>
                                        <h2>P</h2>
                                    </div>
                                    <div className="middle-box-cont">
                                        <div className="color-boxes color-2" style={{  backgroundColor : `rgb(${box.box2.r}, ${box.box2.g}, ${box.box2.b})` }}>
                                            <h2>E</h2>
                                        </div>
                                        <div className="color-boxes color-3" style={{  backgroundColor :`rgb(${box.box3.r}, ${box.box3.g}, ${box.box3.b})` }}>
                                            <h2>T</h2>
                                        </div>
                                        <div className="color-boxes color-4" style={{  backgroundColor : `rgb(${box.box4.r}, ${box.box4.g}, ${box.box4.b})` }}>
                                            <h2>E</h2>
                                        </div>
                                    </div>
                                    <div className="color-boxes color-5" style={{  backgroundColor :`rgb(${box.box5.r}, ${box.box5.g}, ${box.box5.b})` }}>
                                        <h2>R</h2>
                                    </div>
                                </div>
                        ))
                    }
                    </div>
                </section>
            </div>
        )
    }
};

export default Recommend;