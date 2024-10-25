import React, { SetStateAction } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { formType } from "../screens/authScreen";

import styles from "../styles/login";
import { auth } from "@/app/services/auth";
import { useToast } from "../context/toastContext";

interface LoginProps {
  form: formType;
  changeForm: React.Dispatch<SetStateAction<formType>>;
  changePage: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ form, changeForm, changePage }) => {
  const { showToast } = useToast();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      showToast("Preencha todos os campos", "error", 2000);
      return;
    }

    const response = await auth(form.email, form.password);

    if (response.error) {
      showToast(response.error, "error", 2000);
      return;
    }
    changePage("home");
    showToast("Login efetuado com sucesso", "success", 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.subtitle}>
        Insira seu usuário e senha para entrar
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor={"#fff"}
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(text) => changeForm({ ...form, email: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor={"#fff"}
          secureTextEntry={true}
          value={form.password}
          onChangeText={(text) => changeForm({ ...form, password: text })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changePage("register")}>
        <Text style={styles.registerText}>
          Clique aqui para <Text style={styles.highlight}>cadastre-se</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
