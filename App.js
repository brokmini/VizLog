/*eslint-env jquery*/

import React, { Component } from 'react';
import './App.css';
var data="";
//**********************************************************
class FileInput extends React.Component {
    notifier()
    {
      alert("File loaded successfully");
    }

    uploadFile(e) {
        let files= e.target.files;
        let reader= new FileReader();

        reader.readAsText(files[0]);
        reader.onload=(e)=>{
        data=e.target.result;
        this.notifier();
        }
    }

    render() {
      return <span>
        <input type="file"
        name="myFile"
        onChange={(e)=>this.uploadFile(e)} />
      </span>
    }
}
//**********************************************************
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      factors:[],
      asc: true, //default of true referes to ascending order
      date: " ",
    };
  }

  processFactors(e){
    console.log(e.which);
    if (e.which===13)
    {
      let factor = document.getElementById("inputFactors").value;
      if (factor!=="")
      {
        const factors = this.state.factors;
        factors.push(factor);
        this.setState({factors:factors},() => console.log(this.state.factors));
        document.getElementById("inputFactors").value="";
      }
    }
  }

  removeFactor(factor)
  {
    const factors = this.state.factors;
    //factors.pop(factor);
    var index = factors.indexOf(factor['key']);
    console.log(index);
    if (index > -1) {
      factors.splice(index, 1);
    }
    this.setState({factors:factors},() => console.log(this.state.factors));
  }

  screenshot()
{
  window.print();
}

  toggleOrder(){
    var isAsc= document.getElementById("toggleOrder").checked;
    this.setState({asc:isAsc},() => console.log(this.state.asc));
  }

  filterTime()
  {
    var input = (document.getElementById("datepicker").value).replace("-","/");
    var datefilter = new Date(input);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var date=datefilter.toLocaleDateString("en-US", options);
    var textDate = String(date).split(",");
    var t = (textDate[1].trim()).split(" ");
    var temp = (t[0].substring(0,3)).concat(" ");
    var setDate = temp.concat(t[1]);
    this.setState({date:setDate},() => console.log(this.state.date));
  }


  render() {
    var lline=[];
    var factorList=[];
    console.log(this.state.factors);
    for(var factor=0;factor<this.state.factors.length;factor++)
    {
      document.getElementById("factorList").className="factorListVisible";
      let key=this.state.factors[factor];
      let keyButton=key+"Button";
      let keyIcon=key+"icon";
      factorList.push(<button key={keyButton} className="factorButton" onClick={()=>this.removeFactor({key})}><i key={keyIcon} className="fa fa-close"></i>{key}</button>);
    }

    if (this.state.factors.length!==0 && data==="")
    alert("No log file to process");
    if(data!=="")
    {
      var lines=data.split("\n");
      if(this.state.asc)
      {
        for (var line=0;line<lines.length;line++)
        {
          if(lines[line]!=="" && lines[line].includes(this.state.date))
          {
            var lineHoriz=line+".horiz";
            var lineSvg=line+".svg";
            var lineLine=line+"line";
            var lineTime=line+".time";
            var lineText=line+".text";
            var time = (lines[line].split(" ",3)).join(" ");

            let splitLog= lines[line].split(" ");
            var brieflog= splitLog[4]+" "+splitLog[5]+" "+splitLog[6]+" "+splitLog[7]+" "+splitLog[8]+" "+splitLog[9];

            let checkFactor=false;
            for(var factor=0;factor<this.state.factors.length;factor++)
            {
              checkFactor = (checkFactor || lines[line].includes(this.state.factors[factor]));
            }
            if(checkFactor)
            {
             lline.push(<div key={line}><svg className="svg" height="100" width="800" viewBox="0 0 80 10" key={lineSvg}><line key={lineLine} x1="40" y1="0" x2="40" y2="10" className="greenvline"/>);
             lline.push(<text key={lineTime} x="41" y="9" className="timestamp">{time}</text>);
             lline.push(<text key={lineText} x="0" y="9" className="brieflog">{brieflog}</text>);
             lline.push(<line key={lineHoriz} x1="40" y1="10" x2="20" y2="10" className="greenhline"/></svg><br/></div>);

            }
            else {
              lline.push(<div key={line}><svg className="svg" height="100" width="800" viewBox="0 0 80 10" key={lineSvg}><line key={lineLine} x1="40" y1="0" x2="40" y2="10" className="redvline"/>);
              lline.push(<text key={lineTime} x="26" y="9" className="timestamp">{time}</text>);
              lline.push(<text key={lineText} x="42" y="9" className="brieflog">{brieflog}</text>);
              lline.push(<line key={lineHoriz} x1="40" y1="10" x2="60" y2="10" className="redhline"/></svg><br/></div>);
            }
          }
      }
      }
      else {
        for (var line=lines.length-1;line>=0;line--)
        {
          if(lines[line]!=="" && lines[line].includes(this.state.date))
          {
            var lineHoriz=line+".horiz";
            var lineSvg=line+".svg";
            var lineLine=line+"line";
            var lineTime=line+".time";
            var lineText=line+".text";
            var time = (lines[line].split(" ",3)).join(" ");

            let splitLog= lines[line].split(" ");
            var brieflog= splitLog[4]+" "+splitLog[5]+" "+splitLog[6]+" "+splitLog[7]+" "+splitLog[8]+" "+splitLog[9];

            let checkFactor=false;
            for(var factor=0;factor<this.state.factors.length;factor++)
            {
              checkFactor = (checkFactor || lines[line].includes(this.state.factors[factor]));
            }
            if(checkFactor)
            {
             lline.push(<div key={line}><svg className="svg" height="100" width="800" viewBox="0 0 80 10" key={lineSvg}><line key={lineLine} x1="40" y1="0" x2="40" y2="10" className="greenvline"/>);
             lline.push(<text key={lineTime} x="41" y="9" className="timestamp">{time}</text>);
             lline.push(<text key={lineText} x="0" y="9" className="brieflog">{brieflog}</text>);
             lline.push(<line key={lineHoriz} x1="40" y1="10" x2="20" y2="10" className="greenhline"/></svg><br/></div>);

            }
            else {
              lline.push(<div key={line}><svg className="svg" height="100" width="800" viewBox="0 0 80 10" key={lineSvg}><line key={lineLine} x1="40" y1="0" x2="40" y2="10" className="redvline"/>);
              lline.push(<text key={lineTime} x="26" y="9" className="timestamp">{time}</text>);
              lline.push(<text key={lineText} x="42" y="9" className="brieflog">{brieflog}</text>);
              lline.push(<line key={lineHoriz} x1="40" y1="10" x2="60" y2="10" className="redhline"/></svg><br/></div>);
            }
          }
      }
      }

  }

    return (
      <div id="vizlog"  className="vizlog">
        <div className="inputDiv">
            <br/>
            <input type="text"  id="inputFactors" onKeyPress={(e)=>this.processFactors(e)}></input> <text>                 </text>
            <FileInput />
            <label className="switch"><input defaultChecked type="checkbox" id="toggleOrder" onClick={()=>this.toggleOrder()}/><span className="slider round"></span></label>
            <button className="print" onClick={()=>this.screenshot()}>Print</button>
            <input id="fromdatepicker" className="datepicker" type="date" onChange={()=>this.filterTime()}></input>
            <br/><br/>
            <div id="factorList" className="factorList">
            {factorList}
            </div>
            <br/><br/>
        </div>
        <br/> <br/> <br/>
        <div>
            {lline}
        </div>
      </div>

    );
  }
}

export default App;
