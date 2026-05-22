import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Menu, X, ShoppingCart, ShieldCheck, Truck, Trees, Hammer, Star, Trash2, Edit, Plus, LogOut } from 'lucide-react';
import { api } from './api';
import './styles.css';

const fallbackProducts = [
  { id: 1, name: 'Modern Teak Dining Table', category: 'Furniture', price: 85000, image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80', description: 'Premium teak dining table for family homes.', stock: 8 },
  { id: 2, name: 'Luxury Wooden Sofa Set', category: 'Furniture', price: 145000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80', description: 'Modern wooden sofa set with comfortable finishing.', stock: 5 },
  { id: 3, name: 'Office Wooden Desk', category: 'Furniture', price: 42000, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80', description: 'Strong office desk for study and work.', stock: 12 }
];

const fallbackTimber = [
  { id: 1, wood_type: 'Teak', size: '2 x 4 inch', unit: 'Per feet', price: 950, availability: 'Available' },
  { id: 2, wood_type: 'Mahogany', size: '2 x 4 inch', unit: 'Per feet', price: 720, availability: 'Available' },
  { id: 3, wood_type: 'Jack Wood', size: '2 x 4 inch', unit: 'Per feet', price: 580, availability: 'Available' }
];

function money(n) { return `Rs. ${Number(n).toLocaleString('en-LK')}`; }

function App() {
  const [mobile, setMobile] = useState(false);
  const [products, setProducts] = useState([]);
  const [timber, setTimber] = useState([]);
  const [cart, setCart] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  async function loadData() {
    try {
      const [p, t] = await Promise.all([api('/products'), api('/timber-prices')]);
      setProducts(p); setTimber(t);
    } catch {
      setProducts(fallbackProducts); setTimber(fallbackTimber);
    }
  }

  useEffect(() => { loadData(); }, []);

  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0), [cart]);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  }

  return <>
    <nav className="nav glass">
      <div className="brand"><span className="logo">ST</span><div><b>Saw Timba</b><small>Furniture & Timber</small></div></div>
      <button className="menuBtn" onClick={() => setMobile(!mobile)}>{mobile ? <X/> : <Menu/>}</button>
      <div className={`links ${mobile ? 'open' : ''}`}>
        <a href="#home">Home</a><a href="#products">Furniture</a><a href="#prices">Saw Prices</a><a href="#services">Services</a><a href="#cart">Cart ({cart.length})</a>
        <button className="adminBtn" onClick={() => setShowAdmin(true)}>Admin</button>
      </div>
    </nav>

    <section id="home" className="hero">
      <div className="heroText reveal">
        <p className="tag"><Trees size={18}/> Premium Sri Lankan timber works</p>
        <h1>Build your dream home with modern wooden furniture.</h1>
        <p>Control furniture, timber prices, orders, and business details from one beautiful admin dashboard.</p>
        <div className="heroActions"><a className="primary" href="#products">Shop Furniture</a><a className="secondary" href="#prices">View Saw Prices</a></div>
      </div>
      <div className="heroCard reveal"><div className="floatBadge"><Star/> Trusted Quality</div><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"/><div className="stats"><span><b>25+</b> Designs</span><span><b>100%</b> Wood Finish</span></div></div>
    </section>

    <section className="features">
      <Feature icon={<ShieldCheck/>} title="Quality Checked" text="Strong timber and clean finishing." />
      <Feature icon={<Hammer/>} title="Custom Work" text="Tables, beds, doors, cabinets, and more." />
      <Feature icon={<Truck/>} title="Delivery" text="Order online and contact for delivery." />
    </section>

    <section id="products" className="section">
      <div className="sectionHead"><p>Furniture</p><h2>Modern Wooden Products</h2></div>
      <div className="grid products">{products.map(p => <ProductCard key={p.id} p={p} addToCart={addToCart}/>)}</div>
    </section>

    <section id="prices" className="section priceSection">
      <div className="sectionHead"><p>Saw Prices</p><h2>Timber Price List</h2></div>
      <div className="tableWrap"><table><thead><tr><th>Wood Type</th><th>Size</th><th>Unit</th><th>Price</th><th>Status</th></tr></thead><tbody>{timber.map(t => <tr key={t.id}><td>{t.wood_type}</td><td>{t.size}</td><td>{t.unit}</td><td>{money(t.price)}</td><td><span className="pill">{t.availability}</span></td></tr>)}</tbody></table></div>
    </section>

    <section id="services" className="section services"><div className="sectionHead"><p>Services</p><h2>What We Do</h2></div><div className="grid"><Service title="Furniture Making"/><Service title="Timber Cutting"/><Service title="Polishing & Repair"/><Service title="Custom Orders"/></div></section>

    <section id="cart" className="section cart"><div className="sectionHead"><p>Order</p><h2>Your Cart</h2></div><Cart cart={cart} setCart={setCart} total={total}/></section>

    <footer>© 2026 Saw Timba Company. Designed for modern timber business.</footer>
    {showAdmin && <AdminPanel close={() => setShowAdmin(false)} admin={admin} setAdmin={setAdmin} products={products} timber={timber} reload={loadData}/>} 
  </>;
}

