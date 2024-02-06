const Downloads = () => {
    // Function to download invoice
    const downloadInvoice = async () => {
        const res = await fetch('http://localhost:5000/docs/invoice')
        const file = await res.blob()
        const fileURL = window.URL.createObjectURL(file);

        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.download = "Invoice.pdf";
        fileLink.click();
    }

    // Function to open a new tab for shipping details
    const newTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener, noreferrer')
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className='downloads'>
            <button type='button' onClick={() => downloadInvoice()}>Invoice</button>
            <button type='button' onClick={() => newTab('http://localhost:5000/docs/ship')}>Track</button>
        </div>
    )
}

export default Downloads