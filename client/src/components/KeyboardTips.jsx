import { React } from 'react';

const UP = () => (
  <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path></g></svg>
)

const DOWN = () => (
  <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
)
const LEFT = () => (
  <span style={{ transform: 'rotate(90deg)',marginLeft:'-4px' }}>
    <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
  </span>
)

const RIGHT = () => (
  <span style={{ transform: 'rotate(-90deg)', marginRight: '-5px'  }}>
    <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path></g></svg>
  </span>
)

const ENTER = () => (
  <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path></g></svg>
)

const ESC = () => (
  <svg width="15" height="15"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"><path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path></g></svg>
)

const W = () => (
  <span>W</span>
)
const A = () => (
  <span>A</span>
)
const S = () => (
  <span>S</span>
)
const D = () => (
  <span>D</span>
)
const styles = {
  main:{
    position:'fixed',
    right:'20px',
    top:'20px',
    background: '#fff',
    fontSize:'smaller',
    opacity:'0.6',
    border:'10px solid #fff',
    borderRadius:'10px',
    borderBottom: '5px solid #fff'
  },
  keyBox: {
    alignItems: 'center',
    background: 'linear-gradient(-225deg,#d5dbe4,#f8f8f8)',
    borderRadius: '2px',
    boxShadow: 'inset 0 -2px 0 0 #cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4)',
    display: 'flex',
    height: '18px',
    justifyContent: 'center',
    marginRight: '0.4em',
    paddingBottom: '1px',
    width: '20px'
  },
  keyBox2:{
    width:20,
    marginRight: '0.4em',

  },
  line:{
    display: 'flex',
    marginBottom:'5px'
  },
  tips:{
    fontWeight:'900',
    marginLeft:'20px'
  }
}

const KeyBoardTips = () => {

  

  return (
    <div style={styles.main}>
      <span style={styles.line}>
        <span style={styles.keyBox}><W /></span>
        <span style={styles.keyBox}><UP /></span>
        <span style={styles.tips}>UP</span>
      </span>
     
      <span style={styles.line}>
        <span style={styles.keyBox}><A /></span>
        <span style={styles.keyBox}><LEFT /></span>
        <span style={styles.tips}>LEFT</span>
      </span>
      <span style={styles.line}>
        <span style={styles.keyBox}><S /></span>
        <span style={styles.keyBox}><DOWN /></span>
        <span style={styles.tips}>DOWN</span>
      </span>
      <span style={styles.line}>
        <span style={styles.keyBox}><D /></span>
        <span style={styles.keyBox}><RIGHT /></span>
        <span style={styles.tips}>RIGHT</span>
      </span>
      <span style={styles.line}>
        <span style={styles.keyBox}><ENTER /></span>
        <span style={styles.keyBox2}></span>
        <span style={styles.tips}>CHAT</span>
      </span>
      <span style={styles.line}>
        <span style={styles.keyBox}><ESC /></span>
        <span style={styles.keyBox2}></span>
        <span style={styles.tips}>QUIT CHAT</span>
      </span>
    </div>
  )
}

export default KeyBoardTips