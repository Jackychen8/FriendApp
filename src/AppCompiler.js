import React from 'react';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            input: "/*Place JSX here*/",
            output: '',
            err: ''
        }
    }
    update(e){
        let code = e.target.value;
        try {
            this.setState({
                output: window.Babel
                .transform(code, {presets:['es2015', 'react']})//converts JSX to React
                .code,//gives code back
                err: ''
            })
        }
        catch(err){
            this.setState({err: err.message});
        }
    }
    render(){
        return(
            <div>
                <header>{this.state.err}</header>
                <div className="compInput">
                    <textarea
                        onChange={this.update.bind(this)}
                        defaultValue={this.state.input}/>
                    <pre>
                        {this.state.output}
                    </pre>
                </div>
            </div>
        )
    }
}

export default App