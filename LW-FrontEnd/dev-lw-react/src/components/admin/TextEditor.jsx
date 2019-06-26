import React, { Component } from 'react'

export class TextEditor extends Component {
	    // editor.focus();
		constructor(props){
			super(props);
	
			this.state = {
				fontSize:""
			}
		}
	
		command = (e,name,size) => {
			let success;
			console.log("masuk console");
			if(name == 'fontSize'){
				try {
					success = document.execCommand(name, false, size);
				} catch (error) {
					alert(error);
				}
			}
			else{
				try {
					success = document.execCommand(name, false, null);
				} catch (error) {
					alert(error);
				}
			}
			
	
			if (!success) {
				const supported = this.isSupported(name);
				const message = supported ? 'Unknown error. Is anything selected?' : 'Command is not supported by your browser.';
				alert(message);
			}
		}
	
		isSupported = (name) => {
			return document.queryCommandSupported(name);
		}
	
		// create an observer instance
		
	
		observer = (mutations) => {
			mutations.forEach(this.checkMutation);
		}
	
		checkMutation = (mutation) => {
			console.log('Content:', this.getAttribute(mutation));
			console.log('New Text:', mutation.target.data);
			
			const editor = document.querySelector('.editor').innerHTML;
			this.props.updateContent(editor);
			console.log(editor);
		}
	
		componentDidMount(){
			const editor = document.querySelector('.editor');
			console.log(editor);
			editor.contentEditable = true;
	
			var observer = new MutationObserver(this.observer);
	
			// configuration of the observer:
			var config = {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true,
			};
		
			// pass in the target node, as well as the observer options
			observer.observe(editor, config);
			console.log("update");
			
		}
	
		dataChange(ev){
			this.setState({[ev.target.name]:ev.target.value })
		}
	
		getAttribute = (mutation) => {
			return mutation.target.parentElement && mutation.target.parentElement.attributes[0] && mutation.target.parentElement.attributes[0].value;
		}
	
		submit = () => {
			const editor = document.querySelector('.editor').innerHTML;
			console.log(editor);
		}
		render(){
			
		
			return(
				<div className="toolbar" style={{fontWeight:"normal"}}>
					<div style={{textAlign:"center"}}>
						<h3>Options</h3>
						<button className="tool-items fa fa-bold" onClick={((e) => this.command(e, 'bold',null))}/>
						<button className="tool-items fa fa-italic" onClick={((e) => this.command(e, 'italic',null))}/>
						<button className="tool-items fa fa-underline" onClick={((e) => this.command(e, 'underline',null))}/>
						
						<button className="tool-items fa fa-align-center" onClick={((e) => this.command(e, 'justifyCenter'))}/	>
						<button className="tool-items fa fa-align-left" onClick={((e) => this.command(e, 'justifyLeft'))}/>
						<button className="tool-items fa fa-align-right" onClick={((e) => this.command(e, 'justifyRight'))}/>
						<button className="tool-items fa fa-strikethrough" onClick={((e) => this.command(e, 'strikeThrough'))}/>
					</div>
					<div style={{textAlign:"center"}}>
						<input type="number" placeholder="Can only be 1-7"  name="fontSize" onChange={this.dataChange.bind(this)}/>
						<button className="tool-items" onClick={((e) => this.command(e, 'fontSize',this.state.fontSize))}>Font Size</button>
						<br/>
						<button onClick={this.submit} className="tool-items">SUBMIT</button>
					</div>
					<div className='editor' dangerouslySetInnerHTML={ {__html: this.props.content}}>
						{/* <h1 editableContentTitle='h1'>
							Creating editable content with DesignMode
						</h1> */}
	
						{/* <p editableContentTitle='paragraph'>
							INPUT HERE
						</p> */}
					</div>
	
					
	
					<div></div>
				</div>
				
			)
		}
	}

export default TextEditor
