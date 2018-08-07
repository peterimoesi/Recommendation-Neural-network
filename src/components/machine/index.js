import React from 'react';
import Brain from 'brain.js';

import './styles.css';

class Machine extends React.Component {
    constructor() {
        super();
        this.inputChange = this.inputChange.bind(this);
        this.runBrain = this.runBrain.bind(this);
        this.convertToRgb = this.convertToRgb.bind(this);
        this.network = new Brain.NeuralNetwork();
        this.state = {
            color : '#5abb2e'
        }
    }

    componentDidMount() {
        this.network.train([
            { input: { r: 0.62, g: 0.72, b: 0.88 }, output: { light: 1 } },
            { input: { r: 0.1, g: 0.84, b: 0.72 }, output: { light: 1 } },
            { input: { r: 0.33, g: 0.24, b: 0.29 }, output: { dark: 1 } },
            { input: { r: 0.74, g: 0.78, b: 0.86 }, output: { light: 1 } },
            { input: { r: 0.31, g: 0.35, b: 0.41 }, output: { dark: 1 } },
            { input: {r: 1, g: 0.99, b: 0}, output: { light: 1 } },
            { input: {r: 1, g: 0.42, b: 0.52}, output: { dark: 1 } },
            { input: {r: 0.35294117647058826, g: 0.7333333333333333, b: 0.1803921568627451}, output: { light: 1 } },
            { input: {r: 0, g: 0, b: 0}, output: { dark: 1 } },
            { input: {r: 1, g: 1, b: 1}, output: { light: 1 } }
        ]);
    }
    
    convertToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        const final = result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : null;
        return final;
    }

    inputChange(e) {
        this.setState({ color: e.target.value }, this.runBrain(this.convertToRgb(this.state.color)));
    }

    runBrain(val) {
        const result = Brain.likely(val, this.network);
        console.log(result)
        this.setState({ textColor : result === 'dark' ? 'white' : 'black' });
    }

    render() {
        return (
            <div>
                <h1>Color matching</h1>
                <header>Color matching with machine learning</header>
                <section>
                    <div className="preview-results" style={{ background: this.state.color }}>
                        <div className="sample-text" style={{ color: this.state.textColor }}>testing</div>
                    </div>
                    <div className="color-input-cont">
                        <input
                            type="color"
                            name="color-input"
                            className="color-input"
                            value={this.state.color}
                            onChange={this.inputChange}
                        />
                    </div>
                </section>
            </div>
        )
    }
}

export default Machine;
