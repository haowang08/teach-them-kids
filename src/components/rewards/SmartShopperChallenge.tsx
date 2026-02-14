import { useState, useCallback } from "react";

// ============================================
// TYPES & DATA
// ============================================

type GamePhase = "intro" | "shopping" | "checkout" | "complete";

interface StoreItem {
  id: number; emoji: string; name: string; price: number;
  category: "need" | "want"; onSale: boolean; salePrice?: number;
}

interface AdPopup { item: StoreItem; discount: number; tagline: string; }

const BUDGET = 50;

const STORE_ITEMS: StoreItem[] = [
  { id: 1, emoji: "\uD83C\uDF4E", name: "Apples", price: 3, category: "need", onSale: false },
  { id: 2, emoji: "\uD83E\uDD5B", name: "Milk", price: 4, category: "need", onSale: false },
  { id: 3, emoji: "\uD83C\uDF5E", name: "Bread", price: 3, category: "need", onSale: false },
  { id: 4, emoji: "\uD83D\uDCD3", name: "Notebook", price: 5, category: "need", onSale: true, salePrice: 4 },
  { id: 5, emoji: "\u270F\uFE0F", name: "Pencils", price: 2, category: "need", onSale: false },
  { id: 6, emoji: "\uD83E\uDDE6", name: "Socks", price: 6, category: "need", onSale: false },
  { id: 7, emoji: "\uD83C\uDF6C", name: "Candy", price: 2, category: "want", onSale: false },
  { id: 8, emoji: "\uD83C\uDFAE", name: "Video Game", price: 25, category: "want", onSale: false },
  { id: 9, emoji: "\uD83E\uDDF8", name: "Teddy Bear", price: 15, category: "want", onSale: true, salePrice: 12 },
  { id: 10, emoji: "\uD83C\uDF66", name: "Ice Cream", price: 4, category: "want", onSale: false },
  { id: 11, emoji: "\uD83C\uDFAA", name: "Stickers", price: 3, category: "want", onSale: false },
  { id: 12, emoji: "\uD83C\uDFA7", name: "Headphones", price: 20, category: "want", onSale: true, salePrice: 16 },
];

const AD_TAGLINES = [
  "BUY NOW! Limited time only!", "FLASH SALE! Don't miss out!",
  "Everyone is buying this! You should too!", "MEGA DEAL! Today only!",
];

// ============================================
// STYLES
// ============================================

const C = {
  bg: "#1A1A2E", cardBg: "#2D2D44", green: "#4CAF50", orange: "#FF9800",
  red: "#F44336", blue: "#2196F3", yellow: "#FFD700", text: "#FFFFFF", muted: "#A0A0C0",
};

const baseBtn: React.CSSProperties = {
  padding: "10px 24px", border: "none", borderRadius: 8,
  color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer",
};

const page: React.CSSProperties = {
  background: C.bg, minHeight: "100vh", padding: 32,
  display: "flex", alignItems: "center", justifyContent: "center",
};

const card: React.CSSProperties = {
  background: C.cardBg, borderRadius: 16, padding: 32, maxWidth: 480, width: "100%",
};

const row: React.CSSProperties = { display: "flex", justifyContent: "space-between" };

// ============================================
// COMPONENT
// ============================================

