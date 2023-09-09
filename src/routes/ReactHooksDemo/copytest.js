import React, { Component } from 'react';

export default class copytest extends Component {
    constructor(props) {
        super(props);
        this.state = {
          words: [{name:'marklar'}]
        };
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick() {
        // 这部分代码很糟，而且还有 bug
        const words = this.state.words;
        //words.push('marklar');
        //this.setState({words: words});
        this.setState((state)=>{
            //state.words.push('jack')
            //return {words: state.words}
            // return {words: state.words.concat(['jack'])}

            const obj = {name: 'tom', age: '20'}
            const copyObj = Object.assign(obj, {job: 'coder'}); 
            console.log('obj', obj === copyObj);
            copyObj.name = 'wuhan';
            console.log('upname', JSON.stringify(obj));
            console.log('number', '1' === 1);

            const newArr = [...state.words];
            const oldArr = state.words;
            newArr[0].name = 'nb';
            console.log('arr', JSON.stringify(oldArr));

            console.log('concat', [...state.words][0] === state.words[0]);
            return {words: [...state.words, {name: 'tom'}] }


        });
      }
    
      render() {
        return (
          <div>
            <button style={{height:'20px', width:'100px'}} onClick={this.handleClick} />
            <ListOfWords words={this.state.words} />
          </div>
        );
      }
}

class ListOfWords extends React.PureComponent {
    render() {
      return <div>{this.props.words.map((item)=>item.name).join(',')}</div>;
    }
  }
