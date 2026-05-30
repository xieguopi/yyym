/* 余姚杨梅 · 预定页 主程序  —  app.jsx */
const { useState:useA, useEffect:useE, useRef:useR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#a72f35",
  "headingFont": "宋体",
  "texture": true
}/*EDITMODE-END*/;

/* ----------------------------------------------------- bottom action bar */
function BottomBar({ total, fav, setFav, onOrder, accent }){
  return (
    <div style={{position:'absolute',left:0,right:0,bottom:0,zIndex:40,
      padding:'12px 16px 30px',
      background:'linear-gradient(180deg,rgba(244,239,228,0) 0%,var(--paper) 26%)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <button onClick={()=>setFav(!fav)} aria-label="收藏" style={{width:50,height:50,borderRadius:15,flexShrink:0,
          border:'1px solid var(--line)',background:'var(--paper)',display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',gap:1,cursor:'pointer',color:fav?accent:'var(--ink-soft)'}}>
          <Ico.heart s={20} c={fav?accent:'var(--ink-soft)'} f={fav?accent:'none'}/>
          <span style={{fontSize:8.5}}>收藏</span>
        </button>
        <div style={{flex:'0 0 auto',paddingRight:4}}>
          <div style={{fontFamily:'var(--serif)',fontSize:24,fontWeight:700,color:accent,lineHeight:1}}>
            <span style={{fontSize:13}}>¥</span>{total}
          </div>
          <div style={{fontSize:9.5,color:'var(--ink-faint)'}}>含运费 · 赠定制冰袋</div>
        </div>
        <button onClick={onOrder} style={{flex:1,height:50,borderRadius:15,border:'none',cursor:'pointer',
          background:'linear-gradient(135deg,'+accent+', '+'var(--berry-deep))',color:'#fff',
          fontSize:16,fontWeight:600,fontFamily:'var(--serif)',letterSpacing:'.08em',
          boxShadow:'0 12px 26px -10px '+accent}}>
          立即预定
        </button>
      </div>
    </div>
  );
}

/* ----------------------------------------------------- booking sheet */
function Sheet({ open, onClose, specId, setSpecId, qty, setQty, accent }){
  const [show,setShow]=useA(false);
  const [step,setStep]=useA('opt');
  const [dateId,setDateId]=useA('d1');
  const [order,setOrder]=useA('');
  useE(()=>{ if(open){ setStep('opt'); const id=setTimeout(()=>setShow(true),20); return ()=>clearTimeout(id);} else setShow(false); },[open]);
  if(!open) return null;
  const spec=SPECS.find(s=>s.id===specId);
  const date=DATES.find(d=>d.id===dateId);
  const total=spec.price*qty;
  const confirm=()=>{ setOrder('YM'+Math.random().toString().slice(2,11)); setStep('done'); };
  const close=()=>{ setShow(false); setTimeout(onClose,260); };

  return (
    <div style={{position:'absolute',inset:0,zIndex:60,display:'flex',alignItems:'flex-end'}}>
      <div onClick={close} style={{position:'absolute',inset:0,background:'rgba(20,18,14,'+(show?.5:0)+')',transition:'background .26s'}}></div>
      <div style={{position:'relative',width:'100%',maxHeight:'90%',background:'var(--paper)',
        borderRadius:'26px 26px 0 0',transform:'translateY('+(show?'0':'100%')+')',transition:'transform .3s cubic-bezier(.3,.8,.3,1)',
        display:'flex',flexDirection:'column',overflow:'hidden',boxShadow:'0 -20px 50px rgba(0,0,0,.3)'}}>
        <div style={{padding:'10px 0 6px',display:'flex',justifyContent:'center'}}>
          <div style={{width:40,height:4,borderRadius:4,background:'var(--line)'}}></div>
        </div>

        {step==='opt' && <OptStep {...{spec,specId,setSpecId,qty,setQty,dateId,setDateId,total,accent,confirm,close}}/>}
        {step==='done' && <DoneStep {...{spec,qty,date,total,order,accent,close}}/>}
      </div>
    </div>
  );
}

function OptStep({ specId,setSpecId,qty,setQty,dateId,setDateId,total,accent,confirm,close }){
  return (
    <React.Fragment>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'4px 20px 14px'}}>
        <h3 style={{margin:0,fontFamily:'var(--serif)',fontSize:20,fontWeight:600,color:'var(--ink)',whiteSpace:'nowrap'}}>确认预定</h3>
        <button onClick={close} style={{border:'none',background:'none',fontSize:22,color:'var(--ink-faint)',cursor:'pointer',lineHeight:1}}>×</button>
      </div>
      <div className="scroll" style={{overflowY:'auto',padding:'0 20px',flex:1}}>
        <Label>选择规格</Label>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
          {SPECS.map(s=>{
            const on=s.id===specId;
            return (
              <button key={s.id} onClick={()=>setSpecId(s.id)} style={{textAlign:'left',cursor:'pointer',
                display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 14px',borderRadius:13,
                border:'1.5px solid '+(on?accent:'var(--line)'),background:on?'rgba(167,47,53,.05)':'var(--paper)'}}>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{s.name} · {s.weight}</div>
                  <div style={{fontSize:10.5,color:'var(--ink-faint)',marginTop:2}}>{s.note}</div>
                </div>
                <span style={{fontFamily:'var(--serif)',fontSize:17,fontWeight:700,color:on?accent:'var(--ink)'}}>¥{s.price}</span>
              </button>
            );
          })}
        </div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
          <Label inline>数量</Label>
          <Stepper qty={qty} setQty={setQty} accent={accent}/>
        </div>

        <Label>送达批次</Label>
        <div style={{display:'flex',gap:9,marginBottom:20}}>
          {DATES.map(d=>{
            const on=d.id===dateId;
            return (
              <button key={d.id} onClick={()=>setDateId(d.id)} style={{flex:1,cursor:'pointer',padding:'11px 6px',
                borderRadius:12,textAlign:'center',border:'1.5px solid '+(on?accent:'var(--line)'),
                background:on?'rgba(167,47,53,.05)':'var(--paper)'}}>
                <div style={{fontSize:13,fontWeight:600,color:on?accent:'var(--ink)'}}>{d.day}</div>
                <div style={{fontSize:10,color:'var(--ink-soft)',margin:'2px 0'}}>{d.label}</div>
                <div style={{fontSize:9,color:'var(--ink-faint)'}}>{d.sub}</div>
              </button>
            );
          })}
        </div>

        <Label>收货信息</Label>
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'13px 14px',borderRadius:13,
          border:'1px solid var(--line)',background:'var(--paper-2)',marginBottom:18}}>
          <span style={{color:accent}}><Ico.pin s={20} c={accent}/></span>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>张小梅　138****6688</div>
            <div style={{fontSize:11,color:'var(--ink-soft)',marginTop:2}}>浙江省杭州市西湖区文三路 · 默认地址</div>
          </div>
          <span style={{fontSize:18,color:'var(--ink-faint)'}}>›</span>
        </div>
      </div>

      {/* footer */}
      <div style={{padding:'14px 20px 26px',borderTop:'1px solid var(--line)',background:'var(--paper)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
          <span style={{fontSize:11.5,color:'var(--ink-soft)',whiteSpace:'nowrap'}}>含赠品 · 顺丰次日达</span>
          <div style={{textAlign:'right'}}>
            <span style={{fontSize:11,color:'var(--ink-soft)'}}>合计 </span>
            <span style={{fontFamily:'var(--serif)',fontSize:24,fontWeight:700,color:accent}}><span style={{fontSize:13}}>¥</span>{total}</span>
          </div>
        </div>
        <button onClick={confirm} style={{width:'100%',height:50,borderRadius:15,border:'none',cursor:'pointer',
          background:'linear-gradient(135deg,'+accent+', var(--berry-deep))',color:'#fff',fontSize:16,fontWeight:600,
          fontFamily:'var(--serif)',letterSpacing:'.1em',boxShadow:'0 12px 26px -10px '+accent}}>提交预定</button>
      </div>
    </React.Fragment>
  );
}

