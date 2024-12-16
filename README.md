# Shopify Sections

## **Kostenloser Versand Bar - Support:**  
*(NUR getestet mit dem Theme: [Motion](https://themes.shopify.com/themes/motion/styles/classic))*

Verfügbar als:
- [x] Sections
- [x] Snippets

---

**Anleitung:**

1. **Sicherheitskopie erstellen:**  
   Erstelle zuerst eine Sicherheitskopie deines Themes, um mögliche Fehler rückgängig machen zu können.

2. **Auswahl treffen:**  
   Wähle aus, ob du die Funktion als Section oder als Snippet hinzufügen möchtest.

3. **Neue Datei erstellen:**  
   Erstelle eine neue Datei im gewünschten Ordner (`sections` oder `snippets`) im Shopify Editor.  
   Beispiel: Name der Datei: `free-shipping-bar.liquid`.

4. **Code einfügen:**  
   Kopiere den Code aus der entsprechenden Datei (Section oder Snippet) in deine neu erstellte Datei.

5. **`theme.js` bearbeiten:**  
   Öffne die Datei `theme.js` und füge den Code aus **[javascript-free-shipping-bar.js](free-shipping-bar/javascript-free-shipping-bar.js)** ganz am Ende der Datei ein.

6. **`theme.ShippingBar.updated();` einfügen:**  
   Kopiere die Funktion `theme.ShippingBar.updated();` und füge sie in die entsprechenden Funktionen des Themes Motion ein:
   - **_updateCart():** Innerhalb des `then((cart)`-Aufrufs.
   - **_addItemFromForm():** Ebenfalls innerhalb des `then((cart)`-Aufrufs. Bei Dir könnte es auch `addToCart()` heissen.

7. **Nur bei Snippet-Variante:**  
   Damit die Datei im Bereich des Cart-Drawers sichtbar ist, öffne die Datei `cart-drawer.liquid` und füge diesen Code an der gewünschten Stelle ein:
   ```liquid
   {% render 'free-shipping-bar' %}
   ```

---

**Beispiel für die Funktion `_addItemFromForm()`:**
So könnte die Funktion `_addItemFromForm()` aussehen:

```javascript
.then(
  function (data) {
    if (data.status === 422) {
      this.error(data);
    } else {
      var product = data;
      this.success(product);
    }
    status.loading = false;
    this.addToCart.classList.remove("btn--loading");
    theme.ShippingBar.updated();

    // Reload page if adding product from a section on the cart page
    if (document.body.classList.contains("template-cart")) {
      window.scrollTo(0, 0);
      location.reload();
    }
  }.bind(this)
);
```
---

**Beispiel für die Funktion `_updateCart()`:**
So könnte die Funktion `_updateCart()` aussehen:

```javascript

.then(
  function (data) {
     if (data.status === 422) {
        this.error(data);
     } else {
        var product = data;
        this.success(product);
     }
     status.loading = false;
     this.addToCart.classList.remove('btn--loading');
     theme.ShippingBar.updated();

     // Reload page if adding product from a section on the cart page
     if (document.body.classList.contains('template-cart')) {
        window.scrollTo(0, 0);
        location.reload();
     }
  }.bind(this)
);
```
