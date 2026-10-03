import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import Editor from '@monaco-editor/react';
import './styles.css';

const templates = {
  starter: {
    html: '<main class="card">\\n  <h1>Hello, Web!</h1>\\n  <p>Edit the code and see the result instantly.</p>\\n  <button onclick="sayHello()">Click me</button>\\n</main>',
    css: 'body {\\n  margin: 0;\\n  min-height: 100vh;\\n  display: grid;\\n  place-items: center;\\n  font-family: Arial, sans-serif;\\n  background: #f3f4f6;\\n}\\n.card {\\n  padding: 32px;\\n  text-align: center;\\n  background: white;\\n  border-radius: 16px;\\n  box-shadow: 0 12px 30px rgba(0,0,0,.12);\\n}',
    js: 'function sayHello() {\\n  alert("Hello from CodeLab!");\\n}'
  },
  profile: {
    html: '<section class="profile">\\n  <div class="avatar">AK</div>\\n  <h1>Alex Kumar</h1>\\n  <p>Frontend Developer</p>\\n  <button onclick="follow()">Follow</button>\\n</section>',
    css: 'body { font-family: system-ui; display:grid; place-items:center; min-height:100vh; background:#eef2ff; }\\n.profile { text-align:center; padding:40px; background:#fff; border-radius:24px; width:280px; box-shadow:0 15px 35px #0002; }\\n.avatar { margin:auto; width:90px; height:90px; display:grid; place-items:center; border-radius:50%; background:#111827; color:#fff; font-size:28px; font-weight:700; }\\nbutton { padding:10px 22px; border:0; border-radius:10px; cursor:pointer; }',
    js: 'function follow(){ alert("Thanks for following!"); }'
  }
};

function App(){
  const [tab,setTab]=useState('html');
  const [code,setCode]=useState(templates.starter);
  const [template,setTemplate]=useState('starter');
  const [dark,setDark]=useState(true);
  const [consoleMsg,setConsoleMsg]=useState('Ready.');
  const src=useMemo(()=>`<!doctype html><html><head><meta charset="UTF-8"><style>${code.css}</style></head><body>${code.html}<script>${code.js}<\/script></body></html>`,[code]);
  const update=(value)=>setCode({...code,[tab]:value ?? ''});
  const loadTemplate=(name)=>{setTemplate(name);setCode(templates[name]);setConsoleMsg(`Loaded ${name} template.`)};
  const share=async()=>{const payload=btoa(unescape(encodeURIComponent(JSON.stringify(code)))); const url=`${location.origin}${location.pathname}#code=${payload}`; try{await navigator.clipboard.writeText(url);setConsoleMsg('Share link copied to clipboard.')}catch{setConsoleMsg('Could not copy automatically.')}};
  const reset=()=>{setCode(templates.starter);setTemplate('starter');setConsoleMsg('Editor reset.')};
  return <div className={dark?'app dark':'app'}>
    <header className="topbar"><div className="brand">&lt;/&gt; CodeLab</div><div className="actions"><select value={template} onChange={e=>loadTemplate(e.target.value)}><option value="starter">Starter</option><option value="profile">Profile Card</option></select><button onClick={reset}>Reset</button><button onClick={share}>Share</button><button onClick={()=>setDark(!dark)}>{dark?'☀ Light':'🌙 Dark'}</button></div></header>
    <main className="workspace">
      <section className="panel editor-panel"><div className="tabs">{['html','css','js'].map(x=><button className={tab===x?'active':''} onClick={()=>setTab(x)} key={x}>{x.toUpperCase()}</button>)}</div><Editor height="calc(100vh - 190px)" language={tab==='js'?'javascript':tab} theme={dark?'vs-dark':'light'} value={code[tab]} onChange={update} options={{fontSize:14,minimap:{enabled:false},automaticLayout:true}}/></section>
      <section className="panel preview-panel"><div className="panel-title">Live Preview <span>●</span></div><iframe title="Live preview" srcDoc={src} sandbox="allow-scripts"/><div className="console"><strong>Console:</strong> {consoleMsg}</div></section>
    </main>
    <footer>Online Code Editor • React + Monaco Editor • HTML/CSS/JavaScript</footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