function DoneStep({ spec,qty,date,total,order,accent,close }){
  const cd=useCountdown(HARVEST);
  return (
    <div style={{padding:'14px 24px 28px',textAlign:'center'}}>
      <div style={{width:66,height:66,borderRadius:'50%',margin:'8px auto 16px',background:'rgba(111,138,82,.14)',
        display:'flex',alignItems:'center',justifyContent:'center',color:'var(--leaf-deep)'}}>
        <Ico.check s={32} c="var(--leaf-deep)"/>
      </div>
      <h3 style={{margin:'0 0 6px',fontFamily:'var(--serif)',fontSize:23,fontWeight:700,color:'var(--ink)'}}>预定成功</h3>
      <p style={{margin:'0 0 4px',fontSize:12.5,color:'var(--ink-soft)',lineHeight:1.6}}>
        已为你锁定头茬鲜果，{date.day}「{date.label}」清晨现摘现发
      </p>
      <div style={{fontSize:10.5,color:'var(--ink-faint)',marginBottom:20}}>预定单号 {order}</div>

      <div style={{background:'var(--paper-2)',border:'1px solid var(--line)',borderRadius:16,padding:'16px 16px',
        textAlign:'left',marginBottom:18}}>
        {[['商品',spec.name+' · '+spec.weight],['数量','×'+qty],['送达',date.day+' '+date.label],['赠品','定制冰袋']].map((r,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',
            borderBottom:i<3?'1px dashed var(--line)':'none'}}>
            <span style={{fontSize:12,color:'var(--ink-soft)'}}>{r[0]}</span>
            <span style={{fontSize:12.5,color:'var(--ink)',fontWeight:500,whiteSpace:'nowrap'}}>{r[1]}</span>
          </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:12,marginTop:6,borderTop:'1px solid var(--line)'}}>
          <span style={{fontSize:12.5,color:'var(--ink)'}}>实付</span>
          <span style={{fontFamily:'var(--serif)',fontSize:22,fontWeight:700,color:accent}}>¥{total}</span>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginBottom:22,
        background:'rgba(167,47,53,.06)',border:'1px solid rgba(167,47,53,.16)',borderRadius:12,padding:'11px'}}>
        <Ico.clock s={16} c={accent}/>
        <span style={{fontSize:12,color:'var(--berry-deep)'}}>距头茬开摘还有 <b style={{fontVariantNumeric:'tabular-nums'}}>{cd.days} 天 {cd.h}:{cd.m}:{cd.s}</b></span>
      </div>

      <button onClick={close} style={{width:'100%',height:48,borderRadius:14,cursor:'pointer',
        border:'1px solid var(--line)',background:'var(--paper)',color:'var(--ink)',fontSize:14,fontWeight:600}}>
        完成
      </button>
      <p style={{fontSize:10.5,color:'var(--ink-faint)',marginTop:14,lineHeight:1.6}}>坏果包赔 · 顺丰空运次日达 · 全程冷链锁鲜</p>
    </div>
  );
}

