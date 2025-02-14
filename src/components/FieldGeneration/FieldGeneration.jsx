import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const FieldGeneration = (
    label, 
    type, 
    autoComplete, 
    variant, 
    width, 
    value, 
    changeFunction, 
    maxLength
) => {
    // 🔹 Ajout d'un état pour gérer l'affichage du mot de passe
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    
    return (
        <TextField
            label={label}
            type={type === "password" && showPassword ? "text" : type}
            autoComplete={autoComplete}
            variant={variant}
            value={value}
            onChange={changeFunction}
            slotProps={{ 
                htmlInput: { maxLength: maxLength },
                input: type === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : undefined 
            }}
            sx={{
                width: width,
                input: { 
                    color: '#fff',
                    fontSize: '1.6rem',
                    transition: 'padding 0.3s ease-in-out'
                },
                '& input:focus': { padding: '0.4rem' },
                '& label': { 
                    color: '#C084FC', 
                    fontSize: '2.2rem', 
                    left: '50%', 
                    transform: 'translate(-50%, -10%)',
                    transition: 'all 0.3s ease-in-out'
                },
                '& label.Mui-focused': { 
                    color: '#9333EA',
                    fontSize: '1.2rem', 
                    left: '0', 
                    transform: 'translateX(0)'
                },
                '& .MuiInput-underline:before': { borderBottomColor: '#C084FC' },
                '& .MuiInput-underline:hover:before': { borderBottomColor: '#9333EA' },
                '& .MuiInput-underline:after': { borderBottomColor: '#9333EA' }
            }}
        />
    );
};

export default FieldGeneration;