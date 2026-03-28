import { useState } from 'react'

type TaskStatus = 'Todo' | 'In Progress' | 'Done'
type TaskPriority = 'Low' | 'Medium' | 'High'

interface Task {
  id: string
  title: string
  assignee: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    assignee: 'Alice Wang',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-03-30'
  },
  {
    id: '2',
    title: 'API Integration',
    assignee: 'Bob Chen',
    priority: 'High',
    status: 'Todo',
    dueDate: '2024-04-05'
  },
  {
    id: '3',
    title: 'User Authentication',
    assignee: 'Charlie Li',
    priority: 'Medium',
    status: 'Done',
    dueDate: '2024-03-20'
  },
  {
    id: '4',
    title: 'Database Optimization',
    assignee: 'David Zhang',
    priority: 'Low',
    status: 'Todo',
    dueDate: '2024-04-15'
  },
  {
    id: '5',
    title: 'Unit Testing',
    assignee: 'Eva Liu',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2024-04-01'
  },
  {
    id: '6',
    title: 'Documentation Update',
    assignee: 'Frank Wu',
    priority: 'Low',
    status: 'Todo',
    dueDate: '2024-04-10'
  }
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    assignee: '',
    priority: 'Medium',
    status: 'Todo',
    dueDate: ''
  })

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'Todo').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    done: tasks.filter(t => t.status === 'Done').length
  }

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      alert('Please fill in all required fields')
      return
    }
    const task: Task = {
      ...newTask,
      id: Date.now().toString()
    }
    setTasks([task, ...tasks])
    setNewTask({
      title: '',
      assignee: '',
      priority: 'Medium',
      status: 'Todo',
      dueDate: ''
    })
    setIsModalOpen(false)
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Todo':
        return { bg: '#e0e7ff', text: '#3730a3' }
      case 'In Progress':
        return { bg: '#fef3c7', text: '#92400e' }
      case 'Done':
        return { bg: '#d1fae5', text: '#065f46' }
    }
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'Low':
        return { bg: '#e0e7ff', text: '#3730a3' }
      case 'Medium':
        return { bg: '#fef3c7', text: '#92400e' }
      case 'High':
        return { bg: '#fee2e2', text: '#991b1b' }
    }
  }

  return (
    <div className="app-container">
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-logo">{isSidebarCollapsed ? 'T' : 'TaskFlow'}</h2>
          <button
            className="collapse-btn"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            {isSidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">📊</span>
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📋</span>
            {!isSidebarCollapsed && <span>Tasks</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span>
            {!isSidebarCollapsed && <span>Team</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📁</span>
            {!isSidebarCollapsed && <span>Projects</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            {!isSidebarCollapsed && <span>Settings</span>}
          </a>
        </nav>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              ☰
            </button>
            <h1 className="header-title">Task Dashboard</h1>
          </div>
          <div className="header-right">
            <button className="new-task-btn" onClick={() => setIsModalOpen(true)}>
              + New Task
            </button>
            <div className="user-avatar">👤</div>
          </div>
        </header>

        <main className="content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-info">
                <h3 className="stat-value">{stats.total}</h3>
                <p className="stat-label">Total Tasks</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#e0e7ff' }}>⏳</div>
              <div className="stat-info">
                <h3 className="stat-value">{stats.todo}</h3>
                <p className="stat-label">Todo</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#fef3c7' }}>🔄</div>
              <div className="stat-info">
                <h3 className="stat-value">{stats.inProgress}</h3>
                <p className="stat-label">In Progress</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: '#d1fae5' }}>✅</div>
              <div className="stat-info">
                <h3 className="stat-value">{stats.done}</h3>
                <p className="stat-label">Done</p>
              </div>
            </div>
          </div>

          <div className="filters-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search tasks by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              {(['All', 'Todo', 'In Progress', 'Done'] as const).map((status) => (
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

          <div className="table-container">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <h3>No tasks found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <table className="tasks-table">
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
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="task-row">
                      <td className="task-title">{task.title}</td>
                      <td className="task-assignee">
                        <span className="assignee-avatar">
                          {task.assignee.charAt(0)}
                        </span>
                        {task.assignee}
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={getPriorityColor(task.priority)}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td>
                        <span
                          className="badge"
                          style={getStatusColor(task.status)}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="due-date">{task.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-group">
                <label>Assignee *</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                  placeholder="Enter assignee name"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        priority: e.target.value as TaskPriority
                      })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        status: e.target.value as TaskStatus
                      })
                    }
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleAddTask}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App