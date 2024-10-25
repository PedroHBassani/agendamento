import React, { SetStateAction } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { formType } from "../screens/authScreen";

import styles from "../styles/login";
import { register } from "@/app/services/auth";
import { useToast } from "../context/toastContext";

interface RegisterProps {
  form: formType;
  changeForm: React.Dispatch<SetStateAction<formType>>;
  changePage: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({
  form,
  changeForm,
  changePage,
}) => {
  const { showToast } = useToast();

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      showToast("Preencha todos os campos", "error", 2000);
      return;
    }
    const response = await register(form.name, form.email, form.password);
    if (response.error) {
      showToast(response.error, "error", 2000);
      return;
    }
    changePage("login");
    showToast("Cadastro realizado com sucesso", "success", 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <Text style={styles.subtitle}>
        Cadastre-se para conseguir reservar horários
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#fff"
          autoCapitalize="words"
          value={form.name}
          onChangeText={(text) => changeForm({ ...form, name: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#fff"
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
          placeholderTextColor="#fff"
          secureTextEntry={true}
          value={form.password}
          onChangeText={(text) => changeForm({ ...form, password: text })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => changePage("login")}>
        <Text style={styles.registerText}>
          Já possui uma conta? <Text style={styles.highlight}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
