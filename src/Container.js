import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import mdparser from "./MarkdownParse";

class Container extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plaintext : localStorage.getItem('plaintext'),
            parsedtext : localStorage.getItem('parsedtext')
        }
    }

    openNew = () => {

        var initial = `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta
              name="Markdown Note"
              content="Rendered note"
            />
            <title> Rendered Note </title>
        `
        var mydiv = document.getElementById('markdown-note')
        var newWindow = window.open("", "_blank", `auto,${mydiv.offsetHeight}`);
        newWindow.document.write(initial)
        newWindow.document.write("<link rel='stylesheet' href='https://dl.dropboxusercontent.com/s/59j6hswrlhv7ca5/mdnotes.css' type='text/css'/>");
        newWindow.document.write(mydiv.outerHTML + '<script>window.print()</script>');
        
    }
    componentDidUpdate(){
        localStorage.setItem('plaintext', this.state.plaintext)
        localStorage.setItem('parsedtext', this.state.parsedtext)
    }
    handleChange = (evt) =>{
        this.setState({plaintext: evt.target.value})
        let res =  mdparser.processSync(evt.target.value)
        this.setState({parsedtext: res})
    }
    componentDidMount () {
        const plaintext = localStorage.getItem('plaintext') || '# Hello'
        const parsedtext = localStorage.getItem('parsedtext') || '<h1>Hello</h1>'
        this.setState({plaintext: plaintext, parsedtext: parsedtext})
      }

    render(){
        return(
            <div>
                <nav id='main-nav' class="navbar navbar-default p-3 items-center">
                   <div className="container-fluid">
                   <h1 id="nav-title" className="display-6 text-white"> Markdown Notes</h1>
                   <button className="btn p-1 mt-2" id='download' onClick={this.openNew}> Print Notes </button>
                    </div> 
                </nav>
                <div id='main' className='container-fluid'>
                <div className='row maincontainer'>
                    <div className='col-sm-4 plaintext mb-2' id="plain-text">
                    <h4 className=""> Markdown code here </h4>
                    <textarea className='form-control' onChange={this.handleChange} value={this.state.plaintext} rows='50' />
                    </div>
                    <div className='col-sm-8'>
                    <h4 className=""> Rendered Text </h4>
                    <div id='markdown-note' className='parsed bg-white' dangerouslySetInnerHTML={ {__html: this.state.parsedtext}}></div> 
                    </div>
                </div>
                <div className="row">
                    <footer id='footer' className="p-2 text-center text-white">
                        <h6>
                            By: <a className = 'text-white' href='https://github.com/prtkx2' target="_blank" rel="noopener noreferrer"> Pratik </a>
                        </h6>
                    </footer>
                </div>
            </div>
            </div>
            
        )
    }

}

export default Container;