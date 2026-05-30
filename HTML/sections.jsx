/* 余姚杨梅 · 页面分区  —  sections.jsx */
const { useState:useStateS } = React;

const HARVEST = new Date('2026-06-08T06:00:00').getTime();

/* ----------------------------------------------------------- HERO */
function Hero({ t }){
  const cd = useCountdown(HARVEST);
  const headFont = t.headingFont==='毛笔' ? 'var(--brush)' : 'var(--serif)';
  return (
    <header style={{position:'relative', background:'var(--paper)'}}>
      {/* brand row */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'62px 22px 0', position:'relative', zIndex:3}}>
        <div style={{display:'flex',alignItems:'baseline',gap:7,whiteSpace:'nowrap'}}>
          <span style={{fontFamily:'var(--serif)',fontWeight:700,fontSize:16,letterSpacing:'.04em',color:'var(--berry-deep)'}}>余姚杨梅</span>
          <span style={{fontSize:10,color:'var(--ink-faint)',letterSpacing:'.2em'}}>YUYAO BAYBERRY</span>
        </div>
      </div>

      {/* headline on linen */}
      <div style={{padding:'26px 24px 22px', position:'relative', zIndex:3}}>
        <Eyebrow accent={t.accent}>中国地理标志产品</Eyebrow>
        <h1 style={{margin:0, fontFamily:headFont, fontWeight:700,
          fontSize: t.headingFont==='毛笔'?56:46, lineHeight:1.04, color:'var(--ink)',
          letterSpacing: t.headingFont==='毛笔'?'.04em':'.02em'}}>
          一口爆汁<br/>甜透盛夏
        </h1>
        <p style={{margin:'16px 0 0', fontSize:13.5, lineHeight:1.7, color:'var(--ink-soft)', maxWidth:300}}>
          生长于四明山麓的云雾仙境，颗颗紫红如玉，<br/>果肉厚实如凝脂，轻咬即迸发蜜糖般的汁水。
        </p>
      </div>

      {/* full-bleed illustration */}
      <div style={{position:'relative', height:236, overflow:'hidden'}}>
        <img src="assets/img-branch.jpg" alt="枝头杨梅" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,var(--paper) 0%,transparent 16%,transparent 72%,rgba(20,24,20,.42) 100%)'}}></div>
        {/* season ribbon over image */}
        <div style={{position:'absolute',left:14,right:14,bottom:14,display:'flex',alignItems:'center',
          justifyContent:'space-between',gap:10,padding:'11px 14px',borderRadius:16,
          background:'rgba(28,26,22,.34)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',
          border:'1px solid rgba(255,255,255,.18)'}}>
          <div style={{display:'flex',alignItems:'center',gap:9,color:'#fff'}}>
            <Ico.clock s={18} c="#fff"/>
            <div style={{lineHeight:1.15}}>
              <div style={{fontSize:12.5,fontWeight:600}}>2026 头茬 · 6月鲜采</div>
              <div style={{fontSize:10.5,opacity:.8}}>每年仅采摘黄金 20 天</div>
            </div>
          </div>
          <div style={{textAlign:'right',color:'#fff'}}>
            <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:600,lineHeight:1,fontVariantNumeric:'tabular-nums'}}>
              {cd.days}<span style={{fontSize:11,fontWeight:400,opacity:.8}}> 天 </span>
              {cd.h}:{cd.m}:{cd.s}
            </div>
            <div style={{fontSize:10,opacity:.8,letterSpacing:'.1em'}}>距头茬开摘</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------- STORY */
