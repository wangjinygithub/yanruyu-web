import React, {useContext} from "react";
const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
  };
  
  const ThemeContext = React.createContext({});
  
  function App() {
    const search = (val)=>{
        alert('查找成功啦!'+val);
    }
    return (
      <ThemeContext.Provider value={{
        search,
        theme: themes.dark
      }}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
  
  function Toolbar(props) {
    const {search, theme} = useContext(ThemeContext);
    return (
      <div>
        <ThemedButton />
        <div>
          <button onClick={()=>search('Toolbar')}>按钮</button>
        </div>
      </div>
    );
  }
  
  function ThemedButton() {
    const {search, theme} = useContext(ThemeContext);
    return (
      <button onClick={()=>search('ThemedButton')} style={{ background: theme.background, color: theme.foreground }}>
        I am styled by theme context!!!!demo
      </button>
    );
  }

  export default App ;