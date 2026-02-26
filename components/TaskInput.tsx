import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

type TaskInputProps = {
    onAddTask: (title: string) => void;
    selectedCategory: 'trabalho' | 'pessoal' | 'estudos';
    onSelectCategory: (category: 'trabalho' | 'pessoal' | 'estudos') => void;
};

export default function TaskInput({
    onAddTask,
    selectedCategory,
    onSelectCategory,
}: TaskInputProps) {

    const [text, setText] = useState('');
    const handleAddTask = () => {
        if (text.trim() === '') {
            return; // Não adiciona tarefa vazia
        }
        onAddTask(text);
        setText(''); // Limpa o input após adicionar
    };
    const categoryColors = {
        trabalho: '#d5b1ffff',
        pessoal: '#bee4fdff',
        estudos: '#fdb2e4ff',
    };
    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>

                <View style={styles.categorySelector}>
                    {(['trabalho', 'pessoal', 'estudos'] as const).map(cat => (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => onSelectCategory(cat)}
                            style={[
                                styles.categoryCircle,
                                { backgroundColor: categoryColors[cat] },
                                selectedCategory === cat && styles.categorySelected
                            ]}
                        />
                    ))}
                </View>

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
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center', // 👈 isso alinha tudo no meio vertical
        gap: 8,
    },

    categorySelector: {
        flexDirection: 'row',
        gap: 6,
    },

    categoryCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },

    categorySelected: {
        borderWidth: 2,
        borderColor: '#000',
    },
});