function Story({ t }){
  const terroir=[
    { ic:'leaf',  k:'红黄壤',   v:'富含矿物 微酸沃土' },
    { ic:'drop',  k:'充沛雨露', v:'年均 1500mm 滋养' },
    { ic:'sun',   k:'昼夜温差', v:'糖分悄然积淀' },
  ];
  return (
    <section style={{padding:'34px 24px 30px', background:'var(--paper)'}}>
      <Eyebrow accent={t.accent}>产地 · 四明山麓</Eyebrow>
      <h2 style={{margin:'0 0 14px', fontFamily:'var(--serif)', fontWeight:600, fontSize:25, lineHeight:1.3, color:'var(--ink)'}}>
        云雾仙境里<br/>养出的紫红如玉
      </h2>
      <p style={{margin:'0 0 22px', fontSize:13, lineHeight:1.85, color:'var(--ink-soft)'}}>
        这里独特的红黄壤、充沛雨露与昼夜温差，孕育出颗颗饱满的杨梅。甜酸比完美平衡，尾调带着山野清香——是江南夏天最先到来的味道。
      </p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {terroir.map((x,i)=>(
          <div key={i} style={{background:'var(--paper-2)',border:'1px solid var(--line)',borderRadius:14,
            padding:'14px 10px',textAlign:'center'}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:8,color:t.accent}}>{Ico[x.ic]({s:21,c:t.accent})}</div>
            <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',marginBottom:3}}>{x.k}</div>
            <div style={{fontSize:10,lineHeight:1.4,color:'var(--ink-faint)'}}>{x.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- FLAVOR */
function Flavor({ t }){
  const feats=[
    { t:'紫红如玉', d:'果色浓艳通透，颗颗如缀枝玛瑙' },
    { t:'厚实如凝脂', d:'果肉饱满柔糯，汁囊一咬即破' },
    { t:'甜酸平衡', d:'蜜甜里带俏皮酸，甜而不腻' },
    { t:'山野清香', d:'尾调悠长，是雨后山林的气息' },
  ];
  return (
    <section style={{background:'var(--paper-2)', paddingBottom:0}}>
      <div style={{padding:'34px 24px 22px'}}>
        <Eyebrow accent={t.accent}>风味 · 入口的瞬间</Eyebrow>
        <h2 style={{margin:0, fontFamily:'var(--serif)', fontWeight:600, fontSize:25, lineHeight:1.3, color:'var(--ink)'}}>
          轻咬即迸发的<br/>蜜糖般汁水
        </h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:1,background:'var(--line)',borderTop:'1px solid var(--line)',borderBottom:'1px solid var(--line)'}}>
        {feats.map((f,i)=>(
          <div key={i} style={{background:'var(--paper)',padding:'20px 18px'}}>
            <div style={{fontFamily:'var(--serif)',fontSize:18,fontWeight:600,color:'var(--berry)',marginBottom:6,
              display:'flex',alignItems:'baseline',gap:7}}>
              <span style={{fontSize:11,color:'var(--ink-faint)',fontFamily:'var(--sans)'}}>0{i+1}</span>{f.t}
            </div>
            <div style={{fontSize:11.5,lineHeight:1.65,color:'var(--ink-soft)'}}>{f.d}</div>
          </div>
        ))}
      </div>
      {/* quote band over butterfly image */}
      <div style={{position:'relative',height:188,overflow:'hidden'}}>
        <img src="assets/img-butterfly.jpg" alt="夏日杨梅" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(244,239,228,.92) 0%,rgba(244,239,228,.5) 42%,transparent 70%)'}}></div>
        <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 24px'}}>
          <div style={{fontFamily:'var(--serif)',fontSize:26,fontWeight:700,lineHeight:1.3,color:'var(--ink)'}}>
            酸得俏皮<br/>甜而不腻
          </div>
          <div style={{marginTop:8,fontSize:11,color:'var(--ink-soft)',letterSpacing:'.1em'}}>—— 这一口，是上头的“梅”味</div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- FRESHNESS */
function Freshness({ t }){
  const steps=[
    { ic:'clock', k:'黄金 20 天', d:'每年仅 6 月限时采摘' },
    { ic:'leaf',  k:'古法种植', d:'拒绝催熟，自然成熟' },
    { ic:'hand',  k:'清晨手挑', d:'果农露水未干时手工挑选' },
    { ic:'truck', k:'冷链直达', d:'锁鲜空运，尝枝头新鲜' },
  ];
  return (
    <section style={{padding:'36px 24px 32px',background:'var(--paper)'}}>
      <Eyebrow accent={t.accent}>溯源 · 产地直采</Eyebrow>
      <h2 style={{margin:'0 0 24px', fontFamily:'var(--serif)', fontWeight:600, fontSize:25, lineHeight:1.3, color:'var(--ink)'}}>
        从枝头到舌尖<br/>只走最短的路
      </h2>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute',left:19,top:14,bottom:14,width:2,background:'var(--line)'}}></div>
        {steps.map((s,i)=>(
          <div key={i} style={{display:'flex',gap:16,alignItems:'flex-start',marginBottom:i<3?22:0,position:'relative'}}>
            <div style={{width:40,height:40,borderRadius:'50%',flexShrink:0,background:'var(--paper-2)',
              border:'1px solid var(--line)',display:'flex',alignItems:'center',justifyContent:'center',
              color:t.accent,position:'relative',zIndex:1}}>{Ico[s.ic]({s:19,c:t.accent})}</div>
            <div style={{paddingTop:3}}>
              <div style={{fontSize:14.5,fontWeight:600,color:'var(--ink)',marginBottom:3}}>{s.k}</div>
              <div style={{fontSize:12,lineHeight:1.55,color:'var(--ink-soft)'}}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Story, Flavor, Freshness, HARVEST });
