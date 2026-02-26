import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/Task';
type TaskItemProps = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.content}
                onPress={() => onToggle(task.id)}
            >
                <View style={[
                    styles.checkbox,
                    task.completed && styles.checkboxCompleted
                ]} />
                <Text style={[
                    styles.title,
                    task.completed && styles.titleCompleted
                ]}>
                    {task.title}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(task.id)}
            >
                <Text style={styles.deleteText}>️</Text>
            </TouchableOpacity>
        </View>
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
});