export default function SmartShopperChallenge() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [cart, setCart] = useState<StoreItem[]>([]);
  const [adPopup, setAdPopup] = useState<AdPopup | null>(null);
  const [adsSeen, setAdsSeen] = useState(0);
  const [adsResisted, setAdsResisted] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const price = (i: StoreItem) => (i.onSale && i.salePrice != null ? i.salePrice : i.price);
  const cartTotal = cart.reduce((s, i) => s + price(i), 0);
  const remaining = BUDGET - cartTotal;
  const needs = STORE_ITEMS.filter((i) => i.category === "need");
  const needsInCart = cart.filter((i) => i.category === "need");
  const wantsInCart = cart.filter((i) => i.category === "want");
  const allNeedsBought = needs.every((n) => cart.some((c) => c.id === n.id));
  const inCart = useCallback((id: number) => cart.some((c) => c.id === id), [cart]);

  const maybeShowAd = useCallback((cartIds: Set<number>) => {
    if (Math.random() < 0.4) {
      const wants = STORE_ITEMS.filter((i) => i.category === "want" && !cartIds.has(i.id));
      if (wants.length === 0) return;
      const item = wants[Math.floor(Math.random() * wants.length)];
      setAdPopup({
        item, discount: Math.floor(item.price * 0.3),
        tagline: AD_TAGLINES[Math.floor(Math.random() * AD_TAGLINES.length)],
      });
      setAdsSeen((p) => p + 1);
    }
  }, []);

  const addToCart = useCallback((item: StoreItem) => {
    if (inCart(item.id) || cartTotal + price(item) > BUDGET) return;
    setCart((prev) => [...prev, item]);
    const cartIds = new Set(cart.map((c) => c.id));
    cartIds.add(item.id);
    maybeShowAd(cartIds);
  }, [inCart, cart, cartTotal, maybeShowAd]);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const handleAdDecline = useCallback(() => { setAdsResisted((p) => p + 1); setAdPopup(null); }, []);

  const handleAdAccept = useCallback(() => {
    if (adPopup && !inCart(adPopup.item.id)) {
      const dp = adPopup.item.price - adPopup.discount;
      if (cartTotal + dp <= BUDGET)
        setCart((prev) => [...prev, { ...adPopup.item, onSale: true, salePrice: dp }]);
    }
    setAdPopup(null);
  }, [adPopup, inCart, cartTotal]);

  const calcScore = useCallback(() => {
    const s = needsInCart.length * 15 + Math.max(0, remaining) + adsResisted * 5 - wantsInCart.length * 3;
    return Math.max(0, Math.min(100, s));
  }, [needsInCart, remaining, adsResisted, wantsInCart]);

  const stars = (() => { const s = calcScore(); return s >= 90 ? 3 : s >= 70 ? 2 : s >= 40 ? 1 : 0; })();

  const reset = useCallback(() => {
    setPhase("intro"); setCart([]); setAdPopup(null);
    setAdsSeen(0); setAdsResisted(0); setShowCart(false);
  }, []);

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div style={page}>
        <div style={{ ...card, maxWidth: 520, textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{"\uD83D\uDED2"}</div>
          <h1 style={{ color: C.text, fontSize: 28, margin: "0 0 12px" }}>Smart Shopper Challenge</h1>
          <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.6, margin: "0 0 20px" }}>
            You have <span style={{ color: C.green, fontWeight: 700 }}>${BUDGET}</span> to spend.
            Buy everything on your <span style={{ color: C.green, fontWeight: 700 }}>NEEDS</span> list
            while staying under budget!
          </p>
          <div style={{ background: C.bg, borderRadius: 10, padding: 16, marginBottom: 24, textAlign: "left" }}>
            <p style={{ color: C.orange, fontWeight: 700, margin: "0 0 8px", fontSize: 14 }}>YOUR NEEDS LIST:</p>
            {needs.map((it) => (
              <div key={it.id} style={{ color: C.text, fontSize: 14, padding: "3px 0" }}>
                {it.emoji} {it.name} — ${it.price}
              </div>
            ))}
            <p style={{ color: C.muted, fontSize: 13, marginTop: 10, marginBottom: 0 }}>
              Watch out for tempting ads and unnecessary wants!
            </p>
          </div>
          <button onClick={() => setPhase("shopping")} style={{ ...baseBtn, background: C.blue, fontSize: 18, padding: "14px 40px" }}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  // ---- SHOPPING ----
  if (phase === "shopping") {
    const pct = Math.max(0, (remaining / BUDGET) * 100);
    const barClr = pct > 50 ? C.green : pct > 20 ? C.orange : C.red;
    return (
      <div style={{ background: C.bg, minHeight: "100vh", padding: 20 }}>
        {/* Header */}
        <div style={{ ...row, alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ color: C.text, margin: 0, fontSize: 22 }}>{"\uD83C\uDFEA"} Store</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setShowCart((p) => !p)}
              style={{ ...baseBtn, background: C.cardBg, padding: "8px 16px", fontSize: 14, position: "relative" }}>
              {"\uD83D\uDED2"} Cart
              {cart.length > 0 && (
                <span style={{ position: "absolute", top: -8, right: -8, background: C.red, borderRadius: "50%",
                  width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                  {cart.length}
                </span>
              )}
            </button>
            <button onClick={() => setPhase("checkout")}
              style={{ ...baseBtn, background: C.green, padding: "8px 20px", fontSize: 14 }}>Checkout</button>
          </div>
        </div>
        {/* Budget bar */}
        <div style={{ background: C.cardBg, borderRadius: 10, padding: 12, marginBottom: 20 }}>
          <div style={{ ...row, marginBottom: 6 }}>
            <span style={{ color: C.muted, fontSize: 13 }}>Budget remaining</span>
            <span style={{ color: barClr, fontWeight: 700, fontSize: 14 }}>${remaining} / ${BUDGET}</span>
          </div>
          <div style={{ background: C.bg, borderRadius: 6, height: 12, overflow: "hidden" }}>
            <div style={{ background: barClr, height: "100%", width: `${pct}%`, borderRadius: 6, transition: "width 0.3s" }} />
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <span style={{ fontSize: 12, color: C.green }}>Needs: {needsInCart.length}/{needs.length}</span>
            <span style={{ fontSize: 12, color: C.orange }}>Wants: {wantsInCart.length}</span>
          </div>
        </div>
        {/* Cart dropdown */}
        {showCart && (
          <div style={{ background: C.cardBg, borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <h3 style={{ color: C.text, margin: "0 0 10px", fontSize: 16 }}>Your Cart</h3>
            {cart.length === 0
              ? <p style={{ color: C.muted, margin: 0, fontSize: 14 }}>Cart is empty</p>
              : cart.map((it) => (
                <div key={it.id} style={{ ...row, alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${C.bg}` }}>
                  <span style={{ color: C.text, fontSize: 14 }}>{it.emoji} {it.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: C.green, fontWeight: 700, fontSize: 14 }}>${price(it)}</span>
                    <button onClick={() => removeFromCart(it.id)}
                      style={{ ...baseBtn, background: C.red, padding: "4px 10px", fontSize: 12 }}>Remove</button>
                  </div>
                </div>
              ))}
            {cart.length > 0 && (
              <div style={{ marginTop: 10, textAlign: "right", color: C.text, fontWeight: 700 }}>Total: ${cartTotal}</div>
            )}
          </div>
        )}
        {/* Store grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 14 }}>
          {STORE_ITEMS.map((item) => {
            const ic = inCart(item.id);
            const p = price(item);
            const tooMuch = !ic && cartTotal + p > BUDGET;
            return (
              <div key={item.id} style={{
                background: ic ? "#3A3A55" : C.cardBg, borderRadius: 12, padding: 16, textAlign: "center",
                position: "relative", border: ic ? `2px solid ${C.blue}` : "2px solid transparent",
                opacity: tooMuch ? 0.5 : 1, transition: "all 0.2s",
              }}>
                {item.onSale && (
                  <div style={{ position: "absolute", top: -6, right: -6, background: C.red, color: "#fff",
                    fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 6, transform: "rotate(8deg)" }}>SALE!</div>
                )}
                <div style={{ position: "absolute", top: 8, left: 8,
                  background: item.category === "need" ? C.green : C.orange, color: "#fff",
                  fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4 }}>
                  {item.category === "need" ? "NEED" : "WANT"}
                </div>
                <div style={{ fontSize: 40, marginTop: 8, marginBottom: 6 }}>{item.emoji}</div>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                <div style={{ marginBottom: 10 }}>
                  {item.onSale && item.salePrice != null ? (<>
                    <span style={{ color: C.muted, textDecoration: "line-through", fontSize: 13, marginRight: 6 }}>${item.price}</span>
                    <span style={{ color: C.red, fontWeight: 700, fontSize: 16 }}>${item.salePrice}</span>
                  </>) : (
                    <span style={{ color: C.green, fontWeight: 700, fontSize: 16 }}>${item.price}</span>
                  )}
                </div>
                <button onClick={() => (ic ? removeFromCart(item.id) : addToCart(item))} disabled={tooMuch}
                  style={{ ...baseBtn, background: ic ? C.red : tooMuch ? C.muted : C.blue,
                    padding: "6px 14px", fontSize: 13, width: "100%", cursor: tooMuch ? "not-allowed" : "pointer" }}>
                  {ic ? "Remove" : tooMuch ? "Too expensive" : "Add to cart"}
                </button>
              </div>
            );
          })}
        </div>
        {/* Ad popup */}
        {adPopup && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
            <div style={{ background: C.cardBg, border: `4px solid ${C.yellow}`,
              boxShadow: `0 0 30px ${C.yellow}44, 0 0 60px ${C.red}22`,
              borderRadius: 16, padding: 32, maxWidth: 360, textAlign: "center" }}>
              <div style={{ color: C.red, fontWeight: 900, fontSize: 22, marginBottom: 6 }}>
                {"\u26A1"} SPECIAL OFFER {"\u26A1"}
              </div>
              <p style={{ color: C.yellow, fontWeight: 700, fontSize: 15, margin: "0 0 16px" }}>{adPopup.tagline}</p>
              <div style={{ fontSize: 56, marginBottom: 8 }}>{adPopup.item.emoji}</div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{adPopup.item.name}</div>
              <div style={{ marginBottom: 16 }}>
                <span style={{ color: C.muted, textDecoration: "line-through", fontSize: 16, marginRight: 8 }}>${adPopup.item.price}</span>
                <span style={{ color: C.red, fontWeight: 900, fontSize: 22 }}>${adPopup.item.price - adPopup.discount}</span>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <button onClick={handleAdDecline} style={{ ...baseBtn, background: C.green, padding: "10px 20px" }}>No thanks!</button>
                <button onClick={handleAdAccept} style={{ ...baseBtn, background: C.orange, padding: "10px 20px" }}>Add to cart</button>
              </div>
              <p style={{ color: C.muted, fontSize: 11, marginTop: 12, marginBottom: 0 }}>Think carefully: do you really need this?</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- CHECKOUT ----
  if (phase === "checkout") {
    const needsTotal = needsInCart.reduce((s, i) => s + price(i), 0);
    const wantsTotal = wantsInCart.reduce((s, i) => s + price(i), 0);
    const missing = needs.filter((n) => !cart.some((c) => c.id === n.id));
    return (
      <div style={page}>
        <div style={card}>
          <h2 style={{ color: C.text, margin: "0 0 20px", textAlign: "center", fontSize: 24 }}>{"\uD83E\uDDFE"} Checkout</h2>
          <div style={{ marginBottom: 20 }}>
            {cart.length === 0
              ? <p style={{ color: C.muted, textAlign: "center" }}>Your cart is empty!</p>
              : cart.map((it) => (
                <div key={it.id} style={{ ...row, padding: "8px 0", borderBottom: `1px solid ${C.bg}` }}>
                  <span style={{ color: C.text, fontSize: 14 }}>
                    {it.emoji} {it.name}
                    <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 700,
                      color: it.category === "need" ? C.green : C.orange }}>{it.category.toUpperCase()}</span>
                  </span>
                  <span style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>${price(it)}</span>
                </div>
              ))}
          </div>
          <div style={{ background: C.bg, borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ ...row, marginBottom: 6 }}>
              <span style={{ color: C.green, fontSize: 14 }}>Needs total:</span>
              <span style={{ color: C.green, fontWeight: 700 }}>${needsTotal}</span>
            </div>
            <div style={{ ...row, marginBottom: 6 }}>
              <span style={{ color: C.orange, fontSize: 14 }}>Wants total:</span>
              <span style={{ color: C.orange, fontWeight: 700 }}>${wantsTotal}</span>
            </div>
            <div style={{ ...row, borderTop: `1px solid ${C.cardBg}`, paddingTop: 8, marginTop: 4 }}>
              <span style={{ color: C.text, fontWeight: 700, fontSize: 16 }}>Grand total:</span>
              <span style={{ color: cartTotal > BUDGET ? C.red : C.green, fontWeight: 700, fontSize: 16 }}>${cartTotal}</span>
            </div>
            <div style={{ ...row, marginTop: 6 }}>
              <span style={{ color: C.muted, fontSize: 14 }}>Remaining budget:</span>
              <span style={{ color: remaining >= 0 ? C.green : C.red, fontWeight: 700 }}>${remaining}</span>
            </div>
          </div>
          {missing.length > 0 && (
            <div style={{ background: `${C.red}22`, border: `1px solid ${C.red}`, borderRadius: 8, padding: 12, marginBottom: 20 }}>
              <p style={{ color: C.red, fontWeight: 700, margin: "0 0 6px", fontSize: 14 }}>Missing needs:</p>
              {missing.map((it) => (
                <div key={it.id} style={{ color: C.text, fontSize: 13, padding: "2px 0" }}>{it.emoji} {it.name}</div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => setPhase("shopping")}
              style={{ ...baseBtn, background: C.cardBg, border: `1px solid ${C.muted}` }}>Back to Store</button>
            <button onClick={() => setPhase("complete")}
              style={{ ...baseBtn, background: C.blue }}>Confirm Purchase</button>
          </div>
        </div>
      </div>
    );
  }

  // ---- COMPLETE ----
  const score = calcScore();
  const badge = allNeedsBought && remaining >= 0;
  const wantsSpent = wantsInCart.reduce((s, i) => s + price(i), 0);

  return (
    <div style={page}>
      <div style={{ ...card, textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>
          {badge ? "\uD83C\uDFC6" : stars >= 2 ? "\uD83C\uDF1F" : "\uD83D\uDED2"}
        </div>
        <h2 style={{ color: C.text, margin: "0 0 8px", fontSize: 26 }}>Shopping Complete!</h2>
        <div style={{ fontSize: 36, marginBottom: 16, letterSpacing: 4 }}>
          {[1, 2, 3].map((s) => (
            <span key={s} style={{ color: s <= stars ? C.yellow : C.muted }}>{"\u2605"}</span>
          ))}
        </div>
        <div style={{ background: C.bg, borderRadius: 12, padding: 20, marginBottom: 20, fontSize: 42, fontWeight: 900,
          color: score >= 70 ? C.green : score >= 40 ? C.orange : C.red }}>
          {score} <span style={{ fontSize: 18, color: C.muted }}>/ 100</span>
        </div>
        <div style={{ background: C.bg, borderRadius: 10, padding: 16, marginBottom: 20, textAlign: "left" }}>
          <h3 style={{ color: C.text, margin: "0 0 12px", fontSize: 16 }}>Score Breakdown</h3>
          {[
            { label: "Needs fulfilled", value: `${needsInCart.length} / ${needs.length}`,
              color: needsInCart.length === needs.length ? C.green : C.orange },
            { label: "Money saved", value: `$${Math.max(0, remaining)}`, color: remaining > 10 ? C.green : C.text },
            { label: "Spent on wants", value: `$${wantsSpent}`, color: wantsSpent === 0 ? C.green : C.orange },
            { label: "Ads resisted", value: `${adsResisted} / ${adsSeen}`, color: C.green },
          ].map((r, i) => (
            <div key={i} style={{ ...row, padding: "5px 0",
              borderBottom: i < 3 ? `1px solid ${C.cardBg}` : "none" }}>
              <span style={{ color: C.muted, fontSize: 14 }}>{r.label}</span>
              <span style={{ color: r.color, fontWeight: 700, fontSize: 14 }}>{r.value}</span>
            </div>
          ))}
        </div>
        {badge && (
          <div style={{ background: `${C.yellow}18`, border: `2px solid ${C.yellow}`,
            borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>{"\uD83C\uDFC5"}</div>
            <div style={{ color: C.yellow, fontWeight: 900, fontSize: 18 }}>Smart Shopper Badge Earned!</div>
            <p style={{ color: C.muted, fontSize: 13, margin: "6px 0 0" }}>
              You bought all your needs and stayed under budget. Great money skills!
            </p>
          </div>
        )}
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
          {allNeedsBought
            ? remaining > 20 ? "Amazing self-control! You focused on what matters and saved a lot."
              : "You got everything you needed. Smart shopping is about priorities!"
            : "Remember: always buy your needs first before spending on wants."}
        </p>
        <button onClick={reset} style={{ ...baseBtn, background: C.blue, fontSize: 16, padding: "12px 32px" }}>
          Play Again
        </button>
      </div>
    </div>
  );
}
