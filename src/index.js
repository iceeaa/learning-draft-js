import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import './index.css';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }
  _onClick = (types) => {
    if(types) this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    else  this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  render() {
    return (
      <div>
        <div className="toolBox">
          <button className="buttom" onClick={this._onClick.bind(null, true)}>B</button>
          <button className="buttom" onClick={this._onClick.bind(null, false)}>I</button>
        </div>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
        <div>{JSON.stringify(this.state.editorState)}</div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <TextEditor/>
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
