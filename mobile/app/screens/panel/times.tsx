import { useToast } from "@/app/context/toastContext";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { userType } from "../authScreen";
import { times } from "../panelScreen";
import Title from "@/app/components/title";
import api from "@/config/axios";
import Loading from "@/app/components/loading";
import TimesList from "@/app/components/timeList";

import styles from "@/app/styles/my-times";

interface TimesProps {
  onBack: () => void;
  onReload: () => void;
  times: times[];
}

const Times = ({ onBack, onReload, times }: TimesProps) => {
  return (
    <View style={styles.container}>
      <Title
        title="Painel - Horários"
        back
        onBack={onBack}
        reload
        onReload={onReload}
      />
      <TimesList times={times} />
    </View>
  );
};

export default Times;
