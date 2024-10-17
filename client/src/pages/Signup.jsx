const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    let err = false;

    if (username === "") {
        err = true;
        setUsernameErrText("Por favor, preencha este campo");
    }
    if (password === "") {
        err = true;
        setPasswordErrText("Por favor, preencha este campo");
    }
    if (confirmPassword === "") {
        err = true;
        setConfirmPasswordErrText("Por favor, preencha este campo");
    }
    if (password !== confirmPassword) {
        err = true;
        setConfirmPasswordErrText("As senhas não coincidem");
    }

    if (err) return;

    setLoading(true);

    try {
        const res = await authApi.signup({ username, password, confirmPassword });
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
                if (e.param === "confirmPassword") setConfirmPasswordErrText(e.msg);
            });
        } else {
            console.error("Erro inesperado:", err);
        }
    }
};