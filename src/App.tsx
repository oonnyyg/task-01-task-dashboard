import React, { useState } from 'react';
import './App.css';

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  dueDate: string;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Design System Update', assignee: 'Alice Chen', priority: 'High', status: 'In Progress', dueDate: '2024-03-30' },
  { id: '2', title: 'API Integration', assignee: 'Bob Smith', priority: 'High', status: 'Todo', dueDate: '2024-04-05' },
  { id: '3', title: 'User Documentation', assignee: 'Carol White', priority: 'Medium', status: 'Done', dueDate: '2024-03-25' },
  { id: '4', title: 'Performance Optimization', assignee: 'David Lee', priority: 'High', status: 'In Progress', dueDate: '2024-04-10' },
  { id: '5', title: 'Bug Fixes', assignee: 'Eva Green', priority: 'Medium', status: 'Todo', dueDate: '2024-04-01' },
  { id: '6', title: 'Mobile Responsiveness', assignee: 'Frank Wilson', priority: 'Low', status: 'Done', dueDate: '2024-03-28' },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    priority: 'Medium' as const,
    status: 'Todo' as const,
    dueDate: new Date().toISOString().split('T')[0],
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'Todo').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length,
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
      };
      setTasks([task, ...tasks]);
      setNewTask({
        title: '',
        assignee: '',
        priority: 'Medium',
        status: 'Todo',
        dueDate: new Date().toISOString().split('T')[0],
      });
      setIsModalOpen(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Todo': return '#6b7280';
      case 'In Progress': return '#3b82f6';
      case 'Done': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>TaskFlow</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">📋 Dashboard</button>
          <button className="nav-item">📅 Calendar</button>
          <button className="nav-item">📁 Projects</button>
          <button className="nav-item">👥 Team</button>
          <button className="nav-item">⚙️ Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="nav-left">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              ☰
            </button>
            <h1 className="page-title">Task Dashboard</h1>
          </div>
          <div className="nav-right">
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              + New Task
            </button>
            <div className="user-avatar">👤</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div>
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Tasks</div>
              </div>
            </div>
            <div className="stat-card todo">
              <div className="stat-icon">📝</div>
              <div>
                <div className="stat-value">{stats.todo}</div>
                <div className="stat-label">Todo</div>
              </div>
            </div>
            <div className="stat-card in-progress">
              <div className="stat-icon">🔄</div>
              <div>
                <div className="stat-value">{stats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>
            <div className="stat-card done">
              <div className="stat-icon">✅</div>
              <div>
                <div className="stat-value">{stats.done}</div>
                <div className="stat-label">Done</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="filter-buttons">
              {['All', 'Todo', 'In Progress', 'Done'].map(status => (
                <button
                  key={status}
                  className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Task Table or Empty State */}
          {filteredTasks.length > 0 ? (
            <div className="table-container">
              <table className="task-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Assignee</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map(task => (
                    <tr key={task.id}>
                      <td className="task-title">{task.title}</td>
                      <td>{task.assignee}</td>
                      <td>
                        <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <span className="status-badge" style={{ backgroundColor: getStatusColor(task.status) }}>
                          {task.status}
                        </span>
                      </td>
                      <td>{task.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No tasks found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button className="btn btn-primary" onClick={() => { setSearchQuery(''); setStatusFilter('All'); }}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Task</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label>Assignee</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  placeholder="Enter assignee name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    className="form-select"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-select"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddTask}>Create Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;