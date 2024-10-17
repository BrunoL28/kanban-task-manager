const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    let err = false;

    if (username === "") {
        err = true;
        setUsernameErrText("Por favor, preencha este campo");
    }
    if (password === "") {
        err = true;
        setPasswordErrText("Por favor, preencha este campo");
    }

    if (err) return;

    setLoading(true);

    try {
        const res = await authApi.login({ username, password });
        setLoading(false);
        localStorage.setItem("token", res.token);
        navigate("/");
    } catch (err) {
        setLoading(false);
        const errors = err.response?.data?.errors || [];  // Verifica se 'errors' existe
        if (Array.isArray(errors)) {
            errors.forEach(e => {
                if (e.param === "username") setUsernameErrText(e.msg);
                if (e.param === "password") setPasswordErrText(e.msg);
            });
        } else {
            console.error("Erro inesperado:", err);
        }
    }
};