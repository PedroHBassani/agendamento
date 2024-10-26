import React, { useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { court } from "../panelScreen";
import Title from "@/app/components/title";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import OptionButton from "@/app/components/optionButton";
import Input from "@/app/components/input";

import styles from "@/app/styles/panel/courts";
import { useToast } from "@/app/context/toastContext";
import api from "@/config/axios";

interface CourtsProps {
  onBack: () => void;
  onReload: () => void;
  courts: court[];
}

const addCourtRequest = async (values: { name: string; price: number }) => {
  const response = await api.post("/courts", values);
  return response.data;
};

const Courts = ({ onBack, onReload, courts }: CourtsProps) => {
  const [addCourt, setAddCourt] = useState(false);
  const [values, setValues] = useState({
    name: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const addCourtHandler = async () => {
    if (!values.name || values.price === 0) {
      showToast("Preencha todos os campos", "error");
      return;
    }
    setLoading(true);
    const response = await addCourtRequest(values);

    setLoading(false);
    if (response.status === "success") {
      showToast(response.message, "success");
      setValues({ name: "", price: 0 });
      setAddCourt(false);
      onReload();
    }
  };

  const renderItem = ({ item }: { item: court }) => (
    <OptionButton
      dark
      style={styles.item}
      icon={<Ionicons name="tennisball-outline" size={24} color={"#FFF"} />}
      text={item.name}
      onPress={() => {}}
    />
  );

  return (
    <View style={styles.container}>
      <Title
        back
        title="Painel - Quadras"
        onBack={() => {
          if (addCourt) setAddCourt(false);
          else onBack();
        }}
        reload
        onReload={onReload}
      />
      {!addCourt ? (
        <>
          <OptionButton
            style={styles.button}
            icon={<Feather name="plus" size={24} />}
            text="Adicionar"
            onPress={() => setAddCourt(true)}
          />
          <FlatList
            data={courts}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            style={styles.list}
          />
        </>
      ) : (
        <View style={styles.containerAdd}>
          <Input
            label="Nome"
            value={values.name}
            autoCapitalize="sentences"
            keyboardType="default"
            placeholder="Nome da quadra"
            onChangeText={(text) => setValues({ ...values, name: text })}
          />

          <Input
            label="Preço"
            value={values.price.toString()}
            keyboardType="numeric"
            placeholder="Preço da quadra"
            onChangeText={(text) =>
              setValues({ ...values, price: Number(text) })
            }
          />

          <OptionButton
            style={styles.saveButton}
            icon={
              loading ? <ActivityIndicator size="small" color="#000" /> : null
            }
            text="SALVAR"
            onPress={addCourtHandler}
          />
        </View>
      )}
    </View>
  );
};

export default Courts;
