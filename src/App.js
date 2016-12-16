import React, { Component } from 'react';
import './App.css';
import tests from './tests.js'
import TestRunner from './TestRunner.js'

class App extends Component {
    constructor() {
        super();
        this.myTests = [];
        for (var i = 0; i < tests.length; i++) {
            this.myTests.push(new TestRunner(i, tests[i]));
        }

        this.state = {
            tests: this.myTests,
            running: 0,
            failed: 0,
            passed: 0,
            finished: false,
        };
    }

    updateTestState() {
        var running, failed, passed;
        running = failed = passed = 0;
        for (var i = 0; i < this.myTests.length; i++) {
            if (this.myTests[i].statusAlias === "running") {
                running++;
            }
            else if (this.myTests[i].statusAlias === "passed") {
                passed++;
            }
            else if (this.myTests[i].statusAlias === "failed") {
                failed++;
            }
        }

        this.setState({
            tests: this.myTests,
            running: running,
            failed: failed,
            passed: passed,
            finished: (running === 0)
        });
    }

    startTests() {
        for (var i = 0; i < this.myTests.length; i++) {
            this.myTests[i].runTest(() => { this.updateTestState(); });
        }
        this.setState({
            finished: false
        });
        this.updateTestState();
    }

    render() {
        this.state.tests.sort(function(a, b) {
            return b.rank - a.rank;
        });

        var liveStatus = (<table>
                <tbody>
                    <tr><td><b>Running:</b></td><td>{this.state.running}</td></tr>
                    <tr><td><b>Failed:</b></td><td>{this.state.failed}</td></tr>
                    <tr><td><b>Passed:</b></td><td>{this.state.passed}</td></tr>
                </tbody>
            </table>);

        return (
            <div className="App">
            <table>
            <tbody>
            {
                this.state.tests.map(function(item) {
                    return <tr key={item.testId}><td>{item.desc}:</td><td className={item.statusAlias}>{item.status}</td></tr>
                })
            }
            </tbody>
            </table><br />
            <button onClick={this.startTests.bind(this)}>Start Tests</button><br />
            <br />
            {liveStatus}
            {this.state.finished && <span><br /><b>Finished!!!</b></span>}
            </div>
        );
    }
}

export default App;