function Feature({icon,title,text}) { return <div className="feature reveal">{icon}<h3>{title}</h3><p>{text}</p></div>; }
function Service({title}) { return <div className="service"><h3>{title}</h3><p>Professional service with clean finishing and reliable material quality.</p></div>; }
function ProductCard({p, addToCart}) { return <div className="card productCard reveal"><img src={p.image}/><div className="cardBody"><span>{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><div className="productBottom"><b>{money(p.price)}</b><button onClick={() => addToCart(p)}><ShoppingCart size={18}/> Add</button></div></div></div>; }

function Cart({cart,setCart,total}) {
  const [form,setForm] = useState({ customer_name:'', phone:'', address:'' });
  async function order() {
    if (!cart.length) return alert('Cart is empty');
    if (!form.customer_name || !form.phone || !form.address) return alert('Fill customer details');
    try { await api('/orders', { method:'POST', body: JSON.stringify({ ...form, items: cart, total }) }); alert('Order placed successfully'); setCart([]); setForm({customer_name:'',phone:'',address:''}); }
    catch { alert('Backend not connected. Start backend server first.'); }
  }
  return <div className="cartBox glass"><div>{cart.length ? cart.map(i => <div className="cartItem" key={i.id}><span>{i.name} x {i.qty}</span><b>{money(i.price*i.qty)}</b><button onClick={() => setCart(cart.filter(c => c.id !== i.id))}><Trash2 size={16}/></button></div>) : <p>No items yet.</p>}<h3>Total: {money(total)}</h3></div><div className="form"><input placeholder="Customer name" value={form.customer_name} onChange={e=>setForm({...form,customer_name:e.target.value})}/><input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/><textarea placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/><button className="primary" onClick={order}>Place Order</button></div></div>;
}

function AdminPanel({close,admin,setAdmin,products,timber,reload}) {
  const [login,setLogin] = useState({email:'admin@sawtimba.lk',password:'admin123'});
  const [product,setProduct] = useState({name:'',category:'Furniture',price:'',image:'',description:'',stock:1,is_featured:0});
  const [wood,setWood] = useState({wood_type:'',size:'',unit:'Per feet',price:'',availability:'Available'});

  async function doLogin(){ try { const r = await api('/login',{method:'POST',body:JSON.stringify(login)}); setAdmin(r.admin); } catch(e){ alert(e.message); } }
  async function saveProduct(){ await api('/products',{method:'POST',body:JSON.stringify(product)}); setProduct({name:'',category:'Furniture',price:'',image:'',description:'',stock:1,is_featured:0}); reload(); }
  async function saveWood(){ await api('/timber-prices',{method:'POST',body:JSON.stringify(wood)}); setWood({wood_type:'',size:'',unit:'Per feet',price:'',availability:'Available'}); reload(); }
  async function delProduct(id){ await api(`/products/${id}`,{method:'DELETE'}); reload(); }
  async function delWood(id){ await api(`/timber-prices/${id}`,{method:'DELETE'}); reload(); }

  return <div className="modal"><div className="adminPanel"><button className="close" onClick={close}><X/></button>{!admin ? <div className="loginBox"><h2>Admin Login</h2><input value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/><input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/><button className="primary" onClick={doLogin}>Login</button></div> : <div><div className="adminTop"><h2>Admin Dashboard</h2><button onClick={()=>setAdmin(null)}><LogOut size={16}/> Logout</button></div><div className="adminGrid"><div className="adminCard"><h3><Plus/> Add Furniture</h3><input placeholder="Name" value={product.name} onChange={e=>setProduct({...product,name:e.target.value})}/><input placeholder="Category" value={product.category} onChange={e=>setProduct({...product,category:e.target.value})}/><input placeholder="Price" value={product.price} onChange={e=>setProduct({...product,price:e.target.value})}/><input placeholder="Image URL" value={product.image} onChange={e=>setProduct({...product,image:e.target.value})}/><textarea placeholder="Description" value={product.description} onChange={e=>setProduct({...product,description:e.target.value})}/><button onClick={saveProduct}>Save Product</button></div><div className="adminCard"><h3><Plus/> Add Saw Price</h3><input placeholder="Wood type" value={wood.wood_type} onChange={e=>setWood({...wood,wood_type:e.target.value})}/><input placeholder="Size" value={wood.size} onChange={e=>setWood({...wood,size:e.target.value})}/><input placeholder="Unit" value={wood.unit} onChange={e=>setWood({...wood,unit:e.target.value})}/><input placeholder="Price" value={wood.price} onChange={e=>setWood({...wood,price:e.target.value})}/><input placeholder="Availability" value={wood.availability} onChange={e=>setWood({...wood,availability:e.target.value})}/><button onClick={saveWood}>Save Price</button></div></div><h3>Manage Products</h3>{products.map(p=><div className="adminRow" key={p.id}><span>{p.name}</span><b>{money(p.price)}</b><button onClick={()=>delProduct(p.id)}><Trash2 size={16}/></button></div>)}<h3>Manage Timber Prices</h3>{timber.map(t=><div className="adminRow" key={t.id}><span>{t.wood_type} - {t.size}</span><b>{money(t.price)}</b><button onClick={()=>delWood(t.id)}><Trash2 size={16}/></button></div>)}</div>}</div></div>;
}

createRoot(document.getElementById('root')).render(<App />);
