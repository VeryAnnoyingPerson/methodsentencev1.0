if (window.ApplePaySession) {
    const paymentRequest = {
        countryCode: 'US',
        currencyCode: 'USD',
        supportedNetworks: ['visa', 'masterCard'],
        merchantCapabilities: ['supports3DS'],
        total: {
            label: 'Your Merchant Name',
            amount: '10.00'
        }
    };

    const session = new ApplePaySession(3, paymentRequest);

    session.onvalidatemerchant = (event) => {
        // Call your server to get the merchant session.
        fetch('/validate-merchant', {
            method: 'POST',
            body: JSON.stringify({ validationURL: event.validationURL }),
        })
        .then(response => response.json())
        .then(merchantSession => {
            session.completeMerchantValidation(merchantSession);
        });
    };

    session.onpaymentauthorized = (event) => {
        // Handle the payment and send details to the server
        fetch('/process-payment', {
            method: 'POST',
            body: JSON.stringify(event.payment),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                session.completePayment(ApplePaySession.STATUS_SUCCESS);
            } else {
                session.completePayment(ApplePaySession.STATUS_FAILURE);
            }
        });
    };

    session.begin();
}
