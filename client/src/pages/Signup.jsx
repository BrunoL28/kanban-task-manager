import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import authApi from "../api/authApi";

const Signup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState("");
    const [passwordErrText, setPasswordErrText] = useState("");
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

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

    return (
        <>
            <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
                noValidate
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nome de usuário"
                    name="username"
                    disabled={loading}
                    error={usernameErrText !== ""}
                    helperText={usernameErrText}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Senha"
                    name="password"
                    type="password"
                    disabled={loading}
                    error={passwordErrText !== ""}
                    helperText={passwordErrText}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirmar Senha"
                    name="confirmPassword"
                    type="password"
                    disabled={loading}
                    error={confirmPasswordErrText !== ""}
                    helperText={confirmPasswordErrText}
                />
                <LoadingButton
                    sx={{ mt: 3, mb: 2 }}
                    variant="outlined"
                    fullWidth
                    color="success"
                    type="submit"
                    loading={loading}
                >
                    Cadastrar
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to="/login"
                sx={{ textTransform: "none" }}
            >
                Já tem uma conta? Entrar
            </Button>
        </>
    );
};

export default Signup;