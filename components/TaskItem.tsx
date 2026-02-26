import { Animated, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Task } from '../types/Task';

const categoryColors = {
    trabalho: '#d5b1ffff',
    pessoal: '#bee4fdff',
    estudos: '#fdb2e4ff',
};

type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newTitle: string) => void;
};

export default function TaskItem({
    task,
    onToggle,
    onDelete,
    onEdit,
}: TaskItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.title);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleDelete = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => onDelete(task.id));
    };

    const handleSave = () => {
        if (editedText.trim() === '') return;
        onEdit(task.id, editedText);
        setIsEditing(false);
    };

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <TouchableOpacity
                style={styles.content}
                onPress={() => !isEditing && onToggle(task.id)}
            >
                <View
                    style={[
                        styles.checkbox,
                        task.completed && styles.checkboxCompleted,
                    ]}
                />
                <View
                    style={[
                        styles.categoryDot,
                        { backgroundColor: categoryColors[task.category] }
                    ]}
                />

                {isEditing ? (
                    <TextInput
                        style={styles.inputEdit}
                        value={editedText}
                        onChangeText={setEditedText}
                        onSubmitEditing={handleSave}
                        autoFocus
                    />
                ) : (
                    <Text
                        style={[
                            styles.title,
                            task.completed && styles.titleCompleted,
                        ]}
                    >
                        {task.title}
                    </Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
            >
                <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#7c0db3ff',
        marginRight: 12,
    },
    checkboxCompleted: {
        backgroundColor: '#b75fd0ff',
    },
    title: {
        fontSize: 16,
        color: '#333',
        flex: 1,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
    },
    inputEdit: {
        flex: 1,
        fontSize: 16,
        borderBottomWidth: 1,
        borderColor: '#7c0db3ff',
    },
    editButton: {
        padding: 8,
    },
    editText: {
        fontSize: 18,
    },
    categoryDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
});