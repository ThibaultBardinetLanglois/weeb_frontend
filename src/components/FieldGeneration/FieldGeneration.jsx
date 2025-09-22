import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * FieldGeneration
 * 
 * A reusable form input field component built with Material UI's TextField.
 * Includes optional password visibility toggle logic and various custom styles.
 * 
 * @param {string} label - The label displayed above the input field
 * @param {string} type - The input type (e.g., "text", "password", "email")
 * @param {string} autoComplete - The autocomplete attribute for the field
 * @param {string} variant - The Material UI TextField variant (e.g., "standard", "filled", "outlined")
 * @param {string|number} width - The width of the field (can be in px, %, rem, etc.)
 * @param {string} value - The current value of the input field
 * @param {function} changeFunction - Callback function to handle input value change
 * @param {number} maxLength - Maximum number of characters allowed in the input
 * 
 * @returns {JSX.Element} A styled Material UI TextField component
 */
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
    // State to handle visibility toggle for password fields
    const [showPassword, setShowPassword] = useState(false);

    // Toggles the password visibility state
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