function Label({children,inline}){
  return <div style={{fontSize:12,fontWeight:600,color:'var(--ink)',marginBottom:inline?0:11,letterSpacing:'.04em'}}>{children}</div>;
}

/* ----------------------------------------------------- root */
function App(){
  const [t,setTweak]=useTweaks(TWEAK_DEFAULTS);
  const [specId,setSpecId]=useA('s1');
  const [qty,setQty]=useA(1);
  const [fav,setFav]=useA(false);
  const [sheet,setSheet]=useA(false);
  useE(()=>{ window.__fitStage&&window.__fitStage(); },[]);
  const spec=SPECS.find(s=>s.id===specId);
  const total=spec.price*qty;

  return (
    <div style={{'--accent':t.accent}}>
      <IOSDevice>
        <div style={{position:'absolute',inset:0,overflow:'hidden',background:'var(--paper)'}}>
          <div className="scroll" style={{height:'100%',overflowY:'auto',WebkitOverflowScrolling:'touch',
            backgroundImage: t.texture ? 'var(--linen)' : 'none'}}>
            <Hero t={t}/>
            <Story t={t}/>
            <Flavor t={t}/>
            <Freshness t={t}/>
            <Offer t={t} specId={specId} setSpecId={setSpecId} qty={qty} setQty={setQty}/>
            <div style={{height:96,background:'var(--paper-2)'}}></div>
          </div>
          <BottomBar total={total} fav={fav} setFav={setFav} onOrder={()=>setSheet(true)} accent={t.accent}/>
          <Sheet open={sheet} onClose={()=>setSheet(false)} specId={specId} setSpecId={setSpecId}
            qty={qty} setQty={setQty} accent={t.accent}/>
        </div>
      </IOSDevice>

      <TweaksPanel>
        <TweakSection label="外观"/>
        <TweakColor label="主色调" value={t.accent}
          options={['#a72f35','#7e242c','#b5402f','#9c4a55','#8a5a2b']}
          onChange={(v)=>setTweak('accent',v)}/>
        <TweakRadio label="标题字体" value={t.headingFont}
          options={['宋体','毛笔']} onChange={(v)=>setTweak('headingFont',v)}/>
        <TweakToggle label="纸纹底纹" value={t.texture} onChange={(v)=>setTweak('texture',v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
