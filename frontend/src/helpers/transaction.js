const finishTransaction = async (data) => {
    try {
        const res = await fetch('http://localhost:5000/payment/finish', {
                            method: 'POST',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                        })
        return res
    } catch (err) {
        alert(err)
    }
}

export default finishTransaction