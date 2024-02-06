const checkLogin = async (setIsLoggedIn) => {
    try {

        const res = await fetch('http://localhost:5000/user/check', { credentials: 'include' })
        if (res.status === 200) setIsLoggedIn(true)

    } catch (err) {
        alert(err)
    }
}

export default checkLogin