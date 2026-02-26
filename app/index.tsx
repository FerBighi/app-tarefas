import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Task } from '../types/Task';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';
export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    // Adicionar nova tarefa
    const handleAddTask = (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: title,
            completed: false,
        };
        setTasks([...tasks, newTask]);
    };
    // Marcar tarefa como concluída/não concluída
    const handleToggleTask = (id: string) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        ));
    };
    // Deletar tarefa
    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };
    // Contadores
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Tarefas</Text>
                <Text style={styles.counter}>
                    {completedTasks} de {totalTasks} concluídas

                </Text>
            </View>
            <TaskInput onAddTask={handleAddTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            Nenhuma tarefa ainda.{'\n'}
                            Adicione uma para começar! 📝
                        </Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,

    },
    counter: {
        fontSize: 16,
        color: '#666',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        lineHeight: 24,
    },
});