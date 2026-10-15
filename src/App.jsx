import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Search, ShieldCheck, Leaf, Users, Truck, Pill, Droplet, Syringe, Menu, X, Plus, Pencil, Trash2, HeartPulse } from 'lucide-react'
import { BRAND } from './config/brand'
import { getMedicines, createMedicine, updateMedicine, deleteMedicine } from './api/medicines'

function Logo() {
  return <Link className="brand" to="/" aria-label={`${BRAND.name} home`}>
    {BRAND.logoUrl ? <img className="brand-img" src={BRAND.logoUrl} alt={`${BRAND.name} logo`} /> : <span className="brand-mark"><Plus size={29} strokeWidth={4} /></span>}
    <span><strong>{BRAND.name}</strong><small>{BRAND.tagline}</small></span>
  </Link>
}
function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])
  return <header className="site-header"><div className="nav-wrap">
    <Logo />
    <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      <NavLink to="/" end>Home</NavLink><NavLink to="/medicines">Medicines</NavLink><NavLink to="/about">About Us</NavLink><NavLink to="/contact">Contact Us</NavLink>
    </nav>
    <Link className="btn btn-green nav-cta" to="/contact">Enquire Now</Link>
  </div></header>
}
function Footer() {
  return <footer><div className="footer-inner"><Logo/><p>Quality medicines. Healthier communities.</p><span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span></div></footer>
}
function MedicineCard({ medicine }) {
  const icon = medicine.category?.toLowerCase().includes('syrup') ? <Droplet/> : medicine.category?.toLowerCase().includes('injection') ? <Syringe/> : <Pill/>
  return <article className="medicine-card"><div className="medicine-visual">{icon}</div><div className="medicine-info"><span className="category-tag">{medicine.category || 'General'}</span><h3>{medicine.name}</h3><p>{medicine.description}</p><div className="medicine-bottom"><strong>₹{Number(medicine.price).toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong><span className="catalog-note">Catalogue price</span></div></div></article>
}
function MedicineGrid({ medicines }) {
  if (!medicines.length) return <div className="empty-state"><Pill size={34}/><h3>No medicines found</h3><p>Try another search term or check back later.</p></div>
  return <div className="medicine-grid">{medicines.map(m => <MedicineCard key={m.id} medicine={m}/>)}</div>
}
function Home() {
  const [medicines, setMedicines] = useState([])
  useEffect(() => { getMedicines().then(data => setMedicines(data.slice(0, 4))).catch(() => {}) }, [])
  const features = [
    { icon: <ShieldCheck/>, title: 'High Quality Medicines', text: 'Quality-focused products and responsible care.' },
    { icon: <Leaf/>, title: 'Safe & Trusted Solutions', text: 'Committed to safety and continuous improvement.' },
    { icon: <Users/>, title: 'Care for Communities', text: 'Working toward a healthier world.' },
    { icon: <Truck/>, title: 'Pan India Availability', text: 'Supporting distribution across India.' }
  ]
  const categories = [
    { name: 'Tablets', text: 'Reliable tablet formulations', icon: <Pill/>, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80' },
    { name: 'Capsules', text: 'Convenient capsule dosage forms', icon: <Pill/>, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80' },
    { name: 'Syrups', text: 'Liquid formulations for varied needs', icon: <Droplet/>, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80' },
    { name: 'Injections', text: 'Sterile products for clinical settings', icon: <Syringe/>, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80' }
  ]
  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow"><i/> YOUR HEALTH, OUR PRIORITY</span><h1>Better Healthcare<br/>for a <em>Brighter</em><br/>Tomorrow</h1><p>Quality medicines for a healthier and happier world.</p><div className="hero-actions"><Link className="btn btn-green" to="/medicines">Explore Medicines <ArrowRight size={18}/></Link><Link className="btn btn-outline" to="/about">About Us</Link></div></div><div className="hero-art" role="img" aria-label="Healthcare and pharmaceutical research"><div className="art-glow"/><img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=85" alt="Pharmaceutical capsules and healthcare products"/></div></section>
    <section className="features container">{features.map((f,i)=><div className="feature" key={f.title}><div className={`feature-icon tone-${i}`}>{f.icon}</div><div><h3>{f.title}</h3><p>{f.text}</p></div></div>)}</section>
    <section className="section container"><div className="section-heading"><div><span className="eyebrow"><i/> OUR PRODUCTS</span><h2>Wide Range of Pharmaceutical Products</h2><p>Explore product information across a range of healthcare needs.</p></div><Link className="btn btn-outline blue-outline" to="/medicines">View All Medicines <ArrowRight size={17}/></Link></div>
      <div className="category-grid">{categories.map(c=><Link to={`/medicines?category=${c.name}`} className="category-card" key={c.name}><img src={c.image} alt={c.name}/><div className="category-content"><span className="category-icon">{c.icon}</span><div><h3>{c.name}</h3><p>{c.text}</p></div></div></Link>)}</div>
    </section>
    <section className="section container featured-list"><div className="section-heading"><div><span className="eyebrow"><i/> FEATURED CATALOGUE</span><h2>Medicine catalogue</h2><p>Browse a selection of products in our database.</p></div><Link className="text-link" to="/medicines">Browse all <ArrowRight size={16}/></Link></div><MedicineGrid medicines={medicines}/></section>
    <section className="cta-band container"><div><span className="eyebrow">LET'S WORK TOGETHER</span><h2>Looking for product information?</h2><p>Get in touch with our team for catalogue and business enquiries.</p></div><Link className="btn btn-green" to="/contact">Contact Us <ArrowRight size={18}/></Link></section>
  </>
}
function MedicinesPage() {
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState(new URLSearchParams(window.location.search).get('search') || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true; setLoading(true); setError('')
    const timer = setTimeout(() => getMedicines(search).then(data => { if(active) setMedicines(data) }).catch(() => { if(active) setError('Could not connect to the medicine catalogue. Please start the Spring Boot backend.') }).finally(() => { if(active) setLoading(false) }), 180)
    return () => { active = false; clearTimeout(timer) }
  }, [search])
  return <main className="page-main container"><div className="page-title"><span className="eyebrow"><i/> OUR CATALOGUE</span><h1>Medicines</h1><p>Search our product catalogue by medicine name, category, or description.</p></div><div className="search-bar"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search medicines, products..." aria-label="Search medicines"/>{search && <button onClick={()=>setSearch('')}>Clear</button>}</div>{error && <div className="notice error">{error}</div>}{loading ? <p className="loading">Loading medicines…</p> : <MedicineGrid medicines={medicines}/>}</main>
}
function AboutPage() {
  return <main className="page-main container"><div className="about-layout"><div><span className="eyebrow"><i/> ABOUT {BRAND.name.toUpperCase()}</span><h1>Care for a healthier tomorrow.</h1><p className="lead">We believe dependable healthcare starts with quality-focused products, responsible information, and strong partnerships.</p><p>{BRAND.name} is a pharmaceutical company website starter designed to present your product catalogue clearly to healthcare professionals, distributors, and business partners.</p><Link className="btn btn-green" to="/medicines">Explore Medicines <ArrowRight size={18}/></Link></div><div className="about-panel"><HeartPulse size={54}/><h2>Quality. Trust. Care.</h2><p>Replace this starter copy with your company's verified story, certifications, manufacturing details, and quality commitments.</p></div></div></main>
}
function ContactPage() {
  const [sent, setSent] = useState(false)
  return <main className="page-main container"><div className="page-title"><span className="eyebrow"><i/> GET IN TOUCH</span><h1>Contact Us</h1><p>Contact our team for product catalogue and business enquiries.</p></div><div className="contact-layout"><div className="contact-card"><h2>We'd love to hear from you</h2><p>Use the form to prepare an enquiry. Connect it to your email or CRM before going live.</p><p><strong>Email</strong><br/>{BRAND.email}</p><p><strong>Phone</strong><br/>{BRAND.phone}</p><p><strong>Location</strong><br/>{BRAND.address}</p></div><form className="contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Your name<input required placeholder="Full name"/></label><label>Email address<input type="email" required placeholder="you@company.com"/></label><label>Subject<input required placeholder="Product or business enquiry"/></label><label>Message<textarea required rows="5" placeholder="How can we help?"/></label><button className="btn btn-green" type="submit">Prepare Enquiry <ArrowRight size={18}/></button>{sent && <p className="success-text">Thanks! This demo form is not connected to email yet. Connect a backend mail service to receive enquiries.</p>}</form></div></main>
}
const emptyForm = { name: '', description: '', price: '', category: 'Tablets' }
function AdminPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [refresh, setRefresh] = useState(0)
  useEffect(()=>{getMedicines().then(setItems).catch(()=>setError('Cannot load data. Is the backend running?'))},[refresh])
  const change = e => setForm({...form, [e.target.name]:e.target.value})
  const submit = async e => {
    e.preventDefault(); setError('')
    try {
      const payload = {...form, price: Number(form.price)}
      if (!payload.name.trim() || !payload.description.trim() || !Number.isFinite(payload.price) || payload.price < 0) throw new Error('Enter a name, description, and valid non-negative price.')
      if(editing) await updateMedicine(editing,payload); else await createMedicine(payload)
      setForm(emptyForm); setEditing(null); setRefresh(v=>v+1)
    } catch(err) { setError(err.message || 'Could not save medicine.') }
  }
  const edit = m => { setEditing(m.id); setForm({name:m.name,description:m.description,price:String(m.price),category:m.category || 'General'}); window.scrollTo({top:0,behavior:'smooth'}) }
  const remove = async id => { if(!window.confirm('Delete this medicine?')) return; try { await deleteMedicine(id); setRefresh(v=>v+1) } catch(err) {setError(err.message || 'Delete failed.')} }
  return <main className="page-main container admin-page"><div className="page-title"><span className="eyebrow"><i/> CATALOGUE MANAGEMENT</span><h1>Admin panel</h1><p>Create, view, update, and delete medicine records.</p></div><div className="admin-warning"><ShieldCheck size={19}/> Demo admin panel: add authentication and role-based authorization before production deployment.</div>{error && <div className="notice error">{error}</div>}<div className="admin-layout"><form className="admin-form" onSubmit={submit}><h2>{editing ? 'Edit medicine' : 'Add a medicine'}</h2><label>Medicine name<input name="name" value={form.name} onChange={change} required placeholder="e.g. Vitamin C Capsules"/></label><label>Description<textarea name="description" value={form.description} onChange={change} required rows="4" placeholder="Product description"/></label><label>Price (INR)<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={change} required placeholder="120.00"/></label><label>Category<select name="category" value={form.category} onChange={change}><option>Tablets</option><option>Capsules</option><option>Syrups</option><option>Injections</option><option>General</option></select></label><div className="form-actions"><button className="btn btn-green" type="submit">{editing ? 'Save changes' : 'Add medicine'}</button>{editing && <button className="btn btn-outline" type="button" onClick={()=>{setEditing(null);setForm(emptyForm)}}>Cancel</button>}</div></form><section className="admin-table-wrap"><div className="admin-table-heading"><h2>All medicines</h2><span>{items.length} products</span></div>{items.length===0 ? <p className="loading">No medicines available yet.</p> : <div className="table-scroll"><table><thead><tr><th>Medicine</th><th>Price</th><th>Actions</th></tr></thead><tbody>{items.map(m=><tr key={m.id}><td><strong>{m.name}</strong><small>{m.category}</small></td><td>₹{Number(m.price).toFixed(2)}</td><td><div className="row-actions"><button title="Edit" aria-label={`Edit ${m.name}`} onClick={()=>edit(m)}><Pencil size={16}/></button><button className="delete-action" title="Delete" aria-label={`Delete ${m.name}`} onClick={()=>remove(m.id)}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div>}</section></div></main>
}
export default function App() {
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/medicines" element={<MedicinesPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/contact" element={<ContactPage/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="*" element={<Home/>}/></Routes><Footer/></>
}
