import { useContext, useRef, useState } from 'react'
import { CartList } from '../../context/cartContext'

// Helper function to check and finish the payment transaction
import checkPayment from '../../helpers/paymentStatus'
import finishTransaction from '../../helpers/transaction';

// Library to create the QR code
import QRCode from "react-qr-code";

// UPI URL format:
// upi://pay?pa=<vpa>&pn=<name>&mc=<merchant_code>&tid=<transaction_id>&tr=<transaction_ref_id>&tn=<transaction_note>&am=<amount>&cu=<currency_code>&url=<url>

const Payment = ({ cart }) => {
    const { isCheckingOut, setIsCheckingOut, dispatch } = useContext(CartList)
    const [ address, setAddress] = useState({ ship: "", bill: "" })
    const [ showQr, setShowQr ] = useState(false);
    const [ url, setUrl ] = useState("");
    const timerDiv = useRef(null)

    // Getting the total amount from the cart
    const cartTotal = cart.reduce((acc, product) => {
        return acc += Number(product.quantity) * Number(product.price)
    }, 0)

    // Setting countdown for payment
    const countDown = async (paymentId) => {
        // Show QR code
        setShowQr(true)

        // Set up timer interval and data for QR code
        let interval = 900
        setUrl(`upi://pay?pa=7906000424@axisbank&pn=SagarGupta&mc=MI6&tid=${paymentId}&tr=01234567890123456789&tn=Sample_Note_again&am=${cartTotal}&cu=INR`)
        
        // Timer starts from here
        let timer = setInterval( async () => {

            // Display time in document
            timerDiv.current.innerText = String(interval).padStart(3, '0');

            // Check for payent status after every 5 seconds
            if (interval % 5 === 0) {
                const payload = await checkPayment(paymentId)

                // If payment is successful
                if (payload.paymentStatus === "A") {
                    setShowQr(false)
                    setIsCheckingOut(false)
                    clearInterval(timer)
                    alert("Payment is successfull")

                    // Finish transaction, clear and close current cart, create new cart 
                    const res = await finishTransaction({ ...payload, paymentId })
                    if (res.status === 200) dispatch({ type: "CLEAR_CART", })
                    else alert("payment failed, try again!")
                } else if (payload.paymentStatus === "N") {} // If payment is not completed
                else {  // If payment is failed
                    setShowQr(false)
                    setIsCheckingOut(false)
                    clearInterval(timer)
                    alert("Payment failed")
                }
            }

            // On timer end reset the window to stage before payment if payment transaction is nont completed
            if (interval === 0) {
                setShowQr(false)
                setIsCheckingOut(false)
                clearInterval(timer)
            }

            // Reduce timer interval by 1
            interval -= 1
        }, 1000)
        
    }

    // Function to run on clicking "Proceed to Checkout"
    const handleSubmit = async (e) => {
        // Preventing default behaviour of the form
        e.preventDefault()

        // Setting chceking out status to true
        setIsCheckingOut(true)

        // Creating a unique payment ID
        try {
            const res = await fetch('http://localhost:5000/payment/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ship: e.target.ship.value, bill: e.target.bill.value, cartTotal }),
            })
            if (res.status === 200) {
                const payload = await res.json()

                // Starting countdown for the payment
                countDown(payload.paymentId)
            } else { throw Error("Not able to perform action") }
        } catch (err) {
            console.error(err)
        }
    }

    // Function to handle the inputs for shipping and billing address
    const handleChange = (e) => {
        setAddress(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
        <div className='checkout-box'>
            {/* Form for the shipping and billing address */}
            <h4>Shipment</h4>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <label>Shipping address</label>
                <input type='input' name='ship' value={address.ship} onChange={handleChange} disabled={isCheckingOut} />
                <label>Billling address</label>
                <input type='input' name='bill' value={address.bill} onChange={handleChange} disabled={isCheckingOut} />
                <button type='submit'>Proceed to Checkout</button>
            </form>
            
            {/* Section to display the QR code */}
            {
                showQr && (<div className='qr-code-box'>
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={url}
                        viewBox={`0 0 256 256`}
                    />
                    <p>This is QR is valid for 15 mins (<span ref={timerDiv}>900</span> secs) only. Kindly do not refresh the page while payment.</p>
                </div>)
            }
        </div>
    )
}


export default Payment