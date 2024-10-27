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

const editCourtRequest = async (values: court) => {
  const response = await api.put(`/courts/${values._id}`, values);
  return response.data;
};

const deleteCourtRequest = async (id: string) => {
  const response = await api.delete(`/courts/${id}`);
  return response.data;
};

const Courts = ({ onBack, onReload, courts }: CourtsProps) => {
  const [page, setPage] = useState("list");
  const [edit, setEdit] = useState<court>({} as court);
  const [values, setValues] = useState({
    name: "",
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { showToast } = useToast();

  const addCourtHandler = async () => {
    if (page == "edit") {
      if (!edit.name || edit.price === 0) {
        showToast("Preencha todos os campos", "error");
        return;
      }
    } else {
      if (!values.name || values.price === 0) {
        showToast("Preencha todos os campos", "error");
        return;
      }
    }

    setLoading(true);
    const response =
      page == "add"
        ? await addCourtRequest(values)
        : await editCourtRequest(edit);

    setLoading(false);
    if (response.status === "success") {
      showToast(response.message, "success");
      setValues({ name: "", price: 0 });
      setPage("list");
      onReload();
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    const response = await deleteCourtRequest(edit._id);
    setDeleteLoading(false);
    if (response.status === "success") {
      showToast(response.message, "success");
      setEdit({} as court);
      setPage("list");
      onReload();
    }
  };

  const renderItem = ({ item }: { item: court }) => (
    <OptionButton
      dark
      style={styles.item}
      icon={<Ionicons name="tennisball-outline" size={24} color={"#FFF"} />}
      text={item.name}
      onPress={() => {
        setEdit(item);
        setPage("edit");
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Title
        back
        title="Painel - Quadras"
        onBack={() => {
          if (page != "list") setPage("list");
          else onBack();
        }}
        reload
        onReload={onReload}
      />
      {page == "list" ? (
        <>
          <OptionButton
            style={styles.button}
            icon={<Feather name="plus" size={24} />}
            text="Adicionar"
            onPress={() => setPage("add")}
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
            value={edit.name ?? values.name}
            autoCapitalize="sentences"
            keyboardType="default"
            placeholder="Nome da quadra"
            onChangeText={(text) => {
              if (page == "edit") setEdit({ ...edit, name: text });
              else setValues({ ...values, name: text });
            }}
          />

          <Input
            label="Preço"
            value={
              page == "edit" ? edit.price.toString() : values.price.toString()
            }
            keyboardType="numeric"
            placeholder="Preço da quadra"
            onChangeText={(text) => {
              if (page == "edit") setEdit({ ...edit, price: Number(text) });
              else setValues({ ...values, price: Number(text) });
            }}
          />

          {page == "edit" && (
            <OptionButton
              style={styles.deleteButton}
              dark
              icon={
                deleteLoading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Feather name="trash-2" size={20} color={"#FFF"} />
                )
              }
              text="DELETAR"
              onPress={handleDelete}
            />
          )}

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
