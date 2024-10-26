import React from "react";
import { View, Text, FlatList } from "react-native";
import Title from "@/app/components/title";
import styles from "@/app/styles/panel/users";

const roles: { [key: string]: string } = {
  admin: "Administrador",
  user: "Usuário",
};

export type User = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

interface UsersProps {
  onBack: () => void;
  onReload: () => void;
  users: User[];
}

const Users = ({ onBack, onReload, users }: UsersProps) => {
  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.item}>
      <Text style={styles.name}>
        {item.name} - <Text style={styles.role}>{roles[item.role]}</Text>
      </Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Title
        back
        title="Painel - Usuários"
        onBack={onBack}
        reload
        onReload={onReload}
      />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
      />
    </View>
  );
};

export default Users;
