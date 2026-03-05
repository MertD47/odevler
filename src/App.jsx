import React, { useState } from 'react';

const App = () => {
  const [students, setStudents] = useState([]);

  const addStudent = (newStudent) => {
    const studentWithId = { ...newStudent, id: Date.now() };
    setStudents([...students, studentWithId]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.formSection}>
        <h2 style={styles.title}>Öğrenci Kayıt Formu</h2>
        <StudentForm onAddStudent={addStudent} />
      </div>

      <div style={styles.listSection}>
        <h2 style={styles.title}>Öğrenci Listesi</h2>
        <StudentList students={students} onDelete={deleteStudent} />
      </div>
    </div>
  );
};

const StudentForm = ({ onAddStudent }) => {
  const [formData, setFormData] = useState({ name: '', department: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) return;
    
    onAddStudent(formData);
    setFormData({ name: '', department: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Öğrenci İsmi"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Bölüm"
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        style={styles.input}
      />
      <button type="submit" style={styles.addButton}>
        Listeye Ekle
      </button>
    </form>
  );
};

const StudentList = ({ students, onDelete }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr style={styles.tableHeader}>
          <th style={styles.th}>İsim</th>
          <th style={styles.th}>Bölüm</th>
          <th style={styles.th}>İşlem</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student.id} style={styles.tr}>
              <td style={styles.td}>{student.name}</td>
              <td style={styles.td}>{student.department}</td>
              <td style={styles.td}>
                <button onClick={() => onDelete(student.id)} style={styles.deleteButton}>
                  Sil
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
              Henüz öğrenci eklenmedi.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '40px',
    padding: '50px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  formSection: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  listSection: {
    flex: 2,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    borderBottom: '2px solid #eee',
    paddingBottom: '10px',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  addButton: {
    padding: '12px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeader: {
    backgroundColor: '#34495e',
    color: 'white'
  },
  th: {
    textAlign: 'left',
    padding: '12px'
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee'
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default App;