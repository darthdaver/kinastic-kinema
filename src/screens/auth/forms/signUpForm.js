const signUpForm = {
    fields: [{
        key:"signUp-name",
        id:"name",
        label:"Name",
        keyboardType:"default",
        required: true,
        autoCapitalize:"none",
        errorText:"Please enter a valid name.",
        initialValue: "",
        placeholder: "Name",
        placeholderTextColor: "rgba(255,255,255,0.4)"
    }, {
        key:"signUp-surname",
        id:"surname",
        label:"Surname",
        keyboardType:"default",
        required: true,
        autoCapitalize:"none",
        errorText:"Please enter a valid surname.",
        initialValue: "",
        placeholder: "Surname",
        placeholderTextColor: "rgba(255,255,255,0.4)"
    }, {
        key:"signUp-email",
        id:"email",
        label:"E-mail",
        keyboardType:"email-address",
        required: true,
        email: true,
        autoCapitalize:"none",
        errorText:"Please enter a valid email address.",
        initialValue: "",
        placeholder: "Email",
        placeholderTextColor: "rgba(255,255,255,0.4)"
    }, {
        key:"signUp-password",
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

export default signUpForm;