const logInForm = {
    fields: [{
        key:"logIn-email",
        id:"email",
        label:"E-mail",
        keyboardType:"email-address",
        required: true,
        email: true,
        autoCapitalize:"none",
        errorText:"Please enter a valid email address.",
        initialValue: "",
        placeholder: "Email Address",
        placeholderTextColor: "rgba(255,255,255,0.4)"
    }, {
        key:"logIn-password",
        id:"password",
        label:"Password",
        keyboardType:"default",
        secureTextEntry: true,
        required: true,
        autoCapitalize:"none",
        errorText:"Please enter a valid password.",
        initialValue: "",
        placeholder: "Password",
        placeholderTextColor: "rgba(255,255,255,0.4)"
    }],
    submit: {
        title: "Sign In"
    }
}

export default logInForm;