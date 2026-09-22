import { FlowerMark } from './FlowerMark';

/** Recognizable garden motifs, including an oversized flower at the edge. */
export function GardenFlower({kind = 'daisy', className = ''}) {
  return <svg className={className} viewBox="0 0 100 110" aria-hidden="true">
    {kind === 'tulip' ? <>
      <path d="M50 57V100M50 91Q17 91 19 69Q43 70 50 91M50 82Q76 82 80 62Q57 63 50 82" fill="#57a777" stroke="#32845c" strokeWidth="3"/>
      <path d="M24 18L40 31L50 12L61 31L77 18V43Q76 68 50 69Q23 65 24 43Z" fill="#f16b88"/>
    </> : <>
      {Array.from({length:kind === 'daisy'?10:8},(_,i)=><ellipse key={i} cx="50" cy="27" rx={kind==='daisy'?8:12} ry="21" transform={`rotate(${i*(kind==='daisy'?36:45)} 50 50)`} fill={kind==='daisy'?'#f5be2b':'#a68bce'}/>)}
      <circle cx="50" cy="50" r="15" fill={kind==='daisy'?'#b86d31':'#ffd439'}/>
      <circle cx="45" cy="46" r="3" fill="#fff8d7"/>
    </>}
  </svg>;
}
export function FlowerGraphics({variant = 0}) {
  return <div className={`flower-graphics graphics-${variant}`} aria-hidden="true">
    <span className="oversized-flower-crop"><FlowerMark color="#f4a0bb"/></span>
    <GardenFlower className="garden-flower" kind={variant % 2 ? 'tulip' : 'daisy'}/>
    <GardenFlower className="garden-flower" kind={variant % 2 ? 'daisy' : 'cosmos'}/>
  </div>;
}
export function DeliveryDoodle() {
  return <svg className="delivery-doodle" viewBox="0 0 240 125" aria-hidden="true">
    <path d="M27 91V41Q27 32 37 32H131V91ZM131 52H174L204 76V91H131" fill="#ffd439" stroke="#073347" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M143 60H169L186 75H143Z" fill="#80d1cd"/>
    <circle cx="61" cy="93" r="15" fill="#073347"/><circle cx="173" cy="93" r="15" fill="#073347"/>
    <circle cx="61" cy="93" r="6" fill="#fff9e9"/><circle cx="173" cy="93" r="6" fill="#fff9e9"/>
    <path d="M12 57H2M14 72H5" stroke="#ef4a83" strokeWidth="4" strokeLinecap="round"/>
    <g transform="translate(60 4) scale(.55)">
      {[0,72,144,216,288].map(a=><ellipse key={a} cx="50" cy="28" rx="14" ry="24" fill="#ef4a83" transform={`rotate(${a} 50 50)`}/>)}
      <circle cx="50" cy="50" r="9" fill="#fff9e9"/>
    </g>
  </svg>;
}
