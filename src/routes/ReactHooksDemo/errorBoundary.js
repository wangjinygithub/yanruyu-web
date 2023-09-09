import React, { Component } from 'react';

export default class errorBoundary extends Component {
   
    static getDerivedStateFromError (error){
        return {isError: error} 
    }

    state = {
        isError: ''
    }

    
        render() {
            const a = function (){}
        return (
            <div>
                <div>parent</div>
                {this.state.isError?'加載中...':<Child/>}
                
            </div>
        );
    }
}
 class Child extends Component {
    // list = [
    //     { name: '张三', age: 18 },
    //     { name: '李四', age: 56 },
    //     { name: '小红', age: 43 },
    //     { name: '小郑', age: 12 },
    // ]
    list = ''
    render() {
        return (
            <div>
                {this.list.map((item) => <div>{item.name}--{item.age}</div>)}
            </div>
        );
    }
}

