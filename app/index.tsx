import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Task } from '../types/Task';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';

export default function Home() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
    const [selectedCategory, setSelectedCategory] = useState<'trabalho' | 'pessoal' | 'estudos'>('pessoal');


    // Adicionar nova tarefa
    const handleAddTask = (title: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            completed: false,
            category: selectedCategory,
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
    const handleEditTask = (id: string, newTitle: string) => {
        setTasks(tasks.map(task =>
            task.id === id
                ? { ...task, title: newTitle }
                : task
        ));
    };
    // Contadores
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Tarefas</Text>
                <Text style={styles.counter}>
                    {completedTasks} de {totalTasks} concluídas
                </Text>
            </View>
            <TaskInput onAddTask={handleAddTask} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />            <View style={styles.filtersContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={[styles.filterText, filter === 'all' && styles.filterButtonActiveText]}>Todas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
                    onPress={() => setFilter('completed')}
                >
                    <Text style={[styles.filterText, filter === 'completed' && styles.filterButtonActiveText]}>Concluídas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
                    onPress={() => setFilter('pending')}
                >
                    <Text style={[styles.filterText, filter === 'pending' && styles.filterButtonActiveText]}>Pendentes</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredTasks} // <-- use o array filtrado
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={handleToggleTask}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditTask}
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

    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 8,
    },

    filterButton: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#b75fd0ff',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    filterButtonActive: {
        backgroundColor: '#b75fd0ff',
    },

    filterText: {
        color: '#333',
        fontWeight: 'bold',
    },

    filterButtonActiveText: {
        color: '#fff',
    },
});