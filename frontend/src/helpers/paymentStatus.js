const checkPayment = async (paymentId) => {
    try {
        const res = await fetch('http://localhost:5000/payment/check', {
                            method: 'POST',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ paymentId }),
                        })
        return await res.json()
    } catch (err) {
        alert(err)
    }
}

export default checkPayment