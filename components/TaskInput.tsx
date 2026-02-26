import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
type TaskInputProps = {
    onAddTask: (title: string) => void;
};
export default function TaskInput({ onAddTask }: TaskInputProps) {
    const [text, setText] = useState('');
    const handleAddTask = () => {
        if (text.trim() === '') {
            return; // Não adiciona tarefa vazia
        }
        onAddTask(text);
        setText(''); // Limpa o input após adicionar
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite uma nova tarefa..."
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAddTask}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddTask}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',

        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#b75fd0ff',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: -4,
    },
});