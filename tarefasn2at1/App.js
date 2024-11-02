import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const tarefasSalvas = await AsyncStorage.getItem('tarefas');
      if (tarefasSalvas) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const salvarTarefas = async (tarefas) => {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarTarefa = () => {
    if (tarefa.trim()) {
      const novasTarefas = [...tarefas, { id: Date.now().toString(), texto: tarefa }];
      setTarefas(novasTarefas);
      salvarTarefas(novasTarefas);
      setTarefa('');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemTarefa}>
      <Text>{item.texto}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefas</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a tarefa"
        value={tarefa}
        onChangeText={setTarefa}
      />
      <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
        <Text style={styles.textoBotao}>Adicionar Tarefa</Text>
      </TouchableOpacity>
      <FlatList
        data={tarefas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  botao: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
  itemTarefa: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
