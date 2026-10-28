'use strict';

const PRODUCT = { id: 'aura-pro', name: 'Aura Pro Wireless Headphones', price: 4999, mrp: 7999 };
const FREE_SHIPPING_MIN = 999, SHIPPING_FEE = 99, MAX_QTY = 10;
const $ = id => document.getElementById(id);
const money = n => '₹' + n.toLocaleString('en-IN');

/* ---------- State (cart persisted in localStorage) ---------- */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('voltCart')) || []; } catch (_) { cart = []; }
const save = () => { try { localStorage.setItem('voltCart', JSON.stringify(cart)); } catch (_) {} };

/* ---------- Gallery ---------- */
const stageUse = $('stageUse');
document.querySelectorAll('.thumb').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.thumb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  stageUse.setAttribute('href', '#' + btn.dataset.view);
}));

/* ---------- Colour ---------- */
function currentColor() { return document.querySelector('input[name="color"]:checked'); }
document.querySelectorAll('input[name="color"]').forEach(r => r.addEventListener('change', () => {
  document.documentElement.style.setProperty('--hp', r.dataset.hex);
  $('colorName').textContent = r.value;
}));

/* ---------- Quantity ---------- */
const qty = $('qty');
const clamp = v => Math.min(MAX_QTY, Math.max(1, parseInt(v, 10) || 1));
$('qMinus').addEventListener('click', () => qty.value = clamp(qty.value - 1));
$('qPlus').addEventListener('click', () => qty.value = clamp(+qty.value + 1));
qty.addEventListener('change', () => qty.value = clamp(qty.value));

/* ---------- Wishlist ---------- */
$('wishBtn').addEventListener('click', e => {
  const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
  e.currentTarget.setAttribute('aria-pressed', on);
  e.currentTarget.textContent = on ? '♥' : '♡';
  toast(on ? 'Added to wishlist' : 'Removed from wishlist');
});

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------- Cart logic ---------- */
function addToCart(openAfter) {
  const c = currentColor();
  const n = clamp(qty.value);
  const existing = cart.find(i => i.color === c.value);
  if (existing) existing.qty = Math.min(MAX_QTY, existing.qty + n);
  else cart.push({ color: c.value, hex: c.dataset.hex, qty: n });
  save(); render();
  const badge = $('cartCount');
  badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump');
  openAfter ? openCart() : toast(`Added ${n} × ${c.value} to cart`);
}
function change(color, delta) {
  const item = cart.find(i => i.color === color);
  if (!item) return;
  item.qty = Math.min(MAX_QTY, item.qty + delta);
  if (item.qty < 1) cart = cart.filter(i => i !== item);
  save(); render();
}
function remove(color) { cart = cart.filter(i => i.color !== color); save(); render(); }

function render() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = count * PRODUCT.price;
  const shipping = count === 0 || subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FEE;
  $('cartCount').textContent = count;
  $('cartEmpty').hidden = count > 0;
  $('cartFoot').hidden = count === 0;
  $('subtotal').textContent = money(subtotal);
  $('shipping').textContent = shipping ? money(shipping) : 'Free';
  $('total').textContent = money(subtotal + shipping);

  $('cartList').innerHTML = cart.map(i => `
    <li class="cart-item" style="--hp:${i.hex}">
      <div class="pic"><svg viewBox="0 0 400 400" aria-hidden="true"><use href="#v1"/></svg></div>
      <div>
        <h3>${PRODUCT.name}</h3>
        <small>Colour: ${i.color}</small><br>
        <div class="mini-qty">
          <button data-act="dec" data-color="${i.color}" aria-label="Decrease quantity">−</button>
          <span>${i.qty}</span>
          <button data-act="inc" data-color="${i.color}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="right">
        <b>${money(i.qty * PRODUCT.price)}</b>
        <button class="remove" data-act="rm" data-color="${i.color}">Remove</button>
      </div>
    </li>`).join('');
}
$('cartList').addEventListener('click', e => {
  const b = e.target.closest('button[data-act]');
  if (!b) return;
  const { act, color } = b.dataset;
  if (act === 'inc') change(color, 1);
  if (act === 'dec') change(color, -1);
  if (act === 'rm') remove(color);
});
$('addBtn').addEventListener('click', () => addToCart(false));
$('buyNow').addEventListener('click', () => addToCart(true));
$('clearCart').addEventListener('click', () => { cart = []; save(); render(); });
$('checkout').addEventListener('click', () => toast('Demo only: checkout is not connected'));

/* ---------- Drawer ---------- */
const drawer = $('drawer'), overlay = $('overlay');
function openCart() {
  drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); overlay.hidden = false;
  $('closeCart').focus();
}
function closeCart() {
  drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); overlay.hidden = true;
  $('openCart').focus();
}
$('openCart').addEventListener('click', openCart);
$('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) closeCart(); });

/* ---------- Pincode check ---------- */
function checkPin() {
  const v = $('pin').value.trim(), msg = $('pinMsg');
  if (!/^[1-9]\d{5}$/.test(v)) { msg.className = 'pin-msg bad'; msg.textContent = 'Enter a valid 6-digit pincode.'; return; }
  const d = new Date(); d.setDate(d.getDate() + 4);
  msg.className = 'pin-msg ok';
  msg.textContent = 'Delivery by ' + d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) + ' · Free';
}
$('pinBtn').addEventListener('click', checkPin);
$('pin').addEventListener('keydown', e => { if (e.key === 'Enter') checkPin(); });
$('pin').addEventListener('input', e => e.target.value = e.target.value.replace(/\D/g, ''));

/* ---------- Tabs ---------- */
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    $(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => selectTab(t));
  t.addEventListener('keydown', e => {
    const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!k) return;
    const next = tabs[(i + k + tabs.length) % tabs.length];
    selectTab(next); next.focus();
  });
});
document.querySelector('[data-tab="reviews"]').addEventListener('click', () => selectTab($('t-reviews')));

$('year').textContent = new Date().getFullYear();
render();
