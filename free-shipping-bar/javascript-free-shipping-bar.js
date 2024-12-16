theme.ShippingBar = (function () {
    const bar = document.querySelector('.free-shipping-announcement');
    const promote_txt = bar.dataset.promote;
    const unlocked_txt = bar.dataset.unlocked;
    const currency = bar.dataset.currency;
    const treshold = parseInt(bar.dataset.treshold, 10);
    const start_cart_total_price = bar.dataset.total;
    const total_formatted = bar.dataset.formated;

    function formatMoneyWithCurrency(amount) {
        try {
            const formattedMoney = theme.Currency.formatMoney(amount, theme.moneyFormat);
            return formattedMoney.replace("{{amount}}", (amount / 100).toFixed(2));
        } catch (error) {
            console.error("Error formatting the currency amount", error);
            return `${(amount / 100).toFixed(2)}`;
        }
    }

    function updateProgressBar(cartTotal) {
        const progressBar = document.getElementById("free-shipping-progress-bar");
        const progress = Math.min(100, (cartTotal / treshold) * 100);

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    updateProgressBar(start_cart_total_price);

    function replaceValueWithCurrency(inputString, newValue) {
        const regex = /(\d+\.\d{2})\s?([A-Za-z]{3})/;
        return inputString.replace(regex, (match, amount, currency) => {
            return `${newValue} ${currency}`;
        });
    }

    function update() {
        $.getJSON("/cart.js")
            .then(function (cart) {
                const value_left = treshold - cart.total_price;
                const messageElement = bar.querySelector(".free-shipping-message");

                if (value_left <= 0) {
                    messageElement.textContent = unlocked_txt;
                    updateProgressBar(treshold);
                } else {
                    const value_left_money   = formatMoneyWithCurrency(value_left);
                    messageElement.innerHTML = promote_txt.replace("[value]", replaceValueWithCurrency(total_formatted, value_left_money));
                    updateProgressBar(cart.total_price);
                }
            })
            .catch(function (error) {
                console.error("Error retrieving cart data:", error);
            });
    }

    return { updated: update };